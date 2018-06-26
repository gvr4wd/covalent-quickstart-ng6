/**
 * Created by dshin on 10/30/16.
 */
import {College} from "./college";

export class Education {

    constructor(public id: number = null,
                public schoolName: string = '',
                public address: string = '',
                public city: string = '',
                public state: string = '',
                public degreeReceived: string = '',
                public receivedDate: Date = null,
                public userId: number = null) {
    }


    static fromJson(json: any) {
        if (!json) return;

        return new Education(
            json.id,
            json.schoolName,
            json.address,
            json.city,
            json.state,
            json.degreeReceived,
            json.receivedDate,
            json.userId
        );
    }

    setCollege (college:College) {
        this.schoolName = college.name;
        this.city = college.city;
        this.state = college.state;
    }

    static fromCollege(college: College) {
        return new Education(null, college.name, null, college.city, college.state, null, null, null)
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            schoolName: this.schoolName,
            address: this.address,
            city: this.city,
            state: this.state,
            degreeReceived: this.degreeReceived,
            receivedDate: this.receivedDate,
            userId: this.userId
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}
