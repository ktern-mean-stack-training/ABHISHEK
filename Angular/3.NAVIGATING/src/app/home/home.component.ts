

import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  argument: any;
  constructor(private data: DataService) {}

  fetchDataForm() {
    this.data.getUserData().subscribe((argument: any) => {
      console.log("Successfully fetched data from backend")
      console.log(argument)
      this.argument = JSON.stringify(argument);
    })
  }

  printDataForm() {
    return this.argument; // return the fetched data from argument variable
  }


/*
  postDataForm() {
    this.data.getUserData().subscribe((response: any) => {
      console.log("Successfully posted data to backend")
      console.log(response)
      this.argument = JSON.stringify(response);
    })
  }

*/

}
