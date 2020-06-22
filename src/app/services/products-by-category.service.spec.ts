import { TestBed } from '@angular/core/testing';

import { ProductsByCategoryService } from './products-by-category.service';

describe('ProductsByCategoryService', () => {
  let service: ProductsByCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsByCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
