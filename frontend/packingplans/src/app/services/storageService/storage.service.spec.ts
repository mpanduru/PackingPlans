import {TestBed} from '@angular/core/testing';
import {StorageService} from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
    service = TestBed.inject(StorageService);
  });

  it('should save user to session storage', () => {
    const user = {id: 1, name: 'John'};
    service.saveUser(user);
    const storedUser = JSON.parse(sessionStorage.getItem('auth-user') || '');
    expect(storedUser).toEqual(user);
  });

  it('should retrieve user from session storage', () => {
    const user = {id: 1, name: 'John'};
    sessionStorage.setItem('auth-user', JSON.stringify(user));
    const retrievedUser = service.getUser();
    expect(retrievedUser).toEqual(user);
  });

  it('should return true if user is logged in', () => {
    const user = {id: 1, name: 'John'};
    sessionStorage.setItem('auth-user', JSON.stringify(user));
    const isLoggedIn = service.isLoggedIn();
    expect(isLoggedIn).toBe(true);
  });

  it('should return false if user is not logged in', () => {
    sessionStorage.removeItem('auth-user');
    const isLoggedIn = service.isLoggedIn();
    expect(isLoggedIn).toBe(false);
  });

  it('should clean session storage', () => {
    sessionStorage.setItem('auth-user', 'dummy-value');
    service.clean();
    const storedUser = sessionStorage.getItem('auth-user');
    expect(storedUser).toBeNull();
  });
});
