import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { calculatePercentage, lambdaHandler, simulate } from '../app';
import { expect, describe, it } from '@jest/globals';
import { baseApiProxyEvent } from './baseApiProxyEvent';

describe('Unit test for app handler', () => {
    const numberOfSimulations = 100;

    it('verifies successful response, correct object keys, and the math adds up', async () => {
        const event: APIGatewayProxyEvent = {
            ...baseApiProxyEvent,
            body: JSON.stringify({
                numberOfSimulations: numberOfSimulations,
                shouldChangeDoor: true,
            }),
        };
        const result: APIGatewayProxyResult = await lambdaHandler(event);

        expect(result.statusCode).toEqual(200);

        const responseObject = JSON.parse(result.body);

        expect(responseObject).toHaveProperty('numberOfSimulations');
        expect(responseObject).toHaveProperty('wins');
        expect(responseObject).toHaveProperty('losses');
        expect(responseObject).toHaveProperty('winPercentage');
        expect(responseObject).toHaveProperty('lossPercentage');

        expect(responseObject.numberOfSimulations).toEqual(numberOfSimulations);
        expect(responseObject.wins + responseObject.losses).toEqual(responseObject.numberOfSimulations);
        expect(Math.round(responseObject.winPercentage + responseObject.lossPercentage)).toEqual(100);
    });

    it('verifies successful response if shouldChangeDoor is false', async () => {
        const event: APIGatewayProxyEvent = {
            ...baseApiProxyEvent,
            body: JSON.stringify({
                numberOfSimulations: numberOfSimulations,
                shouldChangeDoor: false,
            }),
        };
        const result: APIGatewayProxyResult = await lambdaHandler(event);

        expect(result.statusCode).toEqual(200);

        const responseObject = JSON.parse(result.body);

        expect(responseObject).toHaveProperty('numberOfSimulations');
        expect(responseObject).toHaveProperty('wins');
        expect(responseObject).toHaveProperty('losses');
        expect(responseObject).toHaveProperty('winPercentage');
        expect(responseObject).toHaveProperty('lossPercentage');

        expect(responseObject.numberOfSimulations).toEqual(numberOfSimulations);
        expect(responseObject.wins + responseObject.losses).toEqual(responseObject.numberOfSimulations);
        expect(Math.round(responseObject.winPercentage + responseObject.lossPercentage)).toEqual(100);
    });

    it('verifies response with invalid parameters', async () => {
        const event: APIGatewayProxyEvent = {
            ...baseApiProxyEvent,
            body: JSON.stringify({
                numberOfSimulations: true,
                shouldChangeDoor: 100,
            }),
        };
        const result: APIGatewayProxyResult = await lambdaHandler(event);

        expect(result.statusCode).toEqual(400);

        expect(JSON.parse(result.body)).toEqual({
            error: 'Invalid parameters',
            message: 'numberOfSimulations must be a number and shouldChangeDoor must be a boolean.',
        });
    });

    it('verifies response with missing parameters', async () => {
        const event: APIGatewayProxyEvent = {
            ...baseApiProxyEvent,
            body: JSON.stringify({
                shouldChangeDoor: false,
            }),
        };
        const result: APIGatewayProxyResult = await lambdaHandler(event);

        expect(result.statusCode).toEqual(400);

        expect(JSON.parse(result.body)).toEqual({
            error: 'Missing parameters',
            message: 'The request must include numberOfSimulations and shouldChangeDoor.',
        });
    });

    it('verifies that numberOfSimulations parameter is within range', async () => {
        const event: APIGatewayProxyEvent = {
            ...baseApiProxyEvent,
            body: JSON.stringify({
                numberOfSimulations: 10000000,
                shouldChangeDoor: false,
            }),
        };
        const result: APIGatewayProxyResult = await lambdaHandler(event);

        expect(result.statusCode).toEqual(400);

        expect(JSON.parse(result.body)).toEqual({
            error: 'Invalid value',
            message: 'The provided numberOfSimulations value is outside the accepted range (1-10000).',
        });
    });

    it('should return 500 when an error is thrown', async () => {
        const event: Partial<APIGatewayProxyEvent> = {
            body: '{invalidJson', // invalid JSON string
        };

        const result = await lambdaHandler(event as APIGatewayProxyEvent);

        expect(result.statusCode).toEqual(500);
        expect(JSON.parse(result.body)).toEqual({
            message: 'some error happened',
        });
    });
});

describe('calculatePercentage', () => {
    it('should calculate the correct percentage', () => {
        const result = calculatePercentage(50, 200);
        expect(result).toBe(25);
    });

    it('should handle division by zero', () => {
        const result = calculatePercentage(0, 0);
        expect(result).toBeNaN();
    });

    it('should round the result to 2 decimal places', () => {
        const result = calculatePercentage(7, 30);
        expect(result).toBe(23.33);
    });
});

describe('simulate', () => {
    it('should simulate with changing door and results should add up', () => {
        const result = simulate(100, true);
        expect(result.wins).toBeGreaterThanOrEqual(0);
        expect(result.losses).toBeGreaterThanOrEqual(0);
        expect(result.wins + result.losses).toBe(100);
    });

    it('should simulate without changing door and results should add up', () => {
        const result = simulate(100, false);
        expect(result.wins).toBeGreaterThanOrEqual(0);
        expect(result.losses).toBeGreaterThanOrEqual(0);
        expect(result.wins + result.losses).toBe(100);
    });
});
