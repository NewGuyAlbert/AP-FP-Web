
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'admin', email: "nodemailernodeman@gmail.com", password: '$2b$12$SgjLGZuEdpwdxELIMJyX3ulXkJKueLNKLjE./ObXveVYMsvHluM3G' },
        { username: 'user', email: "nodemailernodeman@gmail.com", password: '$2b$12$pKTY9Q51DH30aIdJ8JEw3en1dovBOXWCroMfuCCoCdnOMnAe3fg4C' }
      ]);
    });
};
