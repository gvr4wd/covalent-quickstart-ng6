import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSelectModalComponent } from './group-select-modal.component';

describe('GroupSelectModalComponent', () => {
  let component: GroupSelectModalComponent;
  let fixture: ComponentFixture<GroupSelectModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupSelectModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
