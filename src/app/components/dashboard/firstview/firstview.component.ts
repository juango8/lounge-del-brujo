import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';


@Component({
  selector: 'app-firstview',
  templateUrl: './firstview.component.html',
  styleUrls: ['./firstview.component.css']
})
export class FirstviewComponent implements OnInit {
  public ordersEfectivo:any;
  public ordersYape:any;
  public ordersStripe:any;
  test: any[] = [];

  constructor(
    private _dashboardService:DashboardService
  ) {
    this._dashboardService.getDasboard().subscribe((data: any) => {
      this.test = data.payment_methods;
      this.ordersEfectivo = data.payment_methods[0];
      this.ordersYape = data.payment_methods[1];
      this.ordersStripe = data.payment_methods[2];
    });
    /* this.ordersEfectivo = this._dashboardService.getOrdersEfectivo();
    this.ordersYape = this._dashboardService.getOrdersYape();
    this.ordersStripe = this._dashboardService.getOrdersStripe();
    this.test = this._dashboardService.getDasboard();
    console.log(this.ordersEfectivo);
    console.log(this.ordersStripe);
    console.log(this.test); */
   }

  ngOnInit(): void {
    
  }

}
