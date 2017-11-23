import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricalCreateComponent } from './electrical-create.component';

describe('ElectricalCreateComponent', () => {
  let component: ElectricalCreateComponent;
  let fixture: ComponentFixture<ElectricalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
