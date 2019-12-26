import { TestBed } from '@angular/core/testing';

import { HouseaddressService } from './houseaddress.service';

describe('HouseaddressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HouseaddressService = TestBed.get(HouseaddressService);
    expect(service).toBeTruthy();
  });
});
