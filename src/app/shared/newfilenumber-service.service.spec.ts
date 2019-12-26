import { TestBed } from '@angular/core/testing';

import { NewfilenumberServiceService } from './newfilenumber-service.service';

describe('NewfilenumberServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewfilenumberServiceService = TestBed.get(NewfilenumberServiceService);
    expect(service).toBeTruthy();
  });
});
