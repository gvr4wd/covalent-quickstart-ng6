/**
 * Created by dshin on 10/30/16.
 */
export class ShortTermDiCost {


    constructor(public id: number = null,
                public age: number = null,
                public maleRate: number = null,
                public femaleRate: number = null) {
    }


    static fromJson(json: any) {
        if (!json) return;

        return new ShortTermDiCost(
            json.id,
            json.age,
            json.maleRate,
            json.femaleRate,
        );
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            age: this.age,
            maleRate: this.maleRate,
            femaleRate: this.femaleRate,
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}