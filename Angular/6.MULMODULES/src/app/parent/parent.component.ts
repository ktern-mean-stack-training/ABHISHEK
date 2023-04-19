import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent {
  // parentMessage = 'Message from parent';
  userDataParent = [
    {
      firstname: "abhishek",
      lastname: "reddy"
    },
    {
      firstname: "swaroop",
      lastname:"naidu"
    }

  ]

  updatedUserData(updatedData:any){
    console.log('this was the data coming from child to parent')
    console.log(updatedData)
  }

}
