import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getByTitle(search: string) {
    return this.http.get(environment.apiUrl + 's=' + search);
  }

  getById(id: string) {
    return this.http.get(environment.apiUrl + 'i=' + id);
  }

  setLocalData(data: string): {result: string, error: string} {
    if (typeof localStorage === 'undefined') {
      return {result: 'error', error: 'Local storage is not defined'};
    }

    localStorage.setItem('myMovies', data);

    if (localStorage.getItem('myMovies') !== null) {
      return {result: 'success', error: ''};
    }
    else {
      return {result: 'error', error: 'You can\'t save the movie'};
    }
  }

  getLocalData(): {result: string, data: string, error: string} {
    if (typeof localStorage === 'undefined') {
      return {result: 'error', data: '', error: 'Local storage is not defined'};
    }

    const localData = localStorage.getItem('myMovies');

    return (localData !== null)
      ? {result: 'success', data: localData, error: ''}
      : {result: 'error', data: '', error: 'Local data is empty'};
  }
}
