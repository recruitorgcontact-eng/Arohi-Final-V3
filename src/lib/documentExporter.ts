import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  Footer,
  PageNumber
} from 'docx';

/**
 * Convert Hex Color (#RRGGBB or RRGGBB) to [R, G, B] tuple
 */
function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [isNaN(r) ? 0 : r, isNaN(g) ? 0 : g, isNaN(b) ? 0 : b];
}

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
 * 1. Export Content as Custom Industry-Themed PDF (.pdf)
 * Features:
 * - Domain-tailored palette (NGO, Real Estate, Healthcare, Finance, Education, Tech)
 * - Themed Header with category badge & generation timestamp
 * - Markdown table parsing into styled PDF grid tables
 * - Callout quote cards with colored left accent bars
 * - Running headers & page-numbered footers
 */
export function exportToPDF(
  filenameTitle: string,
  documentTitle: string,
  content: string,
  themeKey?: string
) {
  try {
    const theme = resolvePresentationTheme(themeKey, `${filenameTitle} ${documentTitle}`, content);
    const [headerR, headerG, headerB] = hexToRgb(theme.headerBg);
    const [accentR, accentG, accentB] = hexToRgb(theme.brandAccent);
    const [badgeBgR, badgeBgG, badgeBgB] = hexToRgb(theme.badgeBg);
    const [badgeTxtR, badgeTxtG, badgeTxtB] = hexToRgb(theme.badgeColor);
    const [cardBgR, cardBgG, cardBgB] = hexToRgb(theme.cardBg);

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const maxLineWidth = pageWidth - margin * 2;
    let cursorY = 20;

    // Header Banner
    doc.setFillColor(headerR, headerG, headerB);
    doc.rect(0, 0, pageWidth, 32, 'F');

    // Top Accent Stripe
    doc.setFillColor(accentR, accentG, accentB);
    doc.rect(0, 0, pageWidth, 2.5, 'F');

    // Industry Badge Pill
    doc.setFillColor(badgeBgR, badgeBgG, badgeBgB);
    doc.roundedRect(margin, 6, 88, 5.5, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(badgeTxtR, badgeTxtG, badgeTxtB);
    doc.text(theme.badgeText.slice(0, 48), margin + 3, 9.8);

    // Document Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(255, 255, 255);
    const cleanTitle = documentTitle.length > 50 ? `${documentTitle.slice(0, 48)}...` : documentTitle;
    doc.text(cleanTitle, margin, 18.5);

    // Meta Subtitle
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(220, 220, 235);
    doc.text('AROHI AI Universal Intelligence • Official Executive Document', margin, 25);

    doc.setFontSize(7.5);
    doc.setTextColor(200, 200, 220);
    doc.text(
      `Generated: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`,
      pageWidth - margin - 35,
      25
    );

    cursorY = 40;

    const lines = content.split('\n');
    let inTable = false;
    let tableHeaders: string[] = [];
    let tableRows: string[][] = [];

    const flushTable = () => {
      if (tableHeaders.length === 0 && tableRows.length === 0) return;

      const colCount = Math.max(tableHeaders.length, tableRows[0]?.length || 1);
      const colWidth = maxLineWidth / colCount;

      if (cursorY + (tableRows.length + 1) * 8 > 270) {
        doc.addPage();
        cursorY = 25;
      }

      // Render Table Header
      doc.setFillColor(headerR, headerG, headerB);
      doc.rect(margin, cursorY, maxLineWidth, 7, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(255, 255, 255);

      tableHeaders.forEach((th, cIdx) => {
        const textToDraw = th.slice(0, 25);
        doc.text(textToDraw, margin + cIdx * colWidth + 2, cursorY + 4.8);
      });
      cursorY += 7;

      // Render Table Rows
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);

      tableRows.forEach((row, rIdx) => {
        if (cursorY > 270) {
          doc.addPage();
          cursorY = 25;
        }

        if (rIdx % 2 === 1) {
          doc.setFillColor(cardBgR, cardBgG, cardBgB);
          doc.rect(margin, cursorY, maxLineWidth, 6.5, 'F');
        }

        doc.setDrawColor(220, 225, 235);
        doc.rect(margin, cursorY, maxLineWidth, 6.5, 'S');

        doc.setTextColor(30, 41, 59);
        row.forEach((cell, cIdx) => {
          const cellText = String(cell).slice(0, 30);
          doc.text(cellText, margin + cIdx * colWidth + 2, cursorY + 4.5);
        });

        cursorY += 6.5;
      });

      cursorY += 4;
      tableHeaders = [];
      tableRows = [];
      inTable = false;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Check if Markdown Table row
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        const cells = trimmed
          .split('|')
          .slice(1, -1)
          .map((c) => cleanMarkdown(c.trim()));
        const isDivider = cells.every((c) => /^[-:\s]+$/.test(c));

        if (isDivider) {
          inTable = true;
          continue;
        }

        if (!inTable && tableHeaders.length === 0) {
          tableHeaders = cells;
        } else {
          tableRows.push(cells);
        }
        continue;
      } else {
        if (inTable || tableHeaders.length > 0) {
          flushTable();
        }
      }

      if (!trimmed) {
        cursorY += 2.5;
        continue;
      }

      if (cursorY > 270) {
        doc.addPage();
        cursorY = 25;
      }

      // Heading 1 (#)
      if (trimmed.startsWith('# ')) {
        const headingText = cleanMarkdown(trimmed);
        cursorY += 3;
        doc.setFillColor(cardBgR, cardBgG, cardBgB);
        doc.roundedRect(margin, cursorY - 3.5, maxLineWidth, 8.5, 1.5, 1.5, 'F');

        doc.setFillColor(accentR, accentG, accentB);
        doc.rect(margin, cursorY - 3.5, 2.5, 8.5, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(headerR, headerG, headerB);
        doc.text(headingText, margin + 5, cursorY + 2.2);
        cursorY += 9;
      }
      // Heading 2 (##)
      else if (trimmed.startsWith('## ')) {
        const headingText = cleanMarkdown(trimmed);
        cursorY += 2;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10.5);
        doc.setTextColor(accentR, accentG, accentB);
        doc.text(headingText, margin, cursorY);

        doc.setDrawColor(accentR, accentG, accentB);
        doc.setLineWidth(0.3);
        doc.line(margin, cursorY + 1.5, margin + 45, cursorY + 1.5);
        cursorY += 6.5;
      }
      // Heading 3 (###)
      else if (trimmed.startsWith('### ')) {
        const headingText = cleanMarkdown(trimmed);
        cursorY += 1.5;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(headerR, headerG, headerB);
        doc.text(headingText, margin, cursorY);
        cursorY += 5;
      }
      // Callout quote (> ...)
      else if (trimmed.startsWith('>')) {
        const quoteText = cleanMarkdown(trimmed.replace(/^>\s*/, ''));
        const wrapped = doc.splitTextToSize(quoteText, maxLineWidth - 10);
        const boxHeight = wrapped.length * 4.5 + 4;

        if (cursorY + boxHeight > 270) {
          doc.addPage();
          cursorY = 25;
        }

        doc.setFillColor(cardBgR, cardBgG, cardBgB);
        doc.roundedRect(margin, cursorY - 2, maxLineWidth, boxHeight, 1.5, 1.5, 'F');

        doc.setFillColor(accentR, accentG, accentB);
        doc.rect(margin, cursorY - 2, 2.5, boxHeight, 'F');

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8.5);
        doc.setTextColor(headerR, headerG, headerB);

        wrapped.forEach((wLine: string, wIdx: number) => {
          doc.text(wLine, margin + 6, cursorY + 2 + wIdx * 4.5);
        });

        cursorY += boxHeight + 2;
      }
      // Bullet or List items (- , *, 1.)
      else if (trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+\./.test(trimmed)) {
        const bulletText = cleanMarkdown(trimmed.replace(/^[-*]\s*|\d+\.\s*/, ''));
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(30, 41, 59);

        // Draw colored bullet indicator
        doc.setFillColor(accentR, accentG, accentB);
        doc.circle(margin + 2, cursorY - 1, 1.0, 'F');

        const wrapped = doc.splitTextToSize(bulletText, maxLineWidth - 6);
        wrapped.forEach((wLine: string, wIdx: number) => {
          if (cursorY > 270) {
            doc.addPage();
            cursorY = 25;
          }
          doc.text(wLine, margin + 6, cursorY);
          cursorY += 4.5;
        });
        cursorY += 1;
      }
      // Standard paragraph
      else {
        const plainText = cleanMarkdown(trimmed);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(40, 45, 60);

        const wrapped = doc.splitTextToSize(plainText, maxLineWidth);
        wrapped.forEach((wLine: string) => {
          if (cursorY > 270) {
            doc.addPage();
            cursorY = 25;
          }
          doc.text(wLine, margin, cursorY);
          cursorY += 4.5;
        });
        cursorY += 2;
      }
    }

    if (inTable || tableHeaders.length > 0) {
      flushTable();
    }

    // Footers & Running Headers across all pages
    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);

      // Running top line on subsequent pages
      if (i > 1) {
        doc.setDrawColor(accentR, accentG, accentB);
        doc.setLineWidth(0.4);
        doc.line(margin, 12, pageWidth - margin, 12);

        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(headerR, headerG, headerB);
        doc.text(`AROHI AI • ${cleanTitle}`, margin, 10);
      }

      // Bottom Footer
      doc.setDrawColor(220, 225, 235);
      doc.setLineWidth(0.3);
      doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(130, 140, 160);
      doc.text(`Arohi AI • One AI. Infinite Opportunities. | Page ${i} of ${totalPages}`, margin, pageHeight - 7);
      doc.text(`Doc ID: AROHI-${Date.now().toString().slice(-6)}`, pageWidth - margin - 40, pageHeight - 7);
    }

    const cleanFilename = filenameTitle
      .replace(/[^a-zA-Z0-9_\s-]/g, '')
      .trim()
      .replace(/\s+/g, '_')
      .slice(0, 50);

    doc.save(`${cleanFilename || 'Arohi_AI_Document'}.pdf`);
    return true;
  } catch (err) {
    console.error('Failed to export PDF:', err);
    alert('PDF export failed. Please try again.');
    return false;
  }
}

