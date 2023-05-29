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

  addTrip(startDate: string | null, endDate: string | null, locationName: string | undefined): Observable<any> {
    return this.http.post(API_URL + 'new', {startDate: startDate, endDate: endDate, locationName: locationName});
  }

  getAllTrips(): Observable<any> {
    return this.http.get(API_URL + 'all');
  }

  getTripActivities(tripId: number): Observable<any> {
    return this.http.get(API_URL + 'activities/' + tripId);
  }

  deleteTrip(tripId: number): Observable<any> {
    return this.http.delete(API_URL + tripId);
  }

  editTrip(tripId: number, startDate: string | null, endDate: string | null, locationName: string | undefined): Observable<any> {
    return this.http.put(API_URL + tripId, {
      startDate: startDate,
      endDate: endDate,
      locationName: locationName
    })
  }

  addUserToTrip(tripId: number, userId: number): Observable<any> {
    return this.http.post(API_URL + tripId + '/user/' + userId, {});
  }

  getTripById(tripId: number): Observable<any> {
    return this.http.get(API_URL + tripId);
  }
}
