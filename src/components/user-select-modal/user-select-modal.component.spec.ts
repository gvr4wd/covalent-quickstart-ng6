import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectModalComponent } from './user-select-modal.component';

describe('UserSelectModalComponent', () => {
  let component: UserSelectModalComponent;
  let fixture: ComponentFixture<UserSelectModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSelectModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
