import {HealthCareCost} from "./healthcare-cost";

/**
 * Created by dshin on 10/30/16.
 */
export class UserBenefit {

    constructor(public id: number = null,
                public userId: number = null,
                public healthCareProviderId: number = null,
                public healthCareType: number = null,
                public healthCareCost: number = null,
                public shortTermDiRate: number = 0,
                public longTermDiRate: number = 0,
                public lifeInsuranceRate: number = 0,
                public retirementSavingContribution: number = 0,
                public adAndDrate: number = 0,
                public timeoff: number = 0) {
    }

    public setHealthCareCost (healthCareCost: HealthCareCost) {
        if (this.healthCareType == 1) {
            this.healthCareCost = healthCareCost['selfCost'];
        } else if (this.healthCareType == 2) {
            this.healthCareCost = healthCareCost['spouseCost'];
        } else if (this.healthCareType == 3) {
            this.healthCareCost = healthCareCost['familyCost'];
        } else {
            this.healthCareCost = -1;
        }
    }


    static fromJson(json: any) {
        if (!json) return;

        return new UserBenefit(
            json.id,
            json.userId,
            json.healthCareProviderId,
            json.healthCareType,
            json.healthCareCost,
            json.shortTermDiRate,
            json.longTermDiRate,
            json.lifeInsuranceRate,
            json.retirementSavingContribution,
            json.adAndDrate,
            json.timeoff
        );
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            userId: this.userId,
            healthCareProviderId: this.healthCareProviderId,
            healthCareType: this.healthCareType,
            healthCareCost: this.healthCareCost,
            shortTermDiRate: this.shortTermDiRate,
            longTermDiRate: this.longTermDiRate,
            lifeInsuranceRate: this.lifeInsuranceRate,
            retirementSavingContribution: this.retirementSavingContribution,
            adAndDrate: this.adAndDrate,
            timeoff: this.timeoff
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}
