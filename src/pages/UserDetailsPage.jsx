import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import { FaArrowLeft, FaSave, FaTrash, FaBan, FaCheck, FaUser } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

export default function UserDetailsPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    vip_level: 0,
    risk_level: "low",
    balance: 0,
    is_active: true,
    is_frozen: false
  });

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/admin/users/${id}`);
      setUser(response);
      setFormData({
        username: response.username || "",
        email: response.email || "",
        first_name: response.first_name || "",
        last_name: response.last_name || "",
        vip_level: response.vip_level || 0,
        risk_level: response.risk_level || "low",
        balance: response.balance || 0,
        is_active: response.is_active,
        is_frozen: response.is_frozen
      });
    } catch (error) {
      console.error("Failed to fetch user:", error);
      toast.error(t('users_page.details.failed_load', "Failed to load user details"));
      navigate("/users");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/api/admin/users/${id}`, formData);
      toast.success(t('users_page.details.success_update', "User updated successfully"));
      fetchUser(); // Refresh data
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error(t('users_page.details.failed_update', "Failed to update user"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(t('users_page.details.confirm_delete_permanent', "Are you sure you want to delete this user? This action cannot be undone."))) {
      try {
        await api.delete(`/api/admin/users/${id}`);
        toast.success(t('users_page.success_delete', "User deleted successfully"));
        navigate("/users");
      } catch (error) {
        toast.error(t('users_page.failed_delete', "Failed to delete user"));
      }
    }
  };

  const handleFreezeToggle = async () => {
    const newFrozenStatus = !formData.is_frozen;
    const actionKey = newFrozenStatus ? "freeze" : "unfreeze";
    const actionText = t(`users_page.${actionKey}`);
    
    if (window.confirm(t('users_page.confirm_action', { action: actionText, defaultValue: `Are you sure you want to ${actionKey} this user?` }))) {
      try {
        await api.put(`/api/admin/users/${id}`, { 
          is_frozen: newFrozenStatus,
          is_active: !newFrozenStatus
        });
        toast.success(t('users_page.success_action', { action: actionText, defaultValue: `User ${actionKey}d successfully` }));
        fetchUser();
      } catch (error) {
        toast.error(t('users_page.failed_action', { action: actionText, defaultValue: `Failed to ${actionKey} user` }));
      }
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-500">{t('users_page.details.loading_details', "Loading user details...")}</div>;
  }

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate("/users")}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
          >
            <FaArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {user.username || user.email}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ID: {user._id}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleFreezeToggle}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg flex items-center ${
              formData.is_frozen 
                ? "bg-green-600 hover:bg-green-700" 
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {formData.is_frozen ? <><FaCheck className="mr-2" /> {t('users_page.unfreeze', 'Unfreeze')}</> : <><FaBan className="mr-2" /> {t('users_page.freeze', 'Freeze')}</>}
          </button>
          <button 
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg flex items-center"
          >
            <FaTrash className="mr-2" /> {t('users_page.delete_user', 'Delete')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('users_page.details.info', "User Information")}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('users_page.first_name', "First Name")}</label>
                  <input
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('users_page.last_name', "Last Name")}</label>
                  <input
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('users_page.username', "Username")}</label>
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('users_page.email', "Email")}</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 border"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">{t('users_page.details.account_settings', "Account Settings")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('users_page.vip_level', "VIP Level")}</label>
                    <input
                      type="number"
                      name="vip_level"
                      value={formData.vip_level}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('users_page.risk_level', "Risk Level")}</label>
                    <select
                      name="risk_level"
                      value={formData.risk_level}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 border"
                    >
                      <option value="low">{t('users_page.low', 'Low')}</option>
                      <option value="medium">{t('users_page.medium', 'Medium')}</option>
                      <option value="high">{t('users_page.high', 'High')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('users_page.balance_col', "Balance")}</label>
                    <input
                      type="number"
                      name="balance"
                      value={formData.balance}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 border"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 flex items-center"
                >
                  <FaSave className="mr-2" />
                  {saving ? t('users_page.details.saving', "Saving...") : t('users_page.details.save_changes', "Save Changes")}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('users_page.details.status_overview', "Status Overview")}</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-500 dark:text-gray-400">{t('users_page.details.account_status', "Account Status")}</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  formData.is_frozen 
                    ? "bg-red-100 text-red-800" 
                    : "bg-green-100 text-green-800"
                }`}>
                  {formData.is_frozen ? t('users_page.status.frozen', "Frozen") : t('users_page.status.active', "Active")}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-500 dark:text-gray-400">{t('users_page.details.joined_date', "Joined Date")}</span>
                <span className="text-sm text-gray-900 dark:text-white">
                  {new Date(user.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-500 dark:text-gray-400">{t('users_page.details.last_updated', "Last Updated")}</span>
                <span className="text-sm text-gray-900 dark:text-white">
                  {new Date(user.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}