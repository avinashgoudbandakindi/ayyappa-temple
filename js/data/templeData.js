/**
 * Temple Institutional Data
 * Sree Ayyappa Bhaktha Samithi — Sree Ayyappa Swamy Temple
 * Somajiguda, Hyderabad
 */

export const TEMPLE_DATA = {
    id: 'somajiguda-ayyappa',
    name: {
        en: 'Sree Ayyappa Swamy Temple',
        te: 'శ్రీ అయ్యప్ప స్వామి దేవాలయం',
        hi: 'श्री अय्यप्पा स्वामी मंदिर'
    },
    samithiName: {
        en: 'Sree Ayyappa Bhaktha Samithi',
        te: 'శ్రీ అయ్యప్ప భక్త సమితి',
        hi: 'श्री अय्यप्पा भक्त समिति'
    },
    address: {
        line1: 'Raj Bhavan Road',
        landmark: 'Near Matrika Hospital',
        colony: 'B.S. Maqta, Kundanbagh Colony',
        area: 'Somajiguda',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500082',
        formatted: 'Raj Bhavan Road, near Matrika Hospital, B.S. Maqta, Kundanbagh Colony, Somajiguda, Hyderabad, Telangana 500082',
        coordinates: {
            latitude: 17.4283,
            longitude: 78.4603
        },
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=17.4283,78.4603'
    },
    // Non-negotiable: Unconfirmed fields stored as null, UI provides graceful fallback
    contact: {
        phone: null, // TODO: confirm with temple committee
        altPhone: null, // TODO: confirm with temple committee
        email: null, // TODO: confirm with temple committee
        whatsappNumber: null, // TODO: confirm with temple committee
        officeHours: {
            en: 'Morning: 06:00 AM – 11:30 AM | Evening: 05:00 PM – 08:30 PM',
            te: 'ఉదయం: 06:00 – 11:30 | సాయంత్రం: 05:00 – 08:30',
            hi: 'प्रातः 06:00 – 11:30 | सायं 05:00 – 08:30'
        }
    },
    socialLinks: {
        youtube: null, // TODO: confirm with temple
        facebook: null, // TODO: confirm with temple
        instagram: null // TODO: confirm with temple
    },
    taxExemption80G: {
        registered: true,
        registrationNumber: null, // TODO: confirm with temple
        disclaimer: {
            en: 'Donations to Sree Ayyappa Bhaktha Samithi qualify for tax exemption under Section 80G of the Income Tax Act. Official receipt will be issued by the temple office.',
            te: 'శ్రీ అయ్యప్ప భక్త సమితికి ఇచ్చే విరాళాలు ఆదాయపు పన్ను చట్టం సెక్షన్ 80G కింద పన్ను మినహాయింపుకు అర్హమైనవి.',
            hi: 'श्री अय्यप्पा भक्त समिति को दिए जाने वाले दान पर आयकर अधिनियम की धारा 80G के अंतर्गत कर छूट प्राप्त है।'
        }
    }
};
