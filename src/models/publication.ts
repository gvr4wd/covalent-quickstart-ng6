/**
 * Created by dshin on 10/30/16.
 */
export class Publication {

    constructor(public id: number = null,
                public publicationTitle: string = '',
                public publisher: string = '',
                public publicationDate: Date = null,
                public userId: number = null) {
    }


    static fromJson(json: any) {
        if (!json) return;

        return new Publication(
            json.id,
            json.publicationTitle,
            json.publisher,
            json.publicationDate,
            json.userId
        );
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            publicationTitle: this.publicationTitle,
            publisher: this.publisher,
            publicationDate: this.publicationDate,
            userId: this.userId
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}