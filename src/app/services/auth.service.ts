import { ITokenDto } from '../models/ITokenDto';
import { ILoginDto } from '../models/ILoginDto';
import { IUserRegisterDto } from '../models/IUserRegisterDto';
import { ICreateEmailConfirmationTokenDto } from '../models/ICreateEmailConfirmationTokenDto';
import { IConfirmEmailDto } from '../models/IConfirmEmailDto';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { tap, catchError  } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';


export const LOCAL_STORAGE_TOKEN_KEY = 'token';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `${environment.api.protocol}://${environment.api.baseUrl}/api/auth`;
  jwtHelperService: JwtHelperService;

  constructor(private http: HttpClient) {
    this.jwtHelperService = new JwtHelperService();
  }

  login(loginDto: ILoginDto): Observable<ITokenDto> {
    return this.http.post<ITokenDto>(`${this.baseUrl}/login`, loginDto)
    .pipe(
      tap((tokenDto: ITokenDto) => {
        if (tokenDto) {
          localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, tokenDto.token);
        }
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  register(userRegisterDto: IUserRegisterDto): Observable<ITokenDto> {
    userRegisterDto.clientUri = `${environment.web.protocol}://${environment.web.baseUrl}/registerConfirmation`;
    return this.http.post<ITokenDto>(`${this.baseUrl}/register`, userRegisterDto)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  resendConfirmationLink(usernameOrEmail: string): Observable<any> {
    const createEmailConfirmationTokenDto: ICreateEmailConfirmationTokenDto = {
      usernameOrEmail,
      clientUri: `${environment.web.protocol}://${environment.web.baseUrl}/eMailConfirmation`
    };
    return this.http.post<ITokenDto>(`${this.baseUrl}/emailconfirmationtoken`, createEmailConfirmationTokenDto);
  }

  get tokenFromLocalStorage(): string | undefined {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    return token ? token : undefined;
  }

  isLoggedIn(): boolean {
    return this.tokenFromLocalStorage ? !this.jwtHelperService.isTokenExpired(this.tokenFromLocalStorage) : false;
  }

  logout(): void {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  }

  confirmMail(confirmEmail: IConfirmEmailDto): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/confirmemail`, confirmEmail);
  }
}
