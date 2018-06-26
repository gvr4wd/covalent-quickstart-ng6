/**
 * Created by dshin on 10/30/16.
 */
export class ChargeNumber {

    constructor(public id: number = null,
                public chargeNumber: string = '',
                public description: string = '',
                public project: string = '') {
    }


    static fromJson(json: any) {
        if (!json) return;

        return new ChargeNumber(
            json.id,
            json.chargeNumber,
            json.description,
            json.project
        );
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            chargeNumber: this.chargeNumber,
            description: this.description,
            project: this.project
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}