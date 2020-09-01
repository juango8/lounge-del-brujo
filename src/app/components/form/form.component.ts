import {Component, OnInit, Input, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { CantidadService } from '../../services/cantidad.service';
import { PayformService } from '../../services/payform.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import * as L from 'leaflet';

import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/img/marker-icon-2x-r.png';
const iconUrl = 'assets/img/marker-icon-r.png';
const shadowUrl = 'assets/img/marker-shadow.png';
const iconDefault = icon({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

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
  position:boolean = false;
  uploadfile:boolean = false;
  data:any[] = [];
  id:any = 0;
  products:any[]=[];
  originalLatLong = [-16.3855114, -71.5440775];
  nextform:boolean = false;
  fileName:any;

  public map;
  public marker: L.marker;

  public pay:any;
  public cantidadDesdeService:number;
    public cantidadDelivery: number;
    public deliveryRequest = false;
  public productsList: Array<any>;
  public finalOrder: Array<any>;
    lat: number;
    lng: number;
    acc: number;
    distanceValidation = true;
    test: string;
  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private _service: CantidadService,
    private _service2: PayformService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef) {
      this.crearFormulario();
      this.orderFormulario();
     }

  ngOnInit(): void {
    this.cantidadDesdeService = this._service.getCantidad();
    this.productsList = this._service2.getProducts();
    this._service2.getPayId().subscribe((data: any) => {
      this.pay = data;
    });
    this.getProductsDesdeService();
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
  get longitudeNoValido(){
    return this.forma.get('longitude').invalid && this.forma.get('longitude').touched
  }
  get latitudeNoValido(){
    return this.forma.get('latitude').invalid && this.forma.get('latitude').touched
  }

    error(err) {
        console.log('err', err.code, err.message);
    }

    getPosition(): Promise<any> {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 5000
        };
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resp => {
                    resolve({lng: resp.coords.longitude, lat: resp.coords.latitude, acc: resp.coords.accuracy});
                },
                err => {
                    reject(err);
                },
                options);
        });
    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    initMap(): void {
        // navigator.geolocation.getCurrentPosition(this.showPosition, this.error, options);
        this.getPosition().then(pos => {
            // console.log(`Position: ${pos.lng} ${pos.lat}`);
            console.log('acc', pos.acc);
            (async () => {
                await this.delay(2000);
                this.lat = pos.lat;
                this.lng = pos.lng;
                this.acc = pos.acc;
                console.log('current pos', this.lat, this.lng);
                this.setLATLNG(this.lat, this.lng);
            })();
        });
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
    // console.log(this.marker.getLatLng().lat + '');
    // console.log(this.marker.getLatLng().lng + '');
    this.http.post<any>('https://admin.loungedelbrujo.com/ecommerce/delivery_cost', {
      longitude: this.marker.getLatLng().lng + '',
      latitude: this.marker.getLatLng().lat + ''
    }).subscribe(
      resp => {
          // console.log('aqui', resp);
          if (typeof resp.cost !== 'undefined'){
              this.deliveryRequest = true;
              this.cantidadDelivery = resp.cost;
              this.distanceValidation = true;
              this.test = 'S/.' + this.cantidadDelivery + ',00';
          } else {
              this.deliveryRequest = true;
              this.cantidadDelivery = 0;
              this.test = 'Ubicación no valida';
              window.alert('Ubicación fuera de rango de delivery.');
              this.distanceValidation = false;
          }
      }
    );
    this.position = true;
    this.forma.value.longitude = this.marker.getLatLng().lng + '';
    this.forma.value.latitude = this.marker.getLatLng().lat + '';
    this.marker.dragging.disable();
  }
  enablemarker(){
    this.position = false;
    this.marker.dragging.enable();
  }

  setLATLNG(a: number, b: number){
      if (this.acc < 200) {
          this.marker.setLatLng([a, b]);
          this.map.panTo(new L.LatLng(a, b));
      } else {
          window.alert('Ubicación no encontrada');
      }
  }

  crearFormulario(){
    this.forma = this.fb.group({
      name: ['', Validators.required],
      number: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(12), Validators.pattern("^[+0-9]*$")]],
      email: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required]],
      address: ['', Validators.required],
      reference:['', Validators.required],
      comentary:[''],
      payment_method : [''],
      details:[''],
      paid:[false],
      confirmed:[false],
      longitude: [''],
      latitude: [''],
      image_payment:['']
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

  setIdPay(id:any){
    this.id = id;
    console.log(this.id);
    this._service.setCantidad(this._service.getCantidad() + this.cantidadDelivery);
  }

  getidPay(){
    return this.id;
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
  }

  checker(){
    return this.cantidadDesdeService == null || this.cantidadDesdeService ==0;
  }

  checkerMap(){
    return this.forma.value.longitude ==0 || this.forma.value.latitude == 0;
  }

  onFileChange(event) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.fileName = file.name;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.forma.patchValue({
          image_payment: reader.result
       });
       this.uploadfile = true;
       this.forma.value.payment_method = this.id;
      this.forma.value.details = this.products;
       this.getlatlng();
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  guardar(){
    if( this.forma.invalid ){
      return Object.values(this.forma.controls).forEach(control =>{
        control.markAsTouched();
      });
    }
    else{
      this.getlatlng();
      this.disabled = true;
      this.forma.value.payment_method = this.id;
      this.forma.value.details = this.products;
      this.data = this.forma.value;
      console.log("se guardo el formulario");
      console.log(this.forma.value);
    }
 }


 nextformCashAndYape(){
  if( this.forma.invalid ){
    Swal.fire('error', 'Por favor complete todos los campos obligatorios.','error');
    };
    this.nextform = true;
 }

 sendData(){
  console.log(JSON.stringify(this.forma.value));
    this.http.post('https://admin.loungedelbrujo.com/ecommerce/lounje/orders', this.forma.value ).subscribe(
    (response:any) => {this.order.value.id = response.id; this.order.value.email = response.email;this.confirmed = true;/* this.nextform = false;  */console.log(response); console.log(JSON.stringify(this.forma.value));},
    (error) =>Swal.fire( 'error','Por favor complete todos los campos obligatorios.','error'),
  )
  this.sendOrder(this.order.value);

 }
}
