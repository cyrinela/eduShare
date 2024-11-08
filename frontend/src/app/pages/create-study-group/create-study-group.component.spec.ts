import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStudyGroupComponent } from './create-study-group.component';

describe('CreateStudyGroupComponent', () => {
  let component: CreateStudyGroupComponent;
  let fixture: ComponentFixture<CreateStudyGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStudyGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStudyGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
