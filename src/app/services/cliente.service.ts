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

  updateCliente(id:any, data:any): Observable<any>{
    console.log(data)
    return this.http.put<any>(this.apiUri + '/' + id, data, {headers: this.httpOptions})
  }

  getOneCliente(id:any): Observable<any>{
    return this.http.get<any>(this.apiUri + '/' + id, {headers: this.httpOptions})
  }

  deleteCliente(id: any){
    return this.http.delete<any>(this.apiUri + "/" + id, {headers: this.httpOptions});
  }
}
