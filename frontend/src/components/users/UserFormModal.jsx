import React from "react";

const roleOptions = ["ADMIN", "OWNER", "STAFF"];

export default function UserFormModal({
  isOpen,
  formTitle,
  formValues,
  errors = {},
  onChange,
  onCancel,
  onSubmit,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-100 bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">{formTitle}</h3>
        {errors.non_field_errors && (
          <div className="mb-4 text-red-600 bg-red-50 border border-red-200 rounded p-2 text-sm">
            {errors.non_field_errors}
          </div>
        )}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              name="username"
              value={formValues.username}
              onChange={onChange}
              className={`border p-2 rounded w-full ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.username && <p className="text-sm text-red-600 mt-1">{errors.username}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              value={formValues.email}
              onChange={onChange}
              className={`border p-2 rounded w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>

          {formTitle !== "Edit User" && (
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={onChange}
                className={`border p-2 rounded w-full ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                autoComplete="new-password"
              />
              {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium">Role</label>
            <select
              name="role"
              value={formValues.role}
              onChange={onChange}
              className={`border p-2 rounded w-full ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select role</option>
              {roleOptions.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            {errors.role && <p className="text-sm text-red-600 mt-1">{errors.role}</p>}
          </div>
        </div>

        <div className="flex gap-2 mt-6 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
