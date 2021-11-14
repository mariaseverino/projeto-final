exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("atendentes")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("atendentes").insert([
                { id: 1, email: "maria@gmail.com.br", senha: 123456 },
                { id: 2, email: "nicolas@gmail.com.br", senha: 654321 },
            ]);
        });
};
