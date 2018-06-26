/**
 * Created by dshin on 10/30/16.
 */
import {SearchableModel} from "./searchable-model";

export class Project extends SearchableModel{

    // required for ng2-select, this is the field to search on
    public text:string = '';

    constructor(public id: number = null,
                public projectName: string = '',
                public description: string = '') {
        super();
        this.text = this.projectName;
    }

    getLink(): string {
        return '/projects/' + this.id;
    }

    getSearchTitle(): string {
        return this.projectName;
    }

    getSearchText(searchStr): string {
        return this.buildSearchText(this, ['description'], searchStr);
    }

    static fromJson(json: any) {
        if (!json) return;

        return new Project(
            json.id,
            json.projectName,
            json.description
        );
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            projectName: this.projectName,
            description: this.description
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}
