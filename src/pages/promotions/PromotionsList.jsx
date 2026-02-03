import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Plus, Edit, Trash, StopCircle, PlayCircle } from 'lucide-react';

export default function Promotions() {
  const { t } = useTranslation();
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPromo, setEditingPromo] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'deposit_match',
    value: 100,
    min_deposit: 10,
    wager_multiplier: 30,
    valid_days: 30,
    is_active: true
  });

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const res = await api.get('/api/admin/promotions');
      setPromotions(res);
    } catch (error) {
      console.error(error);
      toast.error(t('promotions.messages.fetch_failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPromo) {
        await api.put(`/api/admin/promotions/${editingPromo._id}`, formData);
        toast.success(t('promotions.messages.update_success'));
      } else {
        await api.post('/api/admin/promotions', formData);
        toast.success(t('promotions.messages.create_success'));
      }
      setShowModal(false);
      fetchPromotions();
    } catch (error) {
      console.error(error);
      toast.error(t('promotions.messages.operation_failed'));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('promotions.messages.confirm_delete'))) return;
    try {
      await api.delete(`/api/admin/promotions/${id}`);
      toast.success(t('promotions.messages.delete_success'));
      fetchPromotions();
    } catch (error) {
      console.error(error);
      toast.error(t('promotions.messages.delete_failed'));
    }
  };

  const toggleStatus = async (promo) => {
    try {
      await api.put(`/api/admin/promotions/${promo._id}`, { is_active: !promo.is_active });
      fetchPromotions();
      const statusText = promo.is_active ? t('promotions.messages.disabled') : t('promotions.messages.enabled');
      toast.success(`Promotion ${statusText}`);
    } catch (error) {
      console.error(error);
      toast.error(t('promotions.messages.status_failed'));
    }
  };

  const openModal = (promo = null) => {
    if (promo) {
      setEditingPromo(promo);
      setFormData({ ...promo });
    } else {
      setEditingPromo(null);
      setFormData({
        title: '',
        description: '',
        type: 'deposit_match',
        value: 100,
        min_deposit: 10,
        wager_multiplier: 30,
        valid_days: 30,
        is_active: true
      });
    }
    setShowModal(true);
  };

  if (loading) return <div className="text-center p-8 text-gray-500">{t('transaction_table.loading')}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{t('promotions.title')}</h2>
        <button 
          onClick={() => openModal()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} className="mr-2" />
          {t('promotions.create_btn')}
        </button>
      </div>

      {/* List */}
      {promotions.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">{t('promotions.no_promotions')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map(promo => (
            <div key={promo._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{promo.title}</h3>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                    promo.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {promo.is_active ? t('promotions.active') : t('promotions.inactive')}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => openModal(promo)} className="p-2 text-gray-500 hover:text-blue-500 transition-colors" title={t('common.edit')}>
                    <Edit size={18} />
                  </button>
                  <button onClick={() => toggleStatus(promo)} className="p-2 text-gray-500 hover:text-yellow-500 transition-colors" title={promo.is_active ? t('bets.games.actions.disable') : t('bets.games.actions.enable')}>
                    {promo.is_active ? <StopCircle size={18} /> : <PlayCircle size={18} />}
                  </button>
                  <button onClick={() => handleDelete(promo._id)} className="p-2 text-gray-500 hover:text-red-500 transition-colors" title={t('common.delete')}>
                    <Trash size={18} />
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                {promo.description || t('promotions.no_description')}
              </p>

              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 border-t pt-4 border-gray-100 dark:border-gray-700">
                <div className="flex justify-between">
                  <span>{t('promotions.type')}:</span>
                  <span className="font-medium capitalize">{t(`promotions.types.${promo.type}`, { defaultValue: promo.type.replace('_', ' ') })}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('promotions.value')}:</span>
                  <span className="font-medium">{promo.value}{promo.type === 'deposit_match' ? '%' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('promotions.wager_req')}:</span>
                  <span className="font-medium">{promo.wager_multiplier}x</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('promotions.min_deposit')}:</span>
                  <span className="font-medium">${promo.min_deposit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              {editingPromo ? t('promotions.edit_title') : t('promotions.new_title')}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{t('promotions.form.title')}</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{t('promotions.form.type')}</label>
                <select 
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                  className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="deposit_match">{t('promotions.types.deposit_match')}</option>
                  <option value="free_spins">{t('promotions.types.free_spins')}</option>
                  <option value="cashback">{t('promotions.types.cashback')}</option>
                  <option value="referral">{t('promotions.types.referral')}</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{t('promotions.form.value')}</label>
                  <input 
                    type="number" 
                    value={formData.value}
                    onChange={e => setFormData({...formData, value: Number(e.target.value)})}
                    className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{t('promotions.form.wager')}</label>
                  <input 
                    type="number" 
                    value={formData.wager_multiplier}
                    onChange={e => setFormData({...formData, wager_multiplier: Number(e.target.value)})}
                    className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{t('promotions.form.min_deposit')}</label>
                  <input 
                    type="number" 
                    value={formData.min_deposit}
                    onChange={e => setFormData({...formData, min_deposit: Number(e.target.value)})}
                    className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{t('promotions.form.validity')}</label>
                  <input 
                    type="number" 
                    value={formData.valid_days}
                    onChange={e => setFormData({...formData, valid_days: Number(e.target.value)})}
                    className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{t('promotions.form.description')}</label>
                <textarea 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {t('promotions.form.cancel')}
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('promotions.form.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
