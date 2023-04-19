import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'; // import router

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // route: any;
  constructor(private route: Router) {} //add constructor with router as private type
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  goTohome(){
    this.route.navigate(['home'])
  }
  goToabout(){
    this.route.navigate(['about'])
  }

  goToerror(){
    this.route.navigate(['errorpage'])
  }

}
