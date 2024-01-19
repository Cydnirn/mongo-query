import stringToBoolean from "./StringToBoolean";
import FilteringFactory from "./QueryGenerator";

import { QGlobal } from "#types/Query.types";

const DEFQuery = (Query: any, C: QGlobal) => {
    if (C.input !== undefined && C.input?.length !== 0) {
        Query[C.query] = C.queryInput;
        return Query[C.query];
    }
};

const BOOLQuery = (Query: any, C: QGlobal) => {
    if (C.input !== undefined && C.input?.length !== 0) {
        Query[C.query] =
            typeof C.queryInput === "string"
                ? stringToBoolean(C.queryInput)
                : C.queryInput;
        return Query[C.query];
    }
};

const EQQuery = (Query: any, C: QGlobal) => {
    if (C.input?.length !== 0 && C.input === C.expect) {
        Query[C.query] = C.queryInput;
        return Query[C.query];
    }
};

const NAMEQuery = (Query: any, C: QGlobal) => {
    if (C.input !== undefined && C.input?.length !== 0) {
        Query[C.query] = {
            $regex: C.queryInput,
            $options: "i",
        };
        return Query[C.query];
    }
};

const NEQQuery = (Query: any, C: QGlobal) => {
    if (C.input !== C.expect && C.input?.length !== 0) {
        Query[C.query] = C.queryInput;
        return Query[C.query];
    }
};

export const INQuery = (Query: any, C: QGlobal) => {
    if (C.input !== undefined && C.input?.length !== 0) {
        Query[C.query] = { $in: [C.queryInput] };
        return Query[C.query];
    }
};

export const INFQuery = (Query: any, C: QGlobal) => {
    if (C.input === C.expect && C.queryInput !== undefined) {
        Query[C.query] = {
            $in: C.queryInput,
        };
        return Query[C.query];
    }
};

export const GTEQuery = (Query: any, C: QGlobal, CNum: number) => {
    if (C.input !== undefined && C.input?.length !== 0) {
        Query[C.query] = {
            $gte: CNum,
        };
        return Query[C.query];
    }
};

export const GTESQuery = (Query: any, C: QGlobal) => {
    if (C.input !== undefined && C.input?.length !== 0) {
        Query[C.query] = {
            $gte: C.queryInput,
        };
        return Query[C.query];
    }
};

export const GTQuery = (Query: any, C: QGlobal, CNum: number) => {
    if (C.input !== undefined && C.input?.length !== 0) {
        Query[C.query] = {
            $gt: CNum,
        };
        return Query[C.query];
    }
};

export const LTEQuery = (Query: any, C: QGlobal, CNum: number) => {
    if (C.input !== undefined && C.input?.length !== 0) {
        Query[C.query] = {
            $lte: CNum,
        };
        return Query[C.query];
    }
};

export const LTQuery = (Query: any, C: QGlobal, CNum: number) => {
    if (C.input !== undefined && C.input?.length !== 0) {
        Query[C.query] = {
            $lt: CNum,
        };
        return Query[C.query];
    }
};

export const INCQuery = (Query: any, C: QGlobal, CNum: number) => {
    if (C.input !== undefined && C.input?.length !== 0) {
        Query["$inc"] = { [C.query]: CNum };
        return Query["$inc"];
    }
};

export const ORQuery = (Query: any, C: QGlobal) => {
    if (
        C.input !== undefined &&
        C.input.length !== 0 &&
        Array.isArray(C.queryInput)
    ) {
        const orQueries: any[] = [];
        for (const QueryInput of C.queryInput) {
            if (
                FilteringFactory.isQGlobal(QueryInput) &&
                QueryInput.queryInput !== undefined
            ) {
                orQueries.push(FilteringFactory.GenerateQuery([QueryInput]));
            }
        }
        if (orQueries.length > 0) {
            Query["$or"] = orQueries;
            return Query["$or"];
        }
    }
};

/**
 * This query generate if input is equal to expect
 * @param Query
 * @param C
 * @returns
 */
