import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { ITdLoadingConfig, LoadingType, TdLayoutManageListComponent, TdLoadingService, TdMediaService } from '@covalent/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService, TdLayoutService } from '../services';
import { Logger } from '../shared/logger';
import { User } from '../models';

@Component({
  selector: 'qs-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {

  // constructor(private _iconRegistry: MatIconRegistry,
  //             private _domSanitizer: DomSanitizer) {
  //   this._iconRegistry.addSvgIconInNamespace('assets', 'teradata',
  //     this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata.svg'));
  //   this._iconRegistry.addSvgIconInNamespace('assets', 'github',
  //     this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
  //   this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
  //     this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent.svg'));
  //   this._iconRegistry.addSvgIconInNamespace('assets', 'covalent-mark',
  //     this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent-mark.svg'));
  //   this._iconRegistry.addSvgIconInNamespace('assets', 'teradata-ux',
  //     this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata-ux.svg'));
  //   this._iconRegistry.addSvgIconInNamespace('assets', 'appcenter',
  //     this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/appcenter.svg'));
  //   this._iconRegistry.addSvgIconInNamespace('assets', 'listener',
  //     this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/listener.svg'));
  //   this._iconRegistry.addSvgIconInNamespace('assets', 'querygrid',
  //     this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/querygrid.svg'));
  // }


  @ViewChild('manageList') manageList: TdLayoutManageListComponent;

  user: User;

  private mdNavList: Object[];

  constructor(private router: Router,
              private tdLayoutService: TdLayoutService,
              private loadingService: TdLoadingService,
              private iconRegistry: MatIconRegistry,
              public media: TdMediaService,
              private _changeDetectorRef: ChangeDetectorRef,
              private domSanitizer: DomSanitizer,
              private authService: AuthService,
              private logger: Logger) {


    let options: ITdLoadingConfig = {
      name: 'main',
      type: LoadingType.Circular,
    };

    this.loadingService.create(options);
    this.iconRegistry.addSvgIconInNamespace('assets', 'teradata',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'covalent',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'covalent-mark',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent-mark.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'teradata-ux',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata-ux.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'appcenter',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/appcenter.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'listener',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/listener.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'querygrid',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/querygrid.svg'));


    this.mdNavList = this.tdLayoutService.geMdNavList();
  }

  ngOnInit() {
    this.logger.debug('initialing application');
    this.router.events
      .subscribe((event) => {
        // example: NavigationStart, RoutesRecognized, NavigationEnd
        // this.logger.debug(event);

        if (event instanceof NavigationEnd) {
          this.logger.debug('getting user info');
          this.user = this.authService.getUser();
          this.logger.debug('user - ', this.user);
        }
      });

  }

  isLoggedIn(): boolean {
    // this.logger.debug ('AppComponent.isLoggedIn()');
    return this.authService.isLoggedIn();
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    this._changeDetectorRef.detectChanges();
  }

}
