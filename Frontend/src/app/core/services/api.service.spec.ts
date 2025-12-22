import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const BASE_URL = '/api'; // підстав своє environment.apiUrl

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [ApiService, provideHttpClientTesting()],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // перевіряємо, що всі запити завершені
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET', () => {
    const mockData = { success: true };

    service.get('test-endpoint').subscribe(res => {
      expect(res).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${BASE_URL}/test-endpoint`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should call GET by ID', () => {
    const mockData = { id: 1, name: 'Test' };

    service.getById('test-endpoint', 1).subscribe(res => {
      expect(res).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${BASE_URL}/test-endpoint/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should call GET by slug', () => {
    const mockData = { id: 1, slug: 'slug-test' };

    service.getBySlug('test-endpoint', 'slug-test').subscribe(res => {
      expect(res).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${BASE_URL}/test-endpoint/slug-test`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should call POST', () => {
    const payload = { name: 'New' };
    const mockResponse = { id: 123, ...payload };

    service.post('test-endpoint', payload).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${BASE_URL}/test-endpoint`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(mockResponse);
  });

  it('should call PUT', () => {
    const payload = { name: 'Updated' };
    const mockResponse = { id: 1, ...payload };

    service.put('test-endpoint', 1, payload).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${BASE_URL}/test-endpoint/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(payload);
    req.flush(mockResponse);
  });

  it('should call PATCH', () => {
    const payload = { name: 'Patched' };
    const mockResponse = { id: 1, ...payload };

    service.patch('test-endpoint', 1, payload).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${BASE_URL}/test-endpoint/1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(payload);
    req.flush(mockResponse);
  });

  it('should call DELETE', () => {
    const mockResponse = { success: true };

    service.delete('test-endpoint', 1).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${BASE_URL}/test-endpoint/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('should upload a file', () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const mockResponse = { success: true };

    service.uploadFile('media/upload', file).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${BASE_URL}/media/upload`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.has('file')).toBeTrue();
    req.flush(mockResponse);
  });
});
