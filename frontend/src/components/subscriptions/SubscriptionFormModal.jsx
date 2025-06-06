import React from "react";

const billingCycleOptions = [
  { value: "MONTHLY", label: "Monthly" },
  { value: "YEARLY", label: "Yearly" },
];

export default function SubscriptionFormModal({
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg animate-fadeIn">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">{formTitle}</h3>

        {errors.non_field_errors && (
          <div className="mb-4 text-red-600 bg-red-50 border border-red-200 rounded p-3 text-sm">
            {errors.non_field_errors}
          </div>
        )}

        <div className="space-y-3">

    
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Name</label>
              <input
                name="name"
                value={formValues.name}
                onChange={onChange}
                className={`border rounded px-2 py-1.5 w-full bg-gray-50 focus:ring-2 focus:ring-blue-400 text-sm ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.name && <p className="text-xs text-red-600 mt-0.5">{errors.name}</p>}
            </div>
           
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Price (USD)</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formValues.price}
                onChange={onChange}
                className={`border rounded px-2 py-1.5 w-full bg-gray-50 focus:ring-2 focus:ring-blue-400 text-sm ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.price && <p className="text-xs text-red-600 mt-0.5">{errors.price}</p>}
            </div>
          </div>

          
          <div className="grid grid-cols-2 gap-3">
        
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
              <textarea
                name="description"
                value={formValues.description}
                onChange={onChange}
                rows={2}
                className={`border rounded px-2 py-1.5 w-full bg-gray-50 focus:ring-2 focus:ring-blue-400 text-sm resize-none ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.description && <p className="text-xs text-red-600 mt-0.5">{errors.description}</p>}
            </div>
          
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Billing Cycle</label>
              <select
                name="billing_cycle"
                value={formValues.billing_cycle}
                onChange={onChange}
                className={`border rounded px-2 py-1.5 w-full bg-gray-50 focus:ring-2 focus:ring-blue-400 text-sm ${errors.billing_cycle ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select billing cycle</option>
                {billingCycleOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.billing_cycle && <p className="text-xs text-red-600 mt-0.5">{errors.billing_cycle}</p>}
            </div>
          </div>

       
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Features (JSON)</label>
            <textarea
              name="features"
              value={formValues.features}
              onChange={onChange}
              rows={2}
              className={`border rounded px-2 py-1.5 w-full bg-gray-50 focus:ring-2 focus:ring-blue-400 text-sm resize-none ${errors.features ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.features && <p className="text-xs text-red-600 mt-0.5">{errors.features}</p>}
          </div>


          <div className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              name="is_active"
              checked={!!formValues.is_active}
              onChange={(e) =>
                onChange({ target: { name: "is_active", value: e.target.checked } })
              }
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-400"
            />
            <label className="text-xs font-semibold text-gray-600">Active</label>
          </div>
        </div>

  
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
