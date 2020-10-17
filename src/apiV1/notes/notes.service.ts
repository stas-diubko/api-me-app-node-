import Note from './notes.model';

export default class NotesService {
    createNote = async (createNoteData: any): Promise<any> => {
        const note = new Note({
            title: createNoteData.title,
            text: createNoteData.text,
            userId: createNoteData.id
        });
        return await note.save();
    };
    getNotesById = async (userId: string): Promise<any> => {
        const notes = await Note.find({ userId });
        return notes;
    };
};