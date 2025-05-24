import express, { Request, Response } from 'express';
import multer from 'multer';
import puppeteer from 'puppeteer';
import fs from 'fs';


const app = express();

// Multer setup — store file in memory
const upload = multer({ storage: multer.memoryStorage() });

app.post('/htmltopdf', upload.single('htmlfile'), async (req: Request, res: Response):Promise<void>=> {
  try {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }

    // Read HTML from uploaded file buffer
    const htmlContent = req.file.buffer.toString('utf-8');

    // Launch Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Create PDF buffer
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();
    
    fs.writeFileSync('output.pdf', pdfBuffer);

    // Set response headers
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="output.pdf"',
    });

    // Stream the PDF buffer
    res.end(pdfBuffer);
  } catch (err) {
    console.error('Error generating PDF:', err);
    res.status(500).send('PDF generation failed');
  }
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
