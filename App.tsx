
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  Calculator as CalcIcon, 
  RotateCcw, 
  ChevronDown, 
  TrendingUp, 
  Wallet, 
  BarChart3, 
  Table as TableIcon 
} from 'lucide-react';
import { SimulationParams, SimulationResult } from './types';
import { calculateCompoundInterest, getSummary } from './utils/calculations';
import { formatFCFA } from './utils/formatters';
import InfoSection from './components/InfoSection';

const App: React.FC = () => {
  const [params, setParams] = useState<SimulationParams>({
    initialValue: 1000,
    monthlyValue: 100,
    interestRate: 8,
    rateType: 'annual',
    period: 10,
    periodType: 'years',
  });

  const [results, setResults] = useState<SimulationResult[]>([]);
  const [activeTab, setActiveTab] = useState<'chart' | 'table'>('chart');

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const newResults = calculateCompoundInterest(params);
    setResults(newResults);
  };

  const handleClear = () => {
    setParams({
      initialValue: 0,
      monthlyValue: 0,
      interestRate: 0,
      rateType: 'annual',
      period: 0,
      periodType: 'years',
    });
    setResults([]);
  };

  // Initial calculation
  useEffect(() => {
    handleCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const summary = useMemo(() => results.length > 0 ? getSummary(results) : null, [results]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 text-gray-900">
      {/* Header */}
      <header className="bg-red-900 text-white py-12 px-4 shadow-lg mb-8">
        <div className="max-auto max-w-6xl flex flex-col items-center text-center">
          <div className="bg-red-800 p-3 rounded-full mb-4">
            <CalcIcon className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Simulador de Juros Compostos</h1>
          <p className="text-red-100 max-w-2xl opacity-90">
            Descubra o potencial do seu dinheiro no tempo com nossa calculadora grátis e intuitiva em FCFA.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Inputs */}
        <section className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CalcIcon className="w-5 h-5 text-red-700" /> Parâmetros da Simulação
            </h2>
            <form onSubmit={handleCalculate} className="space-y-5">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Valor Inicial (FCFA)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-xs">FCFA</span>
                  <input 
                    type="number" 
                    value={params.initialValue || ''}
                    onChange={(e) => setParams({ ...params, initialValue: Number(e.target.value) })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Aporte Mensal (FCFA)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-xs">FCFA</span>
                  <input 
                    type="number" 
                    value={params.monthlyValue || ''}
                    onChange={(e) => setParams({ ...params, monthlyValue: Number(e.target.value) })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Taxa de Juros (%)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={params.interestRate || ''}
                    onChange={(e) => setParams({ ...params, interestRate: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                    placeholder="0,00"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Período</label>
                  <select 
                    value={params.rateType}
                    onChange={(e) => setParams({ ...params, rateType: e.target.value as 'monthly' | 'annual' })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-red-500 outline-none appearance-none"
                  >
                    <option value="annual">anual</option>
                    <option value="monthly">mensal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Prazo</label>
                  <input 
                    type="number" 
                    value={params.period || ''}
                    onChange={(e) => setParams({ ...params, period: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                    placeholder="0"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Unidade</label>
                  <select 
                    value={params.periodType}
                    onChange={(e) => setParams({ ...params, periodType: e.target.value as 'months' | 'years' })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-red-500 outline-none appearance-none"
                  >
                    <option value="years">ano(s)</option>
                    <option value="months">mês(es)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="submit"
                  className="flex-1 bg-red-800 hover:bg-red-900 text-white font-bold py-3.5 px-6 rounded-xl shadow-md active:scale-95 transition-all"
                >
                  Calcular
                </button>
                <button 
                  type="button"
                  onClick={handleClear}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-3.5 rounded-xl transition-all"
                  title="Limpar campos"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>
              </div>
            </form>
          </div>

          <div className="bg-red-50 border border-red-100 p-5 rounded-2xl flex items-start gap-4">
            <div className="bg-red-100 p-2 rounded-lg">
              <TrendingUp className="text-red-700 w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-red-800/60 uppercase font-bold tracking-wider mb-1">Dica Pro</p>
              <p className="text-sm text-red-900 leading-snug">
                Mesmo aportes pequenos de 10.000 FCFA podem se transformar em milhões com tempo e paciência.
              </p>
            </div>
          </div>
        </section>

        {/* Results Area */}
        <section className="lg:col-span-8 space-y-8">
          
          {/* Summary Cards */}
          {summary && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-500 uppercase">Total Investido</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{formatFCFA(summary.totalInvested)}</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-500 uppercase">Total em Juros</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{formatFCFA(summary.totalInterest)}</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-red-200 bg-red-50 shadow-sm ring-2 ring-red-100">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-800 uppercase">Total Acumulado</span>
                </div>
                <p className="text-2xl font-extrabold text-red-900">{formatFCFA(summary.finalBalance)}</p>
              </div>
            </div>
          )}

          {/* Visualization Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 p-2 flex bg-gray-50/50">
              <button 
                onClick={() => setActiveTab('chart')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-semibold transition-all ${activeTab === 'chart' ? 'bg-white shadow-sm text-red-700' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <BarChart3 className="w-4 h-4" /> Gráfico
              </button>
              <button 
                onClick={() => setActiveTab('table')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-semibold transition-all ${activeTab === 'table' ? 'bg-white shadow-sm text-red-700' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <TableIcon className="w-4 h-4" /> Tabela de Evolução
              </button>
            </div>

            <div className="p-8 h-[450px]">
              {results.length > 0 ? (
                activeTab === 'chart' ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={results} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#991b1b" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#991b1b" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#9ca3af" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(val) => `Mês ${val}`}
                        minTickGap={30}
                      />
                      <YAxis 
                        stroke="#9ca3af" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false}
                        tickFormatter={(val) => `${val / 1000}k`}
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        formatter={(value: number) => formatFCFA(value)}
                        labelFormatter={(label) => `Mês ${label}`}
                      />
                      <Legend verticalAlign="top" height={36}/>
                      <Area 
                        type="monotone" 
                        dataKey="totalBalance" 
                        name="Acumulado" 
                        stroke="#991b1b" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorTotal)" 
                        activeDot={{ r: 6 }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="investedAmount" 
                        name="Investido" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorInvested)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="overflow-auto h-full rounded-xl border border-gray-100">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Mês</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Juros</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total Investido</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total Acumulado</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {results.map((row) => (
                          <tr key={row.month} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.month}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">+{formatFCFA(row.interest)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatFCFA(row.investedAmount)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{formatFCFA(row.totalBalance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <CalcIcon className="w-12 h-12 mb-4 opacity-20" />
                  <p>Preencha os dados ao lado para ver o resultado.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Informational Content */}
        <section className="lg:col-span-12">
          <InfoSection />
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-200 pt-10 px-4 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Simulador de Investimentos FCFA. Desenvolvido para fins educativos.
        </p>
      </footer>
    </div>
  );
};

export default App;
