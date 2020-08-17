import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-secondview',
  templateUrl: './secondview.component.html',
  styleUrls: ['./secondview.component.css']
})
export class SecondviewComponent implements OnInit {
  public confirmed:any;
  constructor(
    private _confirmeddService:DashboardService
  ) {
    this._confirmeddService.getConfirmadas().subscribe((data: any) => {
      this.confirmed = data;
    });
   }

  ngOnInit(): void {
  }

}
