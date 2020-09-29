import { TestBed } from '@angular/core/testing';

import { NavigationDetectionService } from './navigation-detection.service';

describe('NavigationDetectionService', () => {
  let service: NavigationDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
