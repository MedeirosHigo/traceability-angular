import { TestBed } from '@angular/core/testing';

import { ExtractTextService } from './extract-text.service';

describe('ExtractTextService', () => {
  let service: ExtractTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtractTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
