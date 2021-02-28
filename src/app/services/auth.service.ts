import { RoleService } from './role.service';
import { ISetRoleDto } from './../models/ISetRoleDto';
import { API_URL } from './../models/api-url';
import { ITokenDto } from '../models/ITokenDto';
import { ILoginDto } from '../models/ILoginDto';
import { IUserRegisterDto } from '../models/IUserRegisterDto';
import { ICreateEmailConfirmationTokenDto } from '../models/ICreateEmailConfirmationTokenDto';
import { IConfirmEmailDto } from '../models/IConfirmEmailDto';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { tap, map, filter, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RoleNames } from '../models/role-names';
import { intersection } from 'lodash-es';
import { ICreateNewPasswordDto } from '../models/ICreateNewPasswordDto';

export const LOCAL_STORAGE_TOKEN_KEY = 'token';

export interface IToken {
  audience: string;
  expiryDate: Date;
  creationDate: Date;
  issuer: string;
  username: string;
  roles: RoleNames[];
  displayName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string;
  jwtHelperService: JwtHelperService;
  private token$$ = new BehaviorSubject<IToken | null>(null);
  private tokenString: string | null = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  public token$: Observable<IToken | null> = this.token$$.asObservable();

  constructor(private http: HttpClient, @Inject(API_URL) apiUrl: string, private roleService: RoleService) {
    this.baseUrl = `${apiUrl}/api/auth`;
    this.jwtHelperService = new JwtHelperService();
    this.token$$.next(this.decodeToken(this.tokenString));
  }

  login(loginDto: ILoginDto): Observable<IToken> {
    return this.http.post<ITokenDto>(`${this.baseUrl}/login`, loginDto).pipe(
      filter((tokenDto) => !!tokenDto),
      tap((tokenDto: ITokenDto) => {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, tokenDto.token);
        this.tokenString = tokenDto.token;
      }),
      map((tokenDto: ITokenDto) => this.decodeToken(tokenDto.token)!),
      tap((token) => this.token$$.next(token))
    );
  }

  register(userRegisterDto: IUserRegisterDto): Observable<ITokenDto> {
    userRegisterDto.clientUri = `${environment.web.protocol}://${environment.web.baseUrl}/registerConfirmation`;
    return this.http.post<ITokenDto>(`${this.baseUrl}/register`, userRegisterDto);
  }

  resendConfirmationLink(usernameOrEmail: string): Observable<any> {
    const createEmailConfirmationTokenDto: ICreateEmailConfirmationTokenDto = {
      usernameOrEmail,
      clientUri: `${environment.web.protocol}://${environment.web.baseUrl}/eMailConfirmation`,
    };
    return this.http.post<ITokenDto>(`${this.baseUrl}/emailconfirmationtoken`, createEmailConfirmationTokenDto);
  }

  get tokenFromLocalStorage(): string | undefined {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    return token ? token : undefined;
  }

  isLoggedIn(): boolean {
    return this.tokenString ? !this.jwtHelperService.isTokenExpired(this.tokenString) : false;
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
        this.token$$.next(null);
        this.tokenString = null;
      })
    );
  }

  confirmMail(confirmEmail: IConfirmEmailDto): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/confirmemail`, confirmEmail);
  }

  forgotPassword(dto: {usernameOrEmail: string}): Observable<any> {
    const createNewPasswordDto  = {
      usernameOrEmail: dto.usernameOrEmail,
      clientUri: `${environment.web.protocol}://${environment.web.baseUrl}/onboarding/forgotPassword`,
    };
    return this.http.post(`${this.baseUrl}/forgotpassword`, createNewPasswordDto);
  }

  public isUserInAtLeastOnRole(roles: RoleNames[]): Observable<boolean> {
    return this.token$.pipe(map((token) => (token ? intersection(token.roles, roles).length > 0 : false)));
  }

  public setUserRoles(setRole: ISetRoleDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/role`, setRole);
  }

  public getMaxRoleLevelOfCurrentUser(): Observable<number> {
    return combineLatest([this.token$, this.roleService.roles$]).pipe(map(([token, roles]) => {
      const userRoles = roles.filter(r => token?.roles.includes(r.roleName.toLowerCase() as RoleNames));
      return Math.max(...userRoles.map(r => r.roleLevel));
    }));
  }

  private decodeToken(token: string | null): IToken | null {
    if (!token) {
      return null;
    }
    const tokenObj = this.jwtHelperService.decodeToken(token);
    return {
      audience: tokenObj.aud,
      issuer: tokenObj.iss,
      expiryDate: new Date(tokenObj.exp * 1000),
      creationDate: new Date(tokenObj.iat * 1000),
      username: tokenObj.nameid,
      displayName: tokenObj.unique_name,
      roles: this.getRoles(tokenObj),
    };
  }

  private getRoles(tokenObj: any): RoleNames[] {
    if (!tokenObj.hasOwnProperty('role')) {
      return [];
    }
    if (Array.isArray(tokenObj.role)) {
      return [...tokenObj.role.map((roleName: string) => roleName.toLowerCase())];
    }
    return [tokenObj.role.toLowerCase()];
  }
}
