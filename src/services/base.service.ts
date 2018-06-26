/**
 * Created by dshin on 2/10/2017.
 */
/**
 * Created by dshin on 9/30/16.
 */
import {Inject, Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {Headers, Http} from '@angular/http';
import {APP_CONFIG, IAppConfig} from '../app/app.config';
import {Logger} from '../shared/logger';

//noinspection TypeScriptUnresolvedFunction
@Injectable()
export class BaseService {
    protected headers = new Headers();

    constructor(protected http: Http,
                @Inject(APP_CONFIG) protected config: IAppConfig,
                protected logger: Logger) {
        this.headers.append('Accept', 'application/json');
        this.headers.append('Content-Type', 'application/json');
    }


    protected handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
