/**
 * Created by dshin on 10/30/16.
 */
export class Experience {

    constructor(public id: number = null,
                public position: string = '',
                public company: string = '',
                public address: string = '',
                public city: string = '',
                public state: string = '',
                public zipCode: number = null,
                public startDate: Date = null,
                public endDate: Date = null,
                public userId: number = null) {
    }


    static fromJson(json: any) {
        if (!json) return;

        return new Experience(
            json.id,
            json.position,
            json.company,
            json.address,
            json.city,
            json.state,
            json.zipCode,
            json.startDate,
            json.endDate,
            json.userId
        );
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            position: this.position,
            company: this.company,
            address: this.address,
            city: this.city,
            state: this.state,
            zipCode: this.zipCode,
            startDate: this.startDate,
            endDate: this.endDate,
            userId: this.userId
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}