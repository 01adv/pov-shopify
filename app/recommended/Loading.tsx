import React from 'react'

const ProductCardSkeleton = () => (
    <div className="group relative flex flex-col animate-pulse">
        <div className="relative aspect-[5/7.2] w-full bg-slate-300 rounded" />
        <div className="py-4 space-y-2">
            <div className="h-3 w-3/4 bg-slate-300 rounded" />
            <div className="flex gap-2 items-center">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-3 w-3 rounded-full bg-slate-300" />
                ))}
                <div className="h-3 w-6 bg-slate-300 rounded ml-1" />
            </div>
            <div className="h-6 w-1/2 bg-slate-300 rounded" />
            <div className="mt-auto flex flex-col md:flex-row items-baseline gap-2 lg:gap-3">
                <div className="h-4 w-16 bg-slate-300 rounded" />
                <div className="h-5 w-20 bg-slate-300 rounded" />
            </div>
        </div>
    </div>
);

export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => (
    <div className="grid gap-1 md:gap-2 grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: count }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
        ))}
    </div>
);
