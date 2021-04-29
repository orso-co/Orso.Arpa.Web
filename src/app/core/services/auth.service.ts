import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject, combineLatest, of } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { map, distinctUntilChanged, filter, tap, catchError } from 'rxjs/operators';
import { ILoginDto } from '../../models/ILoginDto';
import { ITokenDto } from '../../models/ITokenDto';
import { IUserRegisterDto } from '../../models/IUserRegisterDto';
import { ConfigService } from './config.service';
import { ICreateEmailConfirmationTokenDto } from '../../models/ICreateEmailConfirmationTokenDto';
import { IConfirmEmailDto } from '../../models/IConfirmEmailDto';
import { ICreateNewPasswordDto } from '../../models/ICreateNewPasswordDto';
import { IResetPasswordDto } from '../../models/IResetPasswordDto';
import { intersection } from 'lodash-es';
import { RoleNames } from '../../models/role-names';
import { ISetRoleDto } from '../../models/ISetRoleDto';
import { RoleService } from './role.service';
import { LoggerService } from './logger.service';

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
  private currentUserSubject = new BehaviorSubject<IToken>({} as IToken);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  private clientUriBase: string;

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
    private configService: ConfigService,
    private roleService: RoleService,
    private logger: LoggerService,
  ) {
    const { protocol, baseUrl } = this.configService.getEnv('web');
    this.clientUriBase = `${protocol}://${baseUrl}`;
  }

  populate() {
    if (!this.jwtService.isExpired()) {
      this.currentUserSubject.next(this.jwtService.decode());
      this.isAuthenticatedSubject.next(true);
    } else {
      this.purgeAuth();
    }
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next({} as IToken);
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): IToken {
    return this.currentUserSubject.value;
  }

  refreshToken() {
    return this.apiService.post<ITokenDto>('/Auth/refreshtoken', {
      token: this.jwtService.getToken()
    }).pipe(tap((tokenDto: ITokenDto) => {
      this.jwtService.saveToken(tokenDto.token);
    }));
  }

  login(loginDto: ILoginDto): Observable<IToken> {
    return this.apiService.post<ITokenDto>('/auth/login', loginDto).pipe(
      filter((tokenDto) => !!tokenDto),
      tap((tokenDto: ITokenDto) => {
        this.jwtService.saveToken(tokenDto.token);
      }),
      map((tokenDto: ITokenDto) => this.jwtService.decode()!),
      tap((token) => {
        this.currentUserSubject.next(token);
        this.isAuthenticatedSubject.next(true);
      }),
    );
  }

  logout(): Observable<any> {
    return this.apiService.post<any>(`/auth/logout`, {
      token: this.jwtService.getToken(),
    }).pipe(
      catchError((error) => {
        if (error) {
          this.logger.error(error);
        }
        this.purgeAuth();
        return of({});
      }),
      map(() => {
        this.purgeAuth();
        return of({});
      }),
    );
  }

  register(userRegisterDto: IUserRegisterDto): Observable<ITokenDto> {
    userRegisterDto.clientUri = `${this.clientUriBase}/eMailConfirmation`;
    return this.apiService.post<ITokenDto>(`/auth/register`, userRegisterDto);
  }

  resendConfirmationLink(usernameOrEmail: string): Observable<ITokenDto> {
    const createEmailConfirmationTokenDto: ICreateEmailConfirmationTokenDto = {
      usernameOrEmail,
      clientUri: `${this.clientUriBase}/eMailConfirmation`,
    };
    return this.apiService.post<ITokenDto>(`/auth/emailconfirmationtoken`, createEmailConfirmationTokenDto);
  }

  confirmMail(confirmEmail: IConfirmEmailDto): Observable<any> {
    return this.apiService.post<any>(`/auth/confirmemail`, confirmEmail);
  }

  forgotPassword(usernameOrEmail: string): Observable<any> {
    const createNewPasswordDto: ICreateNewPasswordDto = {
      usernameOrEmail,
      clientUri: `${this.clientUriBase}/forgotPassword`,
    };
    return this.apiService.post(`/auth/forgotpassword`, createNewPasswordDto);
  }

  resetPassword(resetPassword: IResetPasswordDto): Observable<any> {
    return this.apiService.post(`/auth/resetpassword`, resetPassword);
  }

  public isUserInAtLeastOnRole(roles: RoleNames[]): Observable<boolean> {
    return this.currentUser.pipe(map((token) => (token ? intersection(token.roles, roles).length > 0 : false)));
  }

  public setUserRoles(setRole: ISetRoleDto): Observable<any> {
    return this.apiService.put(`/auth/role`, setRole);
  }

  public getMaxRoleLevelOfCurrentUser(): Observable<number> {
    return combineLatest([this.currentUser, this.roleService.roles$]).pipe(map(([token, roles]) => {
      const userRoles = roles.filter(r => token?.roles.includes(r.roleName.toLowerCase() as RoleNames));
      return Math.max(...userRoles.map(r => r.roleLevel));
    }));
  }
}
