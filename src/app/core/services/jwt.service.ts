import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RoleNames } from '../../models/role-names';

const JWT_TOKEN_KEY = 'jwtToken';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private jwtHelperService: JwtHelperService;

  constructor() {
    this.jwtHelperService = new JwtHelperService();
  }

  isExpired() {
    const token = this.getToken();
    return token ? this.jwtHelperService.isTokenExpired(token) : true;
  }

  decode() {
    const token = this.jwtHelperService.decodeToken(this.getToken());

    return {
      audience: token.aud,
      issuer: token.iss,
      expiryDate: new Date(token.exp * 1000),
      creationDate: new Date(token.iat * 1000),
      username: token.nameid,
      displayName: token.name,
      roles: this.normalizeRoles(token),
    };
  }

  getToken(): string {
    return window.localStorage[JWT_TOKEN_KEY];
  }

  saveToken(token: string) {
    window.localStorage[JWT_TOKEN_KEY] = token;
  }

  destroyToken() {
    window.localStorage.removeItem(JWT_TOKEN_KEY);
  }

  private normalizeRoles(tokenObj: any): RoleNames[] {
    if (!tokenObj.hasOwnProperty('role')) {
      return [];
    }
    if (Array.isArray(tokenObj.role)) {
      return [...tokenObj.role.map((roleName: string) => roleName.toLowerCase())];
    }
    return [tokenObj.role.toLowerCase()];
  }
}
