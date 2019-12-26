import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewfilenumberComponent } from './newfilenumber.component';

describe('NewfilenumberComponent', () => {
  let component: NewfilenumberComponent;
  let fixture: ComponentFixture<NewfilenumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewfilenumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewfilenumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
