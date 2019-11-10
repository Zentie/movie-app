import { VideoModel } from './../model/video.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VideoApiService } from '../api-services/video-api.service';
import { GenreModel } from '../model/genre.model';

@Component({
  selector: 'app-video-search',
  templateUrl: './video-search.component.html',
  styleUrls: ['./video-search.component.scss']
})
export class VideoSearchComponent implements OnInit {


  genres: GenreModel[];
  videoSearchResults: VideoModel[]
  searchInput: string = ''
  resultPage: number = 1
  @Output() videoSearchResultsEmitter = new EventEmitter<any[]>();

  constructor(
    private videoService: VideoApiService
  ) { 
    
  }

  ngOnInit() {
    this.getGenres()

  }

  getGenres() {
    this.videoService.getGenres().subscribe(res => {
      this.genres = res as GenreModel[];
    })
  }

  sendVideoSearchResults(videos: VideoModel[]) {
    this.videoSearchResultsEmitter.emit(videos);
  }

  clearSerach() {
    this.searchInput = '';
    this.onSearchInput(this.searchInput)
    this.videoSearchResults = [];
  }

  onSearchInput(searchInput: string) {
    this.videoSearchResults = [];
    searchInput.split(' ').join('&') 
    if (searchInput.length >= 3) {
      this.searchInput = searchInput
      this.searchForVideos(this.searchInput, this.resultPage)
    } else {
      this.videoSearchResults = [];
      this.sendVideoSearchResults(this.videoSearchResults)
    }
  }

  updateResultsImageUrl(videos: VideoModel[]) {
    videos.forEach(video => {
      video.imageUrl = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + video.imageUrl
    });
    return videos
  }
  
  getVideoData(videoResults: any[]) {
    videoResults.map( videoResult => {
      let video: VideoModel = {
        id: videoResult.id,
        imageUrl: videoResult.backdrop_path,
        title: videoResult.original_title,
        description: videoResult.overview,
        genre: this.assignGenres(videoResult.genre_ids),
        releaseDate: videoResult.release_date,
        imdbLink: 'https://www.imdb.com/title/',
        duration: '',
        country: []
      }
      this.videoSearchResults.push(video);
    })
  }

  assignGenres(ids: number[]) {
    let genres: string[] = []
    ids.forEach(id => {
      genres.push(this.genres.find(x => x.id === id).name)
    })
    return genres
  }

  searchForVideos(searchInput: string, page: number) {
    this.videoService.getVideos(searchInput, page).subscribe(res => {
      this.getVideoData(res);
      this.videoSearchResults = this.updateResultsImageUrl(this.videoSearchResults)
      this.sendVideoSearchResults(this.videoSearchResults)
    })
  }
}
