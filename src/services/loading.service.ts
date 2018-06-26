/**
 * Created by dshin on 10/1/16.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toPromise";

@Injectable()
export class LoadingService {

    public busy:Promise<any>;

    constructor(private http: Http) {
    }
}
