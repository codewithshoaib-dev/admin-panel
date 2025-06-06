
import TableRowActions from "../utility/TableRowActions";


export const getUserColumns = (onEdit, onDelete) => [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "username", header: "Username" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <TableRowActions
      entity={row.original}
      onEdit={onEdit}
      onDelete={onDelete}
      editLabel="Edit user"
      deleteLabel="Delete user"
    />

    ),
  },
];
