import { TestBed } from '@angular/core/testing';

import { SearchProductsService } from './search-products.service';

describe('SearchProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchProductsService = TestBed.get(SearchProductsService);
    expect(service).toBeTruthy();
  });
});
