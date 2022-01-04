import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesdropdownComponent } from './rolesdropdown.component';

describe('RolesdropdownComponent', () => {
  let component: RolesdropdownComponent;
  let fixture: ComponentFixture<RolesdropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesdropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesdropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
