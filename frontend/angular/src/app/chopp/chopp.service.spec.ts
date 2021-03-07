import { TestBed } from '@angular/core/testing';

import { ChoppService } from './chopp.service';

describe('ChoppService', () => {
  let service: ChoppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChoppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
