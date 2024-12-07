import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GittestComponent } from './gittest.component';

describe('GittestComponent', () => {
  let component: GittestComponent;
  let fixture: ComponentFixture<GittestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GittestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GittestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
