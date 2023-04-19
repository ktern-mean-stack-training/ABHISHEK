import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { Route } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecurityRoutingModule } from './security/security-routing.module';
import { HomeComponent } from './home/home.component';
import { NewPipePipe } from './new-pipe.pipe';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewPipePipe,
    ParentComponent,
    ChildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SecurityRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
