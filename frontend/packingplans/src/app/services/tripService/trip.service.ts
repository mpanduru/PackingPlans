import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8081/api/rest/trips/';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) {
  }

  addTrip(startDate: string | null, endDate: string | null, locationName: string): Observable<any> {
    return this.http.post(API_URL + 'new', {startDate: startDate, endDate: endDate, locationName: locationName});
  }
}
