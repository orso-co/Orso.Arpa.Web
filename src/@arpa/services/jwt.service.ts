import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RoleNames } from '../models/roleNames';

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
    let valid;
    try {
      valid = this.jwtHelperService.isTokenExpired(this.getToken());
    } catch (e) {
      valid = false;
    }
    return valid;
  }

  decode(tokenString: string) {
    const token = this.jwtHelperService.decodeToken(tokenString);

    return {
      audience: token.aud,
      issuer: token.iss,
      expiryDate: new Date(token.exp * 1000),
      creationDate: new Date(token.iat * 1000),
      username: token.nameid,
      displayName: token.name,
      roles: this.normalizeRoles(token),
      userId: token.sub,
      personId: token[`${token.iss}/person_id`],
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
