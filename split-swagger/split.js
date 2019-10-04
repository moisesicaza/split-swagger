"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * ===================================
 * Splits the swagger.yaml file.
 *
 * How to use it? : npm run split-watch -- [folder]
 * ===================================
 */
const fs = require("fs");
const lodash_1 = require("lodash");
const glob = require("glob");
const YAML = require("js-yaml");
const extendify = require("extendify");
const watch = require("node-watch");

let PATH = './api/swagger';

/**
 * Merge two past arrays as parameters.
 *
 * @param {Array} arr1 Main Array.
 * @param {Array} arr2 Array to merge
 * @return {Array}
 */
function _array_merge(arr1, arr2) {
  arr2.map(function (item) {
    arr1.push(item);
  });
  return arr1;
}

/**
 * Sort data by default order
 *
 * @param {Array} yamlContent Array of objects obtain of parser .yaml files
 * @return {Array}
 */
const order_result = (yamlContent) => {
  let result = [];
  const paths = [];
  const baseFile = [];
  const definitions = [];
  for (const i in yamlContent) {
    if (yamlContent.hasOwnProperty(i) && typeof yamlContent[i] !== 'undefined') {
      // Get header of the .yaml file
      if (yamlContent[i].hasOwnProperty('swagger')) {
        baseFile.push(yamlContent[i]);
        // Get body of the .yaml file
      }
      else if (yamlContent[i].hasOwnProperty('definitions')) {
        definitions.push(yamlContent[i]);
        // Get footer of the .yaml file
      }
      else {
        paths.push(yamlContent[i]);
      }
    }
  }
  // Merge header content file with the paths files
  if (baseFile.length > 0 && paths.length > 0) {
    result = _array_merge(baseFile, paths);
  }
  // End of file content
  if (definitions.length > 0) {
    result = _array_merge(result, definitions);
  }
  return result;
};

/**
 * Finds all files with the extension .yaml in the server folder to merge them into one
 *
 * @see https://github.com/idlerun/swagger-yaml
 */
const generate_yaml = () => {
  glob(PATH + '/fragments/**/*.yaml', function (er, files) {
    const extend = extendify({ inPlace: false, isDeep: true });
    const contents = files.map(f => {
      return YAML.load(fs.readFileSync(f).toString());
    });
    // Sorting result
    const sortedContent = order_result(contents);
    const merged = sortedContent.reduce(extend);
    // Log message
    console.log('Generating swagger.yaml');
    fs.writeFileSync(PATH + '/swagger.yaml', YAML.dump(merged));
  });
};

try {
  const apiVersionPath = lodash_1.last(process.argv);
  if (fs.existsSync(`${PATH}/${apiVersionPath}`)) {
    PATH = `${PATH}/${apiVersionPath}`;
    watch(`${PATH}/fragments`, { filter: /\.yaml$/, recursive: true }, generate_yaml);
  }
  else {
    console.log('Split Swagger Error: The path does not exist.');
  }
} catch (e) {
  console.log(`Split Swagger Error: ${e.message}`);
}