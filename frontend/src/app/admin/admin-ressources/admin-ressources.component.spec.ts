import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRessourcesComponent } from './admin-ressources.component';

describe('AdminRessourcesComponent', () => {
  let component: AdminRessourcesComponent;
  let fixture: ComponentFixture<AdminRessourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRessourcesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRessourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
