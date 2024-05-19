import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { VideoPlayerComponent } from './video-player/video-player.component';

const routes: Routes = [
  {path : '',redirectTo : 'profile',pathMatch : 'full'},
  {path : 'home',component : HomeComponent},
  {path : 'profile',component : ProfileInfoComponent},
  {path : 'watch',component : VideoPlayerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
