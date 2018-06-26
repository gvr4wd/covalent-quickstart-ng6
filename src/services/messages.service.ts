/**
 * Created by dshin on 10/1/16.
 */
import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {BaseService} from './base.service';
import {APP_CONFIG, IAppConfig} from '../app/app.config';
import {UsersService} from './users.service';
import {Message} from '../models/message';
import {LoadingService} from './loading.service';
import {User} from '../models/user';
import {Logger} from '../shared/logger';

@Injectable()
export class MessagesService extends BaseService {

    constructor(protected http: Http,
                protected usersService: UsersService,
                private loadingService: LoadingService,
                @Inject(APP_CONFIG) protected config: IAppConfig,
                logger: Logger) {
        super(http, config, logger);
    }

    /**
     * get all messages for the current user
     * @returns {Promise<any>}
     */
    get(): Promise<Message[]> {
        this.logger.log('MessagesService.get()');

        const user = this.usersService.getCurrentUser();
        return this.usersService.getUserObjects(user, 'messages').then(messages => {
            const messagesList = [];
            if (messages) {
                this.logger.log('got messages');
                messages.forEach((message) => {
                    messagesList.push(Message.fromJson(message));
                });
            } else { // id not found
                this.logger.error('no messages returned?');
            }
            return messagesList;
        });
    }

    /**
     * get message for the id
     * @returns {Promise<any>}
     */
    getOne(id: string): Promise<Message> {
        this.logger.log('MessagesService.get()');
        this.loadingService.busy = this.http.get(this.config.API_ENDPOINT + '/messages/' + id).toPromise();
        return this.loadingService.busy.then(
            response => {
                this.logger.log ('got message');
                const message: Message = Message.fromJson(response.json());
                return message;
            }).catch(this.handleError);

    }

    markRead(message: Message, user: User): Promise<any> {
        this.logger.log('markRead()');
        this.loadingService.busy = this.http.get(this.config.API_ENDPOINT + '/messages/' + message.id + '/read/' + user.id).toPromise();
        return this.loadingService.busy.then(
            response => {
                this.logger.log ('message marked read');
                return response.json;
            }).catch(this.handleError);

    }

    /**
     * send message
     * @param message
     * @returns {Promise<any|TResult2|Message>}
     */
    send(message: Message): Promise<Message> {
        this.logger.log('MessagesService.send()');
        this.loadingService.busy = this.http.post(this.config.API_ENDPOINT + '/messages/', message).toPromise();
        return this.loadingService.busy.then(
            response => {
                this.logger.log ('sent message');
                return Message.fromJson(response.json());
            }).catch(this.handleError);

    }
}
