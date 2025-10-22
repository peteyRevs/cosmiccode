'use client';

import { Invoice } from '@/types/database';
import { X, Download } from 'lucide-react';

interface InvoiceModalProps {
  invoice: Invoice | null;
  onClose: () => void;
}

export default function InvoiceModal({ invoice, onClose }: InvoiceModalProps) {
  if (!invoice) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-slate-900">
          <h2 className="text-2xl font-bold text-white">
            Invoice #{invoice.invoice_number}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Invoice Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-400 mb-1">Invoice Date</div>
              <div className="text-white">{new Date(invoice.invoice_date).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Due Date</div>
              <div className="text-white">{new Date(invoice.due_date).toLocaleDateString()}</div>
            </div>
            {invoice.paid_date && (
              <>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Paid Date</div>
                  <div className="text-green-400">{new Date(invoice.paid_date).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Payment Method</div>
                  <div className="text-white">{invoice.payment_method || 'N/A'}</div>
                </div>
              </>
            )}
          </div>

          {/* Line Items */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Line Items</h3>
            <div className="space-y-2">
              {invoice.line_items.map((item) => (
                <div key={item.id} className="flex justify-between items-start p-3 bg-white/5 rounded-lg">
                  <div className="flex-1">
                    <div className="text-white font-medium">{item.description}</div>
                    <div className="text-sm text-slate-400">
                      {item.quantity} × ${item.rate.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-white font-semibold">${item.amount.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-2 border-t border-white/10 pt-4">
            <div className="flex justify-between text-slate-300">
              <span>Subtotal</span>
              <span>${invoice.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Tax ({invoice.tax_rate}%)</span>
              <span>${invoice.tax_amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-white/10">
              <span>Total</span>
              <span>${invoice.total_amount.toFixed(2)}</span>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-sm text-slate-400 mb-2">Notes</div>
              <div className="text-white">{invoice.notes}</div>
            </div>
          )}

          {/* Download Button */}
          {invoice.invoice_url && (
            <a
              href={invoice.invoice_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
            >
              <Download className="w-5 h-5" />
              Download Invoice PDF
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
