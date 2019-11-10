import { Time } from '@angular/common';

export interface VideoModel {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
    genre: string[];
    releaseDate: string //TODO: format this to Date;
    imdbLink: string;
    duration: string //TODO: format this to Time;
    country: string;
}