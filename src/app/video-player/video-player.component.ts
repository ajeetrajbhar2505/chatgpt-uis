import {
  Component,
  ElementRef,
  OnInit,
  Optional,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface ContentControls {
  playContent: boolean;
  openFullscreen: boolean;
  Rangeduration: number;
  currentRangeDuration: number;
  currentDuration: string;
  duration: string;
}


@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent implements OnInit {
  contentLoaded = false;
  readMore: boolean = false
  videoPlaying: boolean = false
  contentControls: ContentControls = {
    playContent: false,
    openFullscreen: false,
    Rangeduration: 0,
    currentRangeDuration: 0,
    currentDuration: '',
    duration: '',
  };

  videoDetails = {
    poster: 'assets/children-reading-books-white-background_1308-94746.avif',
    videoPath: 'https://gemootest.s3.us-east-2.amazonaws.com/s/res/650375741060538368/39869a6d1f6c2b4824621b37bfb3a474.mp4?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARLZICB6QQHKRCV7K%2F20240518%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20240518T112243Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=1f7c4dc522a6de2e74b19bf9fa3e641b7750a51e15412986d10bc5ee1703e316',
    locked: false,
    title: 'Phonics Song with TWO Words - A For Apple - ABC Alphabet Songs with Sounds for Children',
    describe: 'NEW 3D Animated Nursery Rhymes with Baby Taku from ChuChu TV Phonics Song with TWO Words - A For Apple - ABC Alphabet Songs with Sounds for Children',
    shortDescribe: '',
    fullDescribe: '',
    Rating: 4.5,
    author: 'ChuChu TV',
    studentEnrolledCount: 150
  }

  recieverDetails: any = {
    _id: 1,
    profile: 'assets/user.png'
  }
  messages: any[] = []
  message: string = 'Could you please assist me learn!'

  tabs: any[] = [
    { title: 'Lesson', isactive: true, icon: '&#xf518;' },
    { title: 'Chat', isactive: false, icon: '&#xf4ad;' },
    { title: 'Mentor', isactive: false, icon: '&#xf007;' },
  ]

  playlists: any[] = [
    { topic: 'Introduction', time: '0.40', timeTitle: '0h 30min', isactive: true, locked: false },
    { topic: 'Getting Started', time: '1.28', timeTitle: '1h 10min', isactive: false, locked: false },
    { topic: 'Learn Figma', time: '3.9', timeTitle: '2h 20min', isactive: false, locked: true },
  ]


  ngOnInit(): void {
    this.videoDetails.shortDescribe = this.truncateDescription(this.videoDetails.describe, 61);
  }

  activetab: string = "Lesson"
  activePlaylist: string = "Introduction"

  activateTab(tab: any) {
    this.activetab = tab.title
    if (tab.title != 'Chat') {
      return
    }
    this.messages = []
    const chat1 = {
      roomId: 1,
      sender: this.recieverDetails._id,
      receiver: this.recieverDetails._id,
      messageText: 'How can I help you?',
      sentAt: Date(),
      lastSeen: '',
      lastMessage: '',
      token: 1
    }
    const chat2 = {
      roomId: 1,
      sender: '',
      receiver: this.recieverDetails._id,
      messageText: 'Could you please assist me learn!',
      sentAt: Date(),
      lastSeen: '',
      lastMessage: '',
      token: 1
    }
    this.message = ""
    this.messages.push(chat1,chat2)
  }

  activatePlaylist(playlists: any) {
    if (playlists.locked) {
      return
    }
    this.playlists.map(obj => {
      obj.isactive = false
      if (obj.topic == playlists.topic) {
        this.activePlaylist = playlists.topic
        obj.isactive = true
      }
      return obj
    })
  }

  private getContentElement(): HTMLVideoElement | null {
    return document.querySelector<HTMLVideoElement>('#classContent');
  }

  checkContentLoaded() {
    this.contentLoaded = true;
    const content = this.getContentElement();
    if (content) {
      if (content.paused) {
        this.contentControls.playContent = true;
      } else {
        this.contentControls.playContent = false;
      }
      this.contentControls.Rangeduration = content.duration;
      this.contentControls.duration = this.formatTime(content.duration);
    }
  }

  checkContinuousContentduration() {
    const content = this.getContentElement();
    if (content) {
      this.contentControls.currentRangeDuration = parseInt(
        content.currentTime.toFixed(2)
      );
      this.contentControls.currentDuration = this.formatTime(
        content.currentTime.toFixed(2)
      );
      this.videoPlaying = true
      if (content.paused) {
        this.contentControls.playContent = true;
      } else {
        this.contentControls.playContent = false;
      }
    }
  }

  formatTime(duration: any) {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    let formattedDuration = '';

    if (hours > 0) {
      formattedDuration += `${hours}:`;
    }

    if (minutes < 10) {
      formattedDuration += `0${minutes}:`;
    } else {
      formattedDuration += `${minutes}:`;
    }

    if (seconds < 10) {
      formattedDuration += `0${Math.floor(seconds)}`;
    } else {
      formattedDuration += `${Math.floor(seconds)}`;
    }

    return formattedDuration;
  }

  pinFormatter(value: number) {
    return value ? `${value}` : '0';
  }

  playPauseContent() {
    if (!this.contentLoaded) {
      return;
    }

    const content = this.getContentElement();

    if (content) {
      if (content.paused) {
        content.play();
        this.contentControls.playContent = false;
      } else {
        content.pause();
        this.contentControls.playContent = true;
      }
    }
  }

  skipContent(delta: number) {
    const content = this.getContentElement();
    if (content) {
      content.currentTime += delta;
      this.contentControls.currentRangeDuration = content.currentTime;
    }
  }


  skipLesson(delta: any) {
    if (delta.locked) {
      return
    }
    const content = this.getContentElement();
    if (content) {
      const deltaValue = parseFloat(delta.time);
      content.currentTime = deltaValue;
      this.contentControls.currentRangeDuration = deltaValue;
    }
  }


  rewindContent(delta: number) {
    const content = this.getContentElement();
    if (content) {
      content.currentTime -= delta;
      this.contentControls.currentRangeDuration = content.currentTime;
    }
  }

  restartContent() {
    const content = this.getContentElement();
    if (content) {
      content.currentTime = 0;
      this.contentControls.currentRangeDuration = content.currentTime;
    }
  }

  convertTime(timeString: any) {
    let hours, minutes, seconds;

    if (timeString.indexOf(":") < 2) {
      // ":" appears before the first digit, it represents hours
      [hours, minutes] = timeString.split(":");
      seconds = 0;
    } else {
      // ":" appears after the first digit, it represents minutes
      hours = 0;
      [minutes, seconds] = timeString.split(":");
    }

    if (hours && hours !== "0") {
      return `${parseInt(hours)}h ${parseInt(minutes)}min ${parseInt(seconds)}sec`;
    } else {
      return `${parseInt(minutes)}min ${parseInt(seconds)}sec`;
    }
  }

  truncateDescription(description: string, maxLength: number): string {
    if (description.length <= maxLength) {
      return description;
    } else {
      // Find the last space within the maxLength
      let truncatedDescription = description.substring(0, maxLength);
      const lastSpaceIndex = truncatedDescription.lastIndexOf(' ');

      // Truncate at the last space and append ellipsis
      truncatedDescription = truncatedDescription.substring(0, lastSpaceIndex) + '...';
      return truncatedDescription;
    }
  }

  filterDateTime(dateString: string): string {
    const date = new Date(dateString);
    const options: any = { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleDateString(undefined, options);
  }

  async sendMessage() {
    if (this.messages.length == 2) {
      return
    }
    if (!this.message) {
      return
    }
    try {
      const chat = {
        roomId: 1,
        sender: '',
        receiver: this.recieverDetails._id,
        messageText: this.message,
        sentAt: Date(),
        lastSeen: '',
        lastMessage: '',
        token: 1
      }
      this.message = ""
      this.messages.push(chat)

    }
    catch (err) {

    }
  }
  togglereadMoreDescribe() {
    this.readMore = !this.readMore
  }
}
