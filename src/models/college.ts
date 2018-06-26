/**
 * Created by dshin on 10/30/16.
 */
export class College {
    // required for ng2-select, this is the field to search on
    public text:string = '';

    constructor(public id: number = null,
                public name: string = '',
                public city: string = '',
                public state: string = '') {
        this.text = this.name;
    }


    static fromJson(json: any) {
        if (!json) return;

        return new College(
            json.id,
            json.name,
            json.city,
            json.state
        );
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            name: this.name,
            city: this.city,
            state: this.state
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}