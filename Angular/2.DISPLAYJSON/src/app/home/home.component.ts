import { Component } from '@angular/core';
import { DataService } from '../data.service'; // to deal with fetching the data and posting it in the page.
import { MatTableDataSource } from '@angular/material/table'; //angular material used for manipulating the data into tables.


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  displayedColumns: string[] = ['id', 'name','username', 'email', 'phone','street','suite','website']; //specifying the required attributes from the DB
  // displayedColumns: string[] = ['id', 'name','suite', 'phone','website','zipcode'];
  dataSource: any;

  argument: any;
  constructor(private data: DataService) {} //injecting the data service instance into the constructor.
  fetchDataForm() {

    // this method is to fetch the data from getuserdata and gives it to both console and also helps in making the data as tables.
    this.data.getUserData().subscribe((dataSource: any) => {
      console.log("Successfully fetched data from backend")
      console.log(dataSource)      //gives the data to console upon calling the funtion
      // this.dataSource = new MatTableDataSource(dataSource);
      this.dataSource = new MatTableDataSource(dataSource); //helps in formatting the data into tables.

    })
  }


}
