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
  idSubcategory= 0;
  finalOrder: any[] = [];
  finalProducts: any[]= [];
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

  resetNumber(){
    this.idSubcategory = 0;
  }

  setSubcategory(i){
    this.idSubcategory = i;
  }

  getSubcategory(){
    return this.idSubcategory;
  }

  addDish(test: any) {
    let num = 1;
    let found = false;
    for (var items of this.finalOrder) {
      if(items.id == test.id){
        found = true;
        items.count+=1;
      }
    };
    
    //const test2 = JSON.stringify(order);

      if(!found){
    const order = {
      id: test.id,
      name: test.name,
      price: test.price,
      count: num
    };

    this.finalOrder.push(order);
  }
  this.finalPrice += test.price;
    //localStorage.setItem("finalO", JSON.stringify(this.finalOrder));
  }

  addProducts(test: any) {
    /* const order = test.id;
    this.finalIds.push(order); */
  }

  rest( dish: any) {

    for (var i=0; i<this.finalOrder.length;i++) {
      let item = this.finalOrder[i]      
      if(item.id == dish.id){
        item.count-=1;
        if(item.count == 0)
        {
          item.count=0;
          this.finalOrder.splice(i,1)
        }
        this.finalPrice -= item.price;
      }
    };
    
  }

  sum( dish: any) {

    for (var item of this.finalOrder) {
      if(item.id == dish.id){
        item.count+=1;
        this.finalPrice += item.price;
      }
    };
    
  }
  
  sendProductsList(products) {
    this._service2.setProducts(products);
  }

  sendCantidad(cantidad){
    this._service.setCantidad(cantidad);
  }

  getProductList(){
    this.sendProductsList(this.finalOrder);
    return this.finalOrder;
  }

  getFinalPrice() {
    this.sendCantidad(this.finalPrice);
    return this.finalPrice;
  }

  buttonPast() {
    return false;
  }

  obtener_localStorage(){
    let finalO = JSON.parse( localStorage.getItem("finalO"));
    return finalO;
  }

}