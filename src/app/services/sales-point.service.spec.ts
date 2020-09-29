import { TestBed } from '@angular/core/testing';

import { SalesPointService } from './sales-point.service';

describe('SalesPointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesPointService = TestBed.get(SalesPointService);
    expect(service).toBeTruthy();
  });
});
