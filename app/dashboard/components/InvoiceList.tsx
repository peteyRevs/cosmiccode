'use client';

import { useState } from 'react';
import { Invoice } from '@/types/database';
import InvoiceCard from './InvoiceCard';
import InvoiceModal from './InvoiceModal';

interface InvoiceListProps {
  invoices: Invoice[];
}

export default function InvoiceList({ invoices }: InvoiceListProps) {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Calculate summary stats
  const totalOwed = invoices
    .filter(inv => inv.status === 'pending' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.total_amount, 0);

  const totalPaid = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.total_amount, 0);

  return (
    <>
      {/* Header with Summary Stats */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Invoices</h1>
        <p className="text-slate-300 mb-6">Track payments and billing history</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
            <div className="text-sm text-slate-400 mb-1">Total Outstanding</div>
            <div className="text-2xl font-bold text-red-400">${totalOwed.toFixed(2)}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
            <div className="text-sm text-slate-400 mb-1">Total Paid</div>
            <div className="text-2xl font-bold text-green-400">${totalPaid.toFixed(2)}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
            <div className="text-sm text-slate-400 mb-1">Total Invoices</div>
            <div className="text-2xl font-bold text-white">{invoices.length}</div>
          </div>
        </div>
      </div>

      {/* Invoices List */}
      {invoices.length > 0 ? (
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <InvoiceCard
              key={invoice.id}
              invoice={invoice}
              onViewDetails={setSelectedInvoice}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 shadow-xl text-center">
          <p className="text-slate-400 text-lg">No invoices yet</p>
          <p className="text-slate-500 text-sm mt-2">
            Your invoices will appear here once they are created
          </p>
        </div>
      )}

      {/* Invoice Detail Modal */}
      <InvoiceModal
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
      />
    </>
  );
}
