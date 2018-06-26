import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Notification } from '../../models/notification';
import { NotificationsService } from '../../services';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenu {
  private searchActivated: boolean = false;

  routes: Object[] = [
    {
      title: 'Dashboard',
      route: '/',
      icon: 'dashboard',
    }, {
      title: 'Product Dashboard',
      route: '/product',
      icon: 'view_quilt',
    }, {
      title: 'Product Logs',
      route: '/logs',
      icon: 'receipt',
    }, {
      title: 'Manage Users',
      route: '/users',
      icon: 'people',
    },
  ];

  private notifications: Notification[] = [];

  constructor(private router: Router,
              private authService: AuthService,
              private notificationService: NotificationsService) {
    this.getLatestNotifications();
  }

  private signout() {
    console.log('logout()');
    this.authService.logout();
    this.router.navigate(['']);
  }

  private search(event) {
    console.log('search (' + event + ')');
    this.router.navigate(['/insight', event]);
  }


  getLatestNotifications(): void {
    this.notifications = [];
    // this.notificationService.getLatest().then(response => {
    //   console.log('got ' + response.rows.length + ' latest notifications');
    //   console.log(response);
    //   response.rows.forEach((notification) => {
    //     this.notifications.push(Notification.fromJson(notification));
    //   });
    // }, (error: Error) => {
    //   console.error('error loading notifications');
    // });
  }
}
