import { Component, OnInit, Input } from '@angular/core';
import { CantidadService } from '../../services/cantidad.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public cantidadDesdeService:number;
  
  constructor(
    private _service: CantidadService) { }

  ngOnInit(): void {
    this.cantidadDesdeService = this._service.getCantidad();
  }

}
