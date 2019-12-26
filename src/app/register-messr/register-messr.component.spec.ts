import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMessrComponent } from './register-messr.component';

describe('RegisterMessrComponent', () => {
  let component: RegisterMessrComponent;
  let fixture: ComponentFixture<RegisterMessrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterMessrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMessrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
