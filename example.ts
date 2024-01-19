import mongoQuery from "#src/mongoQuery";
const query = mongoQuery<{}>([
    {
        field: "Fruits",
        value: "Apple",
        input: ["Apple"],
        type: "IN",
    },
]);

console.log(query);
