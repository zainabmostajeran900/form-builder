import { useState, useEffect } from "react";

export default function FieldEditor({ field, updateField }) {
  const [label, setLabel] = useState(field.label || "");
  const [required, setRequired] = useState(
    field.validations?.required || false
  );
  const [min, setMin] = useState(field.validations?.min || "");
  const [max, setMax] = useState(field.validations?.max || "");
  const [options, setOptions] = useState(field.options || []);

  useEffect(() => {
    setLabel(field.label || "");
    setRequired(field.validations?.required || false);
    setMin(field.validations?.min || "");
    setMax(field.validations?.max || "");
    setOptions(field.options || []);
  }, [field]);

  useEffect(() => {
    updateField(field.id, {
      label,
      validations: { required, min, max },
      options,
    });
  }, [label, required, min, max, options]);

  const addOption = () => {
    const newOpt = { id: Date.now(), value: "گزینه جدید" };
    setOptions([...options, newOpt]);
  };

  const updateOption = (id, value) => {
    setOptions(options.map((o) => (o.id === id ? { ...o, value } : o)));
  };

  const removeOption = (id) => {
    setOptions(options.filter((o) => o.id !== id));
  };

  return (
    <div className="border border-blue-900 p-3 mb-3 text-gray-500  bg-white rounded-lg shadow-sm">
      <h3 className="font-bold mb-2 text-sm">{field.type} : تنظیمات فیلد</h3>

      {/* Label */}
      <div className="mb-3">
        <label className="text-xs text-gray-500">: عنوان فیلد</label>
        <input
          type={field.type === "number" ? "number" : "text"}
          className="border border-gray-200 focus:outline-gray-400 p-1 w-full text-sm rounded text-right"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>

      {/* Required */}
      <div className="mb-3 flex items-center justify-end space-x-2">
        <input
          type="checkbox"
          checked={required}
          onChange={(e) => setRequired(e.target.checked)}
        />
        <span className="text-sm">اجباری</span>
      </div>

      {/* Min & Max */}
      {(field.type === "text" ||
        field.type === "number" ||
        field.type === "range") && (
        <div className="flex space-x-2 mb-3 justify-end">
          <input
            type="number"
            placeholder="حداقل"
            className="border border-gray-200 focus:outline-gray-400 p-1 w-20 text-sm rounded"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
          <input
            type="number"
            placeholder="حداکثر"
            className="border border-gray-200 focus:outline-gray-400 p-1 w-20 text-sm rounded"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
        </div>
      )}

      {/* Options: For select, radio, checkbox */}
      {(field.type === "select" ||
        field.type === "radio" ||
        field.type === "checkbox") && (
        <div className="mt-3">
          {options.map((opt) => (
            <div
              key={opt.id}
              className="flex px-2 gap-4 justify-end md:justify-center items-center mt-1"
            >
              <button
                className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-white hover:text-red-500 hover:border border-red-500 hover:cursor-pointer"
                onClick={() => removeOption(opt.id)}
              >
                حذف
              </button>
              <input
                type="text"
                value={opt.value}
                className="border border-gray-200 focus:outline-gray-400 text-sm w-36 p-1 rounded text-right"
                onChange={(e) => updateOption(opt.id, e.target.value)}
              />
            </div>
          ))}
          <button
            className="mt-2 px-3 py-1 bg-blue-900 text-white font-bold hover:bg-white hover:text-blue-900 hover:border border-blue-900 text-sm rounded hover:cursor-pointer"
            onClick={addOption}
          >
            افزودن گزینه
          </button>
          <label className="text-xs"> : گزینه ها </label>
        </div>
      )}
    </div>
  );
}
