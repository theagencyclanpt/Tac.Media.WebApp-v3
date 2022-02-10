import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasEngineComponent } from './canvas-engine.component';

describe('CanvasEngineComponent', () => {
  let component: CanvasEngineComponent;
  let fixture: ComponentFixture<CanvasEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasEngineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
