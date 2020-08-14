import {Component} from '@angular/core';
import {ProductsByCategoryService} from '../../services/products-by-category.service';
import { CantidadService } from '../../services/cantidad.service';
import { PayformService } from '../../services/payform.service';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent {
  categories: any[] = [];
  baseRoot: string;
  idCategory = 0;
  finalOrder: any[] = [];
  finalIds: any[]= [];
  finalPrice = 0;
  private buttonState = false;

  constructor(public Categories: ProductsByCategoryService,
              private _service:CantidadService,
              private _service2: PayformService) {
    this.Categories.getProductsCategory().subscribe((data: any) => {
      this.categories = data.categories;
    });
    this.baseRoot = Categories.baseRoot;
  }

  setNumber(i) {
    this.idCategory = i;
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

  addID(test: any) {
    const order = test.id;
    this.finalIds.push(order);
  }
  
  sendProductsList(products) {
    this._service2.setProducts(products);
  }

  sendCantidad(cantidad){
    this._service.setCantidad(cantidad);
  }

  getProductList(){
    this.sendProductsList(this.finalIds);
    return this.finalOrder;
  }

  getFinalPrice() {
    this.sendCantidad(this.finalPrice);
    return this.finalPrice;
  }

  buttonPast() {
    return false;
  }
}