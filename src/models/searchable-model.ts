export interface SearchableModelInterface {

    getSearchTitle(): string;

    getSearchText(searchStr:string): string;

    getLink(): string;
}

export class SearchableModel implements SearchableModelInterface {
    getSearchTitle(): string {
        console.warn ('should not be called');
        return '';
    }

    getSearchText(searchStr:string): string {
        console.warn ('should not be called');
        return '';
    }

    getLink(): string {
        console.warn ('should not be called');
        return '';
    }

    buildSearchText (object: any, props: string[], searchStr:string): string {
        let searchText = [];
        let regex = new RegExp(searchStr, 'gi');
        for (let i = 0; i < props.length; i++) {
            let str = object[props[i]];
            if (str && str.match (regex)) {
                if (str.indexOf(searchStr) > 50) {
                    str = str.substr(str.indexOf(searchStr) - 50, 100) + "...";
                }
                searchText.push(str);
            }
        }
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

        console.debug('returning ' + searchText.join('<br>'));
        return searchText.join('<br>');
    }
}
