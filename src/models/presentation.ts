/**
 * Created by dshin on 10/30/16.
 */
export class Presentation {

    constructor(public id: number = null,
                public presentationTitle: string = '',
                public place: string = '',
                public presentationDate: Date = null,
                public userId: number = null) {
    }


    static fromJson(json: any) {
        if (!json) return;

        return new Presentation(
            json.id,
            json.presentationTitle,
            json.place,
            json.presentationDate,
            json.userId
        );
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            presentationTitle: this.presentationTitle,
            place: this.place,
            presentationDate: this.presentationDate,
            userId: this.userId
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}