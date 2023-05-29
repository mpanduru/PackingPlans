import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TagService} from './tag.service';

describe('TagService', () => {
  let service: TagService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TagService]
    });
    service = TestBed.inject(TagService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all tags', () => {
    const mockTags = [{id: 1, name: 'tag1'}, {id: 2, name: 'tag2'}];

    service.getAllTags().subscribe((tags) => {
      expect(tags).toEqual(mockTags);
    });

    const req = httpMock.expectOne('http://localhost:8081/api/rest/tags/all');
    expect(req.request.method).toBe('GET');
    req.flush(mockTags);
  });
});
