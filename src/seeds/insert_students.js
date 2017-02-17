/**
 * Seed Students table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('students').del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('students').insert({name: 'Lucas Kingsley', roll: 1, address: 'Kingsley Road, Kingsley', updated_at: new Date()}),
        knex('students').insert({name: 'John Doe', roll: 2, address: 'Risinger Street', updated_at: new Date()}),
        knex('students').insert({name: 'Jane Shepherd', roll: 3, address: 'N7 Normandy', updated_at: new Date()}),
        knex('students').insert({name: 'Emily Wong', roll: 4, address: 'Weasel News', updated_at: new Date()}),
        knex('students').insert({name: 'Seymour Jenkins', roll: 5, address: 'Hacking Sawyer Ridge', updated_at: new Date()}),
        knex('students').insert({name: 'Balmer Utnee', roll: 6, address: 'New York, New York', updated_at: new Date()}),
      ]);
    });
}
