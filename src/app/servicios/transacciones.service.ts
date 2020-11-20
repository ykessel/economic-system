import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Transaccion} from '../modelos/transaccion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  constructor(private http: HttpClient) { }


  ecoUrl = 'http://localhost:3000/ecoapi/transacciones';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  newTransaccion(transaccion: Transaccion) {
    return this.http.post(this.ecoUrl, transaccion, this.httpOptions).subscribe(x => {
      console.log('Data: ', x)},
      err => console.log('Error :',err)
    );
  }
  getTransacciones(): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>(this.ecoUrl);
  }

  getAfectadas(): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>(this.ecoUrl + '/afectdas');
  }
}
