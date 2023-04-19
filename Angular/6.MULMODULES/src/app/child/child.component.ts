import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent {
  @Input() userDataChild:any;

  @Output() userAddedSal: EventEmitter<any> = new EventEmitter<any>();





  ngOnInit(): void{
    // this.childMessage = `Message from child: ${this.message}`;
    console.log('this was the data coming from parent to the child')
    console.log(this.userDataChild)


    setTimeout(()=>{  // timer is to hold the data for 5s, so that the data will update after consoling the initial data.
      this.addSalary(this.userDataChild);
    },5000);

  }

  addSalary(data: any){
    this.userDataChild.forEach((element:any) => {
      element.salary = 5000;
    });

    // console.log(this.userDataChild)

    this.userAddedSal.emit(this.userDataChild);
  }

}
