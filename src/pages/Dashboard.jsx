import { useState } from "react";
import FormBuilder from "../components/FormBuilder";
import FormTable from "../components/FormTable";

export default function Dashboard({ user }) {
  const [view, setView] = useState("builder");
  return (
    <div className="flex ">
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center pb-4">
          <div className="flex gap-x-2 items-center justify-center">
            <button
              onClick={() => setView("builder")}
              className={`px-4 py-2 w-fit rounded transition-all duration-300 hover:cursor-pointer 
                          ${
                            view === "builder"
                              ? "bg-teal-500 text-white border border-teal-500"
                              : "bg-white text-teal-500 border border-teal-500"
                          }
                        `}
            >
              فرم‌ساز
            </button>
            <button
              onClick={() => setView("table")}
              className={`px-4 py-2 w-fit rounded transition-all duration-300 hover:cursor-pointer
                          ${
                            view === "table"
                              ? "bg-blue-900 text-white border border-blue-900"
                              : "bg-white text-blue-900 border border-blue-900"
                          }
                        `}
            >
              جدول فرم‌ها
            </button>
          </div>
          <h1 className="text-2xl text-blue-900 font-bold">
            داشبورد {user.name}
          </h1>
        </div>
        {view === "builder" ? <FormBuilder /> : <FormTable />}
      </div>
    </div>
  );
}
