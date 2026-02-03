import React, { useMemo, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import api from "../../api/axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const WeeksProfit = ({ className = "" }) => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState({
    labels: [],
    expenses: [],
    revenue: []
  });
  const [period, setPeriod] = useState('year'); // week, month, year

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/admin/charts?range=${period}`);
        if (response) {
          setChartData({
            labels: response.labels || [],
            expenses: response.expenses || [],
            revenue: response.revenue || []
          });
        }
      } catch (error) {
        console.error('Failed to fetch profit stats:', error);
      }
    };
    fetchData();
  }, [period]);

  const data = useMemo(
    () => ({
      labels: chartData.labels,
      datasets: [
        {
          label: t('dashboard.expenses_wins'),
          data: chartData.expenses,
          backgroundColor: "#6b7280",
          borderRadius: 6,
          barPercentage: 0.55,
          categoryPercentage: 0.6,
        },
        {
          label: t('dashboard.profit_ggr'),
          data: chartData.revenue,
          backgroundColor: "#2563eb",
          borderRadius: 6,
          barPercentage: 0.55,
          categoryPercentage: 0.6,
        },
      ],
    }),
    [chartData]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { stacked: false, grid: { display: false }, ticks: { color: "#6b7280" } },
        y: { stacked: false, grid: { color: "rgba(148,163,184,0.25)" }, ticks: { color: "#6b7280" } },
      },
      plugins: {
        legend: { position: "bottom", labels: { usePointStyle: true, pointStyle: "rectRounded" } },
        tooltip: {
          backgroundColor: "#111827",
          borderColor: "#1f2937",
          borderWidth: 1,
          padding: 10,
          callbacks: { label: (ctx) => `${ctx.dataset.label}: $${ctx.parsed.y.toLocaleString()}` },
        },
      },
    }),
    []
  );

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">{t('dashboard.profit_vs_expenses')}</h3>
        <div className="flex space-x-2 text-sm">
          <button 
            onClick={() => setPeriod('week')}
            className={`px-3 py-1 rounded ${period === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'}`}
          >
            {t('dashboard.week')}
          </button>
          <button 
            onClick={() => setPeriod('month')}
            className={`px-3 py-1 rounded ${period === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'}`}
          >
            {t('dashboard.month')}
          </button>
          <button 
            onClick={() => setPeriod('year')}
            className={`px-3 py-1 rounded ${period === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'}`}
          >
            {t('dashboard.year')}
          </button>
        </div>
      </div>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default WeeksProfit;
