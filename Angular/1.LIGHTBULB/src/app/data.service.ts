import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http'; // importing module

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  //for fetching the user data through the source

  getUserData(){
    return this.http.get("https://jsonplaceholder.typicode.com/users")
  }

}


