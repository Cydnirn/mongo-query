import { assert } from "chai";
import mongoQuery from "#src/mongoQuery";

describe("Query Function", function () {
    describe("Simple Queries", function () {
        it("It should create a normal equal query", function () {
            const query = mongoQuery<{ name: string }>([
                {
                    value: "John",
                    field: "name",
                },
            ]);
            assert.deepEqual(query, { name: "John" });
        });
        it("It should create boolean query", function () {
            const query = mongoQuery<{ status: boolean }>([
                {
                    value: "true",
                    field: "status",
                    type: "BOOLEAN",
                },
            ]);
            assert.deepEqual(query, { status: true });
        });
        it("It should create name query", function () {
            const query = mongoQuery<{ name: any }>([
                {
                    value: "John",
                    field: "name",
                    type: "NAME",
                },
            ]);
            assert.deepEqual(query, {
                name: { $regex: "John", $options: "i" },
            });
        });
    });
    describe("Expect queries", function () {
        it("It should create query if value is equal to expect", function () {
            const query = mongoQuery<{ status: boolean }>([
                {
                    value: "isPaid",
                    expect: "isPaid",
                    field: "status",
                    input: true,
                    type: "EQ",
                },
            ]);
            assert.deepEqual(query, { status: true });
        });
        it("It should not create query if value is not equal to expect", function () {
            const query = mongoQuery<{ status?: boolean }>([
                {
                    value: "notPaid",
                    expect: "isPaid",
                    field: "status",
                    input: true,
                    type: "EQ",
                },
            ]);
            assert.deepEqual(query, {});
        });
        it("It should create query if value is not equal to expect", function () {
            const query = mongoQuery<{ status?: boolean }>([
                {
                    value: "notPaid",
                    expect: "isPaid",
                    field: "status",
                    input: true,
                    type: "NEQ",
                },
            ]);
            assert.deepEqual(query, { status: true });
        });
    });
    describe("Array Queries", function () {
        it("It should create an $in array query", function () {
            const query = mongoQuery<{}>([
                {
                    field: "Fruits",
                    value: "Apple",
                    type: "IN",
                },
            ]);
            assert.deepEqual(query, { Fruits: { $in: ["Apple"] } });
        });
        it("It should create an $in array query if value is equal to expect", function () {
            const query = mongoQuery<{}>([
                {
                    field: "Fruits",
                    value: "Red",
                    expect: "Red",
                    input: ["Apple", "Tomato"],
                    type: "INF",
                },
            ]);
            assert.deepEqual(query, { Fruits: { $in: ["Apple", "Tomato"] } });
        });
        it("It should not create an $in array query if value is not equal to expect", function () {
            const query = mongoQuery<{}>([
                {
                    field: "Fruits",
                    value: "Red",
                    expect: "Green",
                    input: ["Apple", "Tomato"],
                    type: "INF",
                },
            ]);
            assert.deepEqual(query, {});
        });
    });
    describe("Comparison Queries", function () {
        it("It should print $gte query", function () {
            const query = mongoQuery<{}>([
                {
                    field: "Price",
                    value: "100",
                    type: "GTE",
                },
            ]);
            assert.deepEqual(query, { Price: { $gte: 100 } });
        });
        it("It should print $lte query", function () {
            const query = mongoQuery<{}>([
                {
                    field: "Price",
                    value: "100",
                    type: "LTE",
                },
            ]);
            assert.deepEqual(query, { Price: { $lte: 100 } });
        });
        it("It should print $gt query", function () {
            const query = mongoQuery<{}>([
                {
                    field: "Price",
                    value: "100",
                    type: "GT",
                },
            ]);
            assert.deepEqual(query, { Price: { $gt: 100 } });
        });
        it("It should print $lt query", function () {
            const query = mongoQuery<{}>([
                {
                    field: "Price",
                    value: "100",
                    type: "LT",
                },
            ]);
            assert.deepEqual(query, { Price: { $lt: 100 } });
        });
        it("It should print $gte query for string", function () {
            const query = mongoQuery<{}>([
                {
                    field: "Year",
                    value: "2020",
                    type: "GTES",
                },
            ]);
            assert.deepEqual(query, { Year: { $gte: "2020" } });
        });
    });
    describe("Number Queries", function () {
        it("It should create an $inc query", function () {
            const query = mongoQuery<{}>([
                {
                    value: "10",
                    field: "age",
                    type: "INC",
                },
            ]);
            assert.deepEqual(query, { $inc: { age: 10 } });
        });
    });
    describe("Complex Queries", function () {
        it("It should create an $or query", function () {
            const query = mongoQuery<{}>([
                {
                    value: "true",
                    field: "",
                    type: "OR",
                    input: [
                        {
                            field: "Price",
                            value: "100",
                            type: "GTE",
                        },
                        {
                            field: "Size",
                            value: "M",
                        },
                    ],
                },
            ]);
            assert.deepEqual(query, {
                $or: [{ Price: { $gte: 100 } }, { Size: "M" }],
            });
        });
        it("It should create $or query if value is equal to expect", function () {
            const query = mongoQuery<{}>([
                {
                    value: "isPaid",
                    expect: "isPaid",
                    field: "",
                    input: [
                        {
                            field: "Price",
                            value: "100",
                            type: "GTE",
                        },
                        {
                            field: "Size",
                            value: "M",
                        },
                    ],
                    type: "ORF",
                },
            ]);
            assert.deepEqual(query, {
                $or: [{ Price: { $gte: 100 } }, { Size: "M" }],
            });
        });
        it("It should not create $or query if value is not equal to expect", function () {
            const query = mongoQuery<{}>([
                {
                    value: "notPaid",
                    expect: "isPaid",
                    field: "",
                    input: [
                        {
                            field: "Price",
                            value: "100",
                            type: "GTE",
                        },
                        {
                            field: "Size",
                            value: "M",
                        },
                    ],
                    type: "ORF",
                },
            ]);
            assert.deepEqual(query, {});
        });
        it("It should create $and query", function () {
            const query = mongoQuery<{}>([
                {
                    value: "true",
                    field: "",
                    type: "AND",
                    input: [
                        {
                            field: "Price",
                            value: "100",
                            type: "GTE",
                        },
                        {
                            field: "Size",
                            value: "M",
                        },
                    ],
                },
            ]);
            assert.deepEqual(query, {
                $and: [{ Price: { $gte: 100 } }, { Size: "M" }],
            });
        });
        it("It should create $and query if value is equal to expect", function () {
            const query = mongoQuery<{}>([
                {
                    value: "isPaid",
                    expect: "isPaid",
                    field: "",
                    input: [
                        {
                            field: "Price",
                            value: "100",
                            type: "GTE",
                        },
                        {
                            field: "Size",
                            value: "M",
                        },
                    ],
                    type: "ANDF",
                },
            ]);
            assert.deepEqual(query, {
                $and: [{ Price: { $gte: 100 } }, { Size: "M" }],
            });
        });
        it("It should not create $and query if value is not equal to expect", function () {
            const query = mongoQuery<{}>([
                {
                    value: "notPaid",
                    expect: "isPaid",
                    field: "",
                    input: [
                        {
                            field: "Price",
                            value: "100",
                            type: "GTE",
                        },
                        {
                            field: "Size",
                            value: "M",
                        },
                    ],
                    type: "ANDF",
                },
            ]);
            assert.deepEqual(query, {});
        });
    });
    describe("Aggregation Expression Queries", function () {
        it("It should create an $expr query with $eq with string as input", function () {
            const query = mongoQuery<{}>([
                {
                    value: "true",
                    field: "",
                    type: "EXPR",
                    input: [
                        {
                            value: "true",
                            field: "",
                            type: "AND",
                            input: [
                                {
                                    value: "true",
                                    field: "$month",
                                    type: "EQGRS",
                                    input: "$expiredAt",
                                    expect: 1,
                                },
                                {
                                    value: "true",
                                    field: "$year",
                                    type: "EQGRS",
                                    input: "$expiredAt",
                                    expect: 2023,
                                },
                            ],
                        },
                    ],
                },
            ]);
            assert.deepEqual(query, {
                $expr: {
                    $and: [
                        {
                            $eq: [
                                {
                                    $month: "$expiredAt",
                                },
                                1,
                            ],
                        },
                        {
                            $eq: [
                                {
                                    $year: "$expiredAt",
                                },
                                2023,
                            ],
                        },
                    ],
                },
            });
        });
        it("It should create an $expr query with $eq", function () {
            const query = mongoQuery<{}>([
                {
                    value: "true",
                    field: "",
                    type: "EXPR",
                    input: [
                        {
                            value: "5",
                            field: "$price",
                            type: "EQGR",
                            expect: 5,
                        },
                    ],
                },
            ]);
            assert.deepEqual(query, {
                $expr: {
                    $eq: [{ $price: 5 }, 5],
                },
            });
        });
    });
    describe("Error Testing", function () {
        it("It should not return anything", function () {
            const query = mongoQuery<{}>([
                { type: "ANDD", value: "", field: "" },
            ]);
            assert.deepEqual(query, {});
        });
        it("It should throw error when parsing NaN as integer", function () {
            const query = mongoQuery<{}>([
                { type: "GTE", value: "true", field: "price" },
            ]);
            assert.equal(query, "Unknown value, please check input or value");
        });
    });
});
