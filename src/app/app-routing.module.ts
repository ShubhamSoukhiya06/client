import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CitiesComponent } from './ui/cities/cities.component';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';

const routes: Routes = [
  {

    path: '',
    component: CitiesComponent,
    children: [
    ]
    
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }