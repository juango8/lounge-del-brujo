import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PayformService {
  public productsList: Array<any>;
  public baseRoot = 'http://54.160.110.125:8001';
  private apiPayId = this.baseRoot + '/ecommerce/payment_methods';
  categories: any[] = [];
  
  setProducts(array: any) {
    this.productsList = array;
  }
  getProducts() {
    return this.productsList;
  }
  
  constructor( private http: HttpClient) { }

  getPayId() {
    return this.http.get(this.apiPayId);
  }
}
  