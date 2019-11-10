
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
 

@Injectable()
export class VideoApiService {
    
    private movieUrl = 'https://api.themoviedb.org/3/search/movie'
    private apiKey = '1c5abaaeaa13c66b570ad3042a0d51f4';

    constructor(private _httpClient: HttpClient ) { }

    getVideos(searchText: string, page: number) {
        let searchUrl = `${this.movieUrl}?api_key=${this.apiKey}&query=${searchText}&page=${page}`
        return this._httpClient.get(searchUrl)
            .pipe(
                map((res) => { return res })
            );
    }

    //TODO: finish this
    private handleError(error: HttpErrorResponse) {
        console.error(error)
        let customError: string = ''
        if (error.error) {
            customError = error.status === 400 ? error.error : error.statusText
        }

        return throwError(customError || 'Server Error')
    }
}