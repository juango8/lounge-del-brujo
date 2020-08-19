import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PayformService {
  
  public productsList: Array<any>;
  public order: Array<any>;
  public baseRoot = 'https://admin.loungedelbrujo.com';
  private apiPayId = this.baseRoot + '/ecommerce/payment_methods';
  categories: any[] = [];
  
  setProducts(array: any) {
    this.productsList = array;
  }
  getProducts() {
    return this.productsList;
  }

  setOrder(array:any){
    this.order = array;
  }

  getOrder(){
    return this.order;
  }
  
  constructor( private http: HttpClient) { }

  getPayId() {
    return this.http.get(this.apiPayId);
  }
}
  