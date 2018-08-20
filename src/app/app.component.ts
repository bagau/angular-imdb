import { Component, OnInit } from '@angular/core';
import { HttpService} from './http.service';
import { Movie } from './movie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})
export class AppComponent implements OnInit {
  title: string;
  movie: Movie;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    //this.httpService.getData('insider').subscribe((data: Movie) => this.movie = data);
  }

  searchMovie() {
    console.log(this.title);
    if (this.title !== '') {
      this.httpService.getData(this.title).subscribe((data: Movie) => this.movie = data);
    }
  }
}
