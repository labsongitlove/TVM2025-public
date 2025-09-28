import { ReversePolishNotationActionDict } from "./rpn.ohm-bundle";

export const rpnStackDepth = {
    Expr(arg0: any){
        return arg0.stackDepth;
    },
    Sum(arg0: any, arg1: any, arg2: any){
        const left = arg0.stackDepth;
        const right = arg1.stackDepth;
        return {
            max: Math.max(left.max, left.out + right.max),
            out: left.out + right.out - 1, 
        };
    },
    Mul(arg0: any, arg1: any, arg2: any){
        const left = arg0.stackDepth;
        const right = arg1.stackDepth;
        return {
            max: Math.max(left.max, left.out + right.max),
            out: left.out + right.out - 1, 
        };
    },
    number(arg0: any){
        return {max: 1, out: 1};
    }
} satisfies ReversePolishNotationActionDict<StackDepth>;
export type StackDepth = {max: number, out: number};
