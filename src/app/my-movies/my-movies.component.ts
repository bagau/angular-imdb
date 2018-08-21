import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.css']
})
export class MyMoviesComponent implements OnInit {
  movies = [];

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.getMyMovies();
  }

  getMyMovies(): void {
    const localData = this.httpService.getLocalData();
    let myMovies;

    if (localData.result === 'success') {
      try {
        myMovies = JSON.parse(localData.data);
      } catch(e) {}
    }

    this.movies = Array.isArray(myMovies) ? myMovies : [];
  }

  removeMovie(id: string): void {
    let tempArray = this.movies;

    tempArray.forEach(function(value, index) {
      if (value.imdbID === id) {
        tempArray.splice(index, 1);
      }
    });

    this.movies = tempArray;

    const jsonString = JSON.stringify(this.movies),
          result = this.httpService.setLocalData(jsonString);

    if (result.result === 'error') {
      alert('Deleting has error');
    }
  }
}
