
import { Component } from '@angular/core';
import { DataService } from '../data.service'; // for fetching data

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  lightStatus: string = "OFF" // for double switches
  lightStatus2: boolean =false // for a single switch
  BulbState: string = "ON" // status of the bulb for single switch
  SwitchName: string ="Switch off" // name of the switch


// for two switches
  LightOn(){
    this.lightStatus = "ON";
  }

  LightOff(){
    this.lightStatus = "OFF";
  }
//==============================================
// for a single switch
  LightSwitch(){
    this.lightStatus2 = !this.lightStatus2 // when ever the funciton is called then the status of the switch should be toggled everytime
    if (this.lightStatus2){
      this.BulbState = "ON"

    }
    else{
      this.BulbState = "OFF"

    }
//===============================================
// to toggle the name of the switch
    if (this.SwitchName == "Switch Off") {
      this.SwitchName = "Switch On"; //to turn the switch on

    } else {
      this.SwitchName = "Switch Off"; //to turn the switch off
      // code to turn the switch off
    }
  }
}

/*
// for double switches
1. assigning variable to "OFF"
2.creating two functions and assigning the commands to manipulate the string

// for single switch
1. assigning a boolean for the status of the switch to toggle
2. assigning a string variable to "ON"
3. creating a function  LightSwitch
4. inverting the status of the variable
5. using a loop to invert the variable upon clicking the button

// for bulb name (in the same function LightSwitch)
1. assigning a string as per the name of the switch
2. creating a function
3. using a loop and inverting the name of the button of switch

*/

// logic to fetch data from the db
/*
  constructor(private data : DataService) {}

  fetchDataForm(){
    this.data.getUserData().subscribe((argument) => {
    console.log("Successfully fetched data from backend")
    console.log(argument)
    })
  }
*/
//============================================
