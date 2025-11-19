
import { palette } from "../data/paletteData";
export default function FieldPalette({ addField }) {
  return (
    <div>
      {palette.map((item) => (
        <button
          key={item.type}
          className="w-full p-2 mb-2 bg-white text-gray-500 font-bold text-right rounded shadow cursor-pointer"
          onClick={() => addField(item)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
