import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricalsComponent } from './electricals.component';

describe('ElectricalsComponent', () => {
  let component: ElectricalsComponent;
  let fixture: ComponentFixture<ElectricalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
