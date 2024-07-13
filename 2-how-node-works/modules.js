//arguments is an array in Js that contains all the values passed in to function.
console.log(arguments);
/*
  '(function (exports, require, module, __filename, __dirname) { ',
  '\n});'
  this is for internal use of NodeJs.
  */
console.log(require("module").wrapper);

//module.exports
const calculator_class_based_import = require("./class_based_calculator");
calculator_class_based_import_obj = new calculator_class_based_import();
console.log(calculator_class_based_import_obj.add(2, 5));

//exports
const calculator_property_based_import = require("./property_based_exports");
console.log(calculator_property_based_import.add(2, 7));
//array destructuring exports imports.
const { add, multiply, devide } = require("./property_based_exports");
console.log(multiply(3, 4));

/*
caching demostration.
Runs only once per import
multiple calls.
multiple calls.
multiple calls.
Runs only once per import it runs only once 
and 'multiple calls' is printed from cache as this function might have stored in cache.
*/
require("./caching")();
require("./caching")();
require("./caching")();
