import { Article, Logger } from '../common'


export class articles_data {
    private log: Logger;

    public constructor()
    {
    }

    public getAllArticles() : Promise<any>
    {

        var articles = new Promise(function(resolve, rejected) {
            var rs: Article [] = [
                {author: "auth1", title: "title1", otro:"otro1"},
                {author: "auth2", title: "title2", otro:"otro2"},
                {author: "auth3", title: "title3", otro:"otro3"},
                {author: "auth4", title: "title4", otro:"otro4"},
                {author: "auth5", title: "title5", otro:"otro5"}
            ];

            resolve(rs);
        });


        return articles;
    }

}