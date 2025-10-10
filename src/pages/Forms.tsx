"use client";

// pages/FormSubmission.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GovtHeader } from "@/components/GovtHeader";
import { GovtFooter } from "@/components/GovtFooter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Send, Plus, Trash2, Save, Eye } from "lucide-react";

// Table Field Component
const TableField = ({ field, value = [], onChange }) => {
  const [rows, setRows] = useState(
    value.length > 0 ? value : [createEmptyRow(field.columns)]
  );

  function createEmptyRow(columns: string[]) {
    const row: any = {};
    columns.forEach((column) => {
      row[column] = "";
    });
    return row;
  }

  const addRow = () => {
    const newRows = [...rows, createEmptyRow(field.columns)];
    setRows(newRows);
    onChange(newRows);
  };

  const removeRow = (index: number) => {
    if (rows.length > 1) {
      const newRows = rows.filter((_, i) => i !== index);
      setRows(newRows);
      onChange(newRows);
    }
  };

  const updateCell = (rowIndex: number, column: string, newValue: string) => {
    const newRows = [...rows];
    newRows[rowIndex][column] = newValue;
    setRows(newRows);
    onChange(newRows);
  };

  return (
    <div className="table-field space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              {field.columns.map((column, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-4 py-2 text-left font-semibold"
                >
                  {column}
                </th>
              ))}
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {field.columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-gray-300 px-4 py-2"
                  >
                    <Input
                      type="text"
                      value={row[column] || ""}
                      onChange={(e) =>
                        updateCell(rowIndex, column, e.target.value)
                      }
                      placeholder={`Enter ${column}`}
                      className="border-0 focus-visible:ring-1"
                    />
                  </td>
                ))}
                <td className="border border-gray-300 px-4 py-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeRow(rowIndex)}
                    disabled={rows.length === 1}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={addRow}
        className="flex items-center gap-2 bg-transparent"
      >
        <Plus className="h-4 w-4" />
        Add Row
      </Button>
    </div>
  );
};

