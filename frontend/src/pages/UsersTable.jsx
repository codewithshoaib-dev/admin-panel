import { useState, useMemo } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import apiClient from "../configs/axios";
import { useUsers } from "../hooks/useUsers";
import toast from "react-hot-toast";
import { useroleOptions } from "../hooks/useroleOptions"


import UserFormModal from "../components/users/UserFormModal";
import SearchBar from "../components/utility/SearchBar";
import UserTable from "../components/users/UserTable";
import MobileCards from "../components/utility/MobileCards";
import PaginationControls from "../components/utility/PaginationControls";
import { getUserColumns } from "../components/users/UserColumn";
import { ErrorMessage } from "../components/ErrorMessage";

import Loader from "../components/Loader";
import ConfirmActionToast from "../components/utility/ConfirmActionToast";

const UsersTable = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentUser, setCurrentUser] = useState(null);
  const [formValues, setFormValues] = useState({ username: "", email: "", role: "" , password: ""});
  const [formErrors, setFormErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const { data, isLoading, isError, refetch } = useUsers(page, searchQuery);
  const totalPages = Math.max(1, Math.ceil((data?.count || 0) / 10));

  const { data: roleOptions, isLoading: isRolesLoading, isError: isRolesError } = useroleOptions();


  
 const handleSearchChange = (e) => {
  const value = e.target.value;
  setSearchInput(value);
  if (value === "") {
    setSearchQuery("");
    refetch();
  }
};


  const handleSearchSubmit = () => {
    setSearchQuery(searchInput);
    setPage(1);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    
    setFormValues({
      username: user.username,
      email: user.email,
      role: user.role,
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setCurrentUser(null);
    setFormValues({ username: "", email: "", role: "", password: "" });
    setFormErrors({});
    setIsModalOpen(true);

  };

  const handleFormChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async () => {
    setIsSubmitting(true); 
    try {
      if (currentUser) {
        await apiClient.patch(`/users/${currentUser.id}/`, formValues);
        toast.success("User updated!");
      } else {
        await apiClient.post(`/users/`, formValues);
        toast.success("User created!");
      }
      setIsModalOpen(false);
      refetch();
    } catch (err) {
      console.log(err)
      if (err.response?.data) {
        setFormErrors(err.response.data.errors);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsSubmitting(false); 
    }
  };

  const handleDelete = (id) => {
  toast.custom((t) => (
    <ConfirmActionToast
      toastInstance={t}
      title="Delete User"
      message="Are you sure you want to permanently delete this user?"
      confirmText="Yes, delete"
      onConfirm={async () => {
        const res = await apiClient.delete(`/users/${id}/`);
        if (res.status !== 204) {
          throw new Error("Delete failed");
        }
        toast.success("User deleted", { duration: 4000 });
        refetch();
      }}
    />
  ), { duration: 8000 });
};

  const columns = useMemo(() => getUserColumns(handleEdit, handleDelete), []);

  const table = useReactTable({
    data: data?.results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading || isRolesLoading) return <Loader />;
  if (isError || isRolesError) return <ErrorMessage message="Error loading users" />;

  return (
  <div className="max-w-7xl mx-auto my-8 bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
    
    <UserFormModal
      isOpen={isModalOpen}
      formTitle={currentUser ? "Edit User" : "Create User"}
      formValues={formValues}
      errors={formErrors}
      onChange={handleFormChange}
      onCancel={() => setIsModalOpen(false)}
      onSubmit={handleFormSubmit}
      isSubmitting={isSubmitting}
      roleOptions={roleOptions}
    />

    
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center sm:text-left">Users</h2>

      <div className="w-full sm:w-auto">
        <SearchBar
          searchInput={searchInput}
          onSearchInputChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
          onAdd={handleCreate}
          placeholderText={"Search users..."}
          buttonText={"Add User"}
        />
      </div>
    </div>

    
    <div className="hidden sm:block">
      <UserTable table={table} columns={columns} />
    </div>

    
    <div className="block sm:hidden">
      <MobileCards table={table} />
    </div>

    
    <div className="mt-6">
      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  </div>
);

};

export default UsersTable;
