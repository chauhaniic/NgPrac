import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoappComponent } from './demoapp.component';

describe('DemoappComponent', () => {
  let component: DemoappComponent;
  let fixture: ComponentFixture<DemoappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
