import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanditsComponent } from './pandits.component';

describe('PanditsComponent', () => {
  let component: PanditsComponent;
  let fixture: ComponentFixture<PanditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
