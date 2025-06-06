import { flexRender } from "@tanstack/react-table";

const MobileCards = ({ table }) => {
  return (
    <div className="flex flex-col gap-4 sm:hidden">
      {table.getRowModel().rows.length === 0 ? (
        <div className="text-center py-6 text-gray-400 bg-gray-50 rounded-lg">
          No users found.
        </div>
      ) : (
        table.getRowModel().rows.map((row) => (
          <div key={row.id} className="bg-gray-50 rounded-lg shadow border border-gray-200 p-4 flex flex-col gap-2">
            {row.getVisibleCells().map((cell) => {
              const header = cell.column.columnDef.header;
              if (cell.column.id === "actions") return null;
              return (
                <div key={cell.id} className="flex justify-between items-center">
                  <span className="font-semibold text-gray-600">{header}</span>
                  <span className="text-gray-800 break-all">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </span>
                </div>
              );
            })}
            <div className="flex gap-2 mt-2">
              {row.getVisibleCells()
                .filter((cell) => cell.column.id === "actions")
                .map((cell) => (
                  <div key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MobileCards;
