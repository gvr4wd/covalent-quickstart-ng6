/**
 * Created by dshin on 05/12/17
 */
import {SearchableModel} from "./searchable-model";

export class Blog extends SearchableModel{
    constructor(public id: number = null,
                public title: string = '',
                public blog: string = '',
                public comments: string = null,
                public date: Date = null,
                public createdAt: Date = null,
                public updatedAt: Date = null,
                public userId: number = null) {
        super ();
    }

    getLink(): string {
        return '/blogs/' + this.id;
    }

    getSearchTitle(): string {
        return this.title;
    }

    getSearchText(searchStr): string {

        return this.buildSearchText(this, ['blog', 'comments'], searchStr);
        // let searchText = [];
        // let regex = new RegExp(searchStr, 'gi');
        // if (this.blog.match(regex)) {
        //     let str = this.blog;
        //     if (this.blog.indexOf(searchStr) > 50) {
        //         str = this.blog.substr(this.blog.indexOf(searchStr) - 50, 100) + "...";
        //     }
        //     searchText.push(str);
        // }
        // if (this.comments && this.comments.match(regex)) {
        //     searchText.push(this.comments);
        // }
        //
        // console.debug('returning ' + searchText.join('<br>'));
        // return searchText.join('<br>');
    }

    static fromJson(json: any) {
        if (!json) return;

        return new Blog(
            json.id,
            json.title,
            json.blog,
            json.comments,
            json.date,
            json.createdAt,
            json.updatedAt,
            json.userId
        );
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            title: this.title,
            blog: this.blog,
            comments: this.comments,
            date: this.date,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            userId: this.userId
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}
