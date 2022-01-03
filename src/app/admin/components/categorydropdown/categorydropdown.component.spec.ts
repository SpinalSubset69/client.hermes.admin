import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorydropdownComponent } from './categorydropdown.component';

describe('CategorydropdownComponent', () => {
  let component: CategorydropdownComponent;
  let fixture: ComponentFixture<CategorydropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorydropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorydropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
