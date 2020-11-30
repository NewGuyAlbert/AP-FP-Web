
exports.up = function(knex) {
    return knex.schema
        .createTable('users', table => {
            table.increments('userID');
            table.string('username').unique().notNullable();
            table.string('email').notNullable();
            table.string('password').notNullable();
            table.string('address');
            table.integer('phone');
            table.boolean('isEmailConfirmed').notNullable().defaultTo(false);
            table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users')
    
};
