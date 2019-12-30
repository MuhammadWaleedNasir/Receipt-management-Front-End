import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchnoComponent } from './dispatchno.component';

describe('DispatchnoComponent', () => {
  let component: DispatchnoComponent;
  let fixture: ComponentFixture<DispatchnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
