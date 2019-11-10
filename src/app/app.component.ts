import { Component} from '@angular/core';
import { VideoSearchComponent } from './video-search/video-search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movie-app';

  videoSearchResults: any;

  recieveVideoSearchResults(results) {
    this.videoSearchResults = results;
    console.log('videoSearchResults', this.videoSearchResults)
  }

}
