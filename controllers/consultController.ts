import { consultData } from '../repositories/data_consult'
import { Logger } from '../common'


export class ConsultController {
    private static instance: ConsultController;
    private log: Logger;

    private constructor()
    {
        this.log = new Logger();
        try
        {
        } catch (e)
        {
            this.log.error(e);
        }
    }

    public static getInstance() : ConsultController
    {
        if (!this.instance)
        {
            this.instance = new ConsultController();
        }
        return this.instance;
    }

    public async test() : Promise<any> 
    {
        const model = new consultData();
        return model.testConec();
    }
    
    public async query1F() : Promise<any> 
    {
        const model = new consultData();
        return model.query1F();
    }

    public async query1S() : Promise<any> 
    {
        const model = new consultData();
        return model.query1S();
    }

    public async query2() : Promise<any> 
    {
        const model = new consultData();
        return model.query2();
    }
}
