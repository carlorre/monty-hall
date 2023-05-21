import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const requestBody = event.body ? JSON.parse(event.body) : null;

        if (
            !requestBody ||
            !requestBody.hasOwnProperty('numberOfSimulations') ||
            !requestBody.hasOwnProperty('shouldChangeDoor')
        )
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: 'Missing parameters',
                    message: 'The request must include numberOfSimulations and shouldChangeDoor.',
                }),
            };

        const { numberOfSimulations, shouldChangeDoor } = requestBody;

        if (typeof numberOfSimulations !== 'number' || typeof shouldChangeDoor !== 'boolean') {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: 'Invalid parameters',
                    message: 'numberOfSimulations must be a number and shouldChangeDoor must be a boolean.',
                }),
            };
        }

        if (numberOfSimulations < 1 || numberOfSimulations > 10000) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: 'Invalid value',
                    message: 'The provided numberOfSimulations value is outside the accepted range (1-10000).',
                }),
            };
        }

        const { wins, losses } = simulate(numberOfSimulations, shouldChangeDoor);

        const responseObject = {
            numberOfSimulations,
            wins,
            losses,
            winPercentage: calculatePercentage(wins, numberOfSimulations),
            lossPercentage: calculatePercentage(losses, numberOfSimulations),
        };

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(responseObject),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};

const simulate = (numberOfSimulations: number, shouldChangeDoor: boolean): { wins: number; losses: number } => {
    let wins = 0;
    const assignDoor = () => Math.floor(Math.random() * 3);

    for (let i = 0; i < numberOfSimulations; i++) {
        const prize = assignDoor();
        const choice = assignDoor();

        if (shouldChangeDoor) {
            if (prize !== choice) wins += 1;
        } else {
            if (prize === choice) wins += 1;
        }
    }

    const losses = numberOfSimulations - wins;

    return { wins, losses };
};

const calculatePercentage = (portion: number, total: number) => parseFloat(((portion / total) * 100).toFixed(2));
