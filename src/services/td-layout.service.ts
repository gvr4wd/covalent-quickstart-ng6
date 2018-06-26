/**
 * Created by dshin on 10/1/16.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toPromise";

@Injectable()
export class TdLayoutService {

    private mdNavList: Object[] = [
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
            title: 'Manage Groups',
            route: '/groups',
            icon: 'people',
        },
        {
            title: 'Logs',
            route: '/logs',
            icon: 'receipt',
        },
    ];

    constructor(private http: Http) {
    }

    public geMdNavList(): Object[] {
        return this.mdNavList;
    }
}
