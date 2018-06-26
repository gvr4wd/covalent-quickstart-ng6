import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardFavoritesComponent} from './dashboard-favorites.component';

describe('DashboardFavoritesComponent', () => {
  let component: DashboardFavoritesComponent;
  let fixture: ComponentFixture<DashboardFavoritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardFavoritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
