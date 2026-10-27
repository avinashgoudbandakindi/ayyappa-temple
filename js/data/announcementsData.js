/**
 * Temple Announcements & Notice Board Data
 * Includes time-bounding (startsAt / endsAt)
 */

export const ANNOUNCEMENTS_DATA = [
    {
        id: 'announcement-1',
        title: {
            en: 'Mandala Vrutham Deeksha Registration & Maladharanam Guidance',
            te: 'మండల దీక్షా మాలాధారణ రిజిస్ట్రేషన్ & మార్గదర్శకాలు',
            hi: 'मंडल व्रत दीक्षा मालाधारण पंजीकरण एवं नियम'
        },
        content: {
            en: 'Devotees intending to take Ayyappa Deeksha are requested to visit the temple office to register. Consecrated malas and Irumudi items are available at the temple premises.',
            te: 'అయ్యప్ప దీక్ష చేపట్టదలిచిన భక్తులు ఆలయ కార్యాలయాన్ని సంప్రదించగలరు. పవిత్ర మాలలు మరియు పూజా సామాగ్రి ఆలయ ప్రాంగణంలో లభించును.',
            hi: 'अय्यप्पा दीक्षा धारण करने के इच्छुक भक्तजन कृपया मंदिर कार्यालय में संपर्क करें। सिद्ध मालाएं एवं पूजन सामग्री मंदिर परिसर में उपलब्ध हैं।'
        },
        urgency: 'IMPORTANT',
        published: true,
        startsAtIso: '2026-10-01T00:00:00Z',
        endsAtIso: '2027-02-01T23:59:59Z',
        actionUrl: '#contact',
        actionText: {
            en: 'Inquire at Temple Office',
            te: 'ఆలయ కార్యాలయంలో సంప్రదించండి',
            hi: 'मंदिर कार्यालय में संपर्क करें'
        }
    },
    {
        id: 'announcement-2',
        title: {
            en: 'Nitya Annadanam Seva Sponsorship Open',
            te: 'నిత్య అన్నదాన సేవ విరాళాల స్వీకరణ',
            hi: 'नित्य अन्नदान सेवा सहयोग'
        },
        content: {
            en: 'Devotees can sponsor daily hot satvik meals for visiting pilgrims on auspicious family occasions such as birthdays and wedding anniversaries.',
            te: 'పుట్టినరోజులు, వివాహ వార్షికోత్సవాల సందర్భంగా భక్తులు నిత్య అన్నదాన సేవకు విరాళాలు సమర్పించవచ్చు.',
            hi: 'जन्मदिवस एवं वैवाहिक वर्षगांठ के उपलक्ष्य में भक्तजन तीर्थयात्रियों हेतु दैनिक सात्विक अन्नदान सेवा प्रायोजित कर सकते हैं।'
        },
        urgency: 'INFO',
        published: true,
        startsAtIso: '2026-10-01T00:00:00Z',
        endsAtIso: '2027-12-31T23:59:59Z',
        actionUrl: '#sevas',
        actionText: {
            en: 'View Seva Details',
            te: 'సేవా వివరాలు చూడండి',
            hi: 'सेवा विवरण देखें'
        }
    }
];
