import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempleAddComponent } from './temple-add.component';

describe('TempleAddComponent', () => {
  let component: TempleAddComponent;
  let fixture: ComponentFixture<TempleAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempleAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
