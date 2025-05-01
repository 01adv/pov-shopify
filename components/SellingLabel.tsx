import React from 'react'

const SellingLabel = ({ label }: { label: string }) => {
    return (
        <div className="absolute top-0 left-0 bg-primary text-white pl-0.5 pr-2 md:pr-4 py-2  md:py-[15px] z-10 text-xs inline-block uppercase tracking-wide" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)' }}>
            {label}
        </div>
    )
}

export default SellingLabel