import { TestBed } from '@angular/core/testing';

import { UrbanService } from './Urban.service';

describe('UrbanService', () => {
  let service: UrbanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrbanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
