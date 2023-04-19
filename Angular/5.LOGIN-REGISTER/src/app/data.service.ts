import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUserData(){
    return this.http.get("http://localhost:3000/data") //replacing the url with current url
  }

  postUserData(newUser:any){


    return this.http.post("http://localhost:3000/data", newUser)
  }
}



