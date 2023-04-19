// import { Component, OnInit } from '@angular/core';
// import { DataService } from '../data.service';
// import { MatTableDataSource } from '@angular/material/table';
// import { CustomerModel } from './customerdata.model';
// import {FormBuilder, FormGroup} from '@angular/forms'
// import { ApiService } from '../shared/api.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss']
// })
// export class HomeComponent {
//   // displayedColumns: string[] = ['id', 'name','username', 'email', 'password'];
//   dataSource: any;

//   row : any
//   formvalue: any

//   customerModelObj = new CustomerModel();

//   // formbuilder: any;

//   employeeData: any;
//   formbuilder: any;
//   selectedRow: any;

//   formgroup: any;
//   constructor(private data: DataService, private api : ApiService, private formBuilder: FormBuilder){}


//   ngOnInit(){

//     this.formvalue = this.formbuilder.group({

//       name : [''],
//       username : [''],
//       mail : [''],
//       password : ['']

//     })

//     this.getEmployeeDetails()
//   }


//   postEmployeeDetails(){
//     this.customerModelObj.name = this.formvalue.name;
//     this.customerModelObj.username = this.formvalue.username;
//     this.customerModelObj.mail = this.formvalue.mail;
//     this.customerModelObj.password = this.formvalue.password;

//     this.api.postEmployee(this.customerModelObj)
//     .subscribe(res=>{
//       console.log(res);
//       alert("USER ADDED SUCCESSFULLY")
//     },
//     err=> {
//       alert("something went wrong")
//     }
//     )
//   }


//   getEmployeeDetails(){
//     this.api.getEmployee(this.customerModelObj)
//     .subscribe(res=>{
//       this.employeeData = res;
//     })
//   }

//   deleteEmployeeDetails(row: any){
//     this.api.deleteEmployee(row.id).subscribe(res=>{
//       alert("employee deleted");
//       this.getEmployeeDetails();
//     })
//   }

//   // onEdit(row: any){
//   //   this.formvalue.controls['name'].setValue(row.name);
//   //   this.formvalue.controls['username'].setValue(row.username);
//   //   this.formvalue.controls['mail'].setValue(row.mail);
//   //   this.formvalue.controls['password'].setValue(row.password);
//   //   this.row = row;
//   // }

//   onEdit(row: any) {
//     console.log('onedit is called')
//     console.log(row);
//     this.selectedRow = row;
//     this.formvalue.setValue({
//       name: row.name,
//       username: row.username,
//       mail: row.mail,
//       password: row.password
//     });
//   }





// }

import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerModel } from './customerdata.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  dataSource: any;
  row: any;
  formgroup: any;
  employeeData: any;
  selectedRow: any;

  customerModelObj = new CustomerModel();

  constructor(
    private data: DataService,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.formgroup = this.formBuilder.group({
      name: [''],
      username: [''],
      mail: [''],
      password: ['']
    });

    this.getEmployeeDetails();
  }

  postEmployeeDetails() {
    this.customerModelObj.name = this.formgroup.value.name;
    this.customerModelObj.username = this.formgroup.value.username;
    this.customerModelObj.mail = this.formgroup.value.mail;
    this.customerModelObj.password = this.formgroup.value.password;

    this.api.postEmployee(this.customerModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('USER ADDED SUCCESSFULLY');
      },
      (err) => {
        alert('something went wrong');
      }
    );
  }

  getEmployeeDetails() {
    this.api.getEmployee(this.customerModelObj).subscribe((res) => {
      this.employeeData = res;
    });
  }

  deleteEmployeeDetails(row: any) {
    this.api.deleteEmployee(row.id).subscribe((res) => {
      alert('employee deleted');
      this.getEmployeeDetails();
    });
  }

  onEdit(row: any) {
    this.customerModelObj.id = row.id;
    console.log('onedit is called');
    console.log(row);
    this.selectedRow = row;
    this.formgroup.setValue({
      name: row.name,
      username : row.username,
      mail: row.mail,
      password: row.password
    }
    )};


  updateEmployeeDetails(){

    this.customerModelObj.id = this.selectedRow.id;
    this.customerModelObj.name = this.formgroup.value.name;
    this.customerModelObj.username = this.formgroup.value.username;
    this.customerModelObj.mail = this.formgroup.value.mail;
    this.customerModelObj.password = this.formgroup.value.password;

    this.api.updateEmployee(this.customerModelObj, this.customerModelObj.id).subscribe(
      (res) => {
        console.log(res);
        alert('USER UPDATED SUCCESSFULLY');
        this.getEmployeeDetails();

      },
      (err) => {
        alert('something went wrong');
      }
    );
  }

  logout(){
    this.router.navigate(['login'])
  }
  }




