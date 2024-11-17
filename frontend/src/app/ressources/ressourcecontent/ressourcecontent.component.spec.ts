import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourcecontentComponent } from './ressourcecontent.component';

describe('RessourcecontentComponent', () => {
  let component: RessourcecontentComponent;
  let fixture: ComponentFixture<RessourcecontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RessourcecontentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RessourcecontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
