import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { HttpService } from "../http.service";
import { Subscription } from "rxjs/index";
import {Movie} from "../movie";

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {
  private id: string;
  private subscription: Subscription;
  movie: Movie;

  constructor (private activateRoute: ActivatedRoute, private httpService: HttpService) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit() {
    this.httpService.getById(this.id).subscribe((data: Movie) => this.movie = data);
  }
}
