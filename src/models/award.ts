/**
 * Created by dshin on 10/30/16.
 */
export class Award {

    constructor(public id: number = null,
                public awardName: string = '',
                public issuer: string = '',
                public issueDate: Date = null,
                public userId: number = null) {
    }


    static fromJson(json: any) {
        if (!json) return;

        return new Award(
            json.id,
            json.awardName,
            json.issuer,
            json.issueDate,
            json.userId
        );
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            awardName: this.awardName,
            issuer: this.issuer,
            issueDate: this.issueDate,
            userId: this.userId
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}