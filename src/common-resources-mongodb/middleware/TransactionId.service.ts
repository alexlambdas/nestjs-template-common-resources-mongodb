import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";

@Injectable()
export class TransactionIdService implements NestMiddleware{

    use(req: Request, res: Response, next: NextFunction) {

        let transactionId: any;
        transactionId = req.headers['transactionid'];
        if(transactionId === undefined){
            const uuidv4 = uuid();
            req.headers.transactionid = uuidv4;
            res.set('transactionid', uuidv4);
        }
        else {
            req.headers.transactionid = transactionId;
            res.set('transactionid', transactionId);
        }
        next();
    }
    
}