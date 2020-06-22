import {Component} from '@angular/core';
import {ProductsByCategoryService} from '../../services/products-by-category.service';

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
  finalPrice = 0;
  private buttonState = false;

  constructor(public Categories: ProductsByCategoryService) {
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

  getFinalPrice() {
    return this.finalPrice;
  }

  buttonPast() {
    return false;
  }
}
