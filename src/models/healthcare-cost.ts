/**
 * Created by dshin on 10/30/16.
 */
export class HealthCareCost {


    constructor(public id: number = null,
                public providerId: number = null,
                public age: number = null,
                public selfCost: number = null,
                public spouseCost: number = null,
                public familyCost: number = null) {
    }


    static fromJson(json: any) {
        if (!json) return;

        return new HealthCareCost(
            json.id,
            json.providerId,
            json.age,
            json.selfCost,
            json.spouseCost,
            json.familyCost,
        );
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            providerId: this.providerId,
            age: this.age,
            selfCost: this.selfCost,
            spouseCost: this.spouseCost,
            familyCost: this.familyCost
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}