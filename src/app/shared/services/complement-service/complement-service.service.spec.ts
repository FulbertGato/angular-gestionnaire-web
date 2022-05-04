import { TestBed } from '@angular/core/testing';

import { ComplementServiceService } from './complement-service.service';

describe('ComplementServiceService', () => {
  let service: ComplementServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplementServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
