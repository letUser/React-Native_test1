import {MovieParams} from '@interfaces/api';

export default class Movie {
  readonly id: number;
  readonly key: string;
  readonly duration: string | undefined;
  readonly posterUrl: string | undefined;
  readonly rating: string | undefined;
  readonly title: string;
  readonly year: string | undefined;

  constructor(origin: MovieParams) {
    this.id = origin.id;
    this.key = origin.id.toString();
    this.duration = origin.duration;
    this.posterUrl = origin.posterUrl;
    this.rating = origin.rating;
    this.title = origin.title;
    this.year = origin.year;
  }
}
