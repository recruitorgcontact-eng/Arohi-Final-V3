import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';

/**
 * Clean markdown symbols for plain text conversion
 */
export function cleanMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/###?\s*/g, '')
    .trim();
}

/**
 * 1. Export Content as PDF (.pdf)
 */
export function exportToPDF(filenameTitle: string, documentTitle: string, content: string) {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const maxLineWidth = pageWidth - margin * 2;
    let cursorY = 20;

    // Header Banner
    doc.setFillColor(30, 16, 70); // Deep Violet
    doc.rect(0, 0, pageWidth, 28, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text('AROHI AI • Official Document Export', margin, 12);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(200, 180, 255);
    doc.text(documentTitle, margin, 19);

    doc.setFontSize(8);
    doc.setTextColor(180, 180, 200);
    doc.text(`Generated: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`, pageWidth - margin - 35, 19);

    cursorY = 36;

    // Body content lines
    doc.setTextColor(30, 30, 40);
    const lines = content.split('\n');

    lines.forEach((line) => {
      if (cursorY > 275) {
        doc.addPage();
        cursorY = 20;
      }

      const trimmed = line.trim();
      if (trimmed.startsWith('#')) {
        const headingText = cleanMarkdown(trimmed);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(100, 40, 200);
        doc.text(headingText, margin, cursorY);
        cursorY += 7;
      } else if (trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+\./.test(trimmed)) {
        const bulletText = cleanMarkdown(trimmed);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(40, 40, 50);

        const wrapped = doc.splitTextToSize(`• ${bulletText}`, maxLineWidth);
        wrapped.forEach((wLine: string) => {
          if (cursorY > 275) {
            doc.addPage();
            cursorY = 20;
          }
          doc.text(wLine, margin + 3, cursorY);
          cursorY += 5;
        });
      } else if (trimmed.length > 0) {
        const plainText = cleanMarkdown(trimmed);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(40, 40, 50);

        const wrapped = doc.splitTextToSize(plainText, maxLineWidth);
        wrapped.forEach((wLine: string) => {
          if (cursorY > 275) {
            doc.addPage();
            cursorY = 20;
          }
          doc.text(wLine, margin, cursorY);
          cursorY += 5;
        });
        cursorY += 2;
      } else {
        cursorY += 3;
      }
    });

    // Footer
    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(140, 140, 160);
      doc.text(`AROHI AI Document • Page ${i} of ${totalPages}`, margin, 287);
      doc.text(`Verified Document ID: AROHI-${Date.now().toString().slice(-6)}`, pageWidth - margin - 45, 287);
    }

    doc.save(`${filenameTitle.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`);
  } catch (err) {
    console.error('Failed to export PDF:', err);
    alert('PDF export failed. Please try again.');
  }
}

/**
 * 2. Export Content as Word (.docx)
 */
export async function exportToWord(filenameTitle: string, documentTitle: string, content: string) {
  try {
    const lines = content.split('\n');
    const children: Paragraph[] = [];

    // Title Paragraph
    children.push(
      new Paragraph({
        text: 'AROHI AI • Official Document Export',
        heading: HeadingLevel.HEADING_1,
        spacing: { after: 120 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: documentTitle,
            bold: true,
            size: 24,
            color: '6B21A8'
          }),
          new TextRun({
            text: `  |  Generated: ${new Date().toLocaleDateString('en-IN')}`,
            size: 18,
            color: '666666'
          })
        ],
        spacing: { after: 240 }
      })
    );

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      if (trimmed.startsWith('#')) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: cleanMarkdown(trimmed),
                bold: true,
                size: 22,
                color: '4C1D95'
              })
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 }
          })
        );
      } else if (trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+\./.test(trimmed)) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `• ${cleanMarkdown(trimmed)}`,
                size: 20,
                color: '1E293B'
              })
            ],
            spacing: { after: 80 },
            indent: { left: 360 }
          })
        );
      } else {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: cleanMarkdown(trimmed),
                size: 20,
                color: '334155'
              })
            ],
            spacing: { after: 120 }
          })
        );
      }
    });

    const docx = new Document({
      sections: [
        {
          properties: {},
          children
        }
      ]
    });

    const blob = await Packer.toBlob(docx);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filenameTitle.replace(/[^a-zA-Z0-9_-]/g, '_')}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Failed to export Word document:', err);
    alert('Word document generation failed. Please try again.');
  }
}

