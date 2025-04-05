import express from 'express';
import * as dotenv from 'dotenv';
import multer from 'multer';
import fetch from 'node-fetch'; // If not installed, run: npm install node-fetch

dotenv.config();

const router = express.Router();
const upload = multer(); // For parsing multipart/form-data

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(upload.none(), async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const form = new FormData();
    form.append('prompt', prompt);

    const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.CLIPDROP_API,
      },
      body: form,
    });

    const arrayBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');

    res.status(200).json({ photo: base64Image });
  } catch (error) {
    console.error('Error generating image from ClipDrop:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

export default router;
