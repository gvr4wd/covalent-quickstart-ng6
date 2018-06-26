/**
 * Created by dshin on 10/1/16.
 */
import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {Project} from '../models/project';
import {BaseService} from './base.service';
import {APP_CONFIG, IAppConfig} from '../app/app.config';
import {Logger} from '../shared/logger';

@Injectable()
export class ProjectsService  extends BaseService {

    constructor(protected http: Http,
                @Inject(APP_CONFIG) protected config: IAppConfig,
                logger: Logger) {
        super(http, config, logger);
    }

    get (): Promise<Project[]> {
        this.logger.debug('get()');

        return this.http.get(this.config.API_ENDPOINT + '/ref-projects', {headers:this.headers}).toPromise().then(
            response => {
                this.logger.log('got projects!');
                const result: any = response.json();
                const projects: Array < Project > = [];
                result.forEach((project) => {
                    projects.push(Project.fromJson(project));
                });
                return projects;
            }).catch(this.handleError);
    }
}
