import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { MockMongodbModule } from './MockMongodb.module';


describe('Module common-resources-mongodb (e2e)', () => {

    let app: INestApplication;
    let httpServer: any; // unica instancia del servidor http para todos los test


    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [MockMongodbModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();

        httpServer = app.getHttpServer();
    });


    /**
     * 
     * 
     * 
     * 
     */

    it('/ (GET_ALL) - success - http/200', () => {
        return request(httpServer)
            .get('/microservice/template/mongodb/crud/GET_ALL')
            .set('transactionid', 'PA20220131000005')
            .expect(200)
    });

    it('/ (GET_BY_ID) - success - http/200', () => {
        return request(httpServer)
            .get('/microservice/template/mongodb/crud/GET_BY_ID/630bfc8bc221367c6deae074')
            .set('transactionid', 'PA20220131000005')
            .expect(200)
    });

    it('/ (GET_BY_PARAMS) - success - http/200', () => {
        return request(httpServer)
            .get('/microservice/template/mongodb/crud/GET_BY_PARAMS/?baseForm=bend')
            .set('transactionid', 'PA20220131000005')
            .expect(200)
    });

    it('/ (POST) - success - http/200', () => {
        return request(httpServer)
            .post('/microservice/template/mongodb/crud/POST')
            .set('transactionid', 'PA20220131000005')
            .send(
                {
                    "baseForm": "blow", 
                    "pastSimple": "blew",
                    "pastParticiple": "blown", 
                    "traduction": "soplar"
                }
            )
            .expect(201)
    });

    it('/ (DELETE_ONE) - success - http/200', () => {
        return request(httpServer)
            .del('/microservice/template/mongodb/crud/DELETE_ONE/630bfc8bc221367c6deae074')
            .set('transactionid', 'PA20220131000005')
            .expect(200)
    });

    it('/ (UPDATE_ONE) - success - http/200', () => {
        return request(httpServer)
            .put('/microservice/template/mongodb/crud/UPDATE_ONE/630bfdb2c221367c6deae07a')
            .set('transactionid', 'PA20220131000005')
            .send(
                {
                    "baseForm": "buy", 
                    "pastSimple": "bought",
                    "pastParticiple": "bought", 
                    "traduction": "comprar"
                }
            )
            .expect(200)
    });



    /**
     * 
     * 
     * 
     * 
     */

    it('/ (GET_BY_ID) - error - id not found - http/400', () => {
        return request(httpServer)
            .get('/microservice/template/mongodb/crud/GET_BY_ID/630bfc8bc221367c6deae000')
            .set('transactionid', 'PA20220131000005')
            .expect(400)
    });

    it('/ (POST) - error - the object test already exists in db - http/400', () => {
        return request(httpServer)
            .post('/microservice/template/mongodb/crud/POST')
            .set('transactionid', 'PA20220131000005')
            .send(
                {
                    "baseForm": "build", 
                    "pastSimple": "built",
                    "pastParticiple": "built", 
                    "traduction": "construir"
                }
            )
            .expect(400)
    });

    it('/ (POST) - error - validate request - http/400', () => {
        return request(httpServer)
            .post('/microservice/template/mongodb/crud/POST')
            .set('transactionid', 'PA20220131000005')
            .send(
                {
                    "baseForm": "build", 
                    "pastParticiple": "built", 
                    "traduction": "construir"
                }
            )
            .expect(400)
    });

    it('/ (POST) - error - invalid URL - http/404', () => {
        return request(httpServer)
            .post('/microservice/template/mongodb/crud/POSTT')
            .set('transactionid', 'PA20220131000005')
            .send(
                {
                    "baseForm": "build", 
                    "pastSimple": "built",
                    "pastParticiple": "built", 
                    "traduction": "construir",
                }
            )
            .expect(404)
    });

    it('/ (GET_BY_ID) - error - id not found - http/403', () => {
        return request(httpServer)
            .get('/microservice/template/mongodb/crud/GET_BY_ID/630bfc8bc221367c6deae002')
            .set('transactionid', 'PA20220131000005')
            .expect(500)
    });

    it('/ (GET_BY_ID) - error - id not found - http/500', () => {
        return request(httpServer)
            .get('/microservice/template/mongodb/crud/GET_BY_ID/630bfc8bc221367c6deae001')
            .set('transactionid', 'PA20220131000005')
            .expect(500)
    });



    /**
     * 
     * 
     * 
     * 
     */

    for(let i = 0; i < 6; i++){
        it(`/ CIRCUIT_BREAKER - (GET_BY_ID) - error - id not found - state move green to red - Request #${i+1}`, () => {
            return request(httpServer)
                .get('/microservice/template/mongodb/crud/GET_BY_ID/630bfc8bc221367c6deae000')
        });
	}

    it('/ CIRCUIT_BREAKER - (GET_BY_ID) - error - id not found - red state - http/503', () => {
        return request(httpServer)
            .get('/microservice/template/mongodb/crud/GET_BY_ID/630bfc8bc221367c6deae000')
            .set('transactionid', 'PA20220131000005')
            .expect(503)
    });

    it('/ CIRCUIT_BREAKER - (GET_ALL) - success - yellow state - http/200', () => {
        jest.useFakeTimers(); // configura timeout mock para jest
		setTimeout(() => {}, 35000);
		jest.runAllTimers(); // hace que para el servidor HTTP hayan pasado 35 segundos
        return request(httpServer)
            .get('/microservice/template/mongodb/crud/GET_ALL')
            .set('transactionid', 'PA20220131000005')
            .expect(200)
    });

    for(let i = 0; i < 6; i++){
        it(`/ CIRCUIT_BREAKER - (GET_ALL) - success - state move yellow to green - Request #${i+1}`, () => {
            return request(httpServer)
                .get('/microservice/template/mongodb/crud/GET_ALL')
        });
	}
});
