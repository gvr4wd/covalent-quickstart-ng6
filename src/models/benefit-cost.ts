/**
 * Created by dshin on 1/14/2017.
 */
import {HealthCareProvider} from "./healthcare-provider";
import {ShortTermDiCost} from "./short-term-di-cost";
import {LongTermDiCost} from "./long-term-di-cost";
import {LifeInsuranceCost} from "./life-insurance-cost";
import {User} from "./user";

export class BenefitInfo {

    constructor(public healthCareProviders: HealthCareProvider[] = [],
                public shortTermDiCost:ShortTermDiCost = null,
                public longTermDiCost:LongTermDiCost = null,
                public lifeInsuranceCost:LifeInsuranceCost = null,
                public adAndDrate:number = 75.45) {
    }


    static fromArray(array:any[]) {
        var benefitInfo = new BenefitInfo();
        for (var i = 0; i < array.length; i++) {
            if (array[i] instanceof ShortTermDiCost) {
                benefitInfo.shortTermDiCost = array[i];
            } else if (array[i] instanceof LongTermDiCost) {
                benefitInfo.longTermDiCost = array[i];
            } else if (array[i] instanceof Array) {
                benefitInfo.healthCareProviders = array[i];
            } else if (array[i] instanceof LifeInsuranceCost) {
                benefitInfo.lifeInsuranceCost = array[i];
            } else {
                console.log ("invalid object - " + JSON.stringify(array[i]));
            }
        }

        return benefitInfo;

    }

    static fromJson(json: any) {
        if (!json) return;

        return new BenefitInfo(
            json.healthCareProvider,
        );
    }

    getLifeInsuranceRate(user:User, count:number) : number {
        if (user.gender === 'Male' && count == 1) {
            return this.lifeInsuranceCost.maleRate1;
        } else if (user.gender === 'Male' && count == 2) {
            return this.lifeInsuranceCost.maleRate2;
        } else if (user.gender === 'Female' && count == 1) {
            return this.lifeInsuranceCost.femaleRate1;
        } else if (user.gender === 'Female' && count == 2) {
            return this.lifeInsuranceCost.femaleRate2;
        }
    }


    // toJson(stringify?: boolean): any {
    //     var doc = {
    //         healthCareProvider: this.healthCareProviders.toJson(),
    //     };
    //
    //     return stringify ? JSON.stringify({resource: [doc]}) : doc;
    // }
}
