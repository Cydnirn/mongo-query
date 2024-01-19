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
            assert.equal(query, { name: "John" });
        });
    });
});
