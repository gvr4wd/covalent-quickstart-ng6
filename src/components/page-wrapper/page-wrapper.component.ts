import {Component} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'page-wrapper',
    templateUrl: './page-wrapper.component.html',
    styleUrls: ['./page-wrapper.component.scss'],
})
export class PageWrapper {
    private searchActivated: boolean = false;

    routes: Object[] = [{
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

    constructor(private router: Router, private authService: AuthService) {
    }

    private signout() {
        console.log('logout()');
        this.authService.logout();
        this.router.navigate(['login']);
    }
}
