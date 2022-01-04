import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatearticlemodalComponent } from './updatearticlemodal.component';

describe('UpdatearticlemodalComponent', () => {
  let component: UpdatearticlemodalComponent;
  let fixture: ComponentFixture<UpdatearticlemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatearticlemodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatearticlemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
