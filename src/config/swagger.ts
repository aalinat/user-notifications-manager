import swaggerJSDoc from 'swagger-jsdoc';

const generateSwaggerSpec = () => {
    // Manually defined OpenAPI spec definition
    const swaggerOptions = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'My API',
                version: '1.0.0',
                description: 'API documentation for my application',
            },
        },
        apis: ['./src/api/controllers/*.ts'], // Automatically find controllers to scan metadata
    };

    // Use swagger-jsdoc to generate the spec
    return swaggerJSDoc(swaggerOptions);
};

export const swaggerSpec = generateSwaggerSpec();