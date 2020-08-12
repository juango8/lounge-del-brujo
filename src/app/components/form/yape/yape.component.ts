import { Component, OnInit } from '@angular/core';
import { CantidadService } from '../../../services/cantidad.service';

@Component({
  selector: 'app-yape',
  templateUrl: './yape.component.html',
  styleUrls: ['./yape.component.css']
})
export class YapeComponent implements OnInit {
  public cantidadDesdeService:number;

  constructor(private _service: CantidadService) { }

  ngOnInit(): void {
    this.cantidadDesdeService = this._service.getCantidad();

  }

}
