import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMessrsComponent } from './new-messrs.component';

describe('NewMessrsComponent', () => {
  let component: NewMessrsComponent;
  let fixture: ComponentFixture<NewMessrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMessrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMessrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
