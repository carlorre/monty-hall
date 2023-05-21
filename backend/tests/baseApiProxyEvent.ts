import { APIGatewayProxyEvent } from 'aws-lambda';

export const baseApiProxyEvent: APIGatewayProxyEvent = {
    httpMethod: '',
    body: '',
    headers: {},
    isBase64Encoded: false,
    multiValueHeaders: {},
    multiValueQueryStringParameters: {},
    path: '',
    pathParameters: {},
    queryStringParameters: {},
    requestContext: {
        accountId: '',
        apiId: '',
        authorizer: {},
        httpMethod: '',
        identity: {
            accessKey: '',
            accountId: '',
            apiKey: '',
            apiKeyId: '',
            caller: '',
            clientCert: {
                clientCertPem: '',
                issuerDN: '',
                serialNumber: '',
                subjectDN: '',
                validity: { notAfter: '', notBefore: '' },
            },
            cognitoAuthenticationProvider: '',
            cognitoAuthenticationType: '',
            cognitoIdentityId: '',
            cognitoIdentityPoolId: '',
            principalOrgId: '',
            sourceIp: '',
            user: '',
            userAgent: '',
            userArn: '',
        },
        path: '',
        protocol: '',
        requestId: '',
        requestTimeEpoch: 0,
        resourceId: '',
        resourcePath: '',
        stage: '',
    },
    resource: '',
    stageVariables: {},
};
