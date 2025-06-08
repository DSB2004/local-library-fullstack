import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import FilterForm from "./filterForm";

export default function FilterBar() {
  const [searchParams] = useSearchParams();
  const entries = Array.from(searchParams.entries());

  return (
    <>
      <div className="p-4  rounded shadow my-10 w-[90%] mx-auto flex justify-between items-center">
        <div className="flex-1">
          {entries.length > 0 ? (
            <ul className="list-disc ml-4 space-y-1">
              {entries.map(([value]) => (
                <div className="badge badge-soft badge-primary uppercase">
                  <span>{value}</span>
                </div>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No filters applied.</p>
          )}
        </div>
        <div>
          <label htmlFor="my-drawer-4" className="drawer-button ">
            <SlidersHorizontal />
          </label>
        </div>
      </div>

      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content"></div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <FilterForm></FilterForm>
        </div>
      </div>
    </>
  );
}
