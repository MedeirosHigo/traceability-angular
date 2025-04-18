import { TestBed } from '@angular/core/testing';

import { ExtractElementsTextService } from './extract-elements-text.service';

describe('ExtractElementsTextService', () => {
  let service: ExtractElementsTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtractElementsTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
