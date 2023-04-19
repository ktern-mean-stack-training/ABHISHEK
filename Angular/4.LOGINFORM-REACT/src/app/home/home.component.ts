import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
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




