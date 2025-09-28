import {  MatchResult } from "ohm-js";
import grammar from "./rpn.ohm-bundle";
import { rpnSemantics } from "./semantics";
import { StackDepth } from "./stackDepth";

export function evaluate(source: string): number
{ 
    return calculate(parse(source));
}
export function maxStackDepth(source: string): number
{ 
    return stackDepth(parse(source));
}

export class SyntaxError extends Error
{
}

function parse(content: string): MatchResult 
{
    const match = grammar.match(content);
    
    if (match.failed()) 
    {
        throw new SyntaxError(match.message)
    }
    return match;
}

function calculate(expression: MatchResult): number 
{
     return rpnSemantics(expression).calculate();
}

function stackDepth(expression: MatchResult): number 
{
     return rpnSemantics(expression).stackDepth.max;
}