import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styles: [
  ]
})
export class ComponentsComponent implements OnInit {
  onActivate(event) {
    window.scroll(0, 0);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
