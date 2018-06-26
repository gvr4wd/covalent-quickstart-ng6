/**
 * Created by dshin on 10/30/16.
 */
export class HealthCareProvider {


    constructor(public id: number = null,
                public providerName: string = '',
                public description: string = '',
                public link: string = '') {
    }


    static fromJson(json: any) {
        if (!json) return;

        return new HealthCareProvider(
            json.id,
            json.providerName,
            json.description,
            json.link
        );
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            providerName: this.providerName,
            description: this.description,
            link: this.link
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}