import { ReversePolishNotationActionDict} from "./rpn.ohm-bundle";

export const rpnCalc = {
    Expr(arg0: any){
        return arg0.calculate();
    },
    Sum(arg0: any, arg1: any, arg2: any){
        return arg0.calculate() + arg1.calculate();
    },
    Mul(arg0: any, arg1: any, arg2: any){
        return arg0.calculate() * arg1.calculate();
    },
    number(arg0: any){
        return parseInt(this.sourceString, 10);
    }
} satisfies ReversePolishNotationActionDict<number>;
