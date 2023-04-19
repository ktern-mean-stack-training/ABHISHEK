import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityRoutingModule } from './security/security-routing.module'; //importing the child module
import { HomeComponent } from './home/home.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
// import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'parent',
    component: ParentComponent
  },
  {
    path:'child',
    component: ChildComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