export interface ExcelSheetData {
  name: string;
  headers: string[];
  rows: (string | number | boolean)[][];
}

export interface ExcelWorkbookData {
  filename: string;
  title?: string;
  sheets: ExcelSheetData[];
}

/**
 * Parses markdown tables or structured CSV/JSON text into structured Excel worksheets
 */
export function parseContentToExcelData(content: string, defaultTitle: string = 'Arohi_Data_Export'): ExcelWorkbookData {
  const lines = content.split('\n');
  const sheets: ExcelSheetData[] = [];
  let currentSheetName = 'Data';
  let currentHeaders: string[] = [];
  let currentRows: (string | number)[][] = [];

  let inMarkdownTable = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Detect section or sheet marker
    if (line.startsWith('## ') || line.startsWith('# ')) {
      if (currentHeaders.length > 0 && currentRows.length > 0) {
        sheets.push({
          name: currentSheetName.slice(0, 31).replace(/[:\/\\?*\[\]]/g, '_'),
          headers: [...currentHeaders],
          rows: [...currentRows]
        });
        currentHeaders = [];
        currentRows = [];
        inMarkdownTable = false;
      }
      currentSheetName = cleanMarkdown(line).slice(0, 31);
      continue;
    }

    // Detect Markdown table (| Col 1 | Col 2 |)
    if (line.startsWith('|') && line.endsWith('|')) {
      const cells = line
        .split('|')
        .slice(1, -1)
        .map((c) => cleanMarkdown(c.trim()));

      // Check if divider line (|---|---|)
      const isDivider = cells.every((c) => /^[-:\s]+$/.test(c));
      if (isDivider) {
        inMarkdownTable = true;
        continue;
      }

      if (!inMarkdownTable && currentHeaders.length === 0) {
        currentHeaders = cells;
      } else {
        const parsedRow = cells.map((cell) => {
          // Check if numeric
          const cleanNum = cell.replace(/,/g, '');
          if (/^-?\d+(\.\d+)?$/.test(cleanNum)) {
            return parseFloat(cleanNum);
          }
          return cell;
        });
        currentRows.push(parsedRow);
      }
      continue;
    }
  }

  if (currentHeaders.length > 0 && currentRows.length > 0) {
    sheets.push({
      name: currentSheetName.slice(0, 31).replace(/[:\/\\?*\[\]]/g, '_'),
      headers: [...currentHeaders],
      rows: [...currentRows]
    });
  }

  // Fallback: If no markdown table was detected, construct structured breakdown
  if (sheets.length === 0) {
    const tableData: (string | number)[][] = [];
    let sec = 'General';
    let count = 1;

    lines.forEach((l) => {
      const tr = l.trim();
      if (!tr) return;
      if (tr.startsWith('#')) {
        sec = cleanMarkdown(tr);
        count = 1;
      } else {
        tableData.push([sec, count++, cleanMarkdown(tr)]);
      }
    });

    sheets.push({
      name: 'Summary Data',
      headers: ['Category / Section', 'Item #', 'Details / Values'],
      rows: tableData.length > 0 ? tableData : [['General', 1, cleanMarkdown(content)]]
    });
  }

  return {
    filename: defaultTitle,
    title: defaultTitle,
    sheets
  };
}

/**
 * 3. Export Content as Native Excel (.xlsx)
 */
