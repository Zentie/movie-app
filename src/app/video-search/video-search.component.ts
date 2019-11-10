import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VideoApiService } from '../api-services/video-api.service';

@Component({
  selector: 'app-video-search',
  templateUrl: './video-search.component.html',
  styleUrls: ['./video-search.component.scss']
})
export class VideoSearchComponent implements OnInit {

  videoSearchResults: any
  searchInput: string = ''
  resultPage: number = 1
  @Output() videoSearchResultsEmitter = new EventEmitter<any[]>();

  constructor(
    private videoService: VideoApiService
  ) { 
    
  }

  ngOnInit() {

  }

  sendVideoSearchResults(results) {
    this.videoSearchResultsEmitter.emit(results);
  }

  clearSerach() {
    this.searchInput = '';
    this.onSearchInput(this.searchInput)
  }

  onSearchInput(searchInput: string) {
    if (searchInput.length >= 3) {
      this.searchInput = searchInput
      this.searchForVideos(this.searchInput, this.resultPage)
    } else {
      this.videoSearchResults = [];
      this.sendVideoSearchResults(this.videoSearchResults)
    }
  }

  updateResultsImageUrl(results) {
    results.forEach(result => {
      result.backdrop_path = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + result.backdrop_path
    });
    return results
  }
  
  searchForVideos(searchInput: string, page: number) {
    this.videoService.getVideos(searchInput, page).subscribe(res => {
      this.videoSearchResults = res
      this.videoSearchResults = this.videoSearchResults.results
      this.videoSearchResults = this.updateResultsImageUrl(this.videoSearchResults)
      this.sendVideoSearchResults(this.videoSearchResults)
    })
  }
}
