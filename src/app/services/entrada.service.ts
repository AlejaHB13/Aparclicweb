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
  updateEntrada(id: any, data: any): Observable<any> {
    console.log(data)
    return this.http.put<any>(
      this.apiUri + '/' + id,
      data,
      { headers: this.httpOptions });
  }
  getOneEntrada(id: any): Observable<any> {
    return this.http.get<any>(
      this.apiUri + '/' + id,
      { headers: this.httpOptions });

  }
  deleteEntrada(id: any) {
    return this.http.delete<any>(
      this.apiUri + "/" + id,
      { headers: this.httpOptions });
  }




}

