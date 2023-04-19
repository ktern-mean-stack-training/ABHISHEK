import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';

const routes: Routes = [
{
  path: '', redirectTo: 'home', pathMatch: 'full' // to redirect the page directly to home while loading the page
},

{
  path: "home",
  component: HomeComponent

},
{
  path: "about",
  component: AboutComponent
},
{
  path: "**",
  component: ErrorpageComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
