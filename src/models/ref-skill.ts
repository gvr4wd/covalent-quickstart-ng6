/**
 * Created by dshin on 10/30/16.
 */
export class RefSkill {

    // required for ng2-select, this is the field to search on
    public text:string = '';

    constructor(public id: number = null,
                public name: string = '',
                public type: string = '') {
        this.text = this.name + "(" + this.type + ")";
    }


    static fromJson(json: any) {
        if (!json) return;

        return new RefSkill(
            json.id,
            json.name,
            json.type
        );
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            name: this.name,
            type: this.type
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}