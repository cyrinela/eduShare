import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinStudyGroupComponent } from './join-study-group.component';

describe('JoinStudyGroupComponent', () => {
  let component: JoinStudyGroupComponent;
  let fixture: ComponentFixture<JoinStudyGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinStudyGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinStudyGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
