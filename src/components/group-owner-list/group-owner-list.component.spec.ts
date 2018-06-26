import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupOwnerListComponent } from './group-owner-list.component';

describe('GroupOwnerListComponent', () => {
  let component: GroupOwnerListComponent;
  let fixture: ComponentFixture<GroupOwnerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupOwnerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupOwnerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
