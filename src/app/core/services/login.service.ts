import { Injectable } from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, map, Observable, ReplaySubject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {JwtService} from "./jwt.service";
import {environment} from "../constant/constant";
import {ApiService} from "./api.service";
import {SubscriptionType} from "../../component/home/home.component";
import {RegisterBasicUserRequest, RegisterOwnerRequest} from "../../component/register/register.component";

export interface AuthUser {
  storeId: number
  email: string;
  exp: number;
  roles: string;
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

  constructor(private http: HttpClient, private jwt: JwtService, private api: ApiService) {
    this.isLoggedIn();
  }


  login({ email, password }: { email: string; password: string }) {
    return this.http
      .post(`${environment.apiUrl}api/v1/authentication/login`, {
        email,
        password,
      }, {
        responseType: "text"
      })
      .pipe(tap((r) => this.createSession(r)));
  }

  registerBasicUser(body: RegisterBasicUserRequest): Observable<any>{
    return this.api.put("api/v1/authentication/save", body)
  }

  registerOwnerUser(body: RegisterOwnerRequest): Observable<any>{
    return this.api.put("api/v1/authentication/save", body)
  }

  /**
   * deletes JWT Token
   * Resets isAuthenticated and CurrentUser observables
   */
  logout() {
    this.jwt.deleteToken();
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next({storeId: 0, email: "", exp: 0, roles: ""});
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
  getUser() {
    return this.currentUser.pipe(
      map((u) => {
        return u || this.jwt.getUserFromToken();
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
