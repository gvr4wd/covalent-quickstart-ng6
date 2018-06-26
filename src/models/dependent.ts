/**
 * Created by dshin on 10/30/16.
 */
export class Dependent {

    constructor(public id: number = null,
                public firstName: string = '',
                public lastName: string = '',
                public relationship: string = '',
                public gender: string = '',
                public address: string = '',
                public city: string = '',
                public state: string = '',
                public zip: string = '',
                public dateOfBirth: string = '',
                public ssn: string = '',
                public parentId: number = null) {
    }


    static fromJson(json: any) {
        if (!json) return;

        return new Dependent(
            json.id,
            json.firstName,
            json.lastName,
            json.relationship,
            json.gender,
            json.address,
            json.city,
            json.state,
            json.zip,
            json.dateOfBirth,
            json.ssn,
            json.parentId
        );
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            firstName:    this.firstName,
            lastName: this.lastName,
            relationship: this.relationship,
            gender: this.gender,
            address: this.address,
            city: this.city,
            state: this.state,
            zip: this.zip,
            dateOfBirth: this.dateOfBirth,
            ssn: this.ssn,
            parentId: this.parentId
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}