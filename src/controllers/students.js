import {Router} from 'express';
import HttpStatus from 'http-status-codes';
import * as studentService from '../services/studentService';
import {findStudent, studentValidator} from '../validators/studentValidator';

let router = Router();

/**
 * @swagger
 * definitions:
 *   Student:
 *     title: Student
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Unique identifier representing a specific student
 *       name:
 *         type: string
 *         description: Name of the Student
 *       roll:
 *         type: integer
 *         description: Roll no of the student
 *       address:
 *         type: string
 *         description: Address of the Student
 *       createdAt:
 *         type: string
 *         format: date-time
 *         description: Student creation datetime
 *       updatedAt:
 *         type: string
 *         format: date-time
 *         description: Student update datetime
 *   NewStudent:
 *     title: NewStudent
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         description: Name of the student
 *       roll:
 *         type: integer
 *         description: Roll no of the student
 *       address:
 *         type: string
 *         description: Address of the Student
 *   Error:
 *     title: Error
 *     type: object
 *     properties:
 *       code:
 *         type: integer
 *         format: int32
 *       message:
 *         type: string
 *   ServerError:
 *     allOf:
 *       - $ref: '#/definitions/Error'
 *       - title: ServerError
 *   NotFoundError:
 *     allOf:
 *       - $ref: '#/definitions/Error'
 *       - title: NotFoundError
 *   ValidationError:
 *     allOf:
 *       - $ref: '#/definitions/Error'
 *       - title: ValidationError
 *       - properties:
 *           details:
 *             type: array
 *             items:
 *               title: FieldError
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 param:
 *                   type: string
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: List all students
 *     description: Returns students
 *     produces:
 *       - application/json
 *     tags:
 *       - Students
 *     responses:
 *       200:
 *         description: An array of students
 *         schema:
 *           title: Students
 *           type: array
 *           items:
 *             $ref: '#/definitions/Student'
 */
router.get('/', (req, res, next) => {
  studentService.getAllStudents()
    .then(data => res.json({data}))
    .catch(err => next(err));
});

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get a student
 *     description: Get student information
 *     produces:
 *       - application/json
 *     tags:
 *       - Students
 *     parameters:
 *       - name: id
 *         description: Unique identifier of the student
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Student object
 *         schema:
 *           title: Student
 *           type: object
 *           $ref: '#/definitions/Student'
 *       404:
 *         description: Student not found
 *         schema:
 *           $ref: '#/definitions/NotFoundError'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ServerError'
 */
router.get('/:id', (req, res, next) => {
  studentService.getStudent(req.params.id)
    .then(data => res.json({data}))
    .catch(err => next(err));
});

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     description: Create an student
 *     produces:
 *       - application/json
 *     tags:
 *       - Students
 *     parameters:
 *       - name: StudentParams
 *         description: POST params for an Student
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/NewStudent'
 *     responses:
 *       201:
 *         description: Newly created Student object
 *         schema:
 *           title: Student
 *           type: object
 *           $ref: '#/definitions/Student'
 *       400:
 *         description: Bad request
 *         schema:
 *           $ref: '#/definitions/ValidationError'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ServerError'
 */
router.post('/', studentValidator, (req, res, next) => {
  studentService.createStudent(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({data}))
    .catch(err => next(err));
});

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student
 *     description: Update a student
 *     produces:
 *       - application/json
 *     tags:
 *       - Students
 *     parameters:
 *       - name: id
 *         description: Unique identifier of the student
 *         in: path
 *         required: true
 *         type: integer
 *       - name: StudentParams
 *         description: PUT params for an student
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/NewStudent'
 *     responses:
 *       200:
 *         description: Updated student object
 *         schema:
 *           title: UpdatedStudent
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               description: Unique identifier representing a specific student
 *             name:
 *               type: string
 *               description: Name of the student
 *             roll:
 *               type: integer
 *               description: Roll no of the student
 *             address:
 *               type: string
 *               description: Address of the Student
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               description: Updated student datetime
 *       400:
 *         description: Bad request
 *         schema:
 *           $ref: '#/definitions/ValidationError'
 *       404:
 *         description: Student not found
 *         schema:
 *           $ref: '#/definitions/NotFoundError'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ServerError'
 */
router.put('/:id', findStudent, studentValidator, (req, res, next) => {
  studentService.updateStudent(req.params.id, req.body)
    .then(data => res.json({data}))
    .catch(err => next(err));
});

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student
 *     description: Delete a student
 *     produces:
 *       - application/json
 *     tags:
 *       - Students
 *     parameters:
 *       - name: id
 *         description: Unique identifier of the student
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       204:
 *         description: Student deleted (no-content)
 *       400:
 *         description: Bad request
 *         schema:
 *           $ref: '#/definitions/ValidationError'
 *       404:
 *         description: Student not found
 *         schema:
 *           $ref: '#/definitions/NotFoundError'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ServerError'
 */
router.delete('/:id', findStudent, (req, res, next) => {
  studentService.deleteStudent(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({data}))
    .catch(err => next(err));
});

export default router;
