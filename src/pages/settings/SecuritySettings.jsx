import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../api/axios';

export default function SecuritySettings() {
  const { t } = useTranslation();
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', content: '' });
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ type: 'error', content: t('security.passwords_do_not_match') });
      return;
    }
    
    if (passwords.newPassword.length < 8) {
       setMessage({ type: 'error', content: t('security.password_too_short') });
       return;
    }

    setIsLoading(true);
    try {
      await api.put('/api/admin/auth/password', {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });
      setMessage({ type: 'success', content: t('security.success_update') });
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage({ type: 'error', content: error.response?.data?.message || t('security.failed_update') });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-12">
      <div className="space-y-12">
        {/* Message Alert */}
        {message.content && (
          <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.content}
          </div>
        )}

        {/* Password Section */}
        <div>
          <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-8">{t('security.password')}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">{t('security.current_password')}</label>
              <input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handleChange}
                placeholder={t('security.enter_current_password')}
                className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">{t('security.new_password')}</label>
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handleChange}
                placeholder={t('security.enter_new_password')}
                className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
              <p className="text-base text-gray-500 dark:text-gray-400 mt-3">{t('security.password_length_hint')}</p>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">{t('security.confirm_new_password')}</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handleChange}
                placeholder={t('security.confirm_new_password_placeholder')}
                className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={isLoading}
              className={`px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? t('security.updating') : t('security.update_password')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
