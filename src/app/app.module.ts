import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { CourseComponent } from './course/course.component';
import { FilesComponent } from './files/files.component';
import { MembershipPlanComponent } from './membership-plan/membership-plan.component';
import { FlashMessageComponent } from './flash-message/flash-message.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileInfoComponent,
    VideoPlayerComponent,
    CourseComponent,
    FilesComponent,
    MembershipPlanComponent,
    FlashMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