/**
 * 2. Export Content as Custom Industry-Themed Microsoft Word (.docx)
 * Features:
 * - Domain Palette Colors for Headings, Tables, and Highlights
 * - Formatted Header Table with Industry Badge
 * - Markdown tables parsed into native Word Tables with styled header rows
 * - Callout blocks with left accent borders
 * - Native Header & Footers with page numbering
 */
export async function exportToWord(
  filenameTitle: string,
  documentTitle: string,
  content: string,
  themeKey?: string
) {
  try {
    const theme = resolvePresentationTheme(themeKey, `${filenameTitle} ${documentTitle}`, content);
    const lines = content.split('\n');
    const children: (Paragraph | Table)[] = [];

    // Header Table Banner
    const headerBannerTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              shading: { fill: theme.headerBg },
              margins: { top: 200, bottom: 200, left: 240, right: 240 },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: theme.badgeText,
                      bold: true,
                      size: 16,
                      color: theme.badgeColor
                    })
                  ],
                  spacing: { after: 80 }
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: documentTitle,
                      bold: true,
                      size: 30,
                      color: 'FFFFFF'
                    })
                  ],
                  spacing: { after: 80 }
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `Generated via Arohi AI  •  Theme: ${theme.name}  •  ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`,
                      size: 16,
                      color: theme.textColorMuted
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    });

    children.push(headerBannerTable);
    children.push(new Paragraph({ text: '', spacing: { after: 200 } }));

    let tableHeaders: string[] = [];
    let tableRows: string[][] = [];
    let inTable = false;

    const flushWordTable = () => {
      if (tableHeaders.length === 0 && tableRows.length === 0) return;

      const rows: TableRow[] = [];

      // Header row
      if (tableHeaders.length > 0) {
        rows.push(
          new TableRow({
            tableHeader: true,
            children: tableHeaders.map(
              (th) =>
                new TableCell({
                  shading: { fill: theme.headerBg },
                  margins: { top: 120, bottom: 120, left: 150, right: 150 },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: th,
                          bold: true,
                          size: 18,
                          color: 'FFFFFF'
                        })
                      ]
                    })
                  ]
                })
            )
          })
        );
      }

      // Data rows
      tableRows.forEach((row, rIdx) => {
        rows.push(
          new TableRow({
            children: row.map(
              (cell) =>
                new TableCell({
                  shading: rIdx % 2 === 1 ? { fill: theme.cardBg } : undefined,
                  margins: { top: 100, bottom: 100, left: 150, right: 150 },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: cell,
                          size: 18,
                          color: '1E293B'
                        })
                      ]
                    })
                  ]
                })
            )
          })
        );
      });

      children.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows
        })
      );
      children.push(new Paragraph({ text: '', spacing: { after: 180 } }));

      tableHeaders = [];
      tableRows = [];
      inTable = false;
    };

    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();

      // Check if Markdown Table row
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        const cells = trimmed
          .split('|')
          .slice(1, -1)
          .map((c) => cleanMarkdown(c.trim()));
        const isDivider = cells.every((c) => /^[-:\s]+$/.test(c));

        if (isDivider) {
          inTable = true;
          continue;
        }

        if (!inTable && tableHeaders.length === 0) {
          tableHeaders = cells;
        } else {
          tableRows.push(cells);
        }
        continue;
      } else {
        if (inTable || tableHeaders.length > 0) {
          flushWordTable();
        }
      }

      if (!trimmed) continue;

      if (trimmed.startsWith('# ')) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: cleanMarkdown(trimmed),
                bold: true,
                size: 26,
                color: theme.brandAccent
              })
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 280, after: 120 }
          })
        );
      } else if (trimmed.startsWith('## ')) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: cleanMarkdown(trimmed),
                bold: true,
                size: 22,
                color: theme.textColorDark
              })
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 }
          })
        );
      } else if (trimmed.startsWith('### ')) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: cleanMarkdown(trimmed),
                bold: true,
                size: 20,
                color: theme.brandAccent
              })
            ],
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 160, after: 80 }
          })
        );
      } else if (trimmed.startsWith('>')) {
        // Blockquote card with left border
        const quoteText = cleanMarkdown(trimmed.replace(/^>\s*/, ''));
        children.push(
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: theme.cardBg },
                    margins: { top: 120, bottom: 120, left: 180, right: 180 },
                    borders: {
                      left: { style: BorderStyle.SINGLE, size: 24, color: theme.brandAccent },
                      top: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE },
                      bottom: { style: BorderStyle.NONE }
                    },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: `💡 Key Insight: ${quoteText}`,
                            italics: true,
                            size: 19,
                            color: theme.textColorDark
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          })
        );
        children.push(new Paragraph({ text: '', spacing: { after: 120 } }));
      } else if (trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+\./.test(trimmed)) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `• ${cleanMarkdown(trimmed.replace(/^[-*]\s*|\d+\.\s*/, ''))}`,
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
    }

    if (inTable || tableHeaders.length > 0) {
      flushWordTable();
    }

    const docx = new Document({
      sections: [
        {
          properties: {},
          footers: {
            default: new Footer({
              children: [
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [
                    new TextRun({
                      text: 'Arohi AI Document  |  Page ',
                      size: 16,
                      color: '888888'
                    }),
                    new TextRun({
                      children: [PageNumber.CURRENT],
                      size: 16,
                      color: '888888'
                    })
                  ]
                })
              ]
            })
          },
          children
        }
      ]
    });

    const blob = await Packer.toBlob(docx);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    const cleanFilename = filenameTitle
      .replace(/[^a-zA-Z0-9_\s-]/g, '')
      .trim()
      .replace(/\s+/g, '_')
      .slice(0, 50);

    a.download = `${cleanFilename || 'Arohi_AI_Document'}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    return true;
  } catch (err) {
    console.error('Failed to export Word document:', err);
    alert('Word document generation failed. Please try again.');
    return false;
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
  theme?: PresentationThemeKey;
  sheets: ExcelSheetData[];
}

/**
 * Parses markdown tables or structured CSV/JSON text into structured Excel worksheets
 */
export function parseContentToExcelData(
  content: string,
  defaultTitle: string = 'Arohi_Data_Export'
): ExcelWorkbookData {
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
 * 3. Export Content as Native Excel (.xlsx) with Industry Metadata & Themed Header Rows
 */
export function exportToExcel(
  filenameTitle: string,
  documentTitle: string,
  contentOrData: string | ExcelWorkbookData,
  themeKey?: string
) {
  try {
    const sampleText = typeof contentOrData === 'string' ? contentOrData : contentOrData.title || filenameTitle;
    const theme = resolvePresentationTheme(
      themeKey || (typeof contentOrData === 'object' ? contentOrData.theme : undefined),
      `${filenameTitle} ${documentTitle}`,
      sampleText
    );

    const workbook = XLSX.utils.book_new();

    const processSheet = (sheet: ExcelSheetData) => {
      // Structured executive header rows
      const bannerRows: (string | number)[][] = [
        [`AROHI AI • ${theme.badgeText}`],
        [`Document Title: ${documentTitle || filenameTitle}`],
        [`Theme: ${theme.name} | Generated: ${new Date().toLocaleDateString('en-IN')}`],
        [] // Blank spacing row
      ];

      const fullData = [...bannerRows, sheet.headers, ...sheet.rows];
      const ws = XLSX.utils.aoa_to_sheet(fullData);

      // Calculate dynamic column widths
      const colWidths = sheet.headers.map((h, colIdx) => {
        let maxLen = Math.max(h.length, 12);
        sheet.rows.forEach((r) => {
          const cellVal = r[colIdx] !== undefined ? String(r[colIdx]) : '';
          if (cellVal.length > maxLen) maxLen = Math.min(cellVal.length, 60);
        });
        return { wch: maxLen + 4 };
      });

      ws['!cols'] = colWidths;
      return ws;
    };

    if (typeof contentOrData === 'string') {
      const parsedData = parseContentToExcelData(contentOrData, filenameTitle);
      parsedData.sheets.forEach((sheet) => {
        const ws = processSheet(sheet);
        XLSX.utils.book_append_sheet(workbook, ws, sheet.name || 'Data Sheet');
      });
    } else {
      contentOrData.sheets.forEach((sheet) => {
        const ws = processSheet(sheet);
        XLSX.utils.book_append_sheet(workbook, ws, sheet.name || 'Sheet1');
      });
    }

    const cleanFilename = filenameTitle
      .replace(/[^a-zA-Z0-9_\s-]/g, '')
      .trim()
      .replace(/\s+/g, '_')
      .slice(0, 50);

    const safeName = `${cleanFilename || 'Arohi_AI_Spreadsheet'}.xlsx`;
    XLSX.writeFile(workbook, safeName);
    return true;
  } catch (err) {
    console.error('Failed to export Excel spreadsheet:', err);
    alert('Excel generation failed. Please try again.');
    return false;
  }
}

export interface PresentationChartData {
  type: 'bar' | 'column' | 'line' | 'pie' | 'doughnut';
  title?: string;
  labels: string[];
  datasets: {
    name?: string;
    values: number[];
  }[];
}

export interface SlideData {
  title: string;
  subtitle?: string;
  bullets?: string[];
  cards?: { title: string; desc: string }[];
  keyMetric?: { value: string; label: string };
  callout?: string;
  chart?: PresentationChartData;
}

export type PresentationThemeKey =
  | 'emerald_warmth'
  | 'luxury_slate'
  | 'clinical_teal'
  | 'corporate_navy'
  | 'apple_keynote'
  | 'vibrant_sunburst'
  | 'purple'
  | 'midnight';

export interface PresentationData {
  title: string;
  subtitle?: string;
  theme?: PresentationThemeKey;
  slides: SlideData[];
}

export interface ThemeConfig {
  key: PresentationThemeKey;
  name: string;
  coverBg: string;
  slideBg: string;
  headerBg: string;
  brandAccent: string;
  brandSecondary: string;
  cardBg: string;
  cardBorder: string;
  textColorPrimary: string;
  textColorMuted: string;
  textColorDark: string;
  badgeBg: string;
  badgeBorder: string;
  badgeColor: string;
  badgeText: string;
  chartColors: string[];
  pillColor: string;
}

export const PRESENTATION_THEMES: Record<string, ThemeConfig> = {
  emerald_warmth: {
    key: 'emerald_warmth',
    name: 'Emerald Forest (Social Impact & Nature)',
    coverBg: '062C1E', // Deep Forest Pine
    slideBg: 'F4FAF6', // Soft Mint Off-White
    headerBg: '0A3E2C', // Rich Evergreen
    brandAccent: '059669', // Emerald
    brandSecondary: 'F59E0B', // Warm Amber
    cardBg: 'ECFDF5',
    cardBorder: '6EE7B7',
    textColorPrimary: 'FFFFFF',
    textColorMuted: 'A7F3D0',
    textColorDark: '064E3B',
    badgeBg: '064E3B',
    badgeBorder: '10B981',
    badgeColor: 'FCD34D',
    badgeText: '✦  EXECUTIVE PRESENTATION DECK',
    chartColors: ['059669', 'D97706', '2563EB', '10B981', 'F59E0B'],
    pillColor: '10B981'
  },
  luxury_slate: {
    key: 'luxury_slate',
    name: 'Obsidian & Gold (Premium Elegance)',
    coverBg: '0B0F19', // Obsidian Slate
    slideBg: 'F8FAFC', // Slate Studio White
    headerBg: '1E293B', // Charcoal Slate
    brandAccent: 'D97706', // Champagne Gold / Amber
    brandSecondary: 'F59E0B',
    cardBg: 'FFFBEB',
    cardBorder: 'FCD34D',
    textColorPrimary: 'FFFFFF',
    textColorMuted: '94A3B8',
    textColorDark: '0F172A',
    badgeBg: '1E293B',
    badgeBorder: 'D97706',
    badgeColor: 'FBBF24',
    badgeText: '✦  EXECUTIVE PRESENTATION DECK',
    chartColors: ['D97706', '1E293B', 'B45309', '475569', 'F59E0B'],
    pillColor: 'D97706'
  },
  clinical_teal: {
    key: 'clinical_teal',
    name: 'Oceanic Teal (Sciences & Discovery)',
    coverBg: '042F2E', // Deep Oceanic Teal
    slideBg: 'F0FDFA', // Crisp Clinical Ice
    headerBg: '115E59', // Medical Teal
    brandAccent: '0D9488', // Aqua Teal
    brandSecondary: '38BDF8', // Sky Blue
    cardBg: 'CCFBF1',
    cardBorder: '5EEAD4',
    textColorPrimary: 'FFFFFF',
    textColorMuted: '99F6E4',
    textColorDark: '134E4A',
    badgeBg: '134E4A',
    badgeBorder: '14B8A6',
    badgeColor: '5EEAD4',
    badgeText: '✦  EXECUTIVE PRESENTATION DECK',
    chartColors: ['0D9488', '0284C7', '14B8A6', '6366F1', '06B6D4'],
    pillColor: '0D9488'
  },
  corporate_navy: {
    key: 'corporate_navy',
    name: 'Corporate Navy (Strategic & Analysis)',
    coverBg: '0A192F', // Deep Navy
    slideBg: 'F8FAFC',
    headerBg: '1E3A8A', // Blue 900
    brandAccent: '2563EB', // Royal Blue
    brandSecondary: 'F59E0B', // Gold
    cardBg: 'EFF6FF',
    cardBorder: '93C5FD',
    textColorPrimary: 'FFFFFF',
    textColorMuted: 'BFDBFE',
    textColorDark: '1E293B',
    badgeBg: '172554',
    badgeBorder: '3B82F6',
    badgeColor: 'FCD34D',
    badgeText: '✦  EXECUTIVE PRESENTATION DECK',
    chartColors: ['1E3A8A', '2563EB', 'F59E0B', '0D9488', '64748B'],
    pillColor: '2563EB'
  },
  vibrant_sunburst: {
    key: 'vibrant_sunburst',
    name: 'Sunburst Indigo (Education & Innovation)',
    coverBg: '1E1B4B', // Electric Indigo
    slideBg: 'FFFDF5', // Warm Sunlit Cream
    headerBg: '4338CA', // Indigo
    brandAccent: 'EA580C', // Tangerine / Sunburst
    brandSecondary: 'F59E0B',
    cardBg: 'FFF7ED',
    cardBorder: 'FDBA74',
    textColorPrimary: 'FFFFFF',
    textColorMuted: 'C7D2FE',
    textColorDark: '1E1B4B',
    badgeBg: '312E81',
    badgeBorder: 'F97316',
    badgeColor: 'FED7AA',
    badgeText: '✦  EXECUTIVE PRESENTATION DECK',
    chartColors: ['EA580C', '4F46E5', 'F59E0B', '10B981', '8B5CF6'],
    pillColor: 'EA580C'
  },
  apple_keynote: {
    key: 'apple_keynote',
    name: 'Apple Keynote (Modern High-Tech)',
    coverBg: '090A0F', // Space Obsidian
    slideBg: 'FAFAFC', // Studio White
    headerBg: '180E38', // Deep Violet Obsidian
    brandAccent: '7C3AED', // Electric Violet
    brandSecondary: 'F59E0B', // Gold / Amber
    cardBg: 'F5F3FF',
    cardBorder: 'C4B5FD',
    textColorPrimary: 'FFFFFF',
    textColorMuted: '94A3B8',
    textColorDark: '0F172A',
    badgeBg: '1E1B4B',
    badgeBorder: '6D28D9',
    badgeColor: 'F59E0B',
    badgeText: '✦  EXECUTIVE PRESENTATION DECK',
    chartColors: ['7C3AED', 'F59E0B', '2563EB', '10B981', 'EC4899'],
    pillColor: '7C3AED'
  }
};

/**
 * Resolves or auto-detects the ideal theme from presentation data content
 */
export function resolvePresentationTheme(themeKey?: string, title?: string, contentSample?: string): ThemeConfig {
  const sample = `${title || ''} ${contentSample || ''}`.toLowerCase();

  // If a specific valid theme key was explicitly requested and it's not the generic default, use it
  let baseTheme: ThemeConfig;
  if (themeKey && PRESENTATION_THEMES[themeKey] && themeKey !== 'apple_keynote') {
    baseTheme = PRESENTATION_THEMES[themeKey];
  } else {
    // Topic-aware smart scoring: Count keyword occurrences for highest relevance
    let educationScore = 0;
    let realEstateScore = 0;
    let healthcareScore = 0;
    let financeScore = 0;
    let ngoScore = 0;

    const eduKeywords = ['education', 'academic', 'curriculum', 'school', 'college', 'university', 'student', 'learning', 'pedagogy', 'faculty', 'syllabus', 'course', 'training', 'degree', 'employability', 'accreditation', 'naac', 'nba', 'outcome-based', 'higher education'];
    const reKeywords = ['real estate', 'property', 'villas', 'apartments', 'luxury homes', 'sqft', 'realtor', 'residential', 'commercial building', 'brokerage', 'architectural design'];
    const healthKeywords = ['healthcare', 'hospital', 'medical', 'patient', 'clinical', 'pharma', 'doctor', 'vaccine', 'wellness', 'telehealth', 'therapy', 'oncology'];
    const financeKeywords = ['finance', 'banking', 'investor', 'equity', 'p&l', 'budget', 'accounting', 'fiscal', 'valuation', 'roi', 'portfolio', 'venture capital'];
    const ngoKeywords = ['ngo', 'humanitarian', 'charity', 'donation', 'nonprofit', 'social impact', 'volunteer', 'wildlife', 'conservation', 'climate change'];

    eduKeywords.forEach(k => { if (sample.includes(k)) educationScore += 3; });
    reKeywords.forEach(k => { if (sample.includes(k)) realEstateScore += 3; });
    healthKeywords.forEach(k => { if (sample.includes(k)) healthcareScore += 3; });
    financeKeywords.forEach(k => { if (sample.includes(k)) financeScore += 3; });
    ngoKeywords.forEach(k => { if (sample.includes(k)) ngoScore += 3; });

    const maxScore = Math.max(educationScore, realEstateScore, healthcareScore, financeScore, ngoScore);

    if (maxScore > 0) {
      if (maxScore === educationScore) {
        baseTheme = PRESENTATION_THEMES.vibrant_sunburst;
      } else if (maxScore === healthcareScore) {
        baseTheme = PRESENTATION_THEMES.clinical_teal;
      } else if (maxScore === financeScore) {
        baseTheme = PRESENTATION_THEMES.corporate_navy;
      } else if (maxScore === ngoScore) {
        baseTheme = PRESENTATION_THEMES.emerald_warmth;
      } else {
        baseTheme = PRESENTATION_THEMES.luxury_slate;
      }
    } else if (themeKey && PRESENTATION_THEMES[themeKey]) {
      baseTheme = PRESENTATION_THEMES[themeKey];
    } else {
      baseTheme = PRESENTATION_THEMES.apple_keynote;
    }
  }

  // Create a dynamic, topic-aligned badgeText based on the deck title / topic
  let dynamicBadge = '✦  EXECUTIVE PRESENTATION DECK';
  if (title && title.trim().length > 0 && !title.toLowerCase().includes('arohi') && !title.toLowerCase().includes('presentation')) {
    dynamicBadge = `✦  ${title.trim().toUpperCase().slice(0, 42)}`;
  } else if (sample.includes('education') || sample.includes('academic') || sample.includes('curriculum') || sample.includes('student')) {
    dynamicBadge = '✦  EDUCATION & ACADEMIC TRANSFORMATION';
  } else if (sample.includes('healthcare') || sample.includes('medical') || sample.includes('clinical')) {
    dynamicBadge = '✦  HEALTHCARE & LIFE SCIENCES';
  } else if (sample.includes('finance') || sample.includes('banking') || sample.includes('investor')) {
    dynamicBadge = '✦  STRATEGIC FINANCIAL & CORPORATE REPORT';
  } else if (sample.includes('ngo') || sample.includes('humanitarian') || sample.includes('charity')) {
    dynamicBadge = '✦  HUMANITARIAN & SOCIAL IMPACT INITIATIVE';
  } else if (sample.includes('real estate') || sample.includes('property') || sample.includes('architecture')) {
    dynamicBadge = '✦  REAL ESTATE & ARCHITECTURAL OVERVIEW';
  }

  return {
    ...baseTheme,
    badgeText: dynamicBadge
  };
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
 * Multi-Theme & Data Visualization Architecture:
 * - Dynamic Industry Theming (NGO/Emerald, Real Estate/Luxury Slate, Healthcare/Teal, Finance/Corporate Navy, Apple/Violet, Education/Sunburst)
 * - 16:9 Cinema Widescreen with High Contrast Typography
 * - Native Vector Chart Generation (Bar, Column, Line, Pie, Doughnut)
 * - Dynamic, content-specific slide headers, categories, and file naming
 */
export async function exportToPPTX(filenameTitle: string, presentation: PresentationData | string) {
  try {
    const PptxGenJS = (await import('pptxgenjs')).default;
    const pptx = new PptxGenJS();

    // Define and set standard 16:9 HD Widescreen (13.333" x 7.5") to ensure full slide width
    pptx.defineLayout({ name: 'LAYOUT_16x9_HD', width: 13.333, height: 7.5 });
    pptx.layout = 'LAYOUT_16x9_HD';
    pptx.author = 'Arohi AI';
    pptx.company = 'Arohi AI Ecosystem';

    const presData: PresentationData = typeof presentation === 'string'
      ? parseContentToSlides(presentation, filenameTitle)
      : presentation;

    const deckTitle = presData.title || filenameTitle || 'Arohi AI Presentation Deck';
    pptx.title = deckTitle;

    // Resolve Theme
    const sampleText = presData.slides.map((s) => `${s.title} ${(s.bullets || []).join(' ')}`).join(' ');
    const theme = resolvePresentationTheme(presData.theme, deckTitle, sampleText);

    // Dynamic brand tag derived from deck title
    const cleanBrandTag = deckTitle
      .replace(/Arohi_AI_Response|Arohi_Conversation/gi, 'Executive Presentation')
      .toUpperCase()
      .slice(0, 45);

    // ==========================================
    // SLIDE 1: COVER SLIDE (Industry & Apple Keynote Grade)
    // ==========================================
    const titleSlide = pptx.addSlide();
    titleSlide.background = { color: theme.coverBg };

    // Top accent glow line
    titleSlide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: '100%',
      h: 0.12,
      fill: { color: theme.brandAccent }
    });

    // Industry badge pill
    titleSlide.addShape(pptx.ShapeType.roundRect, {
      x: 1.0,
      y: 1.2,
      w: 5.4,
      h: 0.38,
      fill: { color: theme.badgeBg },
      line: { color: theme.badgeBorder, width: 1 },
      rectRadius: 0.19
    });

    titleSlide.addText(theme.badgeText, {
      x: 1.1,
      y: 1.25,
      w: 5.2,
      h: 0.3,
      fontSize: 10,
      bold: true,
      color: theme.badgeColor,
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
      color: theme.textColorPrimary,
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
      color: theme.textColorMuted,
      fontFace: 'Arial'
    });

    // Bottom presentation metadata bar
    titleSlide.addText([
      { text: 'Generated with Arohi AI (LLM cum LMM)\n', options: { bold: true, color: theme.textColorPrimary, fontSize: 11 } },
      { text: `Delivered on ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}  •  Confidential & Ready to Present`, options: { color: theme.textColorMuted, fontSize: 10 } }
    ], {
      x: 1.0,
      y: 5.6,
      w: 10.0,
      h: 0.9,
      fontFace: 'Arial'
    });

    // ==========================================
    // CONTENT SLIDES (Theme-Aligned & Visual Data Structure)
    // ==========================================
    presData.slides.forEach((slide, idx) => {
      const s = pptx.addSlide();
      s.background = { color: theme.slideBg };

      // Top Header Bar
      s.addShape(pptx.ShapeType.rect, {
        x: 0,
        y: 0,
        w: '100%',
        h: 1.15,
        fill: { color: theme.headerBg }
      });

      // Dynamic Slide Category Header Tag
      s.addText(`${cleanBrandTag}  |  SLIDE ${idx + 1} OF ${presData.slides.length}`, {
        x: 0.8,
        y: 0.18,
        w: 8.5,
        h: 0.25,
        fontSize: 9,
        bold: true,
        color: theme.badgeColor,
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
        color: theme.textColorPrimary,
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

      // Check if slide has a Chart
      const hasChart = Boolean(slide.chart && slide.chart.labels?.length && slide.chart.datasets?.length);

      // Key Metric Card if available (and not colliding with chart)
      if (slide.keyMetric && !hasChart) {
        s.addShape(pptx.ShapeType.roundRect, {
          x: 0.8,
          y: currentY,
          w: 3.6,
          h: 1.7,
          fill: { color: theme.cardBg },
          line: { color: theme.cardBorder, width: 1.5 },
          rectRadius: 0.15
        });

        s.addText(slide.keyMetric.value, {
          x: 0.9,
          y: currentY + 0.15,
          w: 3.4,
          h: 0.75,
          fontSize: 26,
          bold: true,
          color: theme.brandAccent,
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
          color: theme.textColorDark,
          align: 'center',
          fontFace: 'Arial'
        });
      }

      // Render Bullets
      if (slide.bullets && slide.bullets.length > 0) {
        let bulletX = 0.8;
        let bulletW = 11.5; // Safe padding inside 13.333" widescreen

        if (hasChart) {
          bulletX = 0.8;
          bulletW = 5.2;
        } else if (slide.keyMetric) {
          bulletX = 4.7;
          bulletW = 7.6;
        }

        const textRuns = slide.bullets.map((b) => ({
          text: b,
          options: {
            bullet: { type: 'bullet', code: '2022' },
            fontSize: hasChart ? 12 : 13,
            color: theme.textColorDark,
            fontFace: 'Arial',
            spacing: { after: hasChart ? 6 : 10 }
          }
        }));

        s.addText(textRuns as any, {
          x: bulletX,
          y: currentY,
          w: bulletW,
          h: hasChart ? 3.9 : 4.1,
          valign: 'top',
          margin: 0.15,
          wrap: true
        });
      }

      // Render Native Vector Chart if present
      if (hasChart && slide.chart) {
        const chartX = slide.bullets && slide.bullets.length > 0 ? 6.3 : 1.2;
        const chartW = slide.bullets && slide.bullets.length > 0 ? 6.2 : 10.9;
        const chartH = 3.9;

        const chartData = slide.chart.datasets.map((ds) => ({
          name: ds.name || slide.chart?.title || 'Data',
          labels: slide.chart!.labels,
          values: ds.values
        }));

        let chartType = pptx.ChartType.bar;
        let barDir: 'col' | 'bar' = 'col';

        if (slide.chart.type === 'line') {
          chartType = pptx.ChartType.line;
        } else if (slide.chart.type === 'pie') {
          chartType = pptx.ChartType.pie;
        } else if (slide.chart.type === 'doughnut') {
          chartType = pptx.ChartType.doughnut;
        } else if (slide.chart.type === 'bar') {
          chartType = pptx.ChartType.bar;
          barDir = 'bar';
        } else {
          chartType = pptx.ChartType.bar;
          barDir = 'col';
        }

        try {
          s.addChart(chartType, chartData, {
            x: chartX,
            y: currentY,
            w: chartW,
            h: chartH,
            barDir,
            showTitle: Boolean(slide.chart.title),
            title: slide.chart.title || '',
            titleFontSize: 12,
            titleColor: theme.textColorDark,
            showLegend: slide.chart.datasets.length > 1 || slide.chart.type === 'pie' || slide.chart.type === 'doughnut',
            legendPos: 'b',
            legendFontSize: 9,
            chartColors: theme.chartColors,
            showValue: true,
            dataLabelColor: '0F172A',
            dataLabelFontSize: 8,
            catAxisLabelFontSize: 8,
            valAxisLabelFontSize: 8
          });
        } catch (chartErr) {
          console.warn('Failed to add native chart to slide, falling back to data table:', chartErr);
        }
      }

      // Callout / Key Takeaway Card at bottom
      if (slide.callout) {
        s.addShape(pptx.ShapeType.roundRect, {
          x: 0.8,
          y: 5.7,
          w: 11.7,
          h: 0.8,
          fill: { color: theme.cardBg },
          line: { color: theme.cardBorder, width: 1 },
          rectRadius: 0.12
        });

        s.addText(`💡 Key Takeaway: ${slide.callout}`, {
          x: 1.0,
          y: 5.75,
          w: 11.3,
          h: 0.7,
          fontSize: 11,
          bold: true,
          color: theme.brandAccent,
          fontFace: 'Arial'
        });
      }

      // Footer
      s.addText('Arohi AI • One AI. Infinite Opportunities.', {
        x: 0.8,
        y: 6.85,
        w: 6.0,
        h: 0.3,
        fontSize: 9,
        color: '94A3B8',
        fontFace: 'Arial'
      });

      s.addText(`${idx + 1}`, {
        x: 11.5,
        y: 6.85,
        w: 1.0,
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
    endSlide.background = { color: theme.coverBg };

    endSlide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: '100%',
      h: 0.12,
      fill: { color: theme.brandAccent }
    });

    endSlide.addText('Thank You', {
      x: 1.0,
      y: 2.2,
      w: 11.0,
      h: 1.4,
      fontSize: 48,
      bold: true,
      color: theme.textColorPrimary,
      align: 'center',
      fontFace: 'Arial'
    });

    endSlide.addText('Open for Strategic Discussion & Q&A', {
      x: 1.0,
      y: 3.7,
      w: 11.0,
      h: 0.6,
      fontSize: 18,
      color: theme.badgeColor,
      align: 'center',
      fontFace: 'Arial'
    });

    endSlide.addText('Created with Arohi AI • Universal Intelligence Ecosystem', {
      x: 1.0,
      y: 5.8,
      w: 11.0,
      h: 0.5,
      fontSize: 11,
      color: theme.textColorMuted,
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
