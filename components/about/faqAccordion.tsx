"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SquareCheck } from "lucide-react"

const faqItems = [
    {
        question: "What is the Shipping Policy?",
        answer:
            "We ship only in the United States. Your order will be carefully packaged and delivered wherever is most convenient for you. Shipping is free on all orders. Delivery takes between 5-10 business days depending on your location. You'll be able to track your package by using the Shipping Confirmation email that we send as soon as your order begins its journey. Please allow 2-3 business days to receive your shipment notification email after placing your order.",
    },
    {
        question: "What shipping providers do you use?",
        answer:
            "We use all major carriers, and local courier partners. Ground shipping for U.S. orders may take up to 5-9 business days to arrive from the day you receive your shipping confirmation.",
    },
    {
        question: "How do I return an item?",
        answer:
            "We want you to be completely satisfied with your purchase. Not the perfect fit? Just request a return online or send a request to hello@pointofviewlabel.com —we’re happy to help! You would need to pay for the return shipment.",
    },
    {
        question: "What is the return policy?",
        answer:
            "A return must be requested 14 days of the received date, after which merchandise must be sent back within 5 days. Merchandise must not be worn, washed, dyed, or altered. Merchandise must be returned in its original packaging. Package should only include items listed in that particular return packing slip. Merchandise that appears to be worn and/or washed and not in its original/sellable condition may result in a delayed refund/exchange or may not qualify for a refund or exchange. In these cases, the item(s) will be returned to you. Certain items are marked as not refundable and are not eligible for returns (i.e. gift cards, gifts with purchase).",
    },
    {
        question: "I am expecting a refund. How long does this take?",
        answer:
            "Please allow 6-12 business days for us to receive your order. Heads up—it may take up to 10 business days for us to process your return. Once your items have undergone (and passed!) inspection, we will issue your refund to the original form of payment and will notify you of your refund via email. After your refund has been issued by us, please allow 2 additional business days for those funds to be posted to your account. Please note that your refund may only be credited to your original method of payment.",
    },
    {
        question: "Where are your products made?",
        answer:
            "We like our fabric quality like we like our sleep quality: premium. We source and manufacture our apparel from India where we find the highest quality fabrics and excellent factories that can produce garments to the standards our customers expect. We partner with world-class manufacturers that are committed to fair and equitable practices. The more we grow, and as our manufacturing quantities increase, this will continue to be a priority for us.",
    },
    {
        question: "What if I want to speak to someone?",
        answer:
            "We want to speak to you too! Contact us with any questions, concerns, or feedback. We will be sure to get back to you within 48 hours. However, please note that inquiries sent on Fridays will receive a reply the following Monday, but possibly sooner.",
    },
]

export default function FaqAccordion() {
    return (
        <div>
            <h2 className="text-4xl mb-8 text-center">Contact Us</h2>
            <Accordion type="single" collapsible className="border-t border-gray-200">
                {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 ">
                        <AccordionTrigger className="flex items-center text-base font-normal hover:no-underline">
                            <div className="flex items-center">
                                <SquareCheck className="h-5 w-5 mr-2 text-gray-500" />
                                <span className="hover:underline hover:underline-offset-2 text-sm">{item.question}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="py-2 px-7 text-gray-600">{item.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
