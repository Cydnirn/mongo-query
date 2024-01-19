import FilteringFactory from "./lib/QueryGenerator";

import { QType, QGlobal, QInput } from "#types/Query.types";

export interface QueryParam<T> {
    field: string | T;
    value: string | undefined;
    type?: QType;
    input?: QInput | QueryParam<T>[];
}

function genQ<T>(params: QueryParam<T>[]): QGlobal<T>[] {
    const Q: QGlobal<T>[] = [];
    for (const param of params) {
        const Query: QGlobal<T> = {
            input: param.value,
            type: param.type ?? "DEF",
            query: param.field,
            queryInput: Array.isArray(param.input)
                ? genQ(param.input as QueryParam<T>[])
                : param.input ?? param.value,
        };
        Q.push(Query);
    }
    return Q;
}

export default function mongoQuery<T>(params: QueryParam<T>[]): T {
    const Q: QGlobal<T>[] = [];
    for (const param of params) {
        const Query: QGlobal<T> = {
            input: param.value,
            type: param.type ?? "DEF",
            query: param.field,
            queryInput: Array.isArray(param.input)
                ? genQ(param.input as QueryParam<T>[])
                : param.input ?? param.value,
        };
        Q.push(Query);
    }

    return FilteringFactory.GenerateQuery<T>(Q as QGlobal<string>[]);
}
