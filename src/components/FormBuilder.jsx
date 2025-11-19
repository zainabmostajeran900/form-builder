import { useState } from "react";
import FieldPalette from "../components/FieldPalette";
import FieldEditor from "../components/FieldEditor";
import { Rnd } from "react-rnd";
import { saveForm } from "../utils/localStorage";
import { toast } from "react-toastify";

export default function FormBuilder() {
  const [fields, setFields] = useState([]);
  const [formName, setFormName] = useState("");
  const [selectedField, setSelectedField] = useState(null);

  const addField = (field) => {
    const id = Date.now();
    const newField = {
      id,
      type: field.type,
      label: field.label,
      x: 20,
      y: 20,
      width: 180,
      height: 55,
      validations: { required: false, min: "", max: "" },
      options:
        field.type === "select" ||
        field.type === "radio" ||
        field.type === "checkbox"
          ? []
          : undefined,
    };
    setFields([...fields, newField]);
    setSelectedField(newField);
  };

  const updateField = (id, newValues) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, ...newValues } : field
      )
    );
  };
  const isSaveDisabled = !formName.trim() || fields.length === 0;
  const save = () => {
    const data = { name: formName, fields };
    saveForm(data);
    toast.success("فرم ذخیره شد");
  };

  return (
    <div className="col-12 md:flex gap-x-4">
      {/* Main Builder Panel */}
      <div className=" flex-1  p-4 bg-white  rounded shadow h-fit  relative">
        <div className="flex flex-col gap-y-2">
          <input
            type="text"
            placeholder="نام فرم"
            className="border border-blue-900 p-2 mb-4 w-full focus:outline-0 rounded text-right"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />

          {/* Canvas */}
          <div className="relative w-full h-[350px] border border-blue-900 rounded bg-gray-100 overflow-hidden">
            {fields.map((field) => (
              <Rnd
                key={field.id}
                size={{ width: field.width, height: field.height }}
                position={{ x: field.x, y: field.y }}
                bounds="parent"
                onDragStop={(e, d) => updateField(field.id, { x: d.x, y: d.y })}
                onResizeStop={(e, direction, ref, delta, position) =>
                  updateField(field.id, {
                    width: parseInt(ref.style.width),
                    height: parseInt(ref.style.height),
                    ...position,
                  })
                }
                onClick={() => setSelectedField(field)}
              >
                <div
                  className={`cursor-pointer bg-white h-full flex items-center justify-center rounded p-2 ${
                    selectedField?.id === field.id
                      ? "border-gray-600"
                      : "border-gray-400"
                  }`}
                >
                  {field.type === "text" && (
                    <input
                      type="text"
                      placeholder={field.label}
                      className="text-right w-full h-full text-sm p-2 border rounded"
                      readOnly
                    />
                  )}

                  {field.type === "number" && (
                    <input
                      type="number"
                      placeholder={field.label}
                      className="text-right w-full h-full text-sm p-2 border rounded"
                      readOnly
                    />
                  )}

                  {field.type === "color" && (
                    <input
                      type="color"
                      className="w-full h-full rounded"
                      readOnly
                    />
                  )}

                  {field.type === "range" && (
                    <input type="range" className="w-full" disabled />
                  )}

                  {field.type === "checkbox" && (
                    <label className="flex items-center gap-2">
                      <input type="checkbox" disabled />
                      {field.label}
                    </label>
                  )}

                  {field.type === "radio" && (
                    <label className="flex items-center gap-2">
                      <input type="radio" disabled />
                      {field.label}
                    </label>
                  )}

                  {field.type === "select" && (
                    <select
                      className="w-full h-full text-sm p-2 border rounded"
                      disabled
                    >
                      <option>{field.label}</option>
                      {field.options?.map((opt) => (
                        <option key={opt.id}>{opt.value}</option>
                      ))}
                    </select>
                  )}
                </div>
              </Rnd>
            ))}
          </div>
          <button
            onClick={save}
            disabled={isSaveDisabled}
            className={`px-4 py-2 w-fit rounded transition-all duration-300
    ${
      isSaveDisabled
        ? "bg-[#e5e7eb] text-gray-500 cursor-not-allowed"
        : "bg-gray-600 text-white hover:bg-white hover:text-gray-600 cursor-pointer  border border-gray-600"
    }`}
          >
            ذخیره فرم
          </button>
        </div>
      </div>
      {/* Sidebar */}
      <div className="col-12 md:flex flex-col w-full md:w-64 mt-5 md:mt-0  p-4 bg-[#e5e7eb]  rounded text-right shadow-sm overflow-y-auto">
        <h2 className="font-bold text-lg mb-3">پالت المان‌ها</h2>
        <FieldPalette addField={addField} />
        {selectedField && (
          <div className="mt-6">
            <h3 className="font-bold text-md mb-2">تنظیمات فیلد</h3>
            <FieldEditor field={selectedField} updateField={updateField} />
          </div>
        )}
      </div>
    </div>
  );
}
