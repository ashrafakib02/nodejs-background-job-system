import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Background Job System API",
      version: "1.0.0",
      description: "Node.js background job processing system with BullMQ, Redis, PostgreSQL, and worker-based async processing"
    },
    servers: [
      {
        url: "http://localhost:5001/api"
      }
    ]
  },
  apis: ["./src/routes/*.js"]
};

export const swaggerSpec = swaggerJsdoc(options);