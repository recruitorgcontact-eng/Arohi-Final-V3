import { parseSafePrice } from '../data/pricingData';

export interface RazorpayCheckoutOptions {
  amountInRupees?: number;
  price?: number;
  currency?: 'INR' | 'USD';
  planName: string;
  businessName?: string;
  brandName?: string;
  userEmail?: string;
  userName?: string;
  userPhone?: string;
  notes?: Record<string, string>;
  onSuccess?: (response: { razorpay_payment_id: string; razorpay_order_id?: string; razorpay_signature?: string; transaction?: any }) => void;
  onError?: (error: any) => void;
  onDismiss?: () => void;
}

// Dynamically load official Razorpay Standard Checkout SDK script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('Failed to load official Razorpay checkout.js SDK from CDN');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

/**
 * Directly opens the official Razorpay Standard Checkout modal for any user.
 */
export const openRazorpayCheckout = async (options: RazorpayCheckoutOptions): Promise<void> => {
  const safePrice = typeof options.price === 'number' && options.price > 0
    ? options.price
    : (typeof options.amountInRupees === 'number' && options.amountInRupees > 0
        ? options.amountInRupees
        : parseSafePrice(options.planName));

  const currency = options.currency || 'INR';
  const amountInSubunits = Math.round(safePrice * 100);

  // Ensure official Razorpay SDK script is loaded
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded || !(window as any).Razorpay) {
    const errorMsg = 'Unable to connect to Razorpay secure checkout. Please check your internet connection.';
    if (options.onError) {
      options.onError(new Error(errorMsg));
    } else {
      alert(errorMsg);
    }
    return;
  }

  // Create order or get checkout credentials from backend
  let orderData: any = null;
  try {
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: amountInSubunits,
        currency: currency,
        receipt: `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        notes: {
          planName: options.planName,
          userEmail: options.userEmail || '',
          currency: currency,
          ...options.notes
        }
      })
    });

    if (response.ok) {
      orderData = await response.json();
    }
  } catch (err: any) {
    console.warn('Notice from create-order endpoint, continuing with standard checkout:', err);
  }

  // Determine appropriate business/division brand dynamically
  let checkoutBrandName = options.businessName || options.brandName;
  if (!checkoutBrandName) {
    const lowerPlan = (options.planName || '').toLowerCase();
    if (lowerPlan.includes('business') || lowerPlan.includes('growth os') || lowerPlan.includes('starter os') || lowerPlan.includes('scale os') || lowerPlan.includes('enterprise os') || lowerPlan.includes('arohi one')) {
      checkoutBrandName = 'Arohi One Business OS';
    } else if (lowerPlan.includes('voice') || lowerPlan.includes('calling') || lowerPlan.includes('fleet') || lowerPlan.includes('agent')) {
      checkoutBrandName = 'Arohi AI Voice Fleet';
    } else if (lowerPlan.includes('exam') || lowerPlan.includes('test pass') || lowerPlan.includes('cbt') || lowerPlan.includes('mock') || lowerPlan.includes('marksheet')) {
      checkoutBrandName = 'Arohi Exams';
    } else {
      checkoutBrandName = 'Arohi AI';
    }
  }

  const razorpayKey = orderData?.key_id || (import.meta.env.VITE_RAZORPAY_KEY_ID as string) || 'rzp_live_TLH0EPLAWJ0wqh';

  return new Promise((resolve, reject) => {
    const rzpOptions: any = {
      key: razorpayKey,
      amount: orderData?.amount || amountInSubunits,
      currency: orderData?.currency || currency,
      name: checkoutBrandName,
      description: options.planName,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
      prefill: {
        name: options.userName || '',
        email: options.userEmail || '',
        contact: options.userPhone || ''
      },
      notes: {
        planName: options.planName,
        userEmail: options.userEmail || '',
        ...options.notes
      },
      theme: {
        color: '#0c2340'
      },
      handler: async function (paymentResponse: {
        razorpay_payment_id: string;
        razorpay_order_id?: string;
        razorpay_signature?: string;
      }) {
        try {
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: paymentResponse.razorpay_order_id || orderData?.order_id || '',
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature || '',
              userEmail: options.userEmail || '',
              planName: options.planName,
              amount: safePrice,
              currency: currency
            })
          });

          const verifyData = await verifyRes.json();

          if (options.onSuccess) {
            options.onSuccess({
              ...paymentResponse,
              transaction: verifyData?.transaction
            });
          }
          resolve();
        } catch (err: any) {
          console.warn('Verification server response note:', err);
          if (options.onSuccess) {
            options.onSuccess(paymentResponse);
          }
          resolve();
        }
      },
      modal: {
        ondismiss: function () {
          if (options.onDismiss) {
            options.onDismiss();
          }
          resolve();
        }
      }
    };

    // Attach order_id only when a genuine order ID exists from Razorpay
    if (orderData?.order_id && typeof orderData.order_id === 'string' && !orderData.order_id.startsWith('order_demo_')) {
      rzpOptions.order_id = orderData.order_id;
    }

    try {
      const rzp = new (window as any).Razorpay(rzpOptions);

      rzp.on('payment.failed', function (failureResponse: any) {
        const err = failureResponse?.error || { description: 'Payment was not completed', code: 'PAYMENT_FAILED' };
        console.warn('Razorpay payment failed or cancelled:', err);
        if (options.onError) {
          options.onError(err);
        } else {
          alert(`Payment Notice: ${err.description || 'Transaction cancelled or failed.'}`);
        }
        reject(err);
      });

      rzp.open();
    } catch (openErr: any) {
      console.error('Failed to open Razorpay checkout modal:', openErr);
      if (options.onError) {
        options.onError(openErr);
      } else {
        alert(`Razorpay Gateway Notice: ${openErr?.message || 'Could not launch payment modal'}`);
      }
      reject(openErr);
    }
  });
};
