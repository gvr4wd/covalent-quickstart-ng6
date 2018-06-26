/**
 * Created by dshin on 10/30/16.
 */
export class Compensation {

    constructor(public id: number = null,
                public userId: number = null,
                public healthCareProviderId: number = null,
                public healthCareType: number = null,
                public healthCareCost: number = null) {
    }


    static fromJson(json: any) {
        if (!json) return;

        return new Compensation(
            json.id,
            json.userId,
            json.healthCareProviderId,
            json.healthCareType,
            json.healthCareCost
        );
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            healthCareProviderId: this.healthCareProviderId,
            healthCareType: this.healthCareType,
            healthCareCost: this.healthCareCost,
            userId: this.userId
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}