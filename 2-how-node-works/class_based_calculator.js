// class Calculator {
//   add(a, b) {
//     return a + b;
//   }

//   multiply(a, b) {
//     return a * b;
//   }

//   devide(a, b) {
//     return a / b;
//   }
// }
// //when you want to export only single class or function you use module.exports
// module.exports = Calculator;
// -------------------------------------------------------------------------------
//exporting class as expression
module.exports = class {
  add(a, b) {
    return a + b;
  }

  multiply(a, b) {
    return a * b;
  }

  devide(a, b) {
    return a / b;
  }
};
