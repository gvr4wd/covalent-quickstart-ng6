/**
 * Created by dshin on 10/30/16.
 */
export class ProfessionalAssociation {

    constructor(public id: number = null,
                public associationName: string = '',
                public place: string = '',
                public associationDate: Date = null,
                public userId: number = null) {
    }


    static fromJson(json: any) {
        if (!json) return;

        return new ProfessionalAssociation(
            json.id,
            json.associationName,
            json.place,
            json.associationDate,
            json.userId
        );
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            associationName: this.associationName,
            place: this.place,
            associationDate: this.associationDate,
            userId: this.userId
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}