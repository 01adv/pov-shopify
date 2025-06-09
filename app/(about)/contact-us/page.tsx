import ContactForm from '@/components/about/contactForm'
import FaqAccordion from '@/components/about/faqAccordion'
import React from 'react'

const page = () => {
    return (
        <div className="flex min-h-screen flex-col relative pb-20">
            <main className="flex-1">
                <div className="mx-auto max-w-3xl px-4 sm:px-12 xl:px-12">
                    <div className="space-y-5 md:mt-4 ">
                        <ContactForm />
                        <div className="mt-24">
                            <FaqAccordion />
                        </div>
                    </div>

                </div>
            </main>
        </div>


    )
}

export default page