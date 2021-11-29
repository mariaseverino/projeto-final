module.exports = {
    test: {
        client: "sqlite3",
        connection: {
            filename: "./__tests__/database/db.sqlite",
        },
        migrations: {
            directory: "./src/database/migrations",
        },
        seeds: {
            directory: "./src/database/seeds",
        },
        useNullAsDefault: true,
    },
    development: {
        client: "sqlite3",
        connection: {
            filename: "./src/database/db.sqlite",
        },
        migrations: {
            directory: "./src/database/migrations",
        },
        seeds: {
            directory: "./src/database/seeds",
        },
        useNullAsDefault: true,
    },
};
