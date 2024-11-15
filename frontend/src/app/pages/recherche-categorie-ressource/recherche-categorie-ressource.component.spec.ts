import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheCategorieRessourceComponent } from './recherche-categorie-ressource.component';

describe('RechercheCategorieRessourceComponent', () => {
  let component: RechercheCategorieRessourceComponent;
  let fixture: ComponentFixture<RechercheCategorieRessourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheCategorieRessourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheCategorieRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
