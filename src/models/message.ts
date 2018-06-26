import {User} from "./user";

/**
 * Created by dshin on 05/20/2017.
 */
export class Message {

    constructor(public id: number = null,
                public message: string = null,
                public parentMessageId: number = null,
                public createdAt: Date = null,
                public updatedAt: Date = null,
                public receiverId: number = null,
                public senderId: number = null,
                public receivers: User[] = [],
                public sender: User = null,
                public readStatus: any[] = [],
                public readFlag: boolean = false) {
    }

    getStatus(user:User) : boolean {
        // if (this.readStatus) {
        //     for (let i = 0; i < this.readStatus.length; i++) {
        //         if (user.id == this.readStatus[i].UserId) {
        //             return this.readStatus[i].readFlag;
        //         }
        //     }
        // }
        // console.error('should not reach here....');
        return this.readFlag;
    }

    static fromJson(json: any) {
        if (!json) return;

        let receivers: User[] = [];
        let readStatus: any[] = [];
        if (json.receivers) {
            for (let i = 0; i < json.receivers.length; i++) {
                receivers.push (User.fromJson(json.receivers[i]));
                readStatus.push(json.receivers[i].MessageReceivers);
            }
        }

        return new Message(
            json.id,
            json.message,
            json.parentMessageId,
            json.createdAt,
            json.updatedAt,
            json.receiverId,
            json.senderId,
            receivers,
            User.fromJson(json.sender),
            readStatus,
            json.MessageReceivers ? json.MessageReceivers.readFlag : false
        );
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            message: this.message,
            parentMessageId: this.parentMessageId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            receiverId: this.receiverId,
            senderId: this.senderId,
            receivers: this.receivers,
            sender: this.sender,
            readStatus: this.readStatus
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}
