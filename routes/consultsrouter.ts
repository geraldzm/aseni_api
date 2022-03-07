import * as express from 'express';
import { Logger } from '../common'
import { ConsultController } from '../controllers'

const app = express();
const log = new Logger();

app.get("/hello", (req, res,next) => {
    res.json({ message: "Hello from consult"});
});

app.get("/cantons", (req, res, next) => {
    ConsultController.getInstance().getCantones()
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        log.error(err);
        return "";
    });
});

export { app as consultrouter };