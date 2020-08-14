import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PayformService {
  public productsList: Array<any>;
  
  setProducts(array: any) {
    this.productsList = array;
  }
  getProducts() {
    return this.productsList;
  }
  
  constructor( private http: HttpClient) {
    console.log("hola mundo");
  }

}
  