import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8081/api/rest/locations/';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {
  }

  getAllLocations(): Observable<any> {
    return this.http.get(API_URL + 'all', {responseType: 'json'});
  }

  getLocationById(id: number): Observable<any> {
    return this.http.get(API_URL + id, {responseType: 'json'});
  }
}
