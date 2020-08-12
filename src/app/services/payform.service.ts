import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PayformService {

  constructor( private http: HttpClient) { }

  crearPago( formData:any ){
    console.log("creando pago")
  }
}
