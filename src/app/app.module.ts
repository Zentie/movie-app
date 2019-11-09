import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoSearchComponent } from './video-search/video-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideoResultsComponent } from './video-results/video-results.component';
import { VideoDialogComponent } from './video-dialog/video-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoSearchComponent,
    VideoResultsComponent,
    VideoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
