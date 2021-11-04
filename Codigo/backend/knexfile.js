module.exports = {
    development: {
        client: "mysql",
        connection: {
            host: "localhost",
            port: 3306,
            user: "root",
            password: "",
            database: "biblioteca",
        },
        migrations: {
            directory: "./src/database/migrations",
        },
        useNullAsDefault: true,
    },
};
