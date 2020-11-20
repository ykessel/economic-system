import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Cuenta} from '../modelos/cuenta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  constructor(private http: HttpClient) { }
  ecoUrl = 'http://localhost:3000/ecoapi/cuentas/';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  getCuentas(): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(this.ecoUrl);
  }

  updateCuenta(cuenta: Cuenta) {
    return this.http.put(this.ecoUrl + cuenta.id, cuenta);
  }
}
