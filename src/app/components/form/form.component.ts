import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import { CantidadService } from '../../services/cantidad.service';
import { PayformService } from '../../services/payform.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, AfterViewInit {
  forma:FormGroup;
  order:FormGroup;
  disabled:boolean = false;
  confirmed:boolean = false;
  data:any[] = [];
  id:any = 0;
  products:any[]=[];
  originalLatLong = [-16.4018061, -71.5536638];

  private map;
  private marker: any;

  public pay:any;
  public cantidadDesdeService:number;
  public productsList: Array<any>;
  public finalOrder: Array<any>;
  private lat = 0;
  private lng = 0;
  constructor(
    private http: HttpClient,
    private _service: CantidadService,
    private _service2: PayformService,
    private fb: FormBuilder) {
      this.crearFormulario();
      this.orderFormulario();
     }

  ngOnInit(): void {
    this.cantidadDesdeService = this._service.getCantidad();
    this.productsList = this._service2.getProducts();
    this._service2.getPayId().subscribe((data: any) => {
      this.pay = data;
    });
  }
  ngAfterViewInit(): void {
    this.initMap();
    this.marker = L.marker(this.originalLatLong, {draggable: 'true'}).addTo(this.map);
  }

  get nameNoValido(){
    return this.forma.get('name').invalid && this.forma.get('name').touched
  }
  get numberNoValido(){
    return this.forma.get('number').invalid && this.forma.get('number').touched
  }
  get emailNoValido(){
    return this.forma.get('email').invalid && this.forma.get('email').touched
  }
  get addressNoValido(){
    return this.forma.get('address').invalid && this.forma.get('address').touched
  }
  get referenceNoValido(){
    return this.forma.get('reference').invalid && this.forma.get('reference').touched
  }

  showPosition(position) {
    // this.lat = position.coords.latitude;
    // this.lng = position.coords.longitude;
    console.log('1', position.coords.latitude);
    console.log('1', position.coords.longitude);
    console.log('1', position.coords.accuracy);
  }
  error(err){
    console.log('err', err.code, err.message);
  }
  private initMap(): void {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 5000
    };
    console.log('2', this.lat);
    console.log('2', this.lng);
    navigator.geolocation.getCurrentPosition(this.showPosition, this.error, options);
    console.log('3', this.lat);
    console.log('3', this.lng);
    this.map = L.map('map', {
      center: this.originalLatLong,
      zoom: 14
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }

  getlatlng(){
    console.log(this.marker.getLatLng().lat + '');
    console.log(this.marker.getLatLng().lng + '');
    this.http.post<any>('https://admin.loungedelbrujo.com/ecommerce/delivery_cost', {
      longitude: this.marker.getLatLng().lng + '',
      latitude: this.marker.getLatLng().lat + ''
    }).subscribe(
      resp => {
        console.log(resp);
      }
    );
    this.forma.value.longitude = this.marker.getLatLng().lng + '';
    this.forma.value.latitude = this.marker.getLatLng().lat + '';
    this.marker.dragging.disable();
  }
  enablemarker(){
    this.marker.dragging.enable();
  }

  crearFormulario(){
    this.forma = this.fb.group({
      name: ['', Validators.required],
      number: ['', [Validators.required, Validators.minLength(9), Validators.pattern("^[0-9]*$")]],
      email: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required]],
      address: ['', Validators.required],
      reference:['', Validators.required],
      comentary:[''],
      payment_method : [''],
      details:[''],
      paid:[false],
      confirmed:[false],
      longitude: [''],
      latitude: ['']
    });
  }

  orderFormulario(){
    this.order = this.fb.group({
      id: [''],
      email:['']
    });
  }

  sendOrder(order){
    this._service2.setOrder(order);
  }

  getIdPay(id:any){
    this.id = id;
  }

  getProductsDesdeService(){
    for (let i = 0; i < this.productsList.length; i++) {
      const order = {
        product : this.productsList[i].id,
        quantity: this.productsList[i].count
      }
      /* console.log(order); */
      this.products.push(order);
    }
/*     console.log(this.products); */
    return this.products;
  }

  checker(){
    return this.cantidadDesdeService == null || this.cantidadDesdeService ==0;
  }

  guardar(){
    if( this.forma.invalid ){
      return Object.values(this.forma.controls).forEach(control =>{
        control.markAsTouched();
      });
    }
    else{
      this.disabled = true;
      this.forma.value.payment_method = this.id;
      this.forma.value.details = this.getProductsDesdeService();
      this.data = this.forma.value;
      /* console.log(this.data); */
    }
 }

 sendData(){

    this.http.post('https://admin.loungedelbrujo.com/ecommerce/lounje/orders', this.data ).subscribe(
    (response:any) => {this.order.value.id = response.id; this.order.value.email = response.email;},
    (error) => console.log(error.status),
  )
  this.sendOrder(this.order.value);
  this.confirmed = true;
 }
}
