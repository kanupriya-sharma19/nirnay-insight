// HTML escape function to prevent XSS attacks
const escapeHTML = (str: string | undefined | null): string => {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const isValidYouTubeUrl = (url: string) => {
  if (!url) return false;
  const patterns = [
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/,
    /^(https?:\/\/)?(www\.)?(youtu\.be\/)([a-zA-Z0-9_-]+)/,
    /^(https?:\/\/)?(www\.)?(youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
  ];
  return patterns.some((pattern) => pattern.test(url));
};

const getYouTubeEmbedUrl = (url: string) => {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    /youtu\.be\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }

  return null;
};

const renderTableHTML = (tableData: any[], columns: string[]): string => {
  if (!tableData || tableData.length === 0) {
    return '<tr><td colspan="100%" style="text-align: center; padding: 10px; color: #999; font-style: italic;">No data entered</td></tr>';
  }

  return tableData
    .map(
      (row) => `
    <tr>
      ${columns.map((col) => `<td>${escapeHTML(row[col] || "")}</td>`).join("")}
    </tr>
  `
    )
    .join("");
};

export const generatePDF = (formData: any, formTemplate: any) => {
  const pdfWindow = window.open("", "_blank");
  if (!pdfWindow) return;

  // Build detail rows HTML for fields 4-19 (all text/textarea fields after the first 3)
  const textFields = [
    {
      name: "issueDefinition",
      label: "4. Definition of the issue (Max. 300 words)",
    },
    {
      name: "objectives",
      label: "5. Objectives (Specific and not more than 2-3)",
    },
    {
      name: "justification",
      label: "6. Justification for subject area (Max. 200 words)",
    },
    {
      name: "benefitToIndustry",
      label: "7. How the project is beneficial to coal industry",
    },
    { name: "workPlan", label: "8. Work Plan (Max. 100 words)" },
    { name: "methodology", label: "8.1 Methodology (Max. 200 words)" },
    {
      name: "organizationOfWork",
      label: "8.2 Organization of work elements (Max. 200 words)",
    },
    { name: "foreignExchange", label: "Foreign Exchange Component (if any)" },
    {
      name: "fundPhasing",
      label:
        "10. Phasing of fund requirement (in percentage) with respect to activities/milestone",
    },
    {
      name: "landBuildingJustification",
      label: "12. Justification for land & building",
    },
    {
      name: "equipmentJustification",
      label: "14. Justification for Equipment",
    },
    {
      name: "pastExperience",
      label: "17. Past experience and Institutional Expertise",
    },
    { name: "otherDetails", label: "18. Other Details" },
  ];

const detailRowsHTML = textFields
  .filter((field) => formData[field.name] && formData[field.name].trim() !== "")
  .map(
    (field) => `
      <tr>
        <th>${escapeHTML(field.label)}</th>
        <td>${escapeHTML(formData[field.name])}</td>
      </tr>
    `
  )
  .join("");


  // Build extra sections HTML for tables and special fields
  let extraSectionsHTML = "";

  // 8.3 Time Schedule (file upload)
  if (formData.timeSchedule) {
    extraSectionsHTML += `
      <div class="section">
        <div class="section-title">8.3 Time schedule of activities giving Milestones</div>
        <table class="form-table">
          <tr>
            <td style="text-align: center; padding: 15px; font-style: italic; color: #666;">
              Attachment provided: ${escapeHTML(
                formData.timeSchedule.name || "Document attached"
              )}
            </td>
          </tr>
        </table>
      </div>
    `;
  }

  // 9. Proposed Outlay Table
  if (formData.proposedOutlay && formData.proposedOutlay.length > 0) {
    extraSectionsHTML += `
      <div class="section">
        <div class="section-title">9. Details of Proposed Outlay (₹ in lakhs)</div>
        <table class="budget-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>1st Year</th>
              <th>2nd Year</th>
              <th>3rd Year</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            ${renderTableHTML(formData.proposedOutlay, [
              "Item",
              "1st Year",
              "2nd Year",
              "3rd Year",
              "Total Cost",
            ])}
          </tbody>
        </table>
      </div>
    `;
  }

  // 11. Land & Building Outlay Table
  if (formData.landBuildingOutlay && formData.landBuildingOutlay.length > 0) {
    extraSectionsHTML += `
      <div class="section">
        <div class="section-title">11. Outlay for Land & Building (₹ in Lakhs)</div>
        <table class="budget-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Plinth Area</th>
              <th>Type of Building</th>
              <th>Estimated Cost</th>
            </tr>
          </thead>
          <tbody>
            ${renderTableHTML(formData.landBuildingOutlay, [
              "Item",
              "Plinth Area",
              "Type of Building",
              "Estimated Cost",
            ])}
          </tbody>
        </table>
      </div>
    `;
  }

  // 13. Equipment Outlay Table
  if (formData.equipmentOutlay && formData.equipmentOutlay.length > 0) {
    extraSectionsHTML += `
      <div class="section">
        <div class="section-title">13. Outlay for Equipment</div>
        <table class="budget-table">
          <thead>
            <tr>
              <th>Generic Name of Equipment</th>
              <th>Specifications</th>
              <th>Number</th>
              <th>Imported/Indigenous</th>
              <th>Estimated Cost (₹ in Lakhs)</th>
              <th>Foreign Exchange Component</th>
            </tr>
          </thead>
          <tbody>
            ${renderTableHTML(formData.equipmentOutlay, [
              "Generic Name of Equipment",
              "Specifications",
              "Number",
              "Imported/Indigenous",
              "Estimated Cost (₹ in Lakhs)",
              "Foreign Exchange Component",
            ])}
          </tbody>
        </table>
      </div>
    `;
  }

  // 15. Consumable Outlay Table
  if (formData.consumableOutlay && formData.consumableOutlay.length > 0) {
    extraSectionsHTML += `
      <div class="section">
        <div class="section-title">15. Outlay for Consumable Materials</div>
        <table class="budget-table">
          <thead>
            <tr>
              <th>Head</th>
              <th>1st Year (₹)</th>
              <th>2nd Year (₹)</th>
              <th>3rd Year (₹)</th>
              <th>Total (₹)</th>
              <th>Foreign Exchange Component</th>
            </tr>
          </thead>
          <tbody>
            ${renderTableHTML(formData.consumableOutlay, [
              "Head",
              "1st Year (₹)",
              "2nd Year (₹)",
              "3rd Year (₹)",
              "Total (₹)",
              "Foreign Exchange Component",
            ])}
          </tbody>
        </table>
      </div>
    `;
  }

  // 16. Curriculum Vitae (file upload)
  if (formData.curriculumVitae) {
    extraSectionsHTML += `
      <div class="section">
        <div class="section-title">16. Curriculum Vitae of Project Proponents</div>
        <table class="form-table">
          <tr>
            <td style="text-align: center; padding: 15px; font-style: italic; color: #666;">
              Attachment provided: ${escapeHTML(
                formData.curriculumVitae.name || "Document attached"
              )}
            </td>
          </tr>
        </table>
      </div>
    `;
  }

  // 19. Video Pitch
  if (formData.videoLink) {
    const embedUrl = getYouTubeEmbedUrl(formData.videoLink);
    extraSectionsHTML += `
      <div class="section">
        <div class="section-title">19. Video Pitch (YouTube Link)</div>
        ${
          embedUrl
            ? `
          <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin: 15px 0;">
            <iframe 
              src="${embedUrl}" 
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 2px solid #1e40af;"
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
        `
            : `
          <table class="form-table">
            <tr>
              <td>${escapeHTML(formData.videoLink || "Not provided")}</td>
            </tr>
          </table>
        `
        }
      </div>
    `;
  }

  const pdfContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${escapeHTML(formTemplate.title)}</title>
      <style>
        body { font-family: 'Arial', sans-serif; margin: 0; padding: 20px; line-height: 1.4; color: #333; background: #fff; }
        .govt-logos { border-top: 3px solid #1e40af; background: #e0e7ff; padding: 10px 0; margin-top: 30px; }
        .logo-container { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 40px;  }
        .logo-item { text-align: center; }
        .logo-item img { height: 50px; object-fit: contain; }
        .logo-text { font-size: 10px; color: #1e3a8a; margin-top: 4px; }
        .header { text-align: center; border-bottom: 3px double #1e40af; padding-bottom: 10px; margin-bottom: 20px; }
        .header h1 { color: #1e40af; margin: 0; font-size: 24px; font-weight: bold; }
        .header h2 { color: #1e40af; margin: 5px 0; font-size: 18px; }
        .section { margin: 20px 0; page-break-inside: avoid; }
        .section-title { background: #1e40af; color: white; padding: 8px 12px; margin: 15px 0 10px 0; font-weight: bold; border-radius: 4px; }
        .form-table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 12px; }
        .form-table th, .form-table td { border: 1px solid #ddd; padding: 8px; text-align: left; vertical-align: top; }
        .form-table th { background: #f8f9fa; font-weight: bold; width: 35%; }
        .budget-table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 11px; }
        .budget-table th, .budget-table td { border: 1px solid #ddd; padding: 6px; text-align: left; }
        .budget-table th { background: #1e40af; color: white; font-weight: bold; }
        .note { font-style: italic; color: #666; font-size: 11px; margin-top: 5px; }
        .signature-section { margin-top: 40px; border-top: 1px solid #ddd; padding-top: 20px; }
        .signature-line { width: 300px; border-bottom: 1px solid #333; margin: 40px 0 5px 0; }
        .footer { text-align: center; margin-top: 30px; font-size: 10px; color: #666; }
     @media print {
  body { margin: 0; * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
}
  .section { page-break-before: auto; page-break-after: auto; }
}

      </style>
    </head>
    <body>
      <div class="header">
        <h1>GOVERNMENT OF INDIA</h1>
        <h2>MINISTRY OF COAL</h2>
        <h2>${escapeHTML(formTemplate.title)}</h2>
        <p><strong>Format for submission of R&D project proposal</strong></p>
      </div>

      <!-- Basic Information -->
      <div class="section">
        <table class="form-table">
          <tr>
            <th>1. PROJECT TITLE</th>
            <td>${escapeHTML(formData.projectTitle || "Not provided")}</td>
          </tr>
          <tr>
            <th>2. Name and address of principal Implementing Agency(s)<br/>Name of Project Leader/Coordinator/Principle Investigator</th>
            <td>
              ${escapeHTML(formData.implementingAgency || "Not provided")}
              <br/><strong>Project Leader:</strong> ${escapeHTML(
                formData.projectLeader || "Not provided"
              )}
            </td>
          </tr>
          <tr>
            <th>3. Name and address of Sub-Implementing Agency(s)<br/>Name of Co-investigator(s)</th>
            <td>
              ${escapeHTML(formData.subImplementingAgency || "Indian Institute of Technology, Bombay")}
              <br/><strong>Co-investigator:</strong> ${escapeHTML(
                formData.coInvestigator || "Dr CV Chandra"
              )}
            </td>
          </tr>
        </table>
      </div>

      <!-- All Remaining Fields (covers 4-19) -->
      <div class="section">
        <div class="section-title">PROJECT DETAILS AND RESPONSES</div>
        <table class="form-table">
          ${detailRowsHTML}
        </table>
      </div>

      <!-- Table and Video Sections -->
      ${extraSectionsHTML}

      <!-- Signature Section -->
      <div class="signature-section">
        <div style="display: flex; justify-content: space-between;">
          <div>
            <p><strong>Submitted by:</strong></p>
            <div class="signature-line"></div>
            <p>Project Leader/Principal Investigator</p>
            <p>Name: ${escapeHTML(formData.projectLeader || "")}</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>
      
        </div>
      </div>

      <!-- Government Logos Section -->
      <div class="govt-logos">
        <div class="logo-container">
          <div class="logo-item"><img src="/Emblem_final.svg" alt="Emblem" /></div>
          <div class="logo-item"><img src="/final.png" alt="Digital India" /></div>
          <div class="logo-item"><img src="/cmpdi.png" alt="CMPDI" /></div>
          <div class="logo-item">
            <img src="/logo.png" />
          </div>
        </div>
      </div>

      <div class="footer">
        <p>Generated on: ${new Date().toLocaleString()} | Form ID: ${escapeHTML(
    formTemplate.title
  )}</p>
      </div>
    </body>
    </html>
  `;

  pdfWindow.document.write(pdfContent);
  pdfWindow.document.close();
  setTimeout(() => {
    pdfWindow.print();
  }, 500);
};
