import { useState, useMemo } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import apiClient from "../configs/axios";
import { useUsers } from "../hooks/useUsers";
import toast, { LoaderIcon } from "react-hot-toast";

import UserFormModal from "../components/users/UserFormModal";
import SearchBar from "../components/utility/SearchBar";
import UserTable from "../components/users/UserTable";
import MobileCards from "../components/utility/MobileCards";
import PaginationControls from "../components/utility/PaginationControls";
import { getUserColumns } from "../components/users/UserColumn";


const UsersTable = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentUser, setCurrentUser] = useState(null);
  const [formValues, setFormValues] = useState({ username: "", email: "", role: "" });
  const [formErrors, setFormErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const { data, isLoading, isError, refetch } = useUsers(page, searchQuery);
  const totalPages = Math.max(1, Math.ceil((data?.count || 0) / 10));


  
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    if(searchInput == "") {
      setSearchQuery(searchInput)
      refetch()
    }
  }

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
    setFormValues({ username: "", email: "", role: "" });
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
        await apiClient.put(`/users/${currentUser.id}/`, formValues);
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
    toast.custom((t) => {
      let deleting = false;
      return (
        <div
          className={`${
            t.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          } transition-all duration-300 ease-in-out p-5 w-full max-w-sm bg-white rounded-xl shadow-lg border border-gray-200`}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirm Delete</h3>
          <p className="text-gray-600 text-sm">Are you sure you want to delete this user?</p>

          <div className="mt-4 flex gap-3 justify-end">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
              onClick={() => toast.dismiss(t.id)}
              disabled={deleting}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
              onClick={async () => {
                deleting = true;
                try {
                  await apiClient.delete(`/users/${id}/`);
                  toast.dismiss(t.id);
                  toast.success(" User deleted", { duration: 4000 });
                  refetch();
                } catch {
                  toast.dismiss(t.id);
                  toast.error(" Failed to delete user", { duration: 4000 });
                }
                deleting = false;
              }}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Yes, delete"}
            </button>
          </div>
        </div>
      );
    }, { duration: 6000 });
  };

  const columns = useMemo(() => getUserColumns(handleEdit, handleDelete), []);

  const table = useReactTable({
    data: data?.results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <LoaderIcon />;
  if (isError) return <div className="text-center py-10 text-red-500">Error loading users.</div>;

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
