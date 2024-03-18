const mongoose = require('mongoose');

const pdfDocumentSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    document: {
        type: String, 
        required: true
    }
});

const PDFDocument = mongoose.model('PDFDocument', pdfDocumentSchema);

module.exports = PDFDocument;
