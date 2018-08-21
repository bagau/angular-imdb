import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { Movies } from "../movies";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchInput = '';
  movies: Movies;
  savedMovies = [];

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.addIdsToArray();
  }

  searchMovies() {
    if (this.searchInput !== '') {
      this.httpService.getByTitle(this.searchInput).subscribe((data: Movies) => this.movies = data);
    }
  }

  addIdsToArray() {
    let myMovies = this.parseLocalData(), _savedMovies = [];

    // заполним массив уже добавленных фильмов, чтобы кнопка добавления не отображалась в списке
    myMovies.forEach(function(value, index) {
      _savedMovies.push(value.imdbID);
    });

    this.savedMovies = _savedMovies;
  }

  addMovie(item) {
    let myMovies = this.parseLocalData();

    // чтобы избежать повторного добавления
    myMovies.forEach(function(value, index) {
      if (value.imdbID === item.imdbID) {
        return false;
      }
    });

    myMovies.push(item);
    this.savedMovies.push(item.imdbID);

    const result = this.httpService.setLocalData(
      JSON.stringify(myMovies)
    );

    if (result.result === 'error') {
      alert(result.error);
    }
  }

  isSaved(id: string): boolean {
    return this.savedMovies.indexOf(id) === -1;
  }

  parseLocalData(): any[] {
    const localData = this.httpService.getLocalData();
    let localArray;

    if (localData.result === 'success') {
      try {
        localArray = JSON.parse(localData.data);
      } catch(e) {}
    }

    return Array.isArray(localArray) ? localArray : [];
  }
}
