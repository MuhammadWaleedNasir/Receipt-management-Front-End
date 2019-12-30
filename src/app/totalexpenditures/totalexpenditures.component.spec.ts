import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalexpendituresComponent } from './totalexpenditures.component';

describe('TotalexpendituresComponent', () => {
  let component: TotalexpendituresComponent;
  let fixture: ComponentFixture<TotalexpendituresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalexpendituresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalexpendituresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
