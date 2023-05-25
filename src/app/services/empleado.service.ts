import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  apiUri = '/api/empleado';
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');




  constructor(private http: HttpClient) { }

  getAllempleadosData(): Observable<any> {
    return this.http.get<any>(this.apiUri)
  }

}
