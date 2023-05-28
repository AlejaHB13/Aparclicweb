import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EntradaService {
  apiUri = '/api/entradavehiculo';
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) { }

  getAllEntradaData(): Observable<any> {
    return this.http.get<any>(this.apiUri)
  }
  newEntrada(data: any): Observable<any> {
    return this.http.post<any>(
      this.apiUri,
      data,
      { headers: this.httpOptions });
  }

}

