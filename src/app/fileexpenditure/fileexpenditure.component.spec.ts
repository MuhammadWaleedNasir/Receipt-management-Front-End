import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileexpenditureComponent } from './fileexpenditure.component';

describe('FileexpenditureComponent', () => {
  let component: FileexpenditureComponent;
  let fixture: ComponentFixture<FileexpenditureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileexpenditureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileexpenditureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
