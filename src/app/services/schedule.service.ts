import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {

    public baseRoot = 'https://admin.loungedelbrujo.com';
    private apiCategories = this.baseRoot + '/configuration/horaries';
    stores: any[] = [];

    constructor(private http: HttpClient) {
    }

    getProductsCategory() {
        return this.http.get(this.apiCategories);
    }
}
