import bookshelf from '../db';

const TABLE_NAME = 'students';

let Student = bookshelf.Model.extend({
  tableName: TABLE_NAME,
  hasTimestamps: true
});

export default Student;
