import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-firstview',
  templateUrl: './firstview.component.html',
  styleUrls: ['./firstview.component.css']
})
export class FirstviewComponent implements OnInit {
  public ordersEfectivo:any;
  public ordersYape:any;
  public ordersStripe:any;
  public intervalo = interval(10000);
  displayState:boolean = false;
  paidState:boolean = false;
  confirmedState:boolean = false;
  test: any[] = [];
  paid:any;
  confirmed:any;
  myId:number;
  subscription: Subscription;
  headers = new HttpHeaders();

  constructor(
    private _dashboardService:DashboardService,
    private http: HttpClient
  ) {
    this._dashboardService.getDasboard().subscribe((data: any) => {
      this.test = data.payment_methods;
      this.ordersEfectivo = data.payment_methods[0];
      this.ordersYape = data.payment_methods[1];
      this.ordersStripe = data.payment_methods[2];
      console.log(data.payment_methods[1].items[0].details);
    });
    this.headers=this.headers.set('content-type', 'application/json')
    this.headers=this.headers.set('Authorization', `Token ${localStorage.getItem('token')}`)
    this.subscribeDataInterval(); 
    
  }
  
  ngOnInit(): void {
  }

  displayProducts(){
    if(this.displayState==false){
      return this.displayState=true;
    }
    else{
      return this.displayState=false;
    }
  }

  updatePaid(value:any){
    this.http.put('https://admin.loungedelbrujo.com/ecommerce/lounje/orders/update/paid/'+value, this.paid,{ 'headers': this.headers } ).subscribe(
    (response) => console.log(response),
    (error) => console.log(error.status),
  )
 }

 updateConfirmed(value:any){
  this.http.put('https://admin.loungedelbrujo.com/ecommerce/lounje/orders/update/confirmed/'+value, this.confirmed,{ 'headers': this.headers } ).subscribe(
  (response) => console.log(response),
  (error) => console.log(error.status),
)
}

  setPaidState(value:boolean, id:number){
    this.paidState = !value;
    const update = {
      paid : this.paidState
    }
    this.paid = update;
    this.myId = id;
    this.updatePaid(this.myId);
  }

  setconfirmedState(value:boolean, id:number){
    this.confirmedState = !value;
    const update = {
      confirmed : this.confirmedState
    }
    this.confirmed = update;
    this.myId = id;
    this.updateConfirmed(this.myId);
  }

  subscribeDataInterval(){
      const intervalo = interval(2000)
      this.subscription = intervalo.subscribe(n =>this._dashboardService.getDasboard().subscribe((data: any) => {
        this.test = data.payment_methods;
        this.ordersEfectivo = data.payment_methods[0];
        this.ordersYape = data.payment_methods[1];
        this.ordersStripe = data.payment_methods[2];
      }));
  }

  unsubscribeDataInterval(){
    this.subscription.unsubscribe();
  }
}
