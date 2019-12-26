import { TestBed } from '@angular/core/testing';

import { EmployeeroleServiceService } from './employeerole-service.service';

describe('EmployeeroleServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeroleServiceService = TestBed.get(EmployeeroleServiceService);
    expect(service).toBeTruthy();
  });
});
