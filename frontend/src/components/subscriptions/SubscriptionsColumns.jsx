import TableRowActions from "../utility/TableRowActions";

export const getSubscriptionColumns = (onEdit, onDelete) => [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "price", header: "Price" },
  { accessorKey: "billing_cycle", header: "Billing_cycle" },
  { accessorKey: "features", header: "Features" },
  { accessorKey: "is_active", header: "Is_active" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <TableRowActions
      entity={row.original}
      onEdit={onEdit}
      onDelete={onDelete}
      editLabel="Edit suscription"
      deleteLabel="Delete subscription"
    />

    ),
  },
];
