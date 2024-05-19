import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { CourseComponent } from './course/course.component';

const routes: Routes = [
  {path : '',redirectTo : 'home',pathMatch : 'full'},
  {path : 'home',component : HomeComponent},
  {path : 'profile',component : ProfileInfoComponent},
  {path : 'watch',component : VideoPlayerComponent},
  {path : 'course',component : CourseComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
