'use client';

import { useEffect, useState } from 'react';

export type ShopifyInfo = {
    cartToken?: string;
    trackedSourceId?: string;
    customer?: {
        email?: string;
        id?: string;
        first_name?: string;
        last_name?: string;
    };
}

interface Props {
    onData?: (data: ShopifyInfo) => void;
}

const ShopifyInfoListener = ({ onData }: Props) => {
    const [info, setInfo] = useState<ShopifyInfo | null>(null);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Validate origin if needed
            // if (event.origin !== 'https://your-shopify-domain.com') return;

            const { type, payload } = event.data || {};
            if (type === 'SHOPIFY_INFO' && payload) {
                setInfo(payload);
                onData?.(payload);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [onData]);

    return (
        <div style={{ padding: '1em', background: '#f9f9f9' }}>
            <h4>Shopify Session Info</h4>
            <pre style={{ fontSize: '0.9em' }}>{JSON.stringify(info, null, 2)}</pre>
        </div>
    );
};

export default ShopifyInfoListener;
