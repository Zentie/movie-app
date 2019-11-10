import { VideoModel } from './model/video.model';
import { Component} from '@angular/core';
import { VideoSearchComponent } from './video-search/video-search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movie-app';

  videoSearchResults: VideoModel[];

  recieveVideoSearchResults(videos: VideoModel[]) {
    this.videoSearchResults = videos;
  }
}
