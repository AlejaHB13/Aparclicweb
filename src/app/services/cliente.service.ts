import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  apiUri = '/api/cliente';
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getAllClientesData(): Observable<any> {
    return this.http.get<any>(this.apiUri)
  }

  newCliente(data: any): Observable<any> {
    return this.http.post<any>(this.apiUri, data, {headers: this.httpOptions})
  }
}
