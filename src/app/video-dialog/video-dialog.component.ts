import { VideoModel } from './../model/video.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VideoApiService } from '../api-services/video-api.service';

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.scss']
})
export class VideoDialogComponent implements OnInit {

  constructor (
    public dialogRef: MatDialogRef<VideoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public video: VideoModel,
    private videoService: VideoApiService
  ) {}

  ngOnInit() {
    this.getVideo()
  }

  getVideo() {
    this.videoService.getVideoById(this.video.id).subscribe( videoResult => {
      this.video.imdbLink = this.video.imdbLink + videoResult.imdb_id
      this.video.country = this.getCountries(videoResult.production_countries)
      this.video.duration = videoResult.runtime
    })
  }

  getCountries(videoResultProductionCountries) {
    let countries: string[] = []
    videoResultProductionCountries.forEach(country => {
      countries.push(country.name)
    });
    return countries
  }

}
