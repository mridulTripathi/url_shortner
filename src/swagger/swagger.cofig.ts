import { UrlResponseModel } from "../models/urlResponse";

export const appConfig = {
  swagger: {
    swaggerDefinition: {
      openapi: "3.0.1",
      info: {
        title: "Short URL API",
        version: "1.0.0",
        description: "API service for Short URL APP built on Express",
        /*termsOfService: 'TnC',*/
        contact: {
          name: "Short URL API",
          email: "mridulmtripathi@gmail.com.com",
        },
      },
      paths: {
        "/": {
          post: {
            summary: "Initial API end point",
            description:
              "Takes in a long URL in body and return a shortened URL",
            responses: {
              "200": {
                description: "JSON with short URL and extension",
                content: {
                  "application/json": {
                    schema: JSON.stringify(UrlResponseModel),
                  },
                },
              },
              "400": {
                description:
                  "JSON with error message if long URL is not found valid",
                content: {
                  "application/json": {
                    schema: JSON.stringify(UrlResponseModel),
                  },
                },
              },
            },
          },
        },
        "/{shortURL}": {
          get: {
            summary: "API end point to get back origional URL",
            description:
              "Takes in a long URL in body and return a shortened URL",
            responses: {
              "200": {
                description: "JSON with long URL and other details",
                content: {
                  "application/json": {
                    schema: JSON.stringify(UrlResponseModel),
                  },
                },
              },
              "400": {
                description:
                  "JSON with error message if long URL is not found valid",
                content: {
                  "application/json": {
                    schema: JSON.stringify(UrlResponseModel),
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
