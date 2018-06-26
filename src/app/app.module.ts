import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CovalentCommonModule } from '@covalent/core/common';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentMediaModule } from '@covalent/core/media';
import { CovalentLoadingModule } from '@covalent/core/loading';

import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { appRoutes } from './app.routes';

import { AppComponent } from './app.component';
import { RequestInterceptor } from '../config/interceptors/request.interceptor';
import { MOCK_API } from '../config/api.config';

import { USER_PROVIDER, USERS_API } from './users';
import { MainComponent } from './main.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentsModule } from '../components/components.module';
import { AuthService, LoadingService, NotificationsService, TdLayoutService, UsersService } from '../services';
import { APP_CONFIG, AppConfig } from './app.config';
import { LOG_LOGGER_PROVIDERS, Logger } from '../shared/logger';
import { CovalentMessageModule } from '@covalent/core';

const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];

export function getAPI(): string {
  return MOCK_API;
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    DashboardComponent,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    // angular modules
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    // material modules
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatInputModule,
    MatToolbarModule,
    // covalent modules
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentLoadingModule,
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
    CovalentMessageModule,
    // external modules
    NgxChartsModule,

    ComponentsModule,

    // routes
    appRoutes,
  ], // modules needed to run this module
  providers: [
    {provide: APP_CONFIG, useValue: AppConfig},
    httpInterceptorProviders,
    Title, {
      provide: USERS_API, useFactory: getAPI,
    }, USER_PROVIDER,

    TdLayoutService,
    AuthService,
    NotificationsService,
    UsersService,
    LoadingService,

    // Logger
    Logger,
    LOG_LOGGER_PROVIDERS,
  ], // additional providers needed for this module
  entryComponents: [ ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
