import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { catchError, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { intersection } from 'lodash-es';
import { RoleNames } from '../../model/roleNames';
import { RoleService } from './role.service';
import { LoggerService } from './logger.service';
import { TokenDto } from '../../model/tokenDto';
import { LoginDto } from '../../model/loginDto';
import { UserRegisterDto } from '../../model/userRegisterDto';
import { CreateEmailConfirmationTokenDto } from '../../model/createEmailConfirmationTokenDto';
import { ConfirmEmailDto } from '../../model/confirmEmailDto';
import { SetRoleDto } from '../../model/setRoleDto';
import { ResetPasswordDto } from '../../model/resetPasswordDto';

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

  private readonly clientUriBase: string;

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService,
    private roleService: RoleService,
    private logger: LoggerService,
  ) {
    this.clientUriBase = `${window.location.origin}`;
  }

  populate() {
    if (!this.jwtService.isExpired()) {
      this.currentUserSubject.next(this.jwtService.decode(this.jwtService.getToken()));
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
    return this.apiService.post<TokenDto>('/Auth/refreshtoken', {
      token: this.jwtService.getToken(),
    }).pipe(tap((result: TokenDto) => {
      this.jwtService.saveToken(result.token);
    }));
  }

  login(loginDto: LoginDto): Observable<IToken> {
    return this.apiService.post<TokenDto>('/auth/login', loginDto).pipe(
      filter((tokenDto) => !!tokenDto),
      tap((tokenDto: TokenDto) => {
        this.jwtService.saveToken(tokenDto.token);
      }),
      map((tokenDto: TokenDto) => this.jwtService.decode(tokenDto.token)!),
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

  register(userRegisterDto: UserRegisterDto): Observable<TokenDto> {
    userRegisterDto.clientUri = `${this.clientUriBase}/eMailConfirmation`;
    return this.apiService.post<TokenDto>(`/auth/register`, userRegisterDto);
  }

  resendConfirmationLink(usernameOrEmail: string): Observable<TokenDto> {
    const createEmailConfirmationTokenDto: CreateEmailConfirmationTokenDto = {
      usernameOrEmail,
      clientUri: `${this.clientUriBase}/eMailConfirmation`,
    };
    return this.apiService.post<TokenDto>(`/auth/emailconfirmationtoken`, createEmailConfirmationTokenDto);
  }

  confirmMail(confirmEmail: ConfirmEmailDto): Observable<any> {
    return this.apiService.post<any>(`/auth/confirmemail`, confirmEmail);
  }

  forgotPassword(usernameOrEmail: string): Observable<any> {
    const createNewPasswordDto: CreateEmailConfirmationTokenDto = {
      usernameOrEmail,
      clientUri: `${this.clientUriBase}/forgotPassword`,
    };
    return this.apiService.post(`/auth/forgotpassword`, createNewPasswordDto);
  }

  resetPassword(resetPassword: ResetPasswordDto): Observable<any> {
    return this.apiService.post(`/auth/resetpassword`, resetPassword);
  }

  public isUserInAtLeastOnRole(roles: RoleNames[]): Observable<boolean> {
    return this.currentUser.pipe(map((token) => (token ? intersection(token.roles, roles).length > 0 : false)));
  }

  public setUserRoles(setRole: SetRoleDto): Observable<any> {
    return this.apiService.put(`/auth/role`, setRole);
  }

  public getMaxRoleLevelOfCurrentUser(): Observable<number> {
    return combineLatest([this.currentUser, this.roleService.roles$]).pipe(map(([token, roles]) => {
      const userRoles = roles.filter(r => token?.roles.includes(r.roleName.toLowerCase() as RoleNames));
      return Math.max(...userRoles.map(r => r.roleLevel));
    }));
  }
}
