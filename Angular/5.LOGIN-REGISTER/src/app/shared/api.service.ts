import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
import {HttpClient, HttpClientModule} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEmployee(data:any){
    return this.http.post<any>('http://localhost:3000/data',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getEmployee(data:any){
    return this.http.get<any>('http://localhost:3000/data')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateEmployee(data:any, id: number){
    return this.http.put<any>('http://localhost:3000/data/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteEmployee(id:number){
    return this.http.delete<any>('http://localhost:3000/data/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }


}
