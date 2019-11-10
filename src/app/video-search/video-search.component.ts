import { Component, OnInit } from '@angular/core';
import { VideoApiService } from '../api-services/video-api.service';

@Component({
  selector: 'app-video-search',
  templateUrl: './video-search.component.html',
  styleUrls: ['./video-search.component.scss']
})
export class VideoSearchComponent implements OnInit {

  videoSearchResults: any
  searchInput: string
  resultPage: number = 1;

  constructor(
    private videoService: VideoApiService
  ) { 
    
  }

  ngOnInit() {
    this.videoService.getVideos('mad', 3).subscribe(res => {
      this.videoSearchResults = res
      this.videoSearchResults = this.videoSearchResults.results
      console.log("result ", this.videoSearchResults)
    })
  }

  onSearchInput(searchInput: string) {

    if (searchInput.length >= 3) {
      this.searchInput = searchInput
      this.searchForVideos(this.searchInput, this.resultPage)
    }
  }
  
  searchForVideos(searchInput: string, page: number) {
    this.videoService.getVideos(searchInput, page).subscribe(res => {
      this.videoSearchResults = res
      this.videoSearchResults = this.videoSearchResults.results
      console.log("result ", this.videoSearchResults)
    })
  }
}
