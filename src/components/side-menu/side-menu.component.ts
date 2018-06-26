import {Component} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss'],
})
export class SideMenu {
    private searchActivated: boolean = false;

    routes: Object[] = [
        {
            title: 'Dashboard',
            route: '/',
            icon: 'dashboard',
        },
        {
            title: 'Manage Users',
            route: '/users',
            icon: 'people',
        },
        {
            title: 'Logs',
            route: '/logs',
            icon: 'receipt',
        },
        {
            title: 'API',
            route: '/docs/',
            icon: 'receipt',
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
