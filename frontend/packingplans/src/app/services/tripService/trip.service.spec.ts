import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TripService} from './trip.service';

describe('TripService', () => {
  let service: TripService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TripService]
    });

    service = TestBed.inject(TripService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all trips from the API', () => {
    const mockTrips = [
      {id: 1, startDate: '2023-06-01', endDate: '2023-06-05', locationName: 'New York'},
      {id: 2, startDate: '2023-07-10', endDate: '2023-07-15', locationName: 'Paris'}
    ];

    service.getAllTrips().subscribe(trips => {
      expect(trips).toEqual(mockTrips);
    });

    const req = httpMock.expectOne('http://localhost:8081/api/rest/trips/all');
    expect(req.request.method).toBe('GET');
    req.flush(mockTrips);
  });

  it('should add a new trip via the API', () => {
    const startDate = '2023-08-01';
    const endDate = '2023-08-07';
    const locationName = 'London';

    service.addTrip(startDate, endDate, locationName).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:8081/api/rest/trips/new');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({startDate, endDate, locationName});
    req.flush({});
  });

  // Add more test cases for other methods in the TripService
});