// YouTube URL validation and embedding utilities
const isValidYouTubeUrl = (url: string) => {
  const patterns = [
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/,
    /^(https?:\/\/)?(www\.)?(youtu\.be\/)([a-zA-Z0-9_-]+)/,
    /^(https?:\/\/)?(www\.)?(youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
  ];
  return patterns.some((pattern) => pattern.test(url));
};

const getYouTubeEmbedUrl = (url: string) => {
  if (!url) return null;

  // Extract video ID from different YouTube URL formats
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
// PDF Generation Function

const generatePDF = (formData: any, formTemplate: any) => {
  const pdfWindow = window.open("", "_blank");
  if (!pdfWindow) return;

  const pdfContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${formTemplate.title}</title>
      <style>
        body { 
          font-family: 'Arial', sans-serif; 
          margin: 0; 
          padding: 20px; 
          line-height: 1.4;
          color: #333;
        }/* Government Logos Section (Blue Theme) */
.govt-logos {
  border-top: 3px solid #1e40af; /* blue top border */
  background: #e0e7ff; /* light blue background */
  padding: 10px 0;
  margin-top: 30px;
}
.logo-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 40px;
  opacity: 0.9;
}
.logo-item {
  text-align: center;
}
.logo-item img {
  height: 45px;
  object-fit: contain;
}
.logo-text {
  font-size: 10px;
  color: #1e3a8a; /* darker blue text */
  margin-top: 4px;
}

        .header { 
          text-align: center; 
          border-bottom: 3px double #1e40af; 
          padding-bottom: 10px; 
          margin-bottom: 20px;
        }
        .header h1 { 
          color: #1e40af; 
          margin: 0; 
          font-size: 24px;
          font-weight: bold;
        }
        .header h2 { 
          color: #1e40af; 
          margin: 5px 0; 
          font-size: 18px;
        }
        .section { 
          margin: 20px 0; 
          page-break-inside: avoid;
        }
        .section-title { 
          background: #1e40af; 
          color: white; 
          padding: 8px 12px; 
          margin: 15px 0 10px 0;
          font-weight: bold;
          border-radius: 4px;
        }
        .form-table { 
          width: 100%; 
          border-collapse: collapse; 
          margin: 10px 0;
          font-size: 12px;
        }
        .form-table th, .form-table td { 
          border: 1px solid #ddd; 
          padding: 8px; 
          text-align: left;
          vertical-align: top;
        }
        .form-table th { 
          background: #f8f9fa; 
          font-weight: bold;
          width: 30%;
        }
        .budget-table { 
          width: 100%; 
          border-collapse: collapse; 
          margin: 10px 0;
          font-size: 11px;
        }
        .budget-table th, .budget-table td { 
          border: 1px solid #ddd; 
          padding: 6px; 
          text-align: center;
        }
        .budget-table th { 
          background: #1e40af; 
          color: white;
          font-weight: bold;
        }
        .sub-section { 
          margin-left: 20px; 
          margin-top: 10px;
        }
        .note { 
          font-style: italic; 
          color: #666; 
          font-size: 11px;
          margin-top: 5px;
        }
        .signature-section {
          margin-top: 40px;
          border-top: 1px solid #ddd;
          padding-top: 20px;
        }
        .signature-line {
          width: 300px;
          border-bottom: 1px solid #333;
          margin: 40px 0 5px 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          font-size: 10px;
          color: #666;
        }
        @media print {
          body { margin: 0; }
          .section { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>GOVERNMENT OF INDIA</h1>
        <h2>MINISTRY OF COAL</h2>
        <h2>${formTemplate.title}</h2>
        <p><strong>Format for submission of R&D project proposal</strong></p>
      </div>

      <!-- Basic Information -->
      <div class="section">
        <table class="form-table">
          <tr>
            <th>1. PROJECT TITLE</th>
            <td>${formData.projectTitle || "Not provided"}</td>
          </tr>
          <tr>
            <th>2. Name and address of principal Implementing Agency(s)<br>Name of Project Leader/Coordinator/Principle Investigator</th>
            <td>${
              formData.implementingAgency || "Not provided"
            }<br><strong>Project Leader:</strong> ${
    formData.projectLeader || "Not provided"
  }</td>
          </tr>
          <tr>
            <th>3. Name and address of Sub-Implementing Agency(s)<br>Name of Co-investigator(s)</th>
            <td>${
              formData.subImplementingAgency || "Not provided"
            }<br><strong>Co-investigator:</strong> ${
    formData.coInvestigator || "Not provided"
  }</td>
          </tr>
        </table>
      </div>

      <!-- Project Details -->
      <div class="section">
        <div class="section-title">PROJECT DETAILS</div>
        <table class="form-table">
          <tr>
            <th>4. Definition of the issue (Max. 300 words)</th>
            <td>${formData.issueDefinition || "Not provided"}</td>
          </tr>
          <tr>
            <th>5. Objectives (Specific and not more than 2-3)</th>
            <td>${formData.objectives || "Not provided"}</td>
          </tr>
          <tr>
            <th>6. Justification for subject area (Max. 200 words)</th>
            <td>${formData.justification || "Not provided"}</td>
          </tr>
          <tr>
            <th>7. How the project is beneficial to coal industry</th>
            <td>${formData.benefitToIndustry || "Not provided"}</td>
          </tr>
        </table>
      </div>

      <!-- Work Plan -->
      <div class="section">
        <div class="section-title">WORK PLAN</div>
        <table class="form-table">
          <tr>
            <th>8. Work Plan (Max. 100 words)</th>
            <td>${formData.workPlan || "Not provided"}</td>
          </tr>
          <tr>
            <th>8.1 Methodology (Max. 200 words)</th>
            <td>${formData.methodology || "Not provided"}</td>
          </tr>
          <tr>
            <th>8.2 Organization of work elements (Max. 200 words)</th>
            <td>${formData.organizationOfWork || "Not provided"}</td>
          </tr>
          <tr>
            <th>8.3 Time schedule of activities giving Milestones</th>
            <td>${
              formData.timeSchedule ? "Attachment provided" : "Not provided"
            }</td>
          </tr>
        </table>
      </div>

      <!-- Budget Details -->
      <div class="section">
        <div class="section-title">DETAILS OF PROPOSED OUTLAY (Rs. in lakhs)</div>
        <table class="budget-table">
          <tr>
            <th rowspan="2">Sl. No.</th>
            <th rowspan="2">Items</th>
            <th colspan="4">Total cost estimated</th>
          </tr>
          <tr>
            <th>Total project cost</th>
            <th>1st Year</th>
            <th>2nd Year</th>
            <th>3rd Year</th>
          </tr>
          <tr>
            <td colspan="2"><strong>CAPITAL EXPENDITURE</strong></td>
            <td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td>9.1</td>
            <td>Land & Building</td>
            <td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td>9.2</td>
            <td>Equipment</td>
            <td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td>9.3</td>
            <td><strong>Total Capital (9.1+9.2)</strong></td>
            <td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td colspan="2"><strong>REVENUE EXPENDITURE</strong></td>
            <td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td>9.4</td>
            <td>Salaries / allowances</td>
            <td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td>9.5</td>
            <td>Consumables</td>
            <td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td>9.6</td>
            <td>Travel</td>
            <td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td>9.7</td>
            <td>Attending or organizing Workshop/Seminar</td>
            <td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td>9.8</td>
            <td><strong>Total Revenue expenditure (9.4+9.5+9.6+9.7)</strong></td>
            <td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td>9.9</td>
            <td>Contingency</td>
            <td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td>9.10</td>
            <td>Institutional Overhead</td>
            <td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td>9.11</td>
            <td>Applicable taxes/duties/charges etc.</td>
            <td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td>9.12</td>
            <td><strong>Grand Total (9.3+9.8+9.9+9.10+9.11)</strong></td>
            <td></td><td></td><td></td><td></td>
          </tr>
        </table>
        
        <div class="sub-section">
          <p><strong>Foreign Exchange Component:</strong> ${
            formData.foreignExchange || "Not applicable"
          }</p>
          <p>Name of the Foreign Currency: </p>
          <p>Exchange Rate: Date: </p>
        </div>
      </div>

      <!-- Additional Sections -->
      <div class="section">
        <table class="form-table">
          <tr>
            <th>10. Phasing of fund requirement (in percentage) with respect to activities/milestone</th>
            <td>${formData.fundPhasing || "Not provided"}</td>
          </tr>
          <tr>
            <th>12. Justification for land & building</th>
            <td>${formData.landBuildingJustification || "Not provided"}</td>
          </tr>
          <tr>
            <th>14. Justification for Equipment</th>
            <td>${formData.equipmentJustification || "Not provided"}</td>
          </tr>
          <tr>
            <th>16. Curriculum Vitae of Project Proponents</th>
            <td>${
              formData.curriculumVitae ? "Attachment provided" : "Not provided"
            }</td>
          </tr>
          <tr>
            <th>17. Past experience and Institutional Expertise</th>
            <td>${formData.pastExperience || "Not provided"}</td>
          </tr>
          <tr>
            <th>18. Other Details</th>
            <td>${formData.otherDetails || "Not provided"}</td>
          </tr>
          <tr>
            <th>19. Video Pitch (Add a YouTube video link for your 3-minute presentation)</th>
            <td>${
              isValidYouTubeUrl(formData.videoLink)
                ? `<iframe width="560" height="315" src="${getYouTubeEmbedUrl(
                    formData.videoLink
                  )}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                : "Not provided"
            }</td>
          </tr>
        </table>
      </div>

      <!-- Signature Section -->
      <div class="signature-section">
        <div style="display: flex; justify-content: space-between;">
          <div>
            <p><strong>Submitted by:</strong></p>
            <div class="signature-line"></div>
            <p>Project Leader/Principal Investigator</p>
            <p>Name: ${formData.projectLeader || ""}</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <p><strong>Endorsed by:</strong></p>
            <div class="signature-line"></div>
            <p>Head of Institution</p>
            <p>Date: </p>
          </div>
        </div>
      </div>
<!-- Government Logos Section -->
<div class="govt-logos">
  <div class="logo-container">
    <div class="logo-item">
      <img src="/Emblem_final.svg" alt="Emblem" />
    </div>
    <div class="logo-item">
      <img src="/final.png" alt="Digital India" />
    </div>
    <div class="logo-item">
      <img src="/cmpdi.png" alt="CMPDI" />
    </div>
    <div class="logo-item">
      <img src="/Emblem_final.svg" alt="Emblem" />
      <p class="logo-text">Our logo</p>
    </div>
  </div>
</div>

      <div class="footer">
        <p>Generated on: ${new Date().toLocaleString()} | Form ID: ${
    formTemplate.title
  }</p>
      </div>
    </body>
    </html>
  `;

  pdfWindow.document.write(pdfContent);
  pdfWindow.document.close();

  // Add print functionality
  setTimeout(() => {
    pdfWindow.print();
  }, 500);
};

const formTemplates = {
  "form-i": {
    title: "Project Proposal (Form - I)",
    description: "R&D project proposal",
    fields: [
      {
        name: "projectTitle",
        label: "1. Project Title",
        type: "text",
        required: true,
      },
      {
        name: "implementingAgency",
        label: "2. Name and Address of Principal Implementing Agency(s)",
        type: "textarea",
        required: true,
      },
      {
        name: "projectLeader",
        label: "Name of Project Leader/Coordinator/Principal Investigator",
        type: "text",
        required: true,
      },
      {
        name: "subImplementingAgency",
        label: "3. Name and Address of Sub-Implementing Agency(s)",
        type: "textarea",
        required: true,
      },
      {
        name: "coInvestigator",
        label: "Name of Co-Investigator(s)",
        type: "text",
        required: true,
      },
      {
        name: "issueDefinition",
        label: "4. Definition of the Issue (Max. 300 words)",
        type: "textarea",
        required: true,
      },
      {
        name: "objectives",
        label: "5. Objectives (Specific, not more than 2–3)",
        type: "textarea",
        required: true,
      },
      {
        name: "justification",
        label: "6. Justification for Subject Area (Max. 200 words)",
        type: "textarea",
        required: true,
      },
      {
        name: "benefitToIndustry",
        label: "7. How the Project is Beneficial to Coal Industry",
        type: "textarea",
        required: true,
      },
      {
        name: "workPlan",
        label: "8. Work Plan (Max. 100 words)",
        type: "textarea",
        required: true,
      },
      {
        name: "methodology",
        label: "8.1 Methodology (Max. 200 words)",
        type: "textarea",
        required: true,
      },
      {
        name: "organizationOfWork",
        label: "8.2 Organization of Work Elements (Max. 200 words)",
        type: "textarea",
        required: true,
      },
      {
        name: "timeSchedule",
        label:
          "8.3 Time Schedule of Activities and Milestones (Attach Bar/Pert Chart)",
        type: "file",
        required: true,
      },
      {
        name: "proposedOutlay",
        label: "9. Details of Proposed Outlay (₹ in Lakhs)",
        type: "table",
        columns: ["Item", "1st Year", "2nd Year", "3rd Year", "Total Cost"],
        required: true,
      },
      {
        name: "foreignExchange",
        label: "Foreign Exchange Component (if any)",
        type: "textarea",
        required: true,
      },
      {
        name: "fundPhasing",
        label:
          "10. Phasing of Fund Requirement (in % with respect to milestones)",
        type: "textarea",
        required: true,
      },
      {
        name: "landBuildingOutlay",
        label: "11. Outlay for Land & Building (₹ in Lakhs)",
        type: "table",
        columns: ["Item", "Plinth Area", "Type of Building", "Estimated Cost"],
        required: true,
      },
      {
        name: "landBuildingJustification",
        label: "12. Justification for Land & Building",
        type: "textarea",
        required: true,
      },
      {
        name: "equipmentOutlay",
        label: "13. Outlay for Equipment",
        type: "table",
        columns: [
          "Generic Name of Equipment",
          "Specifications",
          "Number",
          "Imported/Indigenous",
          "Estimated Cost (₹ in Lakhs)",
          "Foreign Exchange Component",
        ],
        required: true,
      },
      {
        name: "equipmentJustification",
        label: "14. Justification for Equipment",
        type: "textarea",
        required: true,
      },
      {
        name: "consumableOutlay",
        label: "15. Outlay for Consumable Materials",
        type: "table",
        columns: [
          "Head",
          "1st Year (₹)",
          "2nd Year (₹)",
          "3rd Year (₹)",
          "Total (₹)",
          "Foreign Exchange Component",
        ],
        required: true,
      },
      {
        name: "curriculumVitae",
        label: "16. Curriculum Vitae of Project Proponents",
        type: "file",
        required: true,
      },
      {
        name: "pastExperience",
        label: "17. Past Experience and Institutional Expertise",
        type: "textarea",
        required: true,
      },
      {
        name: "otherDetails",
        label:
          "18. Other Details (DGMS discussions, Literature Survey, R&D components, etc.)",
        type: "textarea",
        required: true,
      },
      {
        name: "videoLink",
        label:
          "19. Video Pitch (Add a YouTube video link for your 3-minute presentation)",
        type: "text",
        required: true,
      },
    ],
  },
  "form-ia": {
    title: "Endorsement from Head of Institution (Form - IA)",
    description: "Endorsement from Head of the Institution / Organisation",
    fields: [
      {
        name: "headName",
        label: "Head of Institution Name",
        type: "text",
        required: true,
      },
      {
        name: "headDesignation",
        label: "Designation",
        type: "text",
        required: true,
      },
      {
        name: "institutionName",
        label: "Institution Name",
        type: "text",
        required: true,
      },
      {
        name: "endorsementDate",
        label: "Endorsement Date",
        type: "date",
        required: true,
      },
      { name: "remarks", label: "Remarks", type: "textarea", required: false },
    ],
  },
  "form-ii": {
    title: "Fund Requisition (Form - II)",
    description: "Fund Requisition for Project",
    fields: [
      {
        name: "proposalId",
        label: "Proposal ID",
        type: "text",
        required: true,
      },
      {
        name: "requisitionAmount",
        label: "Requisition Amount (₹)",
        type: "number",
        required: true,
      },
      {
        name: "purpose",
        label: "Purpose of Requisition",
        type: "textarea",
        required: true,
      },
      {
        name: "utilizationPeriod",
        label: "Utilization Period (Months)",
        type: "number",
        required: true,
      },
    ],
  },
  "form-iii": {
    title: "Financial Expenditure Statement (Form - III)",
    description: "Financial Expenditure Statement",
    fields: [
      {
        name: "projectId",
        label: "Project ID",
        type: "text",
        required: true,
      },
      {
        name: "reportingPeriod",
        label: "Reporting Period",
        type: "text",
        required: true,
      },
    ],
  },
  "form-iv": {
    title: "Expenditure statement for Equipment (Form - IV)",
    description: "Expenditure statement for Equipment",
    fields: [
      {
        name: "equipmentDetails",
        label: "Equipment Details",
        type: "textarea",
        required: true,
      },
    ],
  },
  "form-v": {
    title: "Physical Progress Report (Form - V)",
    description: "Physical Progress Report",
    fields: [
      {
        name: "progressDetails",
        label: "Progress Details",
        type: "textarea",
        required: true,
      },
    ],
  },
  "form-vi": {
    title: "Project Completion Report (Form - VI)",
    description: "Project Completion Report",
    fields: [
      {
        name: "completionDetails",
        label: "Completion Details",
        type: "textarea",
        required: true,
      },
    ],
  },
  "form-vii": {
    title: "Extension of Project Duration (Form - VII)",
    description: "Extension of Project Duration",
    fields: [
      {
        name: "extensionReason",
        label: "Reason for Extension",
        type: "textarea",
        required: true,
      },
    ],
  },
  "form-viii": {
    title: "Cost Revision or Re-appropriation (Form - VIII)",
    description: "Cost Revision or Re-appropriation",
    fields: [
      {
        name: "revisionDetails",
        label: "Revision Details",
        type: "textarea",
        required: true,
      },
    ],
  },
  "form-ix": {
    title: "List of Equipment procured in the past (Form - IX)",
    description: "List of Equipment procured in the past",
    fields: [
      {
        name: "equipmentList",
        label: "Equipment List",
        type: "textarea",
        required: true,
      },
    ],
  },
  "form-x": {
    title: "List of Computer and Accessories Procured in the Past (Form - X)",
    description: "List of Computer and Accessories Procured in the Past",
    fields: [
      {
        name: "computerList",
        label: "Computer and Accessories List",
        type: "textarea",
        required: true,
      },
    ],
  },
  "form-xi": {
    title: "Justification of Salary & Wages (Form - XI)",
    description: "Justification of Salary & Wages",
    fields: [
      {
        name: "salaryJustification",
        label: "Salary Justification",
        type: "textarea",
        required: true,
      },
    ],
  },
  "form-xii": {
    title: "Justification for TA-DA (Form - XII)",
    description: "Justification for TA-DA",
    fields: [
      {
        name: "taDaJustification",
        label: "TA-DA Justification",
        type: "textarea",
        required: true,
      },
    ],
  },
};

// Calculate form completion percentage
const calculateCompletion = (formData: any, fields: any[]) => {
  if (!fields.length) return 0;

  const filledFields = fields.filter((field) => {
    const value = formData[field.name];
    if (field.required) {
      if (field.type === "table") {
        return (
          value &&
          value.length > 0 &&
          value.some((row: any) =>
            Object.values(row).some(
              (cell) => cell && cell.toString().trim() !== ""
            )
          )
        );
      }
      return value !== undefined && value !== null && value !== "";
    }
    return true;
  }).length;

  return Math.round((filledFields / fields.length) * 100);
};

export default function FormSubmission() {
  const { formType } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formTemplate = formTemplates[formType];
  const completionPercentage = calculateCompletion(
    formData,
    formTemplate.fields
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    generatePDF(formData, formTemplate);
    setIsSubmitting(false);
  };

  const handleViewPDF = () => {
    generatePDF(formData, formTemplate);
  };

  useEffect(() => {
    if (!formTemplate) {
      navigate("/not-found");
    }
  }, [formType, navigate]);

  return (
    <div className="min-h-screen w-full ">
      <GovtHeader />
      <Card className="w-full mt-0 rounded-none border-2 border-white shadow-[0_0_10px_rgba(255,255,255,0.4)] px-8 py-4 bg-white">
        <CardHeader className="px-0 py-0">
          <CardTitle>{formTemplate.title}</CardTitle>
          <CardDescription>{formTemplate.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          {formTemplate.fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              {field.type === "text" ? (
                <Input
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field.label}`}
                  className="border-0 focus-visible:ring-1"
                />
              ) : field.type === "textarea" ? (
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field.label}`}
                  className="border-0 focus-visible:ring-1"
                />
              ) : field.type === "select" ? (
                <Select
                  value={formData[field.name] ?? undefined}
                  onValueChange={(val) =>
                    setFormData({ ...formData, [field.name]: val })
                  }
                >
                  <SelectTrigger
                    id={field.name}
                    aria-label={field.label}
                    className="w-full"
                  >
                    <SelectValue placeholder={`Select ${field.label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {(field.options ?? []).map((option) => {
                      const value = option?.value ?? option;
                      const label = option?.label ?? option;
                      return (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              ) : field.type === "table" ? (
                <TableField
                  field={field}
                  value={formData[field.name] || []}
                  onChange={(newValue) =>
                    setFormData({ ...formData, [field.name]: newValue })
                  }
                />
              ) : field.type === "file" ? (
                <Input
                  id={field.name}
                  name={field.name}
                  type="file"
                  onChange={handleFileChange}
                  className="border-0 focus-visible:ring-1"
                />
              ) : (
                <div className="text-red-500">Unsupported field type</div>
              )}
            </div>
          ))}
          <Progress value={completionPercentage} className="w-full" />
          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button
              type="button"
              onClick={handleViewPDF}
              variant="secondary"
              className="flex-1"
            >
              <Eye className="mr-2 h-4 w-4" />
              View PDF
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-accent hover:bg-accent/90"
              disabled={isSubmitting || completionPercentage < 100}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <>Submitting...</>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Form
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      <GovtFooter />
    </div>
  );
}
