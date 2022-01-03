import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddreporterComponent } from './addreporter.component';

describe('AddreporterComponent', () => {
  let component: AddreporterComponent;
  let fixture: ComponentFixture<AddreporterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddreporterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddreporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
