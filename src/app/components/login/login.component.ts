import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  forma:FormGroup;
  constructor(
    private router:Router,
    private fb: FormBuilder,
    private _login: UsuarioService
  ) {
    this.crearFormulario();
   }

  ngOnInit(): void {
  }

  get idNoValido(){
    return this.forma.get('username').invalid && this.forma.get('username').touched
  }
  get passwordNoValido(){
    return this.forma.get('password').invalid && this.forma.get('password').touched
  }

  crearFormulario(){
    this.forma = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  formLogin(){
    if( this.forma.invalid ){
      return Object.values(this.forma.controls).forEach(control =>{
        control.markAsTouched();
      });
    }
    this._login.login(this.forma.value)
    .subscribe( (resp:any)=>{
      this.router.navigateByUrl('/dashboard')
    },
    (err)=>{
      Swal.fire('Ingresa un usuario o contraseña, válidos', err.error.msg, 'error');
    });
 }

}
