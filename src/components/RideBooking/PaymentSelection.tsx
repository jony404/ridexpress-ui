import React from 'react';
import { CreditCard, Smartphone, DollarSign } from 'lucide-react';
import { PaymentMethod } from '../../types';

interface PaymentSelectionProps {
  paymentMethods: PaymentMethod[];
  selectedPayment: PaymentMethod | null;
  onPaymentSelect: (payment: PaymentMethod) => void;
}

const getPaymentIcon = (type: PaymentMethod['type']) => {
  switch (type) {
    case 'credit_card':
    case 'debit_card':
      return <CreditCard className="h-5 w-5" />;
    case 'digital_wallet':
      return <Smartphone className="h-5 w-5" />;
    case 'cash':
      return <DollarSign className="h-5 w-5" />;
    default:
      return <CreditCard className="h-5 w-5" />;
  }
};

export function PaymentSelection({ paymentMethods, selectedPayment, onPaymentSelect }: PaymentSelectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
      
      {paymentMethods.map((method) => (
        <button
          key={method.id}
          onClick={() => onPaymentSelect(method)}
          className={`w-full p-4 rounded-lg border-2 transition-all ${
            selectedPayment?.id === method.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                selectedPayment?.id === method.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {getPaymentIcon(method.type)}
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900">{method.name}</h4>
                {method.isDefault && (
                  <span className="text-xs text-green-600 font-medium">Default</span>
                )}
              </div>
            </div>
            {selectedPayment?.id === method.id && (
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}