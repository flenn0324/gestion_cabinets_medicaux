const express = require('express');
const router = express.Router();
const multer = require('multer');
const PDFDocument = require("../../../models/Pdf");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./user/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

// Multer upload configuration
const upload = multer({ storage: storage });

// Create a new PDF document
router.post("/add", upload.single('document'), async (req, res) => {
  try {
    const { nom, description } = req.body;
    const filePath = req.file.path; // Path to the uploaded file
    console.log("The path is:", filePath);

    // Create a new PDFDocument instance
    const newPDFDocument = new PDFDocument({
      nom,
      description,
      document: filePath // Store the file path in the database
    });

    // Save the PDFDocument to the database
    const savedPDFDocument = await newPDFDocument.save();

    if (!savedPDFDocument) {
      return res.status(401).json({ message: "Une erreur s'est produite lors de l'ajout du document PDF." });
    }

    return res.status(201).json({
      PDFDocument: savedPDFDocument,
      message: "Le document PDF a été ajouté avec succès."
    });
  } catch (error) {
    console.error('Error adding PDF document:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all PDF documents
router.get("/", async (req, res) => {
  try {
    const pdfDocuments = await PDFDocument.find();
    return res.status(200).json({ pdfDocuments, message: "Liste des documents PDF récupérée avec succès." });
  } catch (error) {
    console.error('Error fetching PDF documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single PDF document by ID
router.get("/:id", async (req, res) => {
  try {
    const pdfDocument = await PDFDocument.findById(req.params.id);
    if (!pdfDocument) {
      return res.status(404).json({ message: 'Document PDF non trouvé.' });
    }
    return res.status(200).json({ pdfDocument, message: "Document PDF récupéré avec succès." });
  } catch (error) {
    console.error('Error fetching PDF document:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a PDF document by ID
router.put("/:id", async (req, res) => {
  try {
    const { nom, description } = req.body;
    const updatedPDFDocument = await PDFDocument.findByIdAndUpdate(req.params.id, {
      nom,
      description
    }, { new: true });

    if (!updatedPDFDocument) {
      return res.status(404).json({ message: 'Document PDF non trouvé.' });
    }

    return res.status(200).json({ updatedPDFDocument, message: "Document PDF mis à jour avec succès." });
  } catch (error) {
    console.error('Error updating PDF document:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a PDF document by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPDFDocument = await PDFDocument.findByIdAndDelete(req.params.id);

    if (!deletedPDFDocument) {
      return res.status(404).json({ message: 'Document PDF non trouvé.' });
    }

    return res.status(200).json({ message: "Document PDF supprimé avec succès." });
  } catch (error) {
    console.error('Error deleting PDF document:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


/**
 * @swagger
 * tags:
 *   - name: PDF Documents
 *     description: Operations related to PDF documents added by Doctor
 */

// Add a new PDF document
/**
 * @swagger
 * /doctor/document_medical/add:
 *   post:
 *     summary: Add a new PDF document
 *     tags: [PDF Documents]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               document:
 *                 type: string
 *                 format: binary
 *               nom:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '201':
 *         description: PDF document added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 PDFDocument:
 *                   $ref: '#/components/schemas/PDFDocument'
 *                 message:
 *                   type: string
 *       '401':
 *         description: Error adding PDF document
 */

// Get all PDF documents
/**
 * @swagger
 * /doctor/document_medical:
 *   get:
 *     summary: Get all PDF documents
 *     tags: [PDF Documents]
 *     responses:
 *       '200':
 *         description: List of PDF documents retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pdfDocuments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PDFDocument'
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal server error
 */

// Get a single PDF document by ID
/**
 * @swagger
 * /doctor/document_medical/{id}:
 *   get:
 *     summary: Get a PDF document by ID
 *     tags: [PDF Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: PDF document retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PDFDocument'
 *       '404':
 *         description: PDF document not found
 *       '500':
 *         description: Internal server error
 */

// Update a PDF document by ID
/**
 * @swagger
 * /doctor/document_medical//{id}:
 *   put:
 *     summary: Update a PDF document by ID
 *     tags: [PDF Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PDFDocumentUpdate'
 *     responses:
 *       '200':
 *         description: PDF document updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PDFDocument'
 *       '404':
 *         description: PDF document not found
 *       '500':
 *         description: Internal server error
 */

// Delete a PDF document by ID
/**
 * @swagger
 * /doctor/document_medical/{id}:
 *   delete:
 *     summary: Delete a PDF document by ID
 *     tags: [PDF Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: PDF document deleted successfully
 *       '404':
 *         description: PDF document not found
 *       '500':
 *         description: Internal server error
 */

module.exports = router;
