import Boom from 'boom';
import Student from '../models/Student';

/**
 * Get all Students.
 *
 * @return {Promise}
 */
export async function getAllStudents() {
  return await Student.fetchAll();
}

/**
 * Get a Student.
 *
 * @param  {number|string}  id
 * @return {Promise}
 */
export async function getStudent(id) {
  return await new Student({id}).fetch()
    .then(student => {
      if (!student) {
        throw new Boom.notFound('Student not found');
      }

      return student;
    });
}

/**
 * Create new Student.
 *
 * @param  {object}  Student
 * @return {Promise}
 */
export async function createStudent(student) {
  return await new Student({name: student.name, roll: student.roll, address: student.address}).save().then(student => student.refresh());
}

/**
 * Update a Student.
 *
 * @param  {number|string}  id
 * @param  {object}         Student
 * @return {Promise}
 */
export async function updateStudent(id, student) {
  return await new Student({id}).save({name: student.name, roll: student.roll, address: student.address}).then(student => student.refresh());
}

/**
 * Delete a Student.
 *
 * @param  {number|string}  id
 * @return {Promise}
 */
export async function deleteStudent(id) {
  return await new Student({id}).fetch().then(student => student.destroy());
}
