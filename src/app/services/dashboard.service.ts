import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public baseRoot = 'http://54.160.110.125:8001';
  private apiDashboard = this.baseRoot + '/ecommerce/lounje/orders/dashboard';
  private apiConfirmed = this.baseRoot + '/ecommerce/lounje/orders/confirmed';

  ordersYape: any[] = [];
  ordersEfectivo: any[] = [];
  ordersStripe: any[] = [];
  dashboard:any[] = [];
  headers = new HttpHeaders();
  constructor(
    private http: HttpClient
  ) {
    
    this.headers=this.headers.set('content-type', 'application/json')
    this.headers=this.headers.set('Authorization', `Token ${localStorage.getItem('token')}`)
    console.log(this.headers); 
   }

  getDasboard(){
    return this.http.get(this.apiDashboard,{ 'headers': this.headers });
  }

  getConfirmadas(){
    return this.http.get(this.apiConfirmed);
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
