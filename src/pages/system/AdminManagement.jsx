import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import api from '../../api/axios';
import { useTranslation } from 'react-i18next';
import { Plus, Trash2, Edit2, Shield, User } from 'lucide-react';
import Modal from '../../components/Modal';

export default function AdminManagement() {
  const { t } = useTranslation();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role: 'admin',
    permissions: []
  });

  const availablePermissions = [
    'dashboard', 'users', 'finance', 'bets', 'vip', 'risk', 'promotions', 'reports', 'system'
  ];

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/admin/system/admins');
      setAdmins(response);
    } catch (error) {
      console.error('Error fetching admins:', error);
      toast.error('Failed to load admins');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAdmin) {
        // Update
        const updateData = { ...formData };
        if (!updateData.password) delete updateData.password; // Don't send empty password
        
        await api.put(`/api/admin/system/admins/${editingAdmin._id}`, updateData);
        toast.success('Admin updated successfully');
      } else {
        // Create
        if (!formData.password) {
          toast.error('Password is required for new admin');
          return;
        }
        await api.post('/api/admin/system/admins', formData);
        toast.success('Admin created successfully');
      }
      
      setIsModalOpen(false);
      fetchAdmins();
    } catch (error) {
      console.error('Error saving admin:', error);
      toast.error(error.response?.data?.message || 'Failed to save admin');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;
    
    try {
      await api.delete(`/api/admin/system/admins/${id}`);
      toast.success('Admin deleted successfully');
      fetchAdmins();
    } catch (error) {
      console.error('Error deleting admin:', error);
      toast.error(error.response?.data?.message || 'Failed to delete admin');
    }
  };

  const openModal = (admin = null) => {
    if (admin) {
      setEditingAdmin(admin);
      setFormData({
        email: admin.email,
        password: '', // Don't populate password
        first_name: admin.first_name,
        last_name: admin.last_name,
        role: admin.role,
        permissions: admin.permissions || []
      });
    } else {
      setEditingAdmin(null);
      setFormData({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        role: 'admin',
        permissions: []
      });
    }
    setIsModalOpen(true);
  };

  const togglePermission = (perm) => {
    setFormData(prev => {
      const perms = prev.permissions.includes(perm)
        ? prev.permissions.filter(p => p !== perm)
        : [...prev.permissions, perm];
      return { ...prev, permissions: perms };
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('system.admins.title')}</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t('system.admins.subtitle')}</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          {t('system.admins.add_admin')}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('system.admins.headers.user')}</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('system.admins.headers.role')}</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('system.admins.headers.permissions')}</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">{t('system.admins.headers.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {admins.map((admin) => (
                <tr key={admin._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                        {admin.first_name[0]}{admin.last_name[0]}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {admin.first_name} {admin.last_name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{admin.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      admin.role === 'super_admin' 
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {admin.role === 'super_admin' && <Shield size={12} className="mr-1" />}
                      {admin.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {admin.permissions.slice(0, 3).map(p => (
                        <span key={p} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
                          {p}
                        </span>
                      ))}
                      {admin.permissions.length > 3 && (
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
                          +{admin.permissions.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openModal(admin)}
                        className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      {admin.role !== 'super_admin' && (
                        <button 
                          onClick={() => handleDelete(admin._id)}
                          className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAdmin ? "Edit Admin" : "Add New Admin"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
              <input
                type="text"
                required
                value={formData.first_name}
                onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
              <input
                type="text"
                required
                value={formData.last_name}
                onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password {editingAdmin && <span className="text-gray-400 font-normal">(Leave blank to keep current)</span>}
            </label>
            <input
              type="password"
              required={!editingAdmin}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Permissions</label>
            <div className="grid grid-cols-3 gap-2">
              {availablePermissions.map(perm => (
                <label key={perm} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(perm)}
                    onChange={() => togglePermission(perm)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{perm}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              {t('system.admins.modal.cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {t('system.admins.modal.save')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
