/**
 * Created by dshin on 10/30/16.
 */
export class Certification {

    constructor(public id: number = null,
                public certificationName: string = '',
                public issuer: string = '',
                public issueDate: Date = null,
                public userId: number = null) {
    }


    static fromJson(json: any) {
        if (!json) return;

        return new Certification(
            json.id,
            json.certificationName,
            json.issuer,
            json.issueDate,
            json.userId
        );
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            certificationName: this.certificationName,
            issuer: this.issuer,
            issueDate: this.issueDate,
            userId: this.userId
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}