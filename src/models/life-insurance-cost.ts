/**
 * Created by dshin on 10/30/16.
 */
export class LifeInsuranceCost {


    constructor(public id: number = null,
                public providerId: number = null,
                public age: number = null,
                public maleRate1: number = null,
                public maleRate2: number = null,
                public femaleRate1: number = null,
                public femaleRate2: number = null) {
    }


    static fromJson(json: any) {
        if (!json) return;

        return new LifeInsuranceCost(
            json.id,
            json.providerId,
            json.age,
            json.maleRate1,
            json.maleRate2,
            json.femaleRate1,
            json.femaleRate2,
        );
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            providerId: this.providerId,
            age: this.age,
            maleRate1: this.maleRate1,
            maleRate2: this.maleRate2,
            femaleRate1: this.femaleRate1,
            femaleRate2: this.femaleRate2,
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}