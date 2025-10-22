'use client';

import { Invoice } from '@/types/database';
import { Download, Eye, Calendar, CreditCard } from 'lucide-react';

interface InvoiceCardProps {
  invoice: Invoice;
  onViewDetails: (invoice: Invoice) => void;
}

export default function InvoiceCard({ invoice, onViewDetails }: InvoiceCardProps) {
  const isOverdue = invoice.status === 'overdue';
  const isPaid = invoice.status === 'paid';

  return (
    <div
      className={`bg-white/10 backdrop-blur-xl rounded-xl p-6 border transition-all hover:bg-white/15 ${
        isOverdue ? 'border-red-500/50' : 'border-white/20'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-white">
              Invoice #{invoice.invoice_number}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isPaid
                  ? 'bg-green-500/20 text-green-400'
                  : isOverdue
                  ? 'bg-red-500/20 text-red-400'
                  : invoice.status === 'cancelled'
                  ? 'bg-slate-500/20 text-slate-400'
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}
            >
              {invoice.status}
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Issued: {new Date(invoice.invoice_date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className={isOverdue ? 'text-red-400 font-medium' : ''}>
                Due: {new Date(invoice.due_date).toLocaleDateString()}
              </span>
            </div>
            {invoice.paid_date && (
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span>Paid: {new Date(invoice.paid_date).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white mb-1">
            ${invoice.total_amount.toFixed(2)}
          </div>
          {invoice.payment_method && (
            <div className="text-xs text-slate-400">
              via {invoice.payment_method}
            </div>
          )}
        </div>
      </div>

      {/* Line Items Preview */}
      {invoice.line_items && invoice.line_items.length > 0 && (
        <div className="mb-4 space-y-1">
          {invoice.line_items.slice(0, 2).map((item) => (
            <div key={item.id} className="text-sm text-slate-300 flex justify-between">
              <span>{item.description}</span>
              <span>${item.amount.toFixed(2)}</span>
            </div>
          ))}
          {invoice.line_items.length > 2 && (
            <div className="text-xs text-slate-500">
              +{invoice.line_items.length - 2} more items
            </div>
          )}
        </div>
      )}

      {/* Notes */}
      {invoice.notes && (
        <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="text-xs text-slate-400 mb-1">Notes</div>
          <div className="text-sm text-slate-300">{invoice.notes}</div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        <button
          onClick={() => onViewDetails(invoice)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm font-medium"
        >
          <Eye className="w-4 h-4" />
          View Details
        </button>
        {invoice.invoice_url && (
          <a
            href={invoice.invoice_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        )}
      </div>
    </div>
  );
}
