import { TestBed } from '@angular/core/testing';

import { PageStatusService } from './page-status.service';

describe('PageStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageStatusService = TestBed.get(PageStatusService);
    expect(service).toBeTruthy();
  });
});
