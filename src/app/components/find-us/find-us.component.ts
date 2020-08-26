import { Component, OnInit } from '@angular/core';
import {ScheduleService} from '../../services/schedule.service';

@Component({
  selector: 'app-find-us',
  templateUrl: './find-us.component.html',
  styleUrls: ['./find-us.component.css']
})
export class FindUsComponent {
    stores: Store[];
    endDay: string;
    endTime: string;
    id: number;
    name: string;
    startDay: string;
    startTime: string;

  constructor(private store: ScheduleService) {
      this.store.getProductsCategory().subscribe((data: any) => {
          this.stores = data;
          console.log(data);
      });
  }
}

interface Store {
    end_day: string;
    end_time: string;
    id: number;
    name: string;
    start_day: string;
    start_time: string;
}
