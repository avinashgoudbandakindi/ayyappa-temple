/**
 * Mock Booking Service Adapter
 * In this phase, collects booking requests without payment processing.
 * Clearly informs the devotee: "Booking request received (demo)".
 */

import { TEMPLE_DATA } from '../data/templeData.js';

export class MockBookingAdapter {
    /**
     * Submit a seva booking request
     * @param {Object} draft SevaBookingDraft
     * @returns {Promise<Object>} SevaBookingSubmissionResult
     */
    static async submitRequest(draft) {
        // Simulate network latency (250ms)
        await new Promise(resolve => setTimeout(resolve, 250));

        // Validation
        if (!draft.devoteeName || !draft.phone || !draft.preferredDateIso || !draft.sevaId) {
            throw new Error('Please fill in all required fields: Name, Phone, Date, and Seva.');
        }

        // Generate demo reference
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        const referenceId = `SAB-${new Date().getFullYear()}-${randomDigits}`;

        // Build fallback WhatsApp link if temple supplies number; otherwise null
        let whatsappInquiryLink = null;
        if (TEMPLE_DATA.contact.whatsappNumber) {
            const encodedText = encodeURIComponent(
                `Swamiye Saranam Ayyappa! I have submitted a booking request (${referenceId}) for ${draft.sevaName} on ${draft.preferredDateIso} for ${draft.devoteeName}.`
            );
            whatsappInquiryLink = `https://wa.me/${TEMPLE_DATA.contact.whatsappNumber}?text=${encodedText}`;
        }

        return {
            success: true,
            referenceId,
            status: 'DEMO_RECEIVED',
            isDemo: true,
            submittedAt: new Date().toISOString(),
            details: {
                ...draft
            },
            message: {
                en: `Booking request received (Demo Mode). Your reference is ${referenceId}. In the live system, the temple office will verify and send your booking confirmation.`,
                te: `సేవ బుకింగ్ విజ్ఞప్తి అందింది (నమూనా మోడ్). మీ రిఫరెన్స్ సంఖ్య: ${referenceId}. ఆలయ కార్యాలయం పరిశీలించి ధృవీకరిస్తుంది.`,
                hi: `सेवा बुकिंग अनुरोध प्राप्त हुआ (प्रारूप मोड)। आपकी संदर्भ संख्या: ${referenceId} है। मंदिर कार्यालय द्वारा सत्यापन पश्चात पुष्टि की जाएगी।`
            },
            whatsappInquiryLink
        };
    }
}
