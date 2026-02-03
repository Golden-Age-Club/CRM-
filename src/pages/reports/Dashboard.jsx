import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import api from '../../api/axios';
import { useTranslation } from 'react-i18next';
import { 
  Download, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Activity, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const { t } = useTranslation();
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("year"); // Default to year for better initial view

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const handleExport = async () => {
    try {
      const response = await api.get(`/api/admin/export?range=${dateRange}`, {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report-${dateRange}-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Export failed:', error);
      toast.error(t('reports.export_failed', 'Failed to export data'));
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, chartRes] = await Promise.all([
        api.get('/api/admin/stats'),
        api.get(`/api/admin/charts?range=${dateRange}`)
      ]);
      setStats(statsRes);
      setChartData(chartRes);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error(t('errors.fetch_failed', 'Failed to fetch dashboard data'));
    } finally {
      setLoading(false);
    }
  };

  const getChangeColor = (change) => {
    if (change > 0) return "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20";
    if (change < 0) return "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20";
    return "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800";
  };

  const getChangeIcon = (change) => {
    if (change > 0) return <ArrowUpRight size={16} />;
    if (change < 0) return <ArrowDownRight size={16} />;
    return <Activity size={16} />;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          font: { family: "'Inter', sans-serif", size: 12 }
        }
      },
      title: { display: false },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        padding: 12,
        titleFont: { family: "'Inter', sans-serif", size: 13 },
        bodyFont: { family: "'Inter', sans-serif", size: 12 },
        cornerRadius: 8,
        displayColors: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { 
          color: 'rgba(200, 200, 200, 0.1)',
          borderDash: [5, 5],
          drawBorder: false,
        },
        ticks: {
          font: { family: "'Inter', sans-serif", size: 11 },
          color: '#9CA3AF',
          callback: (value) => value >= 1000 ? `${value / 1000}k` : value,
        }
      },
      x: {
        grid: { display: false },
        ticks: {
          font: { family: "'Inter', sans-serif", size: 11 },
          color: '#9CA3AF'
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  const chartDataConfig = chartData ? {
    labels: chartData.labels,
    datasets: [
      {
        label: t('dashboard.revenue_ggr', 'Revenue (GGR)'),
        data: chartData.revenue,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          return gradient;
        },
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
      {
        label: t('dashboard.expenses_wins', 'Expenses (Wins)'),
        data: chartData.expenses,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
      }
    ]
  } : null;

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('reports.overview', 'Overview')}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t('reports.overview_subtitle', 'Monitor your key performance metrics')}
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full appearance-none pl-10 pr-8 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer hover:border-gray-300 dark:hover:border-gray-600"
            >
              <option value="week">{t('periods.last_7_days', 'Last 7 Days')}</option>
              <option value="month">{t('periods.last_30_days', 'Last 30 Days')}</option>
              <option value="year">{t('periods.last_year', 'Last Year')}</option>
            </select>
            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all shadow-sm hover:shadow active:scale-95"
          >
            <Download size={16} />
            <span className="hidden sm:inline">{t('common.export', 'Export')}</span>
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title={t('dashboard.total_ggr', 'GGR')}
            value={formatCurrency(stats.ggr.value)} 
            change={stats.ggr.percentage} 
            period={t('periods.last_7_days', 'Last 7 days')}
            icon={DollarSign}
            color="blue"
            getChangeColor={getChangeColor}
            getChangeIcon={getChangeIcon}
          />
          <MetricCard 
            title={t('dashboard.rtp', 'RTP')}
            value={`${stats.rtp.value}%`} 
            change={stats.rtp.percentage} 
            period={t('periods.last_7_days', 'Last 7 days')}
            icon={Activity}
            color="purple"
            getChangeColor={getChangeColor}
            getChangeIcon={getChangeIcon}
          />
          <MetricCard 
            title={t('dashboard.dau', 'Active Users (DAU)')}
            value={stats.dau.value} 
            change={stats.dau.percentage} 
            period={t('periods.last_24_hours', 'Last 24 hours')}
            icon={Users}
            color="emerald"
            getChangeColor={getChangeColor}
            getChangeIcon={getChangeIcon}
          />
          <MetricCard 
            title={t('dashboard.total_bets', 'Total Bets')}
            value={stats.bets.value.toLocaleString()} 
            change={stats.bets.percentage} 
            period={t('periods.last_7_days', 'Last 7 days')}
            icon={TrendingUp}
            color="orange"
            getChangeColor={getChangeColor}
            getChangeIcon={getChangeIcon}
          />
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              {t('reports.revenue_trend', 'Revenue Trend')}
            </h3>
          </div>
          <div className="h-80 w-full">
            {chartDataConfig && <Line options={lineChartOptions} data={chartDataConfig} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, period, icon: Icon, color, getChangeColor, getChangeIcon }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
    orange: "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-all hover:shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          <Icon size={20} />
        </div>
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${getChangeColor(change)}`}>
          {getChangeIcon(change)}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1 mb-1">
          {value}
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          vs {period}
        </p>
      </div>
    </div>
  );
}
