/**
 * Created by dshin on 11/2017.
 */
import {Inject, Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {BaseService} from './base.service';
import {APP_CONFIG, IAppConfig} from '../app/app.config';
import {UsersService} from './users.service';
import {Notification} from '../models/notification';
import {User} from '../models/user';
import {LoadingService} from './loading.service';
import {Logger} from '../shared/logger';

@Injectable()
export class NotificationsService extends BaseService {

    constructor(protected http: Http,
                protected usersService: UsersService,
                @Inject(APP_CONFIG) protected config: IAppConfig,
                protected loadingService: LoadingService,
                logger: Logger) {
        super(http, config, logger);
    }

    /**
     * get all notifications for the current user
     * @returns {Promise<any>}
     */
    get(readFlag: boolean = null, offset: number = 0, limit: number = 10): Promise<any> {
        console.log('NotificationsService.get()');

        const params: URLSearchParams = new URLSearchParams();
        if (offset !== null && limit !== null) {
            params.set('limit', limit.toString());
            params.set('offset', offset.toString());
            if (readFlag !== null) {
                params.set('readFlag', readFlag.toString());
            }
        } else {
            this.logger.log('offset and limit not set...');
        }

        const user: User = this.usersService.getCurrentUser();
        return this.usersService.getUserObjects(user, 'notifications', params).then(response => {
            this.logger.log('got notifications ', response);
            return response;
        });
    }

    getLatest(): Promise<any> {
        this.logger.log('NotificationsService.getLatest()');
        const user: User = this.usersService.getCurrentUser();
        return this.usersService.getUserObjects(user, 'latest-notifications').then(response => {
            this.logger.log('got notifications', response);
            return response;
        });
    }

    dismiss(notification: Notification) {
        notification.readFlag = true;
        return this.put(notification);
    }

    markUnread(notification: Notification) {
        notification.readFlag = false;
        return this.put(notification);
    }

    put(notification: Notification): Promise<any> {
        this.loadingService.busy = this.http
            .patch(this.config.API_ENDPOINT + '/notifications/' + notification.id, notification.toJson(false), {headers: this.headers})
            .toPromise();
        return this.loadingService.busy
            .then(() => notification)
            .catch(this.handleError);
    }
}
