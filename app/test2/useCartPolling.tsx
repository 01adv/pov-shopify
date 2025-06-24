// 'use client';
// import { useProductContext } from '@/hooks/useProduct';
// import { useEffect, useRef } from 'react';

// const useCartPolling = (interval = 3000) => {
//   const { setItemCount } = useProductContext();
//   const parentOrigin = `${process.env.NEXT_PUBLIC_SHOPIFY_URL}`;

//   const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   useEffect(() => {
//     const handleMessage = (event) => {
//       if (event.origin !== parentOrigin) return;
//       const { type, payload } = event.data || {};

//       if (type === 'CART_INFO') {
//         console.log('[Next.js Polling] Cart item count:', payload.itemCount);
//         setItemCount(payload.itemCount);
//         // Optionally: update state/UI here
//       }

//       if (type === 'CART_ERROR') {
//         console.error('[Next.js Polling] Cart fetch error:', payload?.error);
//       }
//     };

//     // Listen for messages
//     window.addEventListener('message', handleMessage);

//     // Start polling
//     intervalRef.current = setInterval(() => {
//       window.parent.postMessage({ type: 'GET_CART' }, '*');
//     }, interval);

//     return () => {
//       if (intervalRef.current !== null) {
//         clearInterval(intervalRef.current);
//       }
//       window.removeEventListener('message', handleMessage);
//     };
//   }, [interval, parentOrigin]);
// };

// export default useCartPolling;



import { useProductContext } from '@/hooks/useProduct';
import { useEffect, useRef } from 'react';

const useCartPolling = (interval = 3000) => {
  const { setItemCount } = useProductContext();
  const parentOrigin = `${process.env.NEXT_PUBLIC_SHOPIFY_URL}`;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const initPolling = () => {
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== parentOrigin) return;
        const { type, payload } = event.data || {};

        if (type === 'CART_INFO') {
          console.log('[Next.js Polling] Cart item count:', payload.itemCount);
          setItemCount(payload.itemCount);
        }

        if (type === 'CART_ERROR') {
          console.error('[Next.js Polling] Cart fetch error:', payload?.error);
        }
      };

      window.addEventListener('message', handleMessage);

      intervalRef.current = setInterval(() => {
        window.parent.postMessage({ type: 'GET_CART' }, '*');
      }, interval);

      // Cleanup
      return () => {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
        }
        window.removeEventListener('message', handleMessage);
      };
    };

    // Wait for full page load
    if (document.readyState === 'complete') {
      return initPolling();
    } else {
      const onLoad = () => {
        initPolling();
        window.removeEventListener('load', onLoad);
      };
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
    }
  }, [interval, parentOrigin, setItemCount]);
};

export default useCartPolling;
