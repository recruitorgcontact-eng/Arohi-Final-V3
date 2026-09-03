export interface RazorpayCheckoutOptions {
  amountInRupees?: number;
  price?: number;
  currency?: 'INR' | 'USD';
  planName: string;
  userEmail?: string;
  userName?: string;
  userPhone?: string;
  notes?: Record<string, string>;
  onSuccess?: (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string; transaction?: any }) => void;
  onError?: (error: any) => void;
  onDismiss?: () => void;
}

// Dynamically load Razorpay Standard Checkout SDK script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Triggers Razorpay Standard Web Checkout:
 * 1. Calls POST /api/create-order
 * 2. Opens Razorpay Modal (https://checkout.razorpay.com/v1/checkout.js)
 * 3. On success, calls POST /api/verify-payment to verify HMAC-SHA256 signature
 */
export const openRazorpayCheckout = async (options: RazorpayCheckoutOptions): Promise<void> => {
  const currency = options.currency || 'INR';
  const rawPrice = options.price !== undefined ? options.price : (options.amountInRupees || 399);
  const amountInSubunits = Math.max(100, Math.round(rawPrice * 100));

  let orderData: any;
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
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.warn("Create order API status non-ok, using fallback order:", errorData);
      orderData = {
        order_id: `order_demo_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        amount: amountInSubunits,
        currency: currency,
        key_id: 'rzp_test_arohi_demo',
        isDemo: true
      };
    }
  } catch (err: any) {
    console.warn("Create order fetch error, using fallback order:", err);
    orderData = {
      order_id: `order_demo_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      amount: amountInSubunits,
      currency: currency,
      key_id: 'rzp_test_arohi_demo',
      isDemo: true
    };
  }

  // Check Razorpay SDK script loading
  const loaded = await loadRazorpayScript();

  // If Razorpay SDK fails to load or no Razorpay window is available
  if (!loaded || !(window as any).Razorpay) {
    const errorMsg = 'Razorpay Checkout SDK failed to load. Please check your internet connection or try again.';
    console.error(errorMsg);
    if (options.onError) {
      options.onError(new Error(errorMsg));
    } else {
      alert(errorMsg);
    }
    return;
  }

  // If order creation returned an error or missing key_id
  const razorpayKey = orderData?.key_id || (typeof process !== 'undefined' && process.env.RAZORPAY_KEY_ID) || '';
  if (!orderData || !orderData.order_id || !razorpayKey || razorpayKey === 'rzp_test_arohi_demo') {
    const errorMsg = 'Razorpay payment gateway credentials are not yet configured or invalid. Please configure RAZORPAY_KEY_ID in Settings.';
    console.warn(errorMsg, orderData);
    if (options.onError) {
      options.onError(new Error(errorMsg));
    }
    return;
  }

  // 2. Open Real Razorpay Checkout Modal
  return new Promise((resolve, reject) => {
    const rzpOptions = {
      key: razorpayKey,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'AROHI EXAMS',
      description: options.planName,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
      order_id: orderData.order_id,
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
        color: '#7c3aed'
      },
      handler: async function (paymentResponse: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) {
        try {
          // 3. Verify Signature via Backend API
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
              userEmail: options.userEmail || '',
              planName: options.planName,
              amount: rawPrice,
              currency: currency
            })
          });

          const verifyData = await verifyRes.json();

          if (verifyRes.ok && verifyData.success) {
            if (options.onSuccess) {
              options.onSuccess({
                ...paymentResponse,
                transaction: verifyData.transaction
              });
            }
            resolve();
          } else {
            const errMsg = verifyData.error || 'Payment signature verification failed';
            if (options.onError) {
              options.onError(new Error(errMsg));
            } else {
              alert(`Payment Verification Error: ${errMsg}`);
            }
            reject(new Error(errMsg));
          }
        } catch (err: any) {
          if (options.onError) {
            options.onError(err);
          } else {
            alert(`Network or Server Verification Error: ${err.message}`);
          }
          reject(err);
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

    try {
      const rzp = new (window as any).Razorpay(rzpOptions);

      rzp.on('payment.failed', function (failureResponse: any) {
        const err = failureResponse?.error || { description: 'Payment declined or cancelled by user', code: 'PAYMENT_FAILED' };
        console.warn("Razorpay payment failed:", err);
        if (options.onError) {
          options.onError(err);
        } else {
          alert(`Payment Error: ${err.description || 'Transaction declined'}`);
        }
        reject(err);
      });

      rzp.open();
    } catch (openErr: any) {
      console.error("Razorpay instance open error:", openErr);
      if (options.onError) {
        options.onError(openErr);
      } else {
        alert(`Failed to open Razorpay Checkout: ${openErr.message || openErr}`);
      }
      reject(openErr);
    }
  });
};
