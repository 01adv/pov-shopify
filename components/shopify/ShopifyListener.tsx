'use client';

import { useEffect, useState } from 'react';

export type CustomerInfo = {
    customer: {
        email: string | null;
        id: string | null;
    };
};

interface Props {
    onData?: (data: CustomerInfo) => void;
}

const ShopifyInfoListener = ({ onData }: Props) => {
    const [info, setInfo] = useState<CustomerInfo | null>(null);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            console.log('Message received from origin:', event.origin); // Debug log
            if (event.origin !== 'https://testing-pov.myshopify.com') {
                console.log('Invalid origin, expected https://testing-pov.myshopify.com, got:', event.origin);
                return;
            }

            const { type, payload } = event.data || {};
            console.log('Message data:', { type, payload }); // Debug log
            if (type === 'CUSTOMER_INFO' && payload) {
                console.log('Received CUSTOMER_INFO:', payload);
                setInfo(payload);
                onData?.(payload);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [onData]);

    return (
        <div style={{ padding: '1em', background: '#f9f9f9' }}>
            <h4>Customer Info</h4>
            <pre style={{ fontSize: '0.9em' }}>{JSON.stringify(info, null, 2)}</pre>
        </div>
    );
};

export default ShopifyInfoListener;