/**
 * Created by dshin on 05/20/2017.
 */
export class Notification {

    static fromJson(json: any) {
        if (!json) {
            return;
        }

        return new Notification(
            json.id,
            json.notification,
            json.title,
            json.type,
            json.readFlag,
            json.createdAt,
            json.updatedAt,
            json.UserId
        );
    }

    constructor(public id: number = null,
                public notification: string = null,
                public title: string = null,
                public type: string = null,
                public readFlag: boolean = false,
                public createdAt: Date = null,
                public updatedAt: Date = null,
                public UserId: number = null) {
    }


    toJson(stringify?: boolean): any {
        const doc = {
            id: this.id,
            notification: this.notification,
            title: this.title,
            type: this.type,
            readFlag: this.readFlag,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            UserId: this.UserId,
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}
