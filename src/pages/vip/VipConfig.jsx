import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import api from "../../api/axios";

export default function VipConfig() {
  const { t } = useTranslation();
  const [showConfigModal, setShowConfigModal] = useState(false);
  
  // Data State
  const [vipTiers, setVipTiers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingTiers, setEditingTiers] = useState([]);

  // Fetch Tiers on Mount
  useEffect(() => {
    fetchVipTiers();
  }, []);

  // Sync editing tiers when modal opens
  useEffect(() => {
    if (showConfigModal) {
      setEditingTiers(JSON.parse(JSON.stringify(vipTiers)));
    }
  }, [showConfigModal, vipTiers]);

  const fetchVipTiers = async () => {
    try {
      const response = await api.get('/api/admin/vip/tiers');
      setVipTiers(response);
    } catch (error) {
      console.error("Failed to fetch VIP tiers:", error);
      toast.error(t('vip.config.messages.fetch_failed'));
    }
  };

  const handleSaveConfig = async () => {
    try {
      setLoading(true);
      // Save all tiers in parallel
      await Promise.all(editingTiers.map(tier => 
        api.post('/api/admin/vip/tiers', tier)
      ));
      toast.success(t('vip.config.messages.save_success'));
      setShowConfigModal(false);
      fetchVipTiers();
    } catch (error) {
      console.error("Failed to save config:", error);
      toast.error(t('vip.config.messages.save_failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleConfigChange = (index, field, value) => {
    const newTiers = [...editingTiers];
    newTiers[index][field] = value;
    setEditingTiers(newTiers);
  };

  const getVipBadge = (vipName) => {
    const tier = vipTiers.find(t => t.name === vipName);
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${tier?.color || 'bg-gray-100 text-gray-800'}`}>{vipName}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('vip.config.title')}</h3>
        <button
          onClick={() => setShowConfigModal(true)}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        >
          {t('vip.config.edit_btn')}
        </button>
      </div>

      <div className="grid gap-4">
        {vipTiers.map((tier) => (
          <div key={tier.level} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getVipBadge(tier.name)}
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">{tier.level}</h4>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">{t('vip.config.min_deposit')}</p>
                <p className="font-medium text-gray-900 dark:text-white">${tier.min_deposit?.toLocaleString() || 0}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">{t('vip.config.min_bets')}</p>
                <p className="font-medium text-gray-900 dark:text-white">${tier.min_bets?.toLocaleString() || 0}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">{t('vip.config.benefits')}</p>
                <p className="font-medium text-gray-900 dark:text-white">{tier.benefits}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('vip.config.modal.title')}</h2>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                {editingTiers.map((tier, index) => (
                  <div key={tier.level} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-900 dark:text-white">{t('vip.config.modal.level')} {tier.level}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">{t('vip.config.modal.name')}</label>
                        <input
                          type="text"
                          value={tier.name}
                          onChange={(e) => handleConfigChange(index, 'name', e.target.value)}
                          className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">{t('vip.config.modal.color')}</label>
                        <input
                          type="text"
                          value={tier.color}
                          onChange={(e) => handleConfigChange(index, 'color', e.target.value)}
                          className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">{t('vip.config.modal.min_deposit')}</label>
                        <input
                          type="number"
                          value={tier.min_deposit}
                          onChange={(e) => handleConfigChange(index, 'min_deposit', parseFloat(e.target.value) || 0)}
                          className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">{t('vip.config.modal.min_bets')}</label>
                        <input
                          type="number"
                          value={tier.min_bets}
                          onChange={(e) => handleConfigChange(index, 'min_bets', parseFloat(e.target.value) || 0)}
                          className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">{t('vip.config.modal.benefits')}</label>
                        <input
                          type="text"
                          value={tier.benefits}
                          onChange={(e) => handleConfigChange(index, 'benefits', e.target.value)}
                          className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                disabled={loading}
              >
                {t('vip.config.modal.cancel')}
              </button>
              <button
                onClick={handleSaveConfig}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? t('vip.config.modal.saving') : t('vip.config.modal.save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
