import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should register a new user', () => {
    const fullname = 'John Doe';
    const username = 'johndoe';
    const email = 'johndoe@example.com';
    const password = 'password';

    authService.register(fullname, username, email, password).subscribe(response => {
      expect(response).toBeDefined();
      // Add more expectations as needed
    });

    const req = httpTestingController.expectOne('http://localhost:8081/api/auth/signup');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({fullname, username, email, password});

    const mockResponse = { /* mock response data */};
    req.flush(mockResponse);
  });

  it('should log in a user', () => {
    const username = 'johndoe';
    const password = 'password';

    authService.login(username, password).subscribe(response => {
      expect(response).toBeDefined();
      // Add more expectations as needed
    });

    const req = httpTestingController.expectOne('http://localhost:8081/api/auth/signin');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({username, password});

    const mockResponse = { /* mock response data */};
    req.flush(mockResponse);
  });

  it('should log out a user', () => {
    authService.logout().subscribe(response => {
      expect(response).toBeDefined();
      // Add more expectations as needed
    });

    const req = httpTestingController.expectOne('http://localhost:8081/api/auth/signout');
    expect(req.request.method).toBe('POST');

    const mockResponse = { /* mock response data */};
    req.flush(mockResponse);
  });

  it('should get all users', () => {
    authService.getAllUsers().subscribe(response => {
      expect(response).toBeDefined();
      // Add more expectations as needed
    });

    const req = httpTestingController.expectOne('http://localhost:8081/api/auth/users');
    expect(req.request.method).toBe('GET');

    const mockResponse = { /* mock response data */};
    req.flush(mockResponse);
  });
});
