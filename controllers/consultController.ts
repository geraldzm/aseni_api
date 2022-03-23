import { ConsultData } from '../repositories';
import { Logger } from '../common'

export class ConsultController {
    
    private static instance: ConsultController;

    private log: Logger;
    private rep: ConsultData;

    private constructor()
    {
        this.log = new Logger();
        this.rep = new ConsultData();
    }

    public static getInstance() : ConsultController
    {
        if (!this.instance)
        {
            this.instance = new ConsultController();
        }
        return this.instance;
    }

    public query1() : Promise<any> 
    {
        return this.rep.query1();
    }

    public query2() : Promise<any> 
    {
        return this.rep.query2();
    }

    public query3(words: string) : Promise<any> 
    {
        return this.rep.query3(words);
    }

    public query6(user: number,plan: number,list: any) : Promise<any> 
    {
        return this.rep.query6(user,plan,list);
    }
}
