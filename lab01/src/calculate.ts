import { Dict, MatchResult, Semantics } from "ohm-js";
import grammar, { AddMulActionDict } from "./addmul.ohm-bundle";

export const addMulSemantics: AddMulSemantics = grammar.createSemantics() as AddMulSemantics;


const addMulCalc = {
    Sum_plus(arg0: any, arg1: any, arg2: any) {
        return arg0.calculate() + arg2.calculate();
    },

    Sum(arg0: any) {
        return arg0.calculate();
    },

    Mul_mul(arg0: any, arg1: any, arg2: any) {
        return arg0.calculate() * arg2.calculate();
    },

    Mul(arg0: any) {
        return arg0.calculate();
    },

    Atom_paren(arg0: any, arg1: any, arg2: any) {
        return arg1.calculate();
    },

    Atom(arg0: any) {
        return arg0.calculate();
    },

    number(arg0: any) {
        return parseInt(this.sourceString, 10);
    }
} satisfies AddMulActionDict<number>

addMulSemantics.addOperation<Number>("calculate()", addMulCalc);

interface AddMulDict  extends Dict {
    calculate(): number;
}

interface AddMulSemantics extends Semantics
{
    (match: MatchResult): AddMulDict;
}
