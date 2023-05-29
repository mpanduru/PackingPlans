import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ActivityService} from './activity.service';

describe('ActivityService', () => {
  let activityService: ActivityService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActivityService]
    });

    activityService = TestBed.inject(ActivityService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add a new activity', () => {
    const name = 'Activity 1';
    const description = 'Activity description';
    const startTime: any = '13:50';
    const day = new Date();
    const tripId = 12;

    activityService.addActivity(name, description, startTime, day, tripId).subscribe(response => {
      expect(response).toBeDefined();
    });

    const req = httpTestingController.expectOne('http://localhost:8081/api/rest/activities/new');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({name, description, startTime, day, tripId});

    const mockResponse = { /* mock response data */};
    req.flush(mockResponse);
  });

  it('should edit an activity', () => {
    const id = 123;
    const name = 'Updated Activity';
    const description = 'Updated description';
    const startTime: any = '14:50';
    const day = new Date();
    const tripId = 456;

    activityService.editActivity(id, name, description, startTime, day, tripId).subscribe(response => {
      expect(response).toBeDefined();
      // Add more expectations as needed
    });

    const req = httpTestingController.expectOne('http://localhost:8081/api/rest/activities/' + id);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({name, description, startTime, day, tripId});

    const mockResponse = { /* mock response data */};
    req.flush(mockResponse);
  });

  it('should delete an activity', () => {
    const id = 123;

    activityService.deleteActivity(id).subscribe(response => {
      expect(response).toBeDefined();
      // Add more expectations as needed
    });

    const req = httpTestingController.expectOne('http://localhost:8081/api/rest/activities/' + id);
    expect(req.request.method).toBe('DELETE');

    const mockResponse = { /* mock response data */};
    req.flush(mockResponse);
  });
});
