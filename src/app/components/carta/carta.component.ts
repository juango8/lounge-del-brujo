import {Component, Output, EventEmitter} from '@angular/core';
import {ProductsByCategoryService} from '../../services/products-by-category.service';
import { CantidadService } from '../../services/cantidad.service';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent {

  @Output() precioFinal: EventEmitter<number> = new EventEmitter();
  categories: any[] = [];
  baseRoot: string;
  idCategory = 0;
  finalOrder: any[] = [];
  finalPrice = 0;
  private buttonState = false;

  constructor(public Categories: ProductsByCategoryService,
              private _service:CantidadService) {
    this.Categories.getProductsCategory().subscribe((data: any) => {
      this.categories = data.categories;
      console.log('aqui', this.categories);
    });
    this.baseRoot = Categories.baseRoot;
  }

  setNumber(i) {
    this.idCategory = i;
    console.log('numero ' + i);
  }

  getNumber() {
    return this.idCategory;
  }

  addDish(test: any) {
    const order = {
      id: test.id,
      name: test.name,
      price: test.price,
      count: 1
    };
    const test2 = JSON.stringify(order);
    this.finalOrder.push(order);
    this.finalPrice += test.price;
  }
  sendCantidad(cantidad){
    this._service.setCantidad(cantidad);
  }

  getFinalPrice() {
    this.sendCantidad(this.finalPrice);
    return this.finalPrice;
  }

  buttonPast() {
    return false;
  }
}