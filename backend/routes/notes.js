const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/FetchUser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');

router.get('/fetchNotes', fetchUser, async (req, res) => {
    try {
        
        const notes = await Note.find({ user: req.user.id });
        if (!notes ) {
            return res.status(404).json({ message: 'No notes found for the user' });
        }
        res.json({notes});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
router.post('/addNote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3}),
    body('description', 'Description must be at least 3 characters').isLength({ min: 3 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        // Get the user ID from the request object
        const userId = req.user.id;

        // Create a new note instance with the user ID
        const note = new Note({
            user: userId, // Assigning the user ID to the 'user' field
            title,
            description,
            tag
        });
        
        // Save the note
        const savedNote = await note.save();

        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


router.put('/updateNote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    
    const newNote = {};
    if (title) { newNote.title = title; }
    if (description) { newNote.description = description; }
    if (tag) { newNote.tag = tag; }

    try {
 
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send('Not Found'); }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/deleteNote/:id', fetchUser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send('Not Found'); }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Note has been deleted',note });
    } catch (error) {
        res.status(500).send('Server Error');
    }
})


module.exports = router;
