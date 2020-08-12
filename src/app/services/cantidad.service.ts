import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CantidadService {

  public cantidadDelService:number;
  
  setCantidad(cantidad:number){
    this.cantidadDelService = cantidad;
  }

  getCantidad(){
    return this.cantidadDelService;
  }
}
