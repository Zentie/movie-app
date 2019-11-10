import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VideoDialogComponent } from '../video-dialog/video-dialog.component';
import { VideoApiService } from '../api-services/video-api.service';

@Component({
  selector: 'app-video-results',
  templateUrl: './video-results.component.html',
  styleUrls: ['./video-results.component.scss']
})
export class VideoResultsComponent implements OnInit {


  constructor(
    public dialog: MatDialog,
    private videoService: VideoApiService
  ) { 
    
  }

  ngOnInit() {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VideoDialogComponent, {
      width: '700px',
      data: ''
    });

    console.log('The dialog was opened');

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
 
}
