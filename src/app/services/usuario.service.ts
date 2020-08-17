import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public baseRoot = 'http://54.160.110.125:8001';
  private apiLogin = this.baseRoot + '/authentication/login';

  constructor(private http: HttpClient) { }


  logout(){
    localStorage.removeItem('token');
  }

  login(formData : any) {
    return this.http.post(this.apiLogin, formData).pipe(
      tap( (resp:any)=>{
        localStorage.setItem('token', resp.token)
      })
    );
  }
}
