import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarynoComponent } from './diaryno.component';

describe('DiarynoComponent', () => {
  let component: DiarynoComponent;
  let fixture: ComponentFixture<DiarynoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiarynoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiarynoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
