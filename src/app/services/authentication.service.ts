import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';
import { Jwtres } from '../models/jwtres';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUri = '/api';
  authSubject = new BehaviorSubject(false);
  private token: string | null = '';

  constructor(private httpClient: HttpClient) { }
  private saveToken(token: string, expiresIn: string) {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", token);
    this.token = token;
  }
  register(user: User): Observable<Jwtres> {
    return this.httpClient.post<Jwtres>(this.apiUri + '/signup', user).pipe(
      tap((res: Jwtres) => {
        if (res) {
          this.saveToken(res.datosUsuario.access_token, res.datosUsuario.expiresIn);
        }
      })
    )
  }
  login(user: User): Observable<Jwtres> {
    return this.httpClient.post<Jwtres>(this.apiUri + '/login', user).pipe(
      tap((res: Jwtres) => {
        if (res) {
        //  this.saveToken(res.datosUsuario.access_token, res.datosUsuario.expiresIn);
        }
      })
    )
  }
  logout() {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }
  private getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }

}

