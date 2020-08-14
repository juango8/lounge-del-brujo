import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public baseRoot = 'http://54.160.110.125:8001/api';
  private apiDashboard = this.baseRoot + '/ecommerce/lounje/orders/dashboard';
  ordersYape: any[] = [];
  ordersEfectivo: any[] = [];
  ordersStripe: any[] = [];
  dashboard:any[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getDasboard(){
    return this.http.get(this.apiDashboard);
  }

  getOrdersYape() {
    this.http.get(this.apiDashboard).subscribe((data:any)=>{
      this.ordersYape = data.yape;
    });
    return this.ordersYape;
  }

  getOrdersEfectivo() {
    this.http.get(this.apiDashboard).subscribe((data:any)=>{
      this.ordersEfectivo = data.efectivo;
    });
    return this.ordersEfectivo;
  }

  getOrdersStripe() {
    this.http.get(this.apiDashboard).subscribe((data:any)=>{
      this.ordersStripe = data.stripe;
    });
    return this.ordersStripe;
  }

}
