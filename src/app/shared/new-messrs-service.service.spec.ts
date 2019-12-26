import { TestBed } from '@angular/core/testing';

import { NewMessrsServiceService } from './new-messrs-service.service';

describe('NewMessrsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewMessrsServiceService = TestBed.get(NewMessrsServiceService);
    expect(service).toBeTruthy();
  });
});
