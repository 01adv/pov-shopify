'use client';

import { useEffect, useState } from 'react';

interface ShopifyInfo {
    cartToken?: string;
    trackedSourceId?: string;
}

interface Props {
    onData?: (data: ShopifyInfo) => void;
}

const ShopifyInfoListener = ({ onData }: Props) => {
    const [shopifyInfo, setShopifyInfo] = useState<ShopifyInfo>({});

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const { type, payload } = event.data || {};
            if (type === 'SHOPIFY_INFO' && typeof payload === 'object') {
                const newInfo: ShopifyInfo = {
                    ...shopifyInfo,
                    ...payload,
                };

                setShopifyInfo(newInfo);
                if (onData) onData(newInfo);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [shopifyInfo, onData]);

    return (
        <pre
            style={{
                display: 'block',
                background: '#f6f8fa',
                padding: '1em',
                borderRadius: '4px',
                fontSize: '0.95em',
            }}
        >
            {JSON.stringify(shopifyInfo, null, 2)}
        </pre>
    );
};

export default ShopifyInfoListener;
