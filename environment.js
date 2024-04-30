import parse from './parser.js';
import evaluate from './evaluator.js';

const topScope = Object.create(null);

topScope.true = true;
topScope.false = false;

topScope.print = value => {
  console.log(value);
  return value;
}

topScope.array = (...values) =>  values;
topScope.length = (array) => array.length;
topScope.element = (array, i) => array[i];

for (let op of ["+", "-", "*", "/", "==", "<", ">",]) {
  topScope[op] = Function("a", "b", `return a ${op} b;`);
}

for (let op of ["+", "-", "*", "/", "==", "<", ">",]) {
  topScope[op] = Function("a", "b", `return a ${op} b;`);
}

function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}


run(`
  do(define(f, fun(a, fun(b, +(a, b)))),
    print(f(4)(5)))
  `);
