import * as express from 'express';
import { Logger } from '../common'
import { ConsultController } from '../controllers'

const app = express();
const log = new Logger();

app.get("/query1", (req, res, next) => {

    ConsultController.getInstance().query1()
    .then((data : any)=>{
        res.json(data['recordsets']);
    })
    .catch((err: any)=>{
        log.error(err);
        res.sendStatus(500); // internal error
    });

});

app.get("/query2", (req, res, next) => {

    ConsultController.getInstance().query2()
    .then((data : any)=>{
        res.json(data['recordsets']);
    })
    .catch((err: any)=>{
        log.error(err);
        res.sendStatus(500); // internal error
    });

});

app.get("/query3", (req, res, next) => {

    ConsultController.getInstance().query3(req.body['words'])
    .then((data : any)=>{
        res.json(data['recordsets']);
    })
    .catch((err: any)=>{
        log.error(err);
        res.sendStatus(500); // internal error
    });

});

export { app as consultrouter };