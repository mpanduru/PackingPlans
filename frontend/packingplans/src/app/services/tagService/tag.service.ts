import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8081/api/rest/tags/';
@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http:HttpClient) { }

  getAllTags(): Observable<any> {
    return this.http.get(API_URL + 'all', {responseType: 'json'});
  }
}
