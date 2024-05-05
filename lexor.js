var Lexor = /** @class */ (function () {
    function Lexor(source) {
        this.source = source;
        this.cur, this.col, this.row = 0;
    }
    Lexor.prototype.parseApply = function (expr, program) {
        program = this.getNextToken(program);
        if (program[0] != "(") {
            return { expr: expr, rest: program };
        }
        program = this.getNextToken(program.slice(1));
        expr = { type: "apply", operator: expr, args: [] };
        while (program[0] != ")") {
            var arg = this.parseExpression(program);
            expr.args.push(arg.expr);
            program = this.getNextToken(arg.rest);
            if (program[0] == ",") {
                program = this.getNextToken(program.slice(1));
            }
            else if (program[0] != ")") {
                throw new SyntaxError("Expected ',' or ')'");
            }
        }
        return this.parseApply(expr, program.slice(1));
    };
    Lexor.prototype.parseExpression = function (program) {
        program = this.getNextToken(program);
        var match, expr;
        if (match = /^([^"]*)"/.exec(program)) {
            expr = { type: "value", value: match[1] };
        }
        else if (match = /^\d+\b/.exec(program)) {
            expr = { type: "value", value: Number(match[0]) };
        }
        else if (match = /^[^\s(),#"]+/.exec(program)) {
            expr = { type: "word", name: match[0] };
        }
        else {
            throw new SyntaxError("Unexpected syntax: " + program);
        }
        return this.parseApply(expr, program.slice(match[0].length));
    };
    Lexor.prototype.skipSpace = function (string) {
        var skipable = string.match(/^(\s|#.*)*/);
        return string.slice(skipable[0].length);
    };
    ;
    Lexor.prototype.parse = function (program) {
        var _a = this.parseExpression(program), expr = _a.expr, rest = _a.rest;
        if (this.getNextToken(rest).length > 0) {
            throw new SyntaxError("Unexpected text after program.");
        }
        return expr;
    };
    return Lexor;
}());
console.log(Lexor.prototype.parse("# hello\nx"));
