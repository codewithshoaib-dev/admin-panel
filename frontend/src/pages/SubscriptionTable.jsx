import { useState, useMemo } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import apiClient from "../configs/axios";
import { useSubscriptionPlans } from "../hooks/UseSubscriptionsPlans";
import toast from "react-hot-toast";

import SubscriptionFormModal from "../components/subscriptions/SubscriptionFormModal";
import SearchBar from "../components/utility/SearchBar";
import SubscriptionTable from "../components/subscriptions/SubscriptionTable";
import MobileCards from "../components/utility/MobileCards";
import PaginationControls from "../components/utility/PaginationControls";
import { getSubscriptionColumns } from "../components/subscriptions/SubscriptionsColumns";

import Loader from "../components/Loader";

import ConfirmActionToast from "../components/utility/ConfirmActionToast";


const SubscriptionsTable = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [formValues, setFormValues] = useState({
    plan_name: "",
    price: "",
    status: "",
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isLoading, isError, refetch } = useSubscriptionPlans(page, searchQuery);
  const totalPages = Math.max(1, Math.ceil((data?.count || 0) / 10));

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value === "") {
      setSearchQuery("");
      refetch();
    }
  };

  const handleSearchSubmit = () => {
    setSearchQuery(searchInput);
    setPage(1);
  };

  const handleEdit = (subscription) => {
    setCurrentSubscription(subscription);
    setFormValues({
      name: subscription.name,
      description: subscription.description,
      price: subscription.price,
      billing_cycle: subscription.billing_cycle,
      features: subscription.features,
      is_active: subscription.is_active,

    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setCurrentSubscription(null);
    setFormValues({
      plan_name: "",
      price: "",
      status: "",
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (currentSubscription) {
        await apiClient.patch(`/subscription/plans/${currentSubscription.id}/`, formValues);
        toast.success("Subscription updated!");
      } else {
        await apiClient.post("/subscription/plans/", formValues);
        toast.success("Subscription created!");
      }
      setIsModalOpen(false);
      refetch();
    } catch (err) {
      console.log(err);
      if (err.response?.data) {
        setFormErrors(err.response.data);
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
      title="Delete Subscription"
      message="Are you sure you want to permanently delete this Subscription?"
      confirmText="Yes, delete"
      onConfirm={async () => {
        const res = await apiClient.delete(`/subscription/plans/${id}/`);
        if (res.status !== 204) {
          throw new Error("Delete failed");
        }
        toast.success("Subscription deleted", { duration: 4000 });
        refetch();
      }}
    />
  ), { duration: 8000 });
};

  const columns = useMemo(() => getSubscriptionColumns(handleEdit, handleDelete), []);

  const table = useReactTable({
    data: data?.results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <Loader/>;
  if (isError) return <div className="text-center py-10 text-red-500">Error loading subscriptions.</div>;

  return (
  <div className="max-w-7xl mx-auto my-8 bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
    
    <SubscriptionFormModal
      isOpen={isModalOpen}
      formTitle={currentSubscription ? "Edit Subscription" : "Create Subscription"}
      formValues={formValues}
      errors={formErrors}
      onChange={handleFormChange}
      onCancel={() => setIsModalOpen(false)}
      onSubmit={handleFormSubmit}
      isSubmitting={isSubmitting}
    />

   
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center sm:text-left">Subscriptions</h2>

      <div className="w-full sm:w-auto">
        <SearchBar
          searchInput={searchInput}
          onSearchInputChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
          onAdd={handleCreate}
          placeholderText={"Search Subscriptions..."}
          buttonText={"Add Subscription"}
        />
      </div>
    </div>

  
    <div className="hidden sm:block">
      <SubscriptionTable table={table} columns={columns} />
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

export default SubscriptionsTable;
