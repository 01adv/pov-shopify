'use client';
import { useEffect, useRef } from 'react';

const useCartPolling = (interval = 3000) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== 'https://testing-pov.myshopify.com') return;
      const { type, payload } = event.data || {};

      if (type === 'CART_INFO') {
        console.log('[Next.js Polling] Cart item count:', payload.itemCount);
        // Optionally: update state/UI here
      }

      if (type === 'CART_ERROR') {
        console.error('[Next.js Polling] Cart fetch error:', payload?.error);
      }
    };

    // Listen for messages
    window.addEventListener('message', handleMessage);

    // Start polling
    intervalRef.current = setInterval(() => {
      window.parent.postMessage({ type: 'GET_CART' }, '*');
    }, interval);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      window.removeEventListener('message', handleMessage);
    };
  }, [interval]);
};

export default useCartPolling;
