import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductsByCategoryService {

  public baseRoot = 'http://54.160.110.125:8001/api';
  private apiCategories = this.baseRoot + '/lounje/products/';
  categories: any[] = [];

  constructor(private http: HttpClient) { }

  getProductsCategory() {
    return this.http.get(this.apiCategories);
  }
}
