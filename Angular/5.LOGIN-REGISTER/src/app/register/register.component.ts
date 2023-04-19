import { Component } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms'; // importing modules
import {Router} from '@angular/router';
import { DataService } from '../data.service';
import { ApiService } from '../shared/api.service';
import { CustomerModel } from '../home/customerdata.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private formBuilder: FormBuilder, private router: Router, private data: DataService,
    private api : ApiService){ }
  regForm: any;

  res: any;

  customerModelObj = new CustomerModel();

  ngOnInit(): void{
    this.regForm = this.formBuilder.group({
      name: [''],
      username: [''],
      mail: [''],
      password: ['']
    })

  }

  onLogin(){
    this.router.navigate(['login']);
  }

  onRegister(){
    this.data.postUserData(this.regForm.value).subscribe((dataSource) =>{
      console.log("REGSITERED SUCCESFULLY");
      console.log("CHECK DATABASE")
      console.log(this.regForm.value)
      alert('registration succesfull')
      this.router.navigate(['login'])


     } )
  }

  postEmployeeDetails(){
    this.customerModelObj.name = this.regForm.name;
    this.customerModelObj.username = this.regForm.username;
    this.customerModelObj.mail = this.regForm.mail;
    this.customerModelObj.password = this.regForm.password;

    this.api.postEmployee(this.customerModelObj).subscribe(res=>{
      console.log(res);
      alert("USERS ADDED SUCCESSFULLY")
    },
    err=> {
      alert("something went wrong")
    }
    )
  }




}
