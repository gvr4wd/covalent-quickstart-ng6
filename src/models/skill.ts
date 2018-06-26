/**
 * Created by dshin on 10/30/16.
 */
export class Skill {

    constructor(public id: number = null,
                public skillName: string = '',
                public skillType: string = '',
                public yearsUsed: number = null,
                public projects: string='',
                public userId: number = null) {
    }


    static fromJson(json: any) {
        if (!json) return;

        return new Skill(
            json.id,
            json.skillName,
            json.skillType,
            json.yearsUsed,
            json.projects,
            json.userId
        );
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            skillName: this.skillName,
            skillType: this.skillType,
            yearsUsed: this.yearsUsed,
            projects: this.projects,
            userId: this.userId
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}