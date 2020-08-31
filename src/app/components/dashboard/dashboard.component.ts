import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  views:any[] = [{id:'0', name:'DASHBOARD'}];
  id:any = 0;
  sound:boolean = false;
  constructor(private _usuarioService: UsuarioService,
              private router:Router) { }

  logout(){
    this._usuarioService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
  }

  getIdView(id:any){
    this.id = id;
  }

  initSound(){
    this.sound=true;
  }

}
