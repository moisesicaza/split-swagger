import express from "express";
import ApiVersioning from "./versioning/ApiVersioning";

const app = express();
const host = 'localhost';
const port = process.env.PORT || 10010;

const versioning = new ApiVersioning(__dirname);
const swaggerFile1 = ApiVersioning.generateSwaggerFile(host, port, './api/swagger/v1/swagger.yaml');
const swaggerFile2 = ApiVersioning.generateSwaggerFile(host, port, './api/swagger/v2/swagger.yaml');

versioning.createAppVersion(app, swaggerFile1, '/api/v1', {
  swaggerUi: '/docs',
  apiDocs: '/swagger',
});
versioning.createAppVersion(app, swaggerFile2, '/api/v2', {
  swaggerUi: '/docs',
  apiDocs: '/swagger',
});

app.listen(port);

module.exports = app;
