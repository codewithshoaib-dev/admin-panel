import Tooltip from "../ui/Tooltip";
import { Pencil, Trash2 } from "lucide-react";

export default function TableRowActions({ 
  entity, 
  onEdit, 
  onDelete, 
  editLabel = "Edit item", 
  deleteLabel = "Delete item"
}) {
  return (
    <div className="flex items-center gap-2">
      <Tooltip content={editLabel}>
        <button
          onClick={() => onEdit(entity)}
          className="p-2 rounded-full hover:bg-blue-100 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Pencil size={16} />
        </button>
      </Tooltip>

      <Tooltip content={deleteLabel}>
        <button
          onClick={() => onDelete(entity.id)}
          className="p-2 rounded-full hover:bg-red-100 text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <Trash2 size={16} />
        </button>
      </Tooltip>
    </div>
  );
}
