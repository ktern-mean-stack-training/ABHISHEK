
  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup } from '@angular/forms'; // importing modules
  import {Router} from '@angular/router';

  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })

  export class LoginComponent implements OnInit{
    route: any;

    constructor(private formBuilder: FormBuilder, private router: Router){ }

    loginForm: any;  //creating the loginform and altering its type to "any"

    ngOnInit(): void {
      // throw new Error('Method not implemented.');

      this.loginForm = this.formBuilder.group({   // specifying the fields required inside the form  builder
        email: [''], // here we are keeping the form empty initially, later on it should be filled by the user.
        password: ['']
      });
    }

    onSubmit(){
      console.log(this.loginForm.value)
      const loginCredentials = this.loginForm.value;
      if (loginCredentials.password ==="abhi@123" && loginCredentials.email === "abhi@gmail.com"){
        this.router.navigate(['home'])
      } else {
        alert("FAILED")
      }
    }

    /*
    onLogin(){
      this.route.navigate(['home'])
    }
  */

  }

