import { Component, OnInit } from '@angular/core';
import { CantidadService } from '../../../services/cantidad.service';

declare function init_plugins();
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  public cantidadDesdeService:number;
  constructor(private _service: CantidadService) { }

  ngOnInit(): void {
    this.cantidadDesdeService = this._service.getCantidad();
    init_plugins();
  }

}
