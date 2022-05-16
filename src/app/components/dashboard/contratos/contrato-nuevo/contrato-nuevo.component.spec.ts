import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoNuevoComponent } from './contrato-nuevo.component';

describe('ContratoNuevoComponent', () => {
  let component: ContratoNuevoComponent;
  let fixture: ComponentFixture<ContratoNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratoNuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
