import { Component, OnInit } from '@angular/core';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  iconFacebook = faFacebookF;
  iconTwitter = faTwitter;
  iconInstagram = faInstagram;

  constructor() { }

  ngOnInit(): void {
  }

}
