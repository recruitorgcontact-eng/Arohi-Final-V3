export interface RazorpayCheckoutOptions {
  amountInRupees: number;
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
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    throw new Error('Failed to load Razorpay Checkout SDK. Please check your internet connection.');
  }

  // 1. Create Order via Backend API
  const amountInPaise = Math.max(100, Math.round(options.amountInRupees * 100));

  const response = await fetch('/api/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      notes: {
        planName: options.planName,
        userEmail: options.userEmail || '',
        ...options.notes
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to create order (${response.status})`);
  }

  const orderData = await response.json();

  // 2. Open Razorpay Checkout Modal
  return new Promise((resolve, reject) => {
    const rzpOptions = {
      key: orderData.key_id || import.meta.env.VITE_RAZORPAY_KEY_ID || '',
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'AROHI AI',
      description: options.planName,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
      order_id: orderData.order_id,
      prefill: {
        name: options.userName || '',
        email: options.userEmail || 'elitetraderjunoon@gmail.com',
        contact: options.userPhone || ''
      },
      notes: {
        planName: options.planName,
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
              userEmail: options.userEmail || 'elitetraderjunoon@gmail.com',
              planName: options.planName,
              amount: options.amountInRupees
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

    const rzp = new (window as any).Razorpay(rzpOptions);

    rzp.on('payment.failed', function (failureResponse: any) {
      const err = failureResponse.error || { description: 'Payment failed' };
      if (options.onError) {
        options.onError(err);
      } else {
        alert(`Payment Failed: ${err.description || 'Transaction declined'}`);
      }
      reject(err);
    });

    rzp.open();
  });
};
