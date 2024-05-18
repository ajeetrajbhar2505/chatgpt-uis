import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path : '',redirectTo : 'home',pathMatch : 'full'},
  {path : 'home',component : HomeComponent},
  {path : 'watch',component : VideoPlayerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
