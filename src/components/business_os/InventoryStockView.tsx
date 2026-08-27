import React, { useState } from 'react';
import {
  Package,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter,
  ArrowDownRight,
  TrendingDown,
  Warehouse
} from 'lucide-react';
import { useBusinessOS } from './BusinessOSContext';
import { ProductInventoryItem } from './types';

export default function InventoryStockView() {
  const { inventory = [], updateProductStock, addProduct, showToast } = useBusinessOS();
  const [searchQuery, setSearchQuery] = useState('');

  const safeInventory = inventory || [];

  const filteredItems = safeInventory.filter(i => {
    const q = (searchQuery || '').toLowerCase();
    const matchesName = (i?.name || '').toLowerCase().includes(q);
    const matchesSku = (i?.sku || '').toLowerCase().includes(q);
    const matchesCat = (i?.category || '').toLowerCase().includes(q);
    return matchesName || matchesSku || matchesCat;
  });

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center">
            <Package className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              Product Inventory, Stock & SKU Management
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
              Track multi-warehouse stock levels, reorder thresholds, safety margins, and unit costs
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const name = prompt('Product Name:');
            if (!name) return;
            const sku = `SKU-${Date.now().toString().slice(-4)}`;
            addProduct({
              sku,
              name,
              category: 'Hardware & Devices',
              unitPrice: 15000,
              sellingPrice: 15000,
              costPrice: 11000,
              stockOnHand: 25,
              reorderLevel: 10,
              warehouseLocation: 'Warehouse B - Bangalore',
              unit: 'Units',
              status: 'in_stock',
              lastRestockedDate: new Date().toISOString().split('T')[0]
            });
          }}
          className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Product SKU</span>
        </button>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-zinc-50/80 dark:bg-[#18181b] border-b border-black/[0.06] dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">SKU Code</th>
                <th className="py-3 px-4">Item Name & Category</th>
                <th className="py-3 px-4">Warehouse</th>
                <th className="py-3 px-4">Unit Price</th>
                <th className="py-3 px-4">Stock on Hand</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Adjust Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06] font-medium text-zinc-700 dark:text-zinc-300">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-[#18181b]/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-600 dark:text-amber-400 text-xs">
                    {item.sku}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-zinc-900 dark:text-white text-xs">{item.name}</div>
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{item.category}</span>
                  </td>
                  <td className="py-3 px-4 text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 py-3">
                    <Warehouse className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-xs">{item.warehouseLocation}</span>
                  </td>
                  <td className="py-3 px-4 font-bold text-zinc-900 dark:text-white text-xs">
                    ₹{item.unitPrice.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-zinc-900 dark:text-white">{item.stockOnHand}</span>
                      <span className="text-[10px] text-zinc-400">(Min: {item.reorderLevel})</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                      item.status === 'in_stock'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40'
                        : item.status === 'low_stock'
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40'
                        : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/40'
                    }`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => updateProductStock(item.id, Math.max(0, item.stockOnHand - 5))}
                        className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg font-semibold text-[10px] cursor-pointer"
                        title="Deduct 5 units"
                      >
                        -5
                      </button>
                      <button
                        onClick={() => updateProductStock(item.id, item.stockOnHand + 10)}
                        className="px-2 py-1 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 rounded-lg font-semibold text-[10px] cursor-pointer"
                        title="Add 10 units"
                      >
                        +10
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
