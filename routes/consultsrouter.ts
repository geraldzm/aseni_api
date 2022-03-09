import * as express from 'express';
import { Logger } from '../common'
import { ConsultController } from '../controllers'

const app = express();
const log = new Logger();

app.get("/hello", (req, res,next) => {
    res.json({ message: "Hello from consult"});
});

app.get("/test", (req, res, next) => {
    ConsultController.getInstance().test()
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        log.error(err);
        return "";
    });
});

app.get("/query1F", (req, res, next) => {
    ConsultController.getInstance().query1F()
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        log.error(err);
        return "";
    });
});

app.get("/query1S", (req, res, next) => {
    ConsultController.getInstance().query1S()
    .then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        log.error(err);
        return "";
    });
});

app.get("/query2", (req, res, next) => {
    ConsultController.getInstance().query2()
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        log.error(err);
        return "";
    });
});

export { app as consultrouter };