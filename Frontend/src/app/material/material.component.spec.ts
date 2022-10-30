import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesComponent } from './material.component';

describe('MaterialesComponent', () => {
  let component: MaterialesComponent;
  let fixture: ComponentFixture<MaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
