import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseAddressComponent } from './house-address.component';

describe('HouseAddressComponent', () => {
  let component: HouseAddressComponent;
  let fixture: ComponentFixture<HouseAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
