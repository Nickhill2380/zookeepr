const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require("../lib/zookeepers");
const { zookeepers } = require("../data/zookeepers");

jest.mock('fs');

test("creates new zookeeper object", () => {
    const zookeeper = createNewZookeeper({
        name: "Frank",
        id: "kdo93lf",
    },
    zookeepers
    );

    expect(zookeeper.name).toBe("Frank");
    expect(zookeeper.id).toBe("kdo93lf");
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "2",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin",
        },
        {
            id: "3",
            age: 67,
            favoriteAnimal: "bear",
        },
    ];

    const updatedZookeepers = filterByQuery({ age: "31"}, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [
        {
            id: "2",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin",
        },
        {
            id: "3",
            name: "Isabella",
            age: 67,
            favoriteAnimal: "bear",
        },
    ];

    const result = findById("2", startingZookeepers);

    expect(result.name).toBe("Raksha");
});

test("validates age", () => {
    const zookeeper = {
        id: "2",
        name: "Raksha",
        age: 31,
        favoriteAnimal: "penguin",
    };

    const invalidZookeeepr = {
        id: "3",
        name: "Isabella",
        age: "67",
        favoriteAnimal: " bear",
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeepr);

    expect(result).toBe(true);
    expect(result2).toBe(false);
})