export function exportToExcel(
  filenameTitle: string,
  documentTitle: string,
  contentOrData: string | ExcelWorkbookData
) {
  try {
    const workbook = XLSX.utils.book_new();

    if (typeof contentOrData === 'string') {
      const parsedData = parseContentToExcelData(contentOrData, filenameTitle);
      
      parsedData.sheets.forEach((sheet) => {
        const aoaData = [sheet.headers, ...sheet.rows];
        const ws = XLSX.utils.aoa_to_sheet(aoaData);

        // Calculate dynamic column widths
        const colWidths = sheet.headers.map((h, colIdx) => {
          let maxLen = Math.max(h.length, 10);
          sheet.rows.forEach((r) => {
            const cellVal = r[colIdx] !== undefined ? String(r[colIdx]) : '';
            if (cellVal.length > maxLen) maxLen = Math.min(cellVal.length, 60);
          });
          return { wch: maxLen + 3 };
        });

        ws['!cols'] = colWidths;
        XLSX.utils.book_append_sheet(workbook, ws, sheet.name || 'Data Sheet');
      });
    } else {
      contentOrData.sheets.forEach((sheet) => {
        const aoaData = [sheet.headers, ...sheet.rows];
        const ws = XLSX.utils.aoa_to_sheet(aoaData);
        
        const colWidths = sheet.headers.map((h, colIdx) => {
          let maxLen = Math.max(h.length, 10);
          sheet.rows.forEach((r) => {
            const cellVal = r[colIdx] !== undefined ? String(r[colIdx]) : '';
            if (cellVal.length > maxLen) maxLen = Math.min(cellVal.length, 60);
          });
          return { wch: maxLen + 3 };
        });

        ws['!cols'] = colWidths;
        XLSX.utils.book_append_sheet(workbook, ws, sheet.name || 'Sheet1');
      });
    }

    const safeName = `${filenameTitle.replace(/[^a-zA-Z0-9_-]/g, '_')}.xlsx`;
    XLSX.writeFile(workbook, safeName);
    return true;
  } catch (err) {
    console.error('Failed to export Excel spreadsheet:', err);
    alert('Excel generation failed. Please try again.');
    return false;
  }
}

export interface SlideData {
  title: string;
  subtitle?: string;
  bullets?: string[];
  cards?: { title: string; desc: string }[];
  keyMetric?: { value: string; label: string };
  callout?: string;
}

export interface PresentationData {
  title: string;
  subtitle?: string;
  theme?: 'purple' | 'midnight' | 'emerald' | 'gradient';
  slides: SlideData[];
}

/**
 * Parses markdown or text content into structured presentation slides
 * Automatically filters out code blocks, Python/JSON scripts, and programming syntax
 */
