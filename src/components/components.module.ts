/**
 * Created by dshin11 on 1/12/17.
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { ChartComponent } from './chart/chart.component';
import { NavMenu } from './nav-menu/nav-menu.component';
import { RouterModule } from '@angular/router';
import { SideMenu } from './side-menu/side-menu.component';
import { PageWrapper } from './page-wrapper/page-wrapper.component';
import { BrowserModule } from '@angular/platform-browser';
import {
  CovalentChipsModule,
  CovalentCommonModule,
  CovalentDataTableModule,
  CovalentDialogsModule,
  CovalentExpansionPanelModule,
  CovalentFileModule,
  CovalentJsonFormatterModule,
  CovalentLayoutModule,
  CovalentLoadingModule,
  CovalentMediaModule,
  CovalentMenuModule,
  CovalentMessageModule,
  CovalentNotificationsModule,
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentStepsModule
} from '@covalent/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { FooterComponent } from './footer/footer.component';
import { CompleterCmpMd } from './completer-cmp-md/completer-cmp-md';
import { Ng2CompleterModule } from 'ng2-completer';
import { UserSelectModalComponent } from './user-select-modal/user-select-modal.component';
import { GroupSelectModalComponent } from './group-select-modal/group-select-modal.component';
import { RoleSelectModalComponent } from './role-select-modal/role-select-modal.component';
import { HasAuthorityDirective } from './has-authority.directive';
import { GroupMembersListComponent } from './group-members-list/group-members-list.component';
import { GroupOwnerListComponent } from './group-owner-list/group-owner-list.component';

const SHARED_COMPONENTS = [
  ChartComponent,
  PageWrapper,
  SideMenu,
  NavMenu,
  FooterComponent,
  CompleterCmpMd,
  UserSelectModalComponent,
  GroupSelectModalComponent,
  RoleSelectModalComponent,
  HasAuthorityDirective,
  GroupMembersListComponent,
  GroupOwnerListComponent,
];

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,

    /** Material Modules */

    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatProgressBarModule,
    MatChipsModule,
    MatGridListModule,
    MatRippleModule,

    /** Covalent Modules */
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentExpansionPanelModule,
    CovalentStepsModule,
    CovalentDialogsModule,
    CovalentLoadingModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentFileModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentChipsModule,
    CovalentJsonFormatterModule,
    CovalentDataTableModule,
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    CovalentMessageModule,

    Ng2CompleterModule,
  ],
  declarations: [
    ...SHARED_COMPONENTS
  ],
  exports: [
    ...SHARED_COMPONENTS
  ]
})

export class ComponentsModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: ComponentsModule,
      providers: [],
    };
  }
}
