import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Time} from "@angular/common";

const API_URL = 'http://localhost:8081/api/rest/activities/';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(private http: HttpClient) {
  }

  addActivity(name: string | null, description: string | null, startTime: Time | null, day: Date | null, tripId: number | null): Observable<any> {
    return this.http.post(API_URL + 'new', {
      name: name,
      description: description,
      startTime: startTime,
      day: day,
      tripId: tripId
    });
  }

  editActivity(id: number, name: string | undefined, description: string | null, startTime: Time | null, day: Date | null, tripId: number | null): Observable<any> {
    return this.http.put(API_URL + id, {
      name: name,
      description: description,
      startTime: startTime,
      day: day,
      tripId: tripId
    })
  }
}
