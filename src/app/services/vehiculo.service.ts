import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class VehiculoService {
    apiUri = '/api/vehiculo';
    httpOptions = new HttpHeaders().set('Content-Type', 'application/json');
  
    constructor(private http: HttpClient) { }
  
    getAllVehiculoData(): Observable<any> {
      return this.http.get<any>(this.apiUri)
    }
    newVehiculo(data: any): Observable<any> {
      return this.http.post<any>(
        this.apiUri,
        data,
        { headers: this.httpOptions });
    }

updateVehiculo(id:any, data:any): Observable<any>{
    console.log(data)
    return this.http.put<any>(this.apiUri + '/' + id, data, {headers: this.httpOptions})
  }

  getOneVehiculo(id:any): Observable<any>{
    return this.http.get<any>(this.apiUri + '/' + id, {headers: this.httpOptions})
  }

  deleteVehiculo(id: any){
    return this.http.delete<any>(this.apiUri + "/" + id, {headers: this.httpOptions});
  }
}