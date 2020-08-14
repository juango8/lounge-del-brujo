import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  views:any[] = [{id:'0', name:'no confirmados'},{id:'1',name:'confirmados'}];
  id:any = 0;
  constructor() { }

  ngOnInit(): void {
  }

  getIdView(id:any){
    this.id = id;
  }

}
