import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {LocationService} from './location.service';

describe('LocationService', () => {
  let locationService: LocationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocationService]
    });

    locationService = TestBed.inject(LocationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve all locations', () => {
    const mockLocations = [{id: 1, name: 'Location 1'}, {id: 2, name: 'Location 2'}];

    locationService.getAllLocations().subscribe(response => {
      expect(response).toEqual(mockLocations);
    });

    const req = httpTestingController.expectOne('http://localhost:8081/api/rest/locations/all');
    expect(req.request.method).toBe('GET');

    req.flush(mockLocations);
  });

  it('should retrieve a location by ID', () => {
    const locationId = 1;
    const mockLocation = {id: locationId, name: 'Location 1'};

    locationService.getLocationById(locationId).subscribe(response => {
      expect(response).toEqual(mockLocation);
    });

    const req = httpTestingController.expectOne('http://localhost:8081/api/rest/locations/' + locationId);
    expect(req.request.method).toBe('GET');

    req.flush(mockLocation);
  });

  it('should retrieve a location by name', () => {
    const locationName = 'Location 1';
    const mockLocation = {id: 1, name: locationName};

    locationService.getLocationByName(locationName).subscribe(response => {
      expect(response).toEqual(mockLocation);
    });

    const req = httpTestingController.expectOne('http://localhost:8081/api/rest/locations/name/' + locationName);
    expect(req.request.method).toBe('GET');

    req.flush(mockLocation);
  });
});
