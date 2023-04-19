import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // http: any;
  constructor(private FormBuilder: FormBuilder, private router: Router, private http: HttpClient) {}

  loginForm: any
  // data: { [x: string]: any; }

  ngOnInit(): void {
    this.loginForm = this.FormBuilder.group({
      mail: [''],
      password: ['']
    })
  }


  //for login button

  // onSubmit(){
  //   console.log(this.loginForm.value)
  //   const loginCredentials = this.loginForm.value;
  //   if (loginCredentials.password ==="abhi@123" && loginCredentials.email === "abhi@gmail.com"){
  //     this.router.navigate(['home'])
  //   } else {
  //     alert("FAILED")
  //   }
  // }

  // for login button

  onLogin(): void {
    const loginCredentials = this.loginForm.value;
    this.getUserdata().subscribe((data: { [x: string]: any; }) => {
      console.log(data);
      const users =  data['data'];
      const matchedUser = data['find']( (user: { mail: any; password: any; }) =>
        user.mail === loginCredentials.mail && user.password === loginCredentials.password);

      if (matchedUser){
        this.router.navigate(['home']);
      }

      else {
        alert('INVALID LOGIN DETAILS')
        alert('Register if new user')
      }


    }

    );

  }


  // to fetch the data from json file
  getUserdata(){
    return this.http.get("http://localhost:3000/data")
  }
  //for register button

  toRegisterpage(){
    this.router.navigate(['register'])
  }













}
