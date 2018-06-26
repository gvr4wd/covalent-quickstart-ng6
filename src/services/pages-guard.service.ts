/**
 * Created by dshin on 9/30/16.
 */
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class PagesGuard implements CanActivate {
    constructor(private authService: AuthService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;

        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        console.log('checkLogin() for ' + url);
        if (this.authService.isLoggedIn()) {
            console.log('logged in?');
            return true;
        }

        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;

        // Navigate to the login page with extras
        // path: 'update-book',
        //     component: BookUpdateComponent,
        //     outlet: 'bookPopup'
        // this.router.navigate([{ outlets: { bookPopup: [ 'update-book' ] }}]);
        this.router.navigate(['']);
        // this.router.navigate([{ outlets: { notLoggedIn: [ 'login' ] }}]);
        return false;
    }
}