export function parseContentToSlides(content: string, mainTitle?: string): PresentationData {
  // Strip code blocks first
  const contentWithoutCodeBlocks = content
    .replace(/```(?:python|js|ts|json|html|css)?[\s\S]*?```/gi, '')
    .trim();

  const lines = contentWithoutCodeBlocks.split('\n');
  const slides: SlideData[] = [];
  let currentSlide: SlideData | null = null;
  
  // Extract a meaningful title from the content if possible
  let detectedTitle = mainTitle && !mainTitle.includes('Arohi_AI_Response') && !mainTitle.includes('Arohi_Conversation') 
    ? mainTitle 
    : '';

  let detectedSubtitle = 'Executive Presentation • Arohi AI Ecosystem';

  // Helper to test if a line is raw programming code that leaked
  const isCodeJunk = (l: string): boolean => {
    const testLine = l.trim();
    if (!testLine) return true;
    return (
      testLine.startsWith('def ') ||
      testLine.startsWith('import ') ||
      testLine.startsWith('from ') ||
      testLine.startsWith('class ') ||
      testLine.includes('RGBColor(') ||
      testLine.includes('MSO_SHAPE') ||
      testLine.includes('Inches(') ||
      testLine.includes('.shapes.add_shape') ||
      testLine.includes('.fill.solid()') ||
      testLine.includes('.fill.fore_color') ||
      testLine.includes('Pt(') ||
      testLine.includes('pptx.') ||
      /^[a-zA-Z0-9_]+\s*=\s*RGBColor/i.test(testLine) ||
      /^[a-zA-Z0-9_]+\s*=\s*slide\./i.test(testLine) ||
      testLine.startsWith('```') ||
      testLine.startsWith('const ') ||
      testLine.startsWith('let ') ||
      testLine.startsWith('var ')
    );
  };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.trim();
    if (!trimmed || isCodeJunk(trimmed)) continue;

    // Check if line is H1/H2 slide header (e.g., "# Slide 1: Topic" or "## Market Opportunity")
    const isSlideHeader = /^#{1,3}\s+(Slide\s*\d*[:\-]?\s*)?/i.test(trimmed) || 
                          (/^Slide\s+\d+[:\-]/i.test(trimmed));

    if (isSlideHeader) {
      if (currentSlide && (currentSlide.bullets?.length || currentSlide.cards?.length || currentSlide.callout || currentSlide.title)) {
        slides.push(currentSlide);
      }
      const titleClean = trimmed
        .replace(/^#{1,3}\s*/, '')
        .replace(/^Slide\s*\d*[:\-]?\s*/i, '')
        .replace(/\*\*/g, '')
        .trim();

      currentSlide = {
        title: titleClean || `Slide ${slides.length + 1}`,
        bullets: []
      };

      if (!detectedTitle && titleClean && !titleClean.toLowerCase().includes('slide')) {
        detectedTitle = titleClean;
      }
      continue;
    }

    // First heading might be main title
    if (!detectedTitle && trimmed.startsWith('#')) {
      const cleanH = cleanMarkdown(trimmed);
      if (cleanH && !isCodeJunk(cleanH)) {
        detectedTitle = cleanH;
        continue;
      }
    }

    if (!currentSlide) {
      currentSlide = {
        title: detectedTitle || 'Executive Summary',
        subtitle: detectedSubtitle,
        bullets: []
      };
    }

    // Bullet points
    if (trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+\./.test(trimmed)) {
      const cleanBullet = cleanMarkdown(trimmed.replace(/^[-*]|\d+\.\s*/, '').trim());
      if (cleanBullet && !isCodeJunk(cleanBullet)) {
        if (!currentSlide.bullets) currentSlide.bullets = [];
        currentSlide.bullets.push(cleanBullet);
      }
    } else if (trimmed.startsWith('>')) {
      const calloutText = cleanMarkdown(trimmed.replace(/^>\s*/, ''));
      if (calloutText && !isCodeJunk(calloutText)) {
        currentSlide.callout = calloutText;
      }
    } else {
      const cleanText = cleanMarkdown(trimmed);
      if (cleanText && cleanText.length > 4 && !isCodeJunk(cleanText)) {
        if (!currentSlide.bullets) currentSlide.bullets = [];
        currentSlide.bullets.push(cleanText);
      }
    }
  }

  if (currentSlide && (currentSlide.bullets?.length || currentSlide.cards?.length || currentSlide.callout || currentSlide.title)) {
    slides.push(currentSlide);
  }

  const finalTitle = detectedTitle || (slides.length > 0 && slides[0].title ? slides[0].title : 'Arohi AI Executive Keynote');

  // Fallback if no structured slides detected
  if (slides.length === 0) {
    slides.push({
      title: finalTitle,
      subtitle: 'Keynote & Executive Overview',
      bullets: [
        'Strategic overview and key takeaways generated by Arohi AI',
        cleanMarkdown(content.slice(0, 200))
      ]
    });
  }

  return {
    title: finalTitle,
    subtitle: detectedSubtitle,
    theme: 'purple',
    slides
  };
}

/**
 * 4. Export Content as Native Microsoft PowerPoint (.pptx)
 * Apple Keynote Design Architecture:
 * - 16:9 Cinema Widescreen
 * - Deep Obsidian (#090A0F) and Apple Studio (#FAFAFC) high-contrast layouts
 * - Dynamic, content-specific slide headers, categories, and file naming
 */
