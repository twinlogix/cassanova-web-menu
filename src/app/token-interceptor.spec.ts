import { TestBed } from '@angular/core/testing';

import { HttpOptionsInterceptorService } from './token-interceptor';

describe('HttpOptionsInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpOptionsInterceptorService = TestBed.get(HttpOptionsInterceptorService);
    expect(service).toBeTruthy();
  });
});
