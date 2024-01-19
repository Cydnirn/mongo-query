import FilteringFactory from "./lib/QueryGenerator";

import { QType, QGlobal, QInput } from "#types/Query.types";

export interface QueryParam<T> {
    field: string | T;
    value: string | undefined;
    type?: QType;
    input?: QInput | QueryParam<T>[];
    expect?: string | number | boolean;
}

function isNewQuery<T>(
    input: string[] | number[] | boolean[] | QueryParam<T>[]
) {
    return input.some((i) => {
        return (
            typeof i === "string" ||
            typeof i === "number" ||
            typeof i === "boolean"
        );
    })
        ? (input as string[])
        : genQ<T>(input as QueryParam<T>[]);
}

function genQ<T>(params: QueryParam<T>[]): QGlobal<T>[] {
    const Q: QGlobal<T>[] = [];
    for (const param of params) {
        const Query: QGlobal<T> = {
            input: param.value,
            type: param.type ?? "DEF",
            expect: param.expect,
            query: param.field,
            queryInput: Array.isArray(param.input)
                ? isNewQuery<T>(param.input)
                : param.input ?? param.value,
        };
        Q.push(Query);
    }
    return Q;
}

export default function mongoQuery<T>(params: QueryParam<T>[]): T {
    const Q = genQ<T>(params);
    return FilteringFactory.GenerateQuery<T>(Q as QGlobal<string>[]);
}