export async function exportToPPTX(filenameTitle: string, presentation: PresentationData | string) {
  try {
    const PptxGenJS = (await import('pptxgenjs')).default;
    const pptx = new PptxGenJS();

    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Arohi AI';
    pptx.company = 'Arohi AI Ecosystem';

    const presData: PresentationData = typeof presentation === 'string'
      ? parseContentToSlides(presentation, filenameTitle)
      : presentation;

    const deckTitle = presData.title || filenameTitle || 'Arohi AI Keynote';
    pptx.title = deckTitle;

    // APPLE KEYNOTE COLOR SYSTEM
    const DARK_OBSIDIAN = '090A0F'; // Apple Space Black canvas
    const DARK_CARD = '12131A';     // Frosted glass card fill
    const BRAND_ACCENT = '7C3AED';  // Electric Violet / Purple
    const BRAND_AMBER = 'F59E0B';   // Apple Gold / Amber highlight
    const TEXT_PRIMARY = 'FFFFFF';  // Pure White
    const TEXT_MUTED = '94A3B8';    // Slate 400
    const LIGHT_BG = 'FAFAFC';      // Studio White
    const CARD_BORDER = '2D2254';   // Subtle border

    // Dynamic brand tag derived from deck title
    const cleanBrandTag = deckTitle
      .replace(/Arohi_AI_Response|Arohi_Conversation/gi, 'Executive Keynote')
      .toUpperCase()
      .slice(0, 45);

    // ==========================================
    // SLIDE 1: COVER SLIDE (Apple Keynote Style)
    // ==========================================
    const titleSlide = pptx.addSlide();
    titleSlide.background = { color: DARK_OBSIDIAN };

    // Top subtle violet accent glow line
    titleSlide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: '100%',
      h: 0.12,
      fill: { color: BRAND_ACCENT }
    });

    // Apple-style category pill badge
    titleSlide.addShape(pptx.ShapeType.roundRect, {
      x: 1.0,
      y: 1.2,
      w: 4.2,
      h: 0.38,
      fill: { color: '1E1B4B' },
      line: { color: '6D28D9', width: 1 },
      rectRadius: 0.19
    });

    titleSlide.addText('✦  AROHI AI  •  EXECUTIVE KEYNOTE', {
      x: 1.1,
      y: 1.25,
      w: 4.0,
      h: 0.3,
      fontSize: 10,
      bold: true,
      color: BRAND_AMBER,
      fontFace: 'Arial',
      align: 'center'
    });

    // Grand Deck Title
    titleSlide.addText(deckTitle, {
      x: 1.0,
      y: 1.8,
      w: 11.2,
      h: 2.2,
      fontSize: 34,
      bold: true,
      color: TEXT_PRIMARY,
      fontFace: 'Arial'
    });

    // Subtitle / Tagline
    const subText = presData.subtitle || 'Strategic Vision, Analysis & Comprehensive Presentation';
    titleSlide.addText(subText, {
      x: 1.0,
      y: 4.1,
      w: 10.5,
      h: 0.9,
      fontSize: 16,
      color: TEXT_MUTED,
      fontFace: 'Arial'
    });

    // Bottom presentation metadata bar
    titleSlide.addText([
      { text: 'Generated with Arohi AI (LLM cum LMM)\n', options: { bold: true, color: TEXT_PRIMARY, fontSize: 11 } },
      { text: `Delivered on ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}  •  Confidential & Ready to Present`, options: { color: '64748B', fontSize: 10 } }
    ], {
      x: 1.0,
      y: 5.6,
      w: 10.0,
      h: 0.9,
      fontFace: 'Arial'
    });

    // ==========================================
    // CONTENT SLIDES (Apple-Inspired Structure)
    // ==========================================
    presData.slides.forEach((slide, idx) => {
      const s = pptx.addSlide();
      s.background = { color: LIGHT_BG };

      // Top Modern Header Bar
      s.addShape(pptx.ShapeType.rect, {
        x: 0,
        y: 0,
        w: '100%',
        h: 1.15,
        fill: { color: '180E38' } // Deep indigo header
      });

      // Dynamic Slide Category Header Tag
      s.addText(`${cleanBrandTag}  |  SLIDE ${idx + 1} OF ${presData.slides.length}`, {
        x: 0.8,
        y: 0.18,
        w: 8.5,
        h: 0.25,
        fontSize: 9,
        bold: true,
        color: BRAND_AMBER,
        fontFace: 'Arial'
      });

      // Slide Title
      s.addText(slide.title, {
        x: 0.8,
        y: 0.45,
        w: 11.2,
        h: 0.55,
        fontSize: 21,
        bold: true,
        color: TEXT_PRIMARY,
        fontFace: 'Arial'
      });

      let currentY = 1.45;

      // Subtitle if available
      if (slide.subtitle) {
        s.addText(slide.subtitle, {
          x: 0.8,
          y: currentY,
          w: 11.5,
          h: 0.35,
          fontSize: 13,
          italic: true,
          color: '64748B',
          fontFace: 'Arial'
        });
        currentY += 0.45;
      }

      // Key Metric Card if available
      if (slide.keyMetric) {
        s.addShape(pptx.ShapeType.roundRect, {
          x: 0.8,
          y: currentY,
          w: 3.6,
          h: 1.7,
          fill: { color: 'F5F3FF' },
          line: { color: '8B5CF6', width: 1.5 },
          rectRadius: 0.15
        });

        s.addText(slide.keyMetric.value, {
          x: 0.9,
          y: currentY + 0.15,
          w: 3.4,
          h: 0.75,
          fontSize: 26,
          bold: true,
          color: '6D28D9',
          align: 'center',
          fontFace: 'Arial'
        });

        s.addText(slide.keyMetric.label, {
          x: 0.9,
          y: currentY + 0.95,
          w: 3.4,
          h: 0.55,
          fontSize: 10,
          bold: true,
          color: '4C1D95',
          align: 'center',
          fontFace: 'Arial'
        });
      }

      // Bullets / High-Impact Points
      if (slide.bullets && slide.bullets.length > 0) {
        const bulletX = slide.keyMetric ? 4.8 : 0.8;
        const bulletW = slide.keyMetric ? 7.6 : 11.5;

        const textRuns = slide.bullets.map((b) => ({
          text: b,
          options: {
            bullet: { type: 'bullet', code: '2022' },
            fontSize: 14,
            color: '0F172A',
            fontFace: 'Arial',
            spacing: { after: 12 }
          }
        }));

        s.addText(textRuns as any, {
          x: bulletX,
          y: currentY,
          w: bulletW,
          h: 4.6,
          valign: 'top',
          margin: 0.1
        });
      }

      // Callout / Key Takeaway Card at bottom
      if (slide.callout) {
        s.addShape(pptx.ShapeType.roundRect, {
          x: 0.8,
          y: 5.75,
          w: 11.5,
          h: 0.85,
          fill: { color: 'FEF3C7' },
          line: { color: 'F59E0B', width: 1 },
          rectRadius: 0.12
        });

        s.addText(`💡 Key Takeaway: ${slide.callout}`, {
          x: 1.0,
          y: 5.85,
          w: 11.1,
          h: 0.65,
          fontSize: 11,
          bold: true,
          color: '92400E',
          fontFace: 'Arial'
        });
      }

      // Footer
      s.addText('Arohi AI • One AI. Infinite Opportunities.', {
        x: 0.8,
        y: 6.9,
        w: 6.0,
        h: 0.3,
        fontSize: 9,
        color: '94A3B8',
        fontFace: 'Arial'
      });

      s.addText(`${idx + 1}`, {
        x: 12.0,
        y: 6.9,
        w: 0.5,
        h: 0.3,
        fontSize: 10,
        bold: true,
        color: '64748B',
        align: 'right',
        fontFace: 'Arial'
      });
    });

    // ==========================================
    // FINAL SLIDE: CONCLUSION & CALL TO ACTION
    // ==========================================
    const endSlide = pptx.addSlide();
    endSlide.background = { color: DARK_OBSIDIAN };

    endSlide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: '100%',
      h: 0.12,
      fill: { color: BRAND_ACCENT }
    });

    endSlide.addText('Thank You', {
      x: 1.0,
      y: 2.2,
      w: 11.0,
      h: 1.4,
      fontSize: 48,
      bold: true,
      color: TEXT_PRIMARY,
      align: 'center',
      fontFace: 'Arial'
    });

    endSlide.addText('Open for Strategic Discussion & Q&A', {
      x: 1.0,
      y: 3.7,
      w: 11.0,
      h: 0.6,
      fontSize: 18,
      color: BRAND_AMBER,
      align: 'center',
      fontFace: 'Arial'
    });

    endSlide.addText('Created with Arohi AI • Universal Intelligence Ecosystem', {
      x: 1.0,
      y: 5.8,
      w: 11.0,
      h: 0.5,
      fontSize: 11,
      color: TEXT_MUTED,
      align: 'center',
      fontFace: 'Arial'
    });

    // Generate clean, topic-related filename
    const cleanFilename = deckTitle
      .replace(/[^a-zA-Z0-9_\s-]/g, '')
      .trim()
      .replace(/\s+/g, '_')
      .slice(0, 50);

    const safeFileName = `${cleanFilename || 'Arohi_AI_Executive_Keynote'}.pptx`;
    await pptx.writeFile({ fileName: safeFileName });
    return true;
  } catch (err) {
    console.error('Failed to export PowerPoint PPTX:', err);
    alert('PowerPoint presentation generation failed. Please try again.');
    return false;
  }
}
