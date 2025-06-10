
import OurStoryPage from '@/components/about/our-story'
import React from 'react'

const page = () => {
    return (
        <div className="flex min-h-screen flex-col relative pb-20">
            <main className="flex-1">
                {/* <div className="mx-auto max-w-3xl px-4 sm:px-12 xl:px-12"> */}
                <div className="mx-auto max-w-6xl px-4 sm:px-12 xl:px-14">

                    <OurStoryPage />
                </div>
            </main>
        </div>


    )
}

export default page