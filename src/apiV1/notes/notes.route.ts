import { Router } from 'express';
import verifyToken from '../../helpers/verifyToken';
import NotesService from './notes.service';
import NotesController from './notes.controller';

const note: Router = Router();
const notesService = new NotesService;
const notesController = new NotesController(notesService);

note.post('/', verifyToken, notesController.create);
note.get('/', verifyToken, notesController.findById);

export default note;
