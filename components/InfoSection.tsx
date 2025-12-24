
import React from 'react';
import { BookOpen, TrendingUp, Info, HelpCircle, CheckCircle } from 'lucide-react';

const InfoSection: React.FC = () => {
  return (
    <div className="space-y-12 mt-16 text-gray-700 leading-relaxed">
      {/* Guia de Uso */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="text-red-700 w-6 h-6" />
          <h2 className="text-2xl font-bold text-gray-900">Guia de Uso: Como Simular</h2>
        </div>
        <div className="grid md:grid-cols-5 gap-6">
          {[
            { step: 1, title: 'Capital Inicial', desc: 'Informe o valor que você já possui para começar seu investimento.' },
            { step: 2, title: 'Aporte Mensal', desc: 'Quanto você pretende poupar e investir todos os meses.' },
            { step: 3, title: 'Rentabilidade', desc: 'A taxa de juros esperada para o período (mensal ou anual).' },
            { step: 4, title: 'Prazo', desc: 'Por quanto tempo você pretende manter o dinheiro investido.' },
            { step: 5, title: 'Resultado', desc: 'Clique em calcular para ver a mágica dos juros agindo!' },
          ].map((item) => (
            <div key={item.step} className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-red-50 text-red-700 rounded-full flex items-center justify-center font-bold mb-3 border border-red-100">
                {item.step}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Teoria e Fórmula */}
      <section className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-red-700 w-6 h-6" />
            <h2 className="text-2xl font-bold text-gray-900">A Mágica dos Juros Compostos</h2>
          </div>
          <p>
            Diferente dos juros simples, onde o rendimento incide apenas sobre o valor original, os <strong>juros compostos</strong> trabalham sobre o montante acumulado. É o famoso efeito "juros sobre juros".
          </p>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 font-mono">
            <p className="text-center text-xl font-bold mb-4">M = C (1 + i)<sup>t</sup></p>
            <ul className="text-sm space-y-2">
              <li><strong>M:</strong> Montante Final (resultado)</li>
              <li><strong>C:</strong> Capital Inicial investido</li>
              <li><strong>i:</strong> Taxa de juros (formato decimal)</li>
              <li><strong>t:</strong> Tempo de aplicação</li>
            </ul>
          </div>
        </div>

        <div className="bg-red-900 text-white p-8 rounded-2xl shadow-xl">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Info className="w-5 h-5" /> Por que investir a longo prazo?
          </h3>
          <p className="text-red-100 mb-4">
            O tempo é o melhor amigo do investidor. No início, o crescimento parece lento, mas após alguns anos, a curva de rendimentos torna-se exponencial.
          </p>
          <blockquote className="border-l-4 border-red-400 pl-4 italic text-sm">
            "Os juros compostos são a oitava maravilha do mundo. Aquele que entende, ganha; aquele que não entende, paga."
            <footer className="mt-2 font-semibold">— Atribuído a Albert Einstein</footer>
          </blockquote>
        </div>
      </section>

      {/* Simples vs Compostos */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Juros Simples vs. Juros Compostos</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle className="text-blue-500 w-5 h-5" /> Juros Simples
            </h3>
            <p className="text-sm text-gray-600 mb-4">O rendimento é constante. Se você investe 1.000 FCFA a 10%, ganhará sempre 100 FCFA por período.</p>
            <ul className="text-sm space-y-2 list-disc pl-5 text-gray-500">
              <li>Crescimento linear</li>
              <li>Calculado apenas sobre o valor inicial</li>
              <li>Ideal para empréstimos curtos ou contas básicas</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl border border-red-200 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle className="text-red-500 w-5 h-5" /> Juros Compostos
            </h3>
            <p className="text-sm text-gray-600 mb-4">O rendimento é reinvestido. Cada mês os juros são calculados sobre um valor maior que o anterior.</p>
            <ul className="text-sm space-y-2 list-disc pl-5 text-gray-500">
              <li>Crescimento exponencial (curva)</li>
              <li>Calculado sobre o total acumulado</li>
              <li>A base da construção de patrimônio</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ rápido */}
      <section className="bg-gray-900 text-white p-10 rounded-3xl">
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle className="w-8 h-8 text-red-500" />
          <h2 className="text-3xl font-bold">Dúvidas Frequentes</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h4 className="font-bold text-lg text-red-400 mb-2">Onde encontro juros compostos?</h4>
            <p className="text-gray-400 text-sm">Na maioria dos produtos financeiros modernos: CDBs, Tesouro Direto, Contas Poupança de Bancos, Fundos de Investimento e até dividendos de ações reinvestidos.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-red-400 mb-2">A inflação importa?</h4>
            <p className="text-gray-400 text-sm">Sim! Para um cálculo real, subtraia a inflação estimada da taxa de juros nominal para saber o quanto seu poder de compra realmente aumentará.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfoSection;
