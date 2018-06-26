/**
 * Created by dshin on 10/27/16.
 */
import {SearchableModel} from "./searchable-model";

export class Resume extends SearchableModel {

    constructor(public id: number = null,
                public objective: string = '',
                public summary: string = '',
                public comments: string = '',
                public userId: number = null) {
        super();
    }

    getLink(): string {
        return '/resumes/' + this.id;
    }

    getSearchTitle(): string {
        return this.objective;
    }

    getSearchText(searchStr): string {
        return this.buildSearchText(this, ['summary', 'comments'], searchStr);
    }


    static fromJson(json: any) {
        if (!json) return;

        return new Resume(
            json.id,
            json.objective,
            json.summary,
            json.comments,
            json.userId,
        );
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            objective: this.objective,
            summary: this.summary,
            comments: this.comments,
            userId: this.userId
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }

}