export const ORFQuery = (Query: any, C: QGlobal) => {
    if (
        C.input !== undefined &&
        C.input.length !== 0 &&
        Array.isArray(C.queryInput) &&
        C.input === C.expect
    ) {
        const orQueries: any[] = [];
        for (const QueryInput of C.queryInput) {
            if (
                FilteringFactory.isQGlobal(QueryInput) &&
                QueryInput.queryInput !== undefined
            ) {
                orQueries.push(FilteringFactory.GenerateQuery([QueryInput]));
            }
        }
        if (orQueries.length > 0) {
            Query["$or"] = orQueries;
            return Query["$or"];
        }
    }
};

export const ANDQuery = (Query: any, C: QGlobal) => {
    if (
        C.input !== undefined &&
        C.input.length !== 0 &&
        Array.isArray(C.queryInput)
    ) {
        const andQueries: any[] = [];
        for (const QueryInput of C.queryInput) {
            if (
                FilteringFactory.isQGlobal(QueryInput) &&
                QueryInput.queryInput !== undefined
            ) {
                andQueries.push(FilteringFactory.GenerateQuery([QueryInput]));
            }
        }
        if (andQueries.length > 0) {
            Query["$and"] = andQueries;
            return Query["$and"];
        }
    }
};

/**
 * This query generate if input is equal to expect
 * @param Query
 * @param C
 * @returns
 */
export const ANDFQuery = (Query: any, C: QGlobal) => {
    if (
        C.input !== undefined &&
        C.input.length !== 0 &&
        Array.isArray(C.queryInput) &&
        C.input === C.expect
    ) {
        const andQueries: any[] = [];
        for (const QueryInput of C.queryInput) {
            if (
                FilteringFactory.isQGlobal(QueryInput) &&
                QueryInput.queryInput !== undefined
            ) {
                andQueries.push(FilteringFactory.GenerateQuery([QueryInput]));
            }
        }
        if (andQueries.length > 0) {
            Query["$and"] = andQueries;
            return Query["$and"];
        }
    }
};

export const EXPRQuery = (Query: any, C: QGlobal) => {
    if (
        C.input !== undefined &&
        C.input.length !== 0 &&
        Array.isArray(C.queryInput)
    ) {
        const exprMagic: any[] = [];
        for (const QueryInput of C.queryInput) {
            if (
                FilteringFactory.isQGlobal(QueryInput) &&
                QueryInput.queryInput !== undefined
            ) {
                exprMagic.push(FilteringFactory.GenerateQuery([QueryInput]));
            }
        }
        if (exprMagic.length > 0) {
            for (const i of exprMagic) {
                //This has complexity of O log (f this shit)
                Query["$expr"] = {
                    ...Query["$expr"],
                    ...i,
                };
            }
        }
    }
};

export const EQGRSQuery = (Query: any, C: QGlobal) => {
    if (
        C.input !== undefined &&
        C.expect !== undefined &&
        C.queryInput !== undefined
    ) {
        Query["$eq"] = [{ [C.query]: C.queryInput }, C.expect];
        return Query["$eq"];
    }
};

export const EQGRQuery = (Query: any, C: QGlobal, CNum: number) => {
    if (
        C.input !== undefined &&
        C.expect !== undefined &&
        C.queryInput !== undefined
    ) {
        Query["$eq"] = [{ [C.query]: CNum }, C.expect];
        return Query["$eq"];
    }
};

const FilterQueries = {
    DEFQuery,
    BOOLQuery,
    NAMEQuery,
    EQQuery,
    NEQQuery,
    INQuery,
    INFQuery,
    GTEQuery,
    GTESQuery,
    GTQuery,
    LTEQuery,
    LTQuery,
    ORQuery,
    INCQuery,
    ORFQuery,
    ANDQuery,
    ANDFQuery,
    EXPRQuery,
    EQGRQuery,
    EQGRSQuery,
};

export default FilterQueries;
