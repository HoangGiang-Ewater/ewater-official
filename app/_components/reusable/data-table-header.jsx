import { Input } from "@/components/ui/input";
import { useTableContext } from "@/contexts/TableContext";

function DataTableHeader({ searchColumnId, searchInputPlaceholder, children }) {
  const { table } = useTableContext();

  return (
    <div className="flex items-center gap-3 mb-5">
      <Input
        placeholder={searchInputPlaceholder}
        value={table.getColumn(searchColumnId)?.getFilterValue() ?? ""}
        onChange={(event) =>
          table.getColumn(searchColumnId)?.setFilterValue(event.target.value)
        }
        className="max-w-sm block h-[40px]"
      />
      {children}
    </div>
  );
}

export default DataTableHeader;
