import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

interface TableFieldProps {
  field: {
    name: string;
    label: string;
    columns: string[];
  };
  value?: any[];
  onChange: (value: any[]) => void;
}

const createEmptyRow = (columns: string[]) => {
  const row: any = {};
  columns.forEach((column) => {
    row[column] = "";
  });
  return row;
};

export const TableField = ({ field, value = [], onChange }: TableFieldProps) => {
  const [rows, setRows] = useState(
    value.length > 0 ? value : [createEmptyRow(field.columns)]
  );

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
                  <td
                    key={colIndex}
                    className="border border-border px-4 py-2"
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
