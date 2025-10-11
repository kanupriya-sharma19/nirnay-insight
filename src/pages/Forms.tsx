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
import { formTemplates } from "@/lib/formTemplates";
import { generatePDF } from "@/lib/pdfGenerator";

// Table Field Component
const TableField = ({ field, value = [], onChange }: any) => {
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
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr className="bg-muted">
              {field.columns.map((column: string, index: number) => (
                <th
                  key={index}
                  className="border border-border px-4 py-2 text-left font-semibold"
                >
                  {column}
                </th>
              ))}
              <th className="border border-border px-4 py-2 text-left font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row: any, rowIndex: number) => (
              <tr key={rowIndex} className="hover:bg-muted/50">
                {field.columns.map((column: string, colIndex: number) => (
                  <td key={colIndex} className="border border-border px-4 py-2">
                    <Input
                      type="text"
                      value={row[column] || ""}
                      onChange={(e) =>
                        updateCell(rowIndex, column, e.target.value)
                      }
                      placeholder={`${column}`}
                      className="border-0 focus-visible:ring-1"
                    />
                  </td>
                ))}
                <td className="border border-border px-4 py-2">
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
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Row
      </Button>
    </div>
  );
};
const calculateCompletion = (formData: any, fields: any[]) => {
  const requiredFields = fields.filter((f) => f.required);
  if (requiredFields.length === 0) return 100;

  let filled = 0;

  requiredFields.forEach((field) => {
    const value = formData[field.name];

    if (field.type === "table") {
      if (
        value &&
        value.length > 0 &&
        value.some((row: any) =>
          Object.values(row).some(
            (cell) => cell && cell.toString().trim() !== ""
          )
        )
      ) {
        filled++;
      }
    } else if (
      value !== undefined &&
      value !== null &&
      value.toString().trim() !== ""
    ) {
      filled++;
    }
  });

  return Math.round((filled / requiredFields.length) * 100);
};

export default function FormSubmission() {
  const { formType } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formTemplate = formTemplates[formType as keyof typeof formTemplates];
  const completionPercentage = formTemplate
    ? calculateCompletion(formData, formTemplate.fields)
    : 0;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files?.[0] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    generatePDF(formData, formTemplate);
    setIsSubmitting(false);
    navigate("/researcher");
    window.scrollTo(0, 0);
  };

  const handleViewPDF = () => {
    generatePDF(formData, formTemplate);
  };

  useEffect(() => {
    if (!formTemplate) {
      navigate("/not-found");
    }
  }, [formType, navigate, formTemplate]);

  if (!formTemplate) return null;

  return (
    <div className="min-h-screen w-full bg-background">
      <GovtHeader />
      <div className="sticky top-0 z-50 bg-card border-b border-primary/20 shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="font-medium">Form Completion</span>
            <span className="text-primary font-semibold">
              {completionPercentage}%
            </span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full shadow-lg border-2 border-primary/20">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="text-2xl text-primary">
              {formTemplate.title}
            </CardTitle>
            <CardDescription className="text-base">
              {formTemplate.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6 bg-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {formTemplate.fields.map((field: any) => (
                <div
                  key={field.name}
                  className="space-y-2 p-4 bg-muted/30 rounded-lg"
                >
                  <Label
                    htmlFor={field.name}
                    className="text-base font-semibold"
                  >
                    {field.label}
                    {field.required && (
                      <span className="text-destructive ml-1">*</span>
                    )}
                  </Label>
                  {field.type === "text" ? (
                    <Input
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleInputChange}
                      placeholder={`${field.label}`}
                      required={field.required}
                    />
                  ) : field.type === "number" ? (
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      value={formData[field.name] || ""}
                      onChange={handleInputChange}
                      placeholder={`${field.label}`}
                      required={field.required}
                    />
                  ) : field.type === "date" ? (
                    <Input
                      id={field.name}
                      name={field.name}
                      type="date"
                      value={formData[field.name] || ""}
                      onChange={handleInputChange}
                      required={field.required}
                    />
                  ) : field.type === "textarea" ? (
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleInputChange}
                      placeholder={`${field.label}`}
                      rows={4}
                      required={field.required}
                    />
                  ) : field.type === "select" ? (
                    <Select
                      value={formData[field.name] ?? undefined}
                      onValueChange={(val) =>
                        setFormData({ ...formData, [field.name]: val })
                      }
                    >
                      <SelectTrigger id={field.name} aria-label={field.label}>
                        <SelectValue placeholder={`Select ${field.label}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {(field.options ?? []).map((option: any) => {
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
                      onChange={(newValue: any) =>
                        setFormData({ ...formData, [field.name]: newValue })
                      }
                    />
                  ) : field.type === "file" ? (
                    <Input
                      id={field.name}
                      name={field.name}
                      type="file"
                      onChange={handleFileChange}
                      required={field.required}
                    />
                  ) : (
                    <div className="text-destructive">
                      Unsupported field type
                    </div>
                  )}
                </div>
              ))}

              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Form Completion</span>
                    <span className="text-primary font-semibold">
                      {completionPercentage}%
                    </span>
                  </div>
                  <Progress value={completionPercentage} className="h-3" />
                </div>

                <div className="flex gap-4 pt-2">
                  <Button type="button" variant="outline" className="flex-1">
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
                    Preview PDF
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isSubmitting || completionPercentage < 100}
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
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <GovtFooter />
    </div>
  );
}
