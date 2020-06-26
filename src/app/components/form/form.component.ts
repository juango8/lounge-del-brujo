import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor() {
  }
  center = {lat: -16.3856059, lng: -71.5441333};
  zoom = 18;
  display?: google.maps.LatLngLiteral;

  ngOnInit(): void {
  }

}
