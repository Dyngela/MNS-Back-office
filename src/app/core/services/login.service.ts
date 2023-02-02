import { Injectable } from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, map, ReplaySubject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {JwtService} from "./jwt.service";
import {environment} from "../constant/constant";

export interface AuthUser {
  storeId: number
  email: string;
  exp: number;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject = new BehaviorSubject<AuthUser>({} as AuthUser);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);

  constructor(private http: HttpClient, private jwt: JwtService) {
    this.isLoggedIn();
  }


  login({ email, password }: { email: string; password: string }) {
    return this.http
      .post<{ token: string }>(`${environment.apiUrl}authentication/api/v1/login`, {
        username: email,
        password,
      })
      .pipe(tap((r) => this.createSession(r.token)));
  }

  /**
   * deletes JWT Token
   * Resets isAuthenticated and CurrentUser observables
   */
  logout() {
    this.jwt.deleteToken();
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next({storeId: 0, email: "", exp: 0, role: ""});
  }

  /**
   * saves User token and updates observables currentUserSubject and isAuthenticatedSubject
   s  */
  createSession(token: string) {
    const authUser: AuthUser | null = this.jwt.saveUser(token);
    if (authUser) {
      this.currentUserSubject.next(authUser);
      this.isAuthenticatedSubject.next(true);
    }
  }

  /**
   *
   * @returns Observable<string | undefined> coresponding to current user Role
   */
  getRole() {
    return this.currentUser.pipe(
      map((u) => {
        return u.role || this.jwt.getUserFromToken()?.role;
      })
    );
  }

  /**
   *
   * @returns a boolean to indicate if a token that has not expired is saved in localStorage
   * Real validity check on the token is done server-side
   */
  isLoggedIn() {
    return this.jwt.hasValidToken();
  }
}
