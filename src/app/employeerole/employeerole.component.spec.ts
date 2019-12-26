import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeroleComponent } from './employeerole.component';

describe('EmployeeroleComponent', () => {
  let component: EmployeeroleComponent;
  let fixture: ComponentFixture<EmployeeroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
