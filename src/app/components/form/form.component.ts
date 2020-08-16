import { Component, OnInit, Input } from '@angular/core';
import { CantidadService } from '../../services/cantidad.service';
import { PayformService } from '../../services/payform.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  forma:FormGroup;
  disabled:boolean = false;
  confirmed:boolean = false;
  pay:any[] = [{id:'1', pay:'Tarjeta'},{id:'2', pay:'Efectivo'},{id:'3', pay:'Yape'}];
  data:any[] = [];
  id:any = 0;

  public cantidadDesdeService:number;
  public productsList: Array<any>;
  constructor(
    private http: HttpClient,
    private _service: CantidadService,
    private _service2: PayformService,
    private fb: FormBuilder) {
      this.crearFormulario();
     }

  ngOnInit(): void {
    this.cantidadDesdeService = this._service.getCantidad();
    this.productsList = this._service2.getProducts();
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

  crearFormulario(){
    this.forma = this.fb.group({
      name: ['', Validators.required],
      number: ['', [Validators.required, Validators.minLength(9), Validators.pattern("^[0-9]*$")]],
      email: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required]],
      address: ['', Validators.required],
      reference:['', Validators.required],
      comentary:[''],
      payment_method : [''],
      products:[''],
      paid:[false],
      confirmed:[false]
    });
  }

  getIdPay(id:any){
    this.id = id;
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
      this.forma.value.products = this.productsList;
      this.data = this.forma.value;
      /* console.log(this.data); */
      
    }
 }

 sendData(){
    this.confirmed = true;
    this.http.post('http://54.160.110.125:8001/api/ecommerce/lounje/orders', this.data).subscribe(
    (response) => console.log(response),
    (error) => console.log(error)
  )
 }
}
