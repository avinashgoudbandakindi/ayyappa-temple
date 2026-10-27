/**
 * Upcoming Festivals & Sacred Days Data
 * NON-NEGOTIABLE RULE: Festival dates are left null / "Date to be announced" until confirmed by the temple committee.
 */

export const EVENTS_DATA = [
    {
        id: 'event-mandala-pooja',
        slug: 'mandala-pooja-mahotsavam',
        name: {
            en: 'Mandala Pooja Mahotsavam',
            te: 'మండల పూజ మహోత్సవం',
            hi: 'मंडल पूजा महोत्सव'
        },
        shortDescription: {
            en: 'Culmination of the sacred 41-day Mandala Vrutham observed by Lord Ayyappa devotees.',
            te: 'శ్రీ అయ్యప్ప భక్తులు ఆచరించే 41 రోజుల మండల వ్రత సమాప్తి మహోత్సవం.',
            hi: 'भगवान अय्यप्पा के भक्तों द्वारा 41 दिवसीय मंडल व्रत का पावन समापन महोत्सव।'
        },
        fullDescription: {
            en: 'Marking the completion of the 41-day austere Mandala Kalam, special Kalabhabhishekam, Udayasthamana pooja, and mass Annadanam are offered to the Lord.',
            te: 'మండల కాలం ముగింపు సందర్భంగా విశేష కళభాభిషేకం, నిరంతర నామస్మరణ మరియు అన్నదానం జరుగుతాయి.',
            hi: 'मंडल काल की पूर्णता पर विशेष कलभाभिषेक, दिनभर भजन-कीर्तन एवं महाप्रसादम का वितरण होता है।'
        },
        startDateIso: null, // NON-NEGOTIABLE: Unconfirmed dates are null -> renders "Date to be announced"
        endDateIso: null,
        timingsDescription: {
            en: 'Full Day Observance (05:00 AM – 09:30 PM)',
            te: 'రోజంతా విశేష పూజలు (ఉదయం 05:00 నుండి రాత్రి 09:30 వరకు)',
            hi: 'संपूर्ण दिवस (प्रातः 05:00 से रात्रि 09:30)'
        },
        registrationRequired: false,
        displayOrder: 1,
        active: true
    },
    {
        id: 'event-makara-sankramam-jyothi',
        slug: 'makara-sankramam-makara-jyothi',
        name: {
            en: 'Makara Sankramam & Makara Jyothi Observance',
            te: 'మకర సంక్రమణ & మకర జ్యోతి దర్శనం',
            hi: 'मकर संक्रमण एवं मकर ज्योति दर्शन'
        },
        shortDescription: {
            en: 'The most sacred day celebrating Makara Sankranti and the divine manifestation of Makara Jyothi.',
            te: 'మకర సంక్రాంతి మరియు మకర జ్యోతి దివ్య ప్రకాశాన్ని స్మరించే అత్యంత పవిత్ర దినం.',
            hi: 'मकर संक्रांति एवं मकर ज्योति के पावन प्राकट्य का परम पावन महोत्सव।'
        },
        fullDescription: {
            en: 'Devotees gather in vast numbers for early morning Neyyabhishekam, special chanting of Harivarasanam, and evening Deeparadhana honoring Lord Manikanta.',
            te: 'భక్తులు ఉదయం నుంచే నేతి అభిషేకాలు, విశేష హారతులు మరియు సంకీర్తనలతో స్వామిని ఆరాధిస్తారు.',
            hi: 'भक्तजन प्रातःकाल से ही घृत अभिषेक, विशेष आरती एवं भजन-संकीर्तन के साथ प्रभु की आराधना करते हैं।'
        },
        startDateIso: null, // TODO: confirm with temple committee
        endDateIso: null,
        timingsDescription: {
            en: 'Special Extended Hours (04:30 AM – 10:00 PM)',
            te: 'విశేష దర్శన వేళలు (ఉదయం 04:30 నుండి రాత్రి 10:00 వరకు)',
            hi: 'विशेष दर्शन समय (प्रातः 04:30 से रात्रि 10:00)'
        },
        registrationRequired: false,
        displayOrder: 2,
        active: true
    },
    {
        id: 'event-panguni-uthram',
        slug: 'panguni-uthram-mahotsavam',
        name: {
            en: 'Panguni Uthram (Ayyappa Jayanthi)',
            te: 'పంగుని ఉత్తిరం (అయ్యప్ప జయంతి)',
            hi: 'पंगुनी उथिरम (अय्यप्पा जयंती)'
        },
        shortDescription: {
            en: 'The divine incarnate day of Lord Manikanta, celebrated with grand Pushpabhishekam.',
            te: 'స్వామి మణికంఠుని అవతార దినం, పుష్పాభిషేకాలతో వైభవంగా జరుపుకుంటారు.',
            hi: 'भगवान मणिकण्ठ का पावन प्राकट्य दिवस, जो भव्य पुष्पाभिषेक के साथ मनाया जाता है।'
        },
        fullDescription: {
            en: 'Celebrated on the day of Uthram Nakshatram in the month of Panguni (Phalguna). Special Sahasranama Archana and cultural devotional programs are held.',
            te: 'ఫాల్గుణ మాసంలో ఉత్తర నక్షత్రం రోజున సహస్రనామార్చన, ఆధ్యాత్మిక ప్రవచనాలతో వేడుకలు జరుగుతాయి.',
            hi: 'फाल्गुन मास के उत्तर नक्षत्र के दिन विशेष सहस्रनाम अर्चना एवं आध्यात्मिक प्रवचनों का आयोजन होता है।'
        },
        startDateIso: null, // TODO: confirm with temple committee
        endDateIso: null,
        timingsDescription: {
            en: 'Morning: 05:30 AM – 12:00 PM | Evening: 05:00 PM – 09:00 PM',
            te: 'ఉదయం: 05:30 – 12:00 | సాయంత్రం: 05:00 – 09:00',
            hi: 'प्रातः 05:30 – 12:00 | सायं 05:00 – 09:00'
        },
        registrationRequired: false,
        displayOrder: 3,
        active: true
    }
];
