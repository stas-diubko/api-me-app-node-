import { Request, Response } from 'express';
import NotesService from './notes.service';

export default class NotesController {
    constructor(
        private notesService: NotesService
    ) {

    };

    create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const note = await this.notesService.createNote(req.body);
            return res.status(200).send(note);
        } catch (error) {
            return res.status(500).send(error.toString());
        };
    };
    findById = async (req: Request, res: Response) => {
        try {
            const userId: string = req.query.userId.toString();
            const notes = await this.notesService.getNotesById(userId);
            return res.status(200).send(notes);
        } catch (error) {
            return res.status(500).send(error.toString());
        };
    };
};