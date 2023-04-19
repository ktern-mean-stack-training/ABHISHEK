import { Component } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router){ }

  TodaysDate: Date = new Date();

  price: number = 10000;

  number: number =9;

  colorValue ='blue'

  state: string ="not available"

  parent(){
    this.router.navigate(['parent'])
  }

}
