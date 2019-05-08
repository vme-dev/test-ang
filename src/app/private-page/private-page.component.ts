import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private-page',
  templateUrl: './private-page.component.html',
  styleUrls: ['./private-page.component.css']
})
export class PrivatePageComponent implements OnInit {
  
  user: string;

  constructor( private authService: AuthService,
               private router: Router ) {                 
    this.user = this.authService.getUserName();
  }

  ngOnInit() {
  }

  logout () {
    this.authService.logout( "/login" );
  }
}
