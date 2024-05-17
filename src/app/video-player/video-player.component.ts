import { Component } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent {
  tabs: any[] = [
    { title: 'Lesson', isactive: true ,icon : '&#xf518;'},
    { title: 'Chat', isactive: false ,icon : '&#xf4ad;'},
    { title: 'Mentor', isactive: false ,icon : '&#xf007;'},
  ]

  playlists: any[] = [
    { topic: 'Introduction', time: '0h 30min', isactive: true },
    { topic: 'Getting Started', time: '1h 10min', isactive: false },
    { topic: 'Learn Figma', time: '2h 20min', isactive: false },
  ]

  activetab: string = "Lesson"
  activePlaylist: string = "Introduction"

  activateTab(tab: any) {
    this.activetab = tab.title
  }

  activatePlaylist(playlists: any) {
    this.playlists.map(obj => {
      obj.isactive = false
      if (obj.topic == playlists.topic) {
        this.activePlaylist = playlists.topic
        obj.isactive = true
      }
      return obj
    })
  }

}
