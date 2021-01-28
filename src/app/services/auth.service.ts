import { ISetRoleDto } from '../models/ISetRoleDto';
import { IChangePasswordDto } from '../models/IChangePasswordDto';
import { IUserRegisterDto } from '../models/IUserRegisterDto';
import { ITokenDto } from '../models/ITokenDto';
import { ILoginDto } from '../models/ILoginDto';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

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

  get decodedToken(): any {
    return this.jwtHelperService.decodeToken(this.tokenFromLocalStorage);
  }

  get userName(): string {
    if (!this.decodedToken) {
      return '';
    }
    return this.decodedToken.nameid;
  }

  get displayName(): string {
    if (!this.decodedToken) {
      return '';
    }
    return this.decodedToken.unique_name;
  }

  get role(): string {
    if (!this.decodedToken) {
      return '';
    }
    return this.decodedToken.role;
  }

  get roleLevel(): number {
    if (!this.decodedToken) {
      return 0;
    }
    return Number(this.decodedToken.RoleLevel);
  }

  roleMatch(minimumLevel: number): boolean {
    return this.roleLevel >= minimumLevel;
  }

  get tokenFromLocalStorage(): string {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  }

  login(loginDto: ILoginDto) {
    return (
      this.http.post<ITokenDto>(`${this.baseUrl}/login`, loginDto).pipe(
        tap((tokenDto: ITokenDto) => {
          if (tokenDto) {
            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, tokenDto.token);
          }
        })
      )
    );
  }

  register(registerDto: IUserRegisterDto) {
    return this.http
      .post<ITokenDto>(`${this.baseUrl}/register`, registerDto)
      .pipe(
        tap((tokenDto: ITokenDto) => {
          if (tokenDto) {
            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, tokenDto.token);
          }
        })
      );
  }

  changePassword(changePasswordDto: IChangePasswordDto) {
    return this.http.put(`${this.baseUrl}/password`, changePasswordDto);
  }

  setRole(setRoleDto: ISetRoleDto) {
    return this.http.put(`${this.baseUrl}/role`, setRoleDto);
  }

  isLoggedIn(): boolean {
    return !this.jwtHelperService.isTokenExpired(this.tokenFromLocalStorage);
  }

  logout() {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  }
}
