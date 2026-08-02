import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth, API_BASE_URL } from '../context/AuthContext';
import { CreditCard, ShieldCheck, AlertCircle, RefreshCw, CheckCircle } from 'lucide-react';

interface CheckoutFormProps {
  classId: string;
  price: number;
  onSuccess: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ classId, price, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { token } = useAuth();

  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!stripe || !elements) {
      setError('Stripe has not initialized yet.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Card details field is missing.');
      return;
    }

    setPaymentLoading(true);

    try {
      // 1. Create PaymentIntent from server
      const res = await fetch(`${API_BASE_URL}/payments/create-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ classId })
      });

      const intentData = await res.json();

      if (!res.ok) {
        throw new Error(intentData.message || 'Failed to initialize payment.');
      }

      const clientSecret = intentData.clientSecret;

      // 2. Confirm card payment through Stripe
      const stripeResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        }
      });

      if (stripeResult.error) {
        throw new Error(stripeResult.error.message || 'Payment card confirmation failed.');
      }

      // 3. Confirm enrollment update in DB
      if (stripeResult.paymentIntent?.status === 'succeeded') {
        const enrollRes = await fetch(`${API_BASE_URL}/payments/enroll/${classId}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!enrollRes.ok) {
          throw new Error('Payment succeeded, but roster registration failed. Contact Admin.');
        }

        setCompleted(true);
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Transaction processing failed.');
    } finally {
      setPaymentLoading(false);
    }
  };

  // Card element styling rules
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#0f172a',
        fontFamily: 'Outfit, Inter, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '14px',
        '::placeholder': {
          color: '#94a3b8',
        },
      },
      invalid: {
        color: '#ef4444',
        iconColor: '#ef4444',
      },
    },
    hidePostalCode: true // Simplify for demo convenience
  };

  if (completed) {
    return (
      <div class="flex flex-col items-center justify-center p-6 space-y-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-center animate-pulse">
        <CheckCircle class="w-10 h-10 text-accent" />
        <h4 class="text-sm font-bold text-emerald-950">Tuition Fee Paid Successfully!</h4>
        <p class="text-[10px] text-emerald-700 leading-relaxed">
          Your enrollment request has been finalized in the student roster registry. Redirecting...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} class="space-y-4">
      {/* Payment details header */}
      <div class="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
        <span class="text-slate-500 flex items-center space-x-1.5">
          <CreditCard class="w-4 h-4 text-slate-400" />
          <span>Payment Gateway (Stripe)</span>
        </span>
        <span class="font-extrabold text-slate-900">${price.toFixed(2)} USD</span>
      </div>

      {/* Error alert */}
      {error && (
        <div class="flex items-start space-x-2 bg-red-50 border border-red-100 p-3 rounded-xl text-xs text-red-600">
          <AlertCircle class="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Stripe Card input field */}
      <div class="p-3.5 bg-slate-50 border border-slate-100 rounded-xl focus-within:ring-2 focus-within:ring-primary/20">
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>

      {/* Security note */}
      <div class="flex items-center space-x-1.5 text-[10px] text-slate-400">
        <ShieldCheck class="w-4 h-4 text-slate-300" />
        <span>SECURE SSL 256-BIT ENCRYPTED CONNECTION</span>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={paymentLoading || !stripe}
        class="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-bold text-xs shadow-md shadow-primary/10 transition-colors flex items-center justify-center space-x-2 disabled:opacity-40"
      >
        {paymentLoading ? (
          <>
            <RefreshCw class="w-4 h-4 animate-spin" />
            <span>Processing Payment...</span>
          </>
        ) : (
          <span>Pay Tuition Fee & Register</span>
        )}
      </button>
    </form>
  );
};
