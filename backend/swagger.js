// swagger.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Opportunities & Testimonies API",
      version: "1.0.0",
      description:
        "API for managing admin-added opportunities and user-submitted testimonies",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [], // No external files used
};

const swaggerSpec = swaggerJsDoc(options);

// Define API paths manually
swaggerSpec.paths = {
  "/api/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Login a user or admin",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: { type: "string" },
                password: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Logged in successfully" },
        401: { description: "Invalid credentials" },
      },
    },
  },
  "/api/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "Register an admin",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "email", "password"],
              properties: {
                name: { type: "string" },
                email: { type: "string" },
                password: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Admin created" },
      },
    },
  },

  // Opportunities
  "/api/opportunities": {
    get: {
      tags: ["Opportunities"],
      summary: "Get all opportunities",
      parameters: [
        {
          in: "query",
          name: "category",
          schema: {
            type: "string",
            enum: ["all", "Education", "Skills", "Career", "Mentorship"],
          },
        },
      ],
      responses: {
        200: { description: "List of opportunities" },
      },
    },
    post: {
      tags: ["Opportunities"],
      summary: "Create an opportunity",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["category", "title", "description", "date", "link"],
              properties: {
                category: {
                  type: "string",
                  enum: ["Education", "Skills", "Career", "Mentorship"],
                },
                title: { type: "string" },
                description: { type: "string" },
                date: { type: "string", format: "date" },
                link: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Opportunity created" },
      },
    },
  },
  "/api/opportunities/{id}": {
    put: {
      tags: ["Opportunities"],
      summary: "Update an opportunity by ID",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                category: { type: "string" },
                title: { type: "string" },
                description: { type: "string" },
                date: { type: "string" },
                link: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Opportunity updated" },
        404: { description: "Opportunity not found" },
      },
    },
    delete: {
      tags: ["Opportunities"],
      summary: "Delete an opportunity by ID",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Opportunity deleted" },
        404: { description: "Opportunity not found" },
      },
    },
  },

  // Testimonies
  "/api/testimonies": {
    get: {
      tags: ["Testimonies"],
      summary: "Get all testimonies",
      responses: {
        200: { description: "List of testimonies" },
      },
    },
    post: {
      tags: ["Testimonies"],
      summary: "Submit a testimony",
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              required: ["image", "description", "name", "fieldOfStudy"],
              properties: {
                image: { type: "string", format: "binary" },
                description: { type: "string" },
                name: { type: "string" },
                fieldOfStudy: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Testimony submitted" },
      },
    },
  },
  "/api/testimonies/{id}": {
    put: {
      tags: ["Testimonies"],
      summary: "Update a testimony by ID",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                image: { type: "string", format: "binary" },
                description: { type: "string" },
                name: { type: "string" },
                fieldOfStudy: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Testimony updated" },
        404: { description: "Testimony not found" },
      },
    },
    delete: {
      tags: ["Testimonies"],
      summary: "Delete a testimony by ID",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Testimony deleted" },
        404: { description: "Testimony not found" },
      },
    },
  },
};

const setupSwaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📘 Swagger Docs available at: http://localhost:5000/api-docs`);
};

module.exports = setupSwaggerDocs;
