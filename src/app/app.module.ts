import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpService} from './http.service';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { MyMoviesComponent } from './my-movies/my-movies.component';

const appRoutes: Routes = [
  { path: '', component: SearchComponent},
  { path: 'movie-info/:id', component: MovieInfoComponent},
  { path: 'my-movies', component: MyMoviesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MovieInfoComponent,
    MyMoviesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
