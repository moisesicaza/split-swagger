import * as fs from "fs";
import express from "express";
import * as yaml from "js-yaml";
import SwaggerExpress from "swagger-express-mw";
import SwaggerUi from "swagger-tools/middleware/swagger-ui";

export default class ApiVersioning {
  /**
   * Constructor.
   *
   * @param {string} rootDirectory The root directory of the project.
   * @param {Object} swaggerSecurityHandler The Swagger security handler object, eg. for Bearer Authentication logic.
   */
  constructor(rootDirectory, swaggerSecurityHandler=null) {
    this.rootDirectory = rootDirectory;
    this.swaggerSecurityHandler = swaggerSecurityHandler;
  }

  /**
   * Creates a Swagger-Express applications to API versioning.
   *
   * @param {Object} mainApp Express main application instance.
   * @param {string} swaggerFile The Swagger file path.
   * @param {string} versionPath API version path
   * @param {Object} options The SwaggerUI options.
   */
  createAppVersion(mainApp, swaggerFile, versionPath, options) {
    const newExpressApp = express();

    SwaggerExpress.create({
      appRoot: this.rootDirectory,
      swagger: swaggerFile,
      swaggerSecurityHandlers: this.swaggerSecurityHandler

    }, function(err, swaggerExpress) {
      if (err) throw err;

      // Add SwaggerUi settings
      newExpressApp.use(SwaggerUi(swaggerExpress.runner.swagger, options));

      // Add new Express application to main application
      mainApp.use(versionPath, newExpressApp);

      // Register main application
      swaggerExpress.register(mainApp);
    });
  }

  /**
   * Generates Swagger file location and settings.
   *
   * @param {string} host
   * @param {string} port
   * @param {string} path The Swagger file path.
   * @return Object
   */
  static generateSwaggerFile(host, port, path) {
    const swaggerObject = yaml.safeLoad(fs.readFileSync(path, 'utf8'));
    swaggerObject.host = `${host}:${port}`;

    return swaggerObject;
  }
}
