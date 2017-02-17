import Joi from 'joi';
import validate from '../utils/validate';
import * as studentService from '../services/studentService';

const SCHEMA = {
  name: Joi.string().label('Name').max(90).required(),
  roll: Joi.number().integer().label('Roll').min(1).max(90).required(),
  address: Joi.string().label('Address').max(200).required()
};

/**
 * Validate create/update user request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function studentValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate users existence.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function findStudent(req, res, next) {
  return studentService.getStudent(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

export {findStudent, studentValidator};
