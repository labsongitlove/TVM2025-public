import { c as C, Op, I32 } from "@tvm/wasm";
import { Expr } from "@tvm/lab04";
import { buildOneFunctionModule, Fn } from "./emitHelper";
const { i32, get_local} = C;

export function getVariables(e: Expr): string[] {
    const vars = new Set<string>();

    function getVariblesRecursive(eLocal: Expr, varsLocal: Set<string>) {
        switch (eLocal.type) {
            case "const":
                break;

            case "var":
                varsLocal.add(eLocal.value);
                break;

            case "unarop":
                getVariblesRecursive(eLocal.value, varsLocal);
                break;

            case "binop":
                getVariblesRecursive(eLocal.leftValue, varsLocal);
                getVariblesRecursive(eLocal.rightValue, varsLocal);
                break;

            default:
                throw new Error("");
        }
    }
    getVariblesRecursive(e, vars)

    return [...vars];
}

export async function buildFunction(e: Expr, variables: string[]): Promise<Fn<number>> {
  let expr = wasm(e, variables);
  return await buildOneFunctionModule("test", variables.length, [expr]);
}

function wasm(e: Expr, args: string[]): Op<I32> {
    switch (e.type) {
        case "const":
            return i32.const(e.value);

        case "var":
            const index = args.indexOf(e.value);

            if (index === -1) { //request when var isn't found, cheak doc
                throw new WebAssembly.RuntimeError(e.value + "isn't found");
            }

            return get_local(i32, index);

        case "unarop":
            return i32.sub(i32.const(0), wasm(e.value, args));

        case "binop":
            const left = wasm(e.leftValue, args);
            const right = wasm(e.rightValue, args);

            if (e.op == "+") 
                return i32.add(left, right);
            else if (e.op == "-") 
                return i32.sub(left, right);
            else if (e.op == "/") 
                    return i32.div_s(left, right);
            else if (e.op == "*") 
                    return i32.mul(left, right);
            else
                throw new Error("");
        default:
            throw new Error("");
    }
}
