import {Injectable} from '@angular/core';
import {AuthUser} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() {}
  token_key = 'token_key';

  decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  saveToken(token: string) {
    localStorage.setItem(this.token_key, token);
  }

  getToken() {
    return localStorage.getItem(this.token_key);
  }

  deleteToken() {
    return localStorage.removeItem(this.token_key);
  }

  getBearerToken() {
    const token = localStorage.getItem(this.token_key);
    return token ? `${token}` : undefined;
  }

  saveUser(token: string): AuthUser | null {
    if (token) {
      this.saveToken(token);
      return this.getUserFromToken();
    }
    throw Error('no token at createSession');
  }

  getUserFromToken(): AuthUser | null {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);
      return {
        storeId: decoded.storeId,
        roles: decoded.roles as string,
        email: decoded.sub as string,
        exp: decoded.exp
      };
    }
    return null;
  }

  hasValidToken() {
    const authUser = this.getUserFromToken();
    if (authUser && authUser.roles && authUser.email && authUser.exp && authUser.storeId) {
      return Date.now() <= authUser.exp * 1000;
    }
    return false;
  }
}
