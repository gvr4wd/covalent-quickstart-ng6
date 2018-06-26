import {User} from "./user";

/**
 * Created by dshin on 10/30/16.
 */
export class W4 {

    constructor(public id: number = null,
                public userId: number = null,
                public firstName: string = '',
                public lastName: string = '',
                public ssn: string = '',
                public homeAddress: string = '',
                public cityStateZip: string = '',
                public maritalStatus: number = 1,
                public lastNameFlag: boolean = false,
                public totalAllowances: number = 0,
                public additionalAmount: number = null,
                public exempt: string = '',
                public personalAllowanceA: number = 0,
                public personalAllowanceB: number = 0,
                public personalAllowanceC: number = 0,
                public personalAllowanceD: number = 0,
                public personalAllowanceE: number = 0,
                public personalAllowanceF: number = 0,
                public personalAllowanceG: number = 0,
                public personalAllowanceH: number = 0,
                public deductions1: number = null,
                public deductions2: number = null,
                public deductions3: number = null,
                public deductions4: number = null,
                public deductions5: number = null,
                public deductions6: number = null,
                public deductions7: number = null,
                public deductions8: number = null,
                public deductions9: number = null,
                public deductions10: number = null,
                public twoEarners1: number = null,
                public twoEarners2: number = null,
                public twoEarners3: number = null,
                public twoEarners4: number = null,
                public twoEarners5: number = null,
                public twoEarners6: number = null,
                public twoEarners7: number = null,
                public twoEarners8: number = null,
                public twoEarners9: number = null) {
    }

    calculateTotalPersonalAllowance() {
        this.personalAllowanceH = Number( this.personalAllowanceA) +
            Number(this.personalAllowanceB) +
            Number(this.personalAllowanceC) +
            Number(this.personalAllowanceD) +
            Number(this.personalAllowanceE) +
            Number(this.personalAllowanceF) +
            Number(this.personalAllowanceG);
        this.deductions9 = this.personalAllowanceH;
        this.twoEarners1 = this.personalAllowanceH;
    }

    calculateDeduction3 () {
        this.deductions3 = Number (this.deductions1) - Number (this.deductions2);
    }

    calculateDeduction5 () {
        this.deductions5 = Number (this.deductions3) + Number (this.deductions4);
    }

    calclauteDeduction7and8and10 () {
        this.deductions7 = Number (this.deductions5) - Number (this.deductions6);
        if (this.deductions7 < 0) {
            this.deductions7 = 0;
        }
        this.deductions8 = Math.floor(Number (this.deductions7) / 4050);
        this.deductions10 = Number (this.deductions8) + Number (this.deductions9);
    }

    calculateTwoEarners3 () {
        if ( this.twoEarners1 > this.twoEarners2) {
            this.twoEarners3 = Number (this.twoEarners1) - Number(this.twoEarners2);
        } else {
            this.twoEarners3 = 0;
        }
        if (this.twoEarners1 < this.twoEarners2) {
            this.totalAllowances = 0;
            this.twoEarners4 = this.twoEarners2;
            this.twoEarners5 = this.twoEarners1;
            this.twoEarners6 = Number (this.twoEarners4) - Number(this.twoEarners5);
        }
    }

    calculateTwoEarners8and9 () {
        this.twoEarners8 = Math.floor(Number(this.twoEarners6) * Number(this.twoEarners7));
        // assumes paid monthly
        this.twoEarners9 = Math.floor(this.twoEarners8 / 12);
    }

    static fromUser(user: User) {
        return new W4(null,
            user.id,
            user.firstName,
            user.lastName,
            user.ssn,
            user.address,
            user.city + " " + user.state + " " + user.zip
        )
    }

    static fromJson(json: any) {
        if (!json) return;

        return new W4(
            json.id,
            json.userId,
            json.firstName,
            json.lastName,
            json.ssn,
            json.homeAddress,
            json.cityStateZip,
            json.maritalStatus,
            json.lastNameFlag,
            json.totalAllowances,
            json.additionalAmount,
            json.exempt,
            json.personalAllowanceA,
            json.personalAllowanceB,
            json.personalAllowanceC,
            json.personalAllowanceD,
            json.personalAllowanceE,
            json.personalAllowanceF,
            json.personalAllowanceG,
            json.personalAllowanceH,
            json.deductions1,
            json.deductions2,
            json.deductions3,
            json.deductions4,
            json.deductions5,
            json.deductions6,
            json.deductions7,
            json.deductions8,
            json.deductions9,
            json.deductions10,
            json.twoEarners1,
            json.twoEarners2,
            json.twoEarners3,
            json.twoEarners4,
            json.twoEarners5,
            json.twoEarners6,
            json.twoEarners7,
            json.twoEarners8,
            json.twoEarners9
        );
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            ssn: this.ssn,
            homeAddress: this.homeAddress,
            cityStateZip: this.cityStateZip,
            maritalStatus: this.maritalStatus,
            lastNameFlag: this.lastName,
            totalAllowances: this.totalAllowances,
            additionalAmount: this.additionalAmount,
            exempt: this.exempt,
            personalAllowanceA: this.personalAllowanceA,
            personalAllowanceB: this.personalAllowanceB,
            personalAllowanceC: this.personalAllowanceC,
            personalAllowanceD: this.personalAllowanceD,
            personalAllowanceE: this.personalAllowanceE,
            personalAllowanceF: this.personalAllowanceF,
            personalAllowanceG: this.personalAllowanceG,
            personalAllowanceH: this.personalAllowanceH,
            deductions1: this.deductions1,
            deductions2: this.deductions2,
            deductions3: this.deductions3,
            deductions4: this.deductions4,
            deductions5: this.deductions5,
            deductions6: this.deductions5,
            deductions7: this.deductions6,
            deductions8: this.deductions8,
            deductions9: this.deductions9,
            deductions10: this.deductions10,
            twoEarners1: this.twoEarners1,
            twoEarners2: this.twoEarners2,
            twoEarners3: this.twoEarners3,
            twoEarners4: this.twoEarners4,
            twoEarners5: this.twoEarners5,
            twoEarners6: this.twoEarners6,
            twoEarners7: this.twoEarners7,
            twoEarners8: this.twoEarners8,
            twoEarners9: this.twoEarners9,
            userId: this.userId
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}
