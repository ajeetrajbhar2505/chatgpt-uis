import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';

const routes: Routes = [
  {path : '',redirectTo : 'profile',pathMatch : 'full'},
  {path : 'home',component : HomeComponent},
  {path : 'profile',component : ProfileInfoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
