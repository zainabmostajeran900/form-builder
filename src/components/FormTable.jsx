import { useState, useEffect } from "react";
import { getForms } from "../utils/localStorage";
import {useDebounce} from "../hooks/useDebounce.";

export default function FormTable() {
  const [forms, setForms] = useState([]);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    setForms(getForms());
  }, []);

  // فیلتر با debounce
  const filtered = forms.filter((f) =>
    f.name.includes(debouncedSearch)
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      <input
        type="text"
        placeholder="جستجو بر اساس نام"
        className="border border-gray-700 p-2 mb-4 w-full text-right focus:outline-0 rounded"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <table className="w-full border border-gray-700 bg-white text-gray-800">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">JSON</th>
            <th className="border p-2 text-nowrap">تعداد فیلد</th>
            <th className="border p-2 text-nowrap">نام فرم</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((f, i) => (
            <tr key={i} className="text-center">
              <td className="border p-2">
                {JSON.stringify(f.fields, null, 2)}
              </td>
              <td className="border p-2">{f.fields.length}</td>
              <td className="border p-2">{f.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          className="bg-blue-900 text-white rounded hover:border border-blue-900 hover:text-blue-900 hover:bg-white cursor-pointer px-3 py-1 transition-all duration-300"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          بعدی
        </button>

        <button className="px-3 py-1">{page}</button>

        <button
          className="bg-blue-900 text-white rounded hover:border border-blue-900 hover:text-blue-900 hover:bg-white cursor-pointer px-3 py-1 transition-all duration-300"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          قبلی
        </button>
      </div>
    </div>
  );
}
