import { QGlobal } from "#types/Query.types";
import FilterQueries from "./Queries";

export default class FilteringFactory {
    /**
     * Function to check if the query is aligned to QGLobal
     * @param query object of string
     * @returns valid Query
     */
    static isQGlobal<T>(query: any): query is QGlobal<T> {
        const requiredProperties: (keyof QGlobal<T>)[] = [
            "input",
            "query",
            "queryInput",
            "type",
        ];
        return requiredProperties.every((prop) => prop in query);
    }

    static GenerateQuery<T>(
        Q: QGlobal<T>[] extends {} ? QGlobal<string>[] : QGlobal[]
    ): T {
        try {
            let Query: T = {} as T;
            const INumber = ["DEFNUM", "GTE", "GT", "LTE", "LT", "INC", "EQGR"];
            for (const i of Q) {
                const C = i;
                let CNum = 0;
                if (typeof C.input === "number") CNum = C.input;
                if (
                    INumber.includes(C.type) &&
                    C.input !== undefined &&
                    C.input.length !== 0
                ) {
                    CNum = parseInt(
                        typeof C.input === "string" ? C.input : "0"
                    );
                }
                if (C.type === "DEFNUM") C.type = "DEF";
                switch (C.type) {
                    /**
                     * DEF
                     */
                    case "DEF":
                        FilterQueries.DEFQuery(Query, C);
                        break;
                    /**
                     * Boolean
                     */
                    case "BOOLEAN":
                        FilterQueries.BOOLQuery(Query, C);
                        break;
                    case "EQ":
                        FilterQueries.EQQuery(Query, C);
                        break;
                    case "NAME":
                        FilterQueries.NAMEQuery(Query, C);
                        break;
                    case "NEQ":
                        FilterQueries.NEQQuery(Query, C);
                        break;
                    case "IN":
                        FilterQueries.INQuery(Query, C);
                        break;
                    case "INF":
                        FilterQueries.INFQuery(Query, C);
                        break;
                    case "GTE":
                        FilterQueries.GTEQuery(Query, C, CNum);
                        break;
                    case "GTES":
                        FilterQueries.GTESQuery(Query, C);
                        break;
                    case "GT":
                        FilterQueries.GTQuery(Query, C, CNum);
                        break;
                    case "LTE":
                        FilterQueries.LTEQuery(Query, C, CNum);
                        break;
                    case "LT":
                        FilterQueries.LTQuery(Query, C, CNum);
                        break;
                    case "INC":
                        FilterQueries.INCQuery(Query, C, CNum);
                        break;
                    case "OR":
                        FilterQueries.ORQuery(Query, C);
                        break;
                    case "ORF":
                        FilterQueries.ORFQuery(Query, C);
                        break;
                    case "AND":
                        FilterQueries.ANDQuery(Query, C);
                        break;
                    case "ANDF":
                        FilterQueries.ANDFQuery(Query, C);
                        break;
                    case "EXPR":
                        FilterQueries.EXPRQuery(Query, C);
                        break;
                    case "EQGRS":
                        FilterQueries.EQGRSQuery(Query, C);
                        break;
                    case "EQGR":
                        FilterQueries.EQGRQuery(Query, C, CNum);
                        break;
                    default:
                        break;
                }
            }
            return Query;
        } catch (err: any) {
            return err.message;
        }
    }
}
