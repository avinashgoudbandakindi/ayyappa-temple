/**
 * Sevas & Sacred Offerings Data
 * NOTE: The sample sevas below are demo content, flagged for temple verification.
 */

export const SEVAS_DATA = [
    {
        id: 'seva-saravabhishekam',
        slug: 'saravabhishekam',
        name: {
            en: 'Saravabhishekam',
            te: 'సర్వాభిషేకం',
            hi: 'सर्वाभिषेकम'
        },
        description: {
            en: 'Comprehensive sacred abhishekam to Sree Ayyappa Swamy with panchamrutham, pure milk, sandalwood paste, tender coconut water, and fragrant sacred waters.',
            te: 'పంచామృతాలు, ఆవుపాలు, గంధం, కొబ్బరి నీళ్ళు మరియు పుణ్యతీర్థాలతో శ్రీ అయ్యప్ప స్వామికి జరిగే సంపూర్ణ దివ్యాభిషేకం.',
            hi: 'पंचामृत, शुद्ध दुग्ध, चंदन, शीतल नारियल जल एवं पवित्र तीर्थ जल से संपन्न होने वाला भगवान अय्यप्पा का दिव्य महाभिषेक।'
        },
        deityId: 'ayyappa-swamy',
        priceInInr: 501,
        isDemoContent: true, // NON-NEGOTIABLE: Flagged for temple verification
        requiresConfirmation: true,
        durationMinutes: 45,
        availableDays: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        seasonal: false,
        bookingEnabled: true,
        prasadamDetails: {
            en: 'Vibhuti, Chandanam, Panchamrutham, and energized sacred thread.',
            te: 'విభూతి, చందనం, పంచామృతం మరియు పవిత్ర రక్షాసూత్రం.',
            hi: 'विभूति, चंदन, पंचामृत एवं सिद्ध रक्षासूत्र।'
        },
        displayOrder: 1,
        active: true
    },
    {
        id: 'seva-maha-ganapathy-homam',
        slug: 'maha-ganapathy-homam',
        name: {
            en: 'Maha Ganapathy Homam',
            te: 'మహా గణపతి హోమం',
            hi: 'महा गणपति होमम'
        },
        description: {
            en: 'Early morning Vedic fire ritual invoked to eliminate obstacles, protect the household, and bestow health, prosperity, and peace of mind.',
            te: 'సమస్త విఘ్నాలు తొలగిపోయి, కుటుంబంలో శాంతి, ఆయురారోగ్యాలు కలగడానికి ఉదయం నిర్వహించే పవిత్ర వేద హోమ క్రతువు.',
            hi: 'प्रातःकाल संपन्न होने वाला पावन वैदिक होम जो सर्वविघ्नों का शमन कर जीवन में सुख, शांति एवं समृद्धि का संचार करता है।'
        },
        deityId: 'maha-ganapathi',
        priceInInr: 301,
        isDemoContent: true, // Flagged for temple verification
        requiresConfirmation: true,
        durationMinutes: 60,
        availableDays: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        seasonal: false,
        bookingEnabled: true,
        prasadamDetails: {
            en: 'Homam Bhasma (sacred ash) and sanctified dry coconut prasadam.',
            te: 'హోమ భస్మం మరియు ప్రసాదం.',
            hi: 'होम भस्म एवं सिद्ध नारियल प्रसादम।'
        },
        displayOrder: 2,
        active: true
    },
    {
        id: 'seva-laksharchana',
        slug: 'laksharchana',
        name: {
            en: 'Laksharchana',
            te: 'లక్షార్చన',
            hi: 'लक्षार्चना'
        },
        description: {
            en: 'Mass chanting of the sacred names of the deity one lakh times by learned Vedic archakas, generating immense spiritual energy and collective blessings.',
            te: 'వేద పండితులచే ఏకకాలంలో స్వామివారి నామాలను లక్షసార్లు జపించే అత్యంత పుణ్యప్రదమైన మహా అర్చన.',
            hi: 'विद्वान वेदपाठियों द्वारा भगवान के पावन नामों का एक लाख बार सामूहिक उच्चारण, जो परम पुण्य एवं शांति प्रदान करता है।'
        },
        deityId: 'ayyappa-swamy',
        priceInInr: 101,
        isDemoContent: true, // Flagged for temple verification
        requiresConfirmation: true,
        durationMinutes: 90,
        availableDays: ['SUN', 'SAT'],
        seasonal: false,
        bookingEnabled: true,
        prasadamDetails: {
            en: 'Archana Kumkum, Akshata, and blessed dry fruit prasad.',
            te: 'కుంకుమ, అక్షతలు మరియు డ్రై ఫ్రూట్ ప్రసాదం.',
            hi: 'अर्चना कुमकुम, अक्षत एवं मेवे का प्रसाद।'
        },
        displayOrder: 3,
        active: true
    },
    {
        id: 'seva-pushpaabhishekam',
        slug: 'pushpaabhishekam',
        name: {
            en: 'Pushpaabhishekam',
            te: 'పుష్పాభిషేకం',
            hi: 'पुष्पाभिषेकम'
        },
        description: {
            en: 'Bathing the divine idol in a shower of variety fresh fragrant flowers including jasmine, marigold, rose petals, lotus, and sacred bilva leaves.',
            te: 'మల్లెలు, గులాబీలు, తామరలు, బంతి మరియు మారేడు దళాలతో స్వామివారికి నిర్వహించే రమణీయ పుష్పార్చన.',
            hi: 'कमल, गुलाब, चमेली, गेंदा एवं बेलपत्र आदि विविध सुगंधित पुष्पों से भगवान का भव्य पुष्पाभिषेक।'
        },
        deityId: 'ayyappa-swamy',
        priceInInr: 101,
        isDemoContent: true, // Flagged for temple verification
        requiresConfirmation: true,
        durationMinutes: 30,
        availableDays: ['SUN', 'WED', 'FRI', 'SAT'],
        seasonal: false,
        bookingEnabled: true,
        prasadamDetails: {
            en: 'Blessed flowers and Chandanam.',
            te: 'పూజించిన పుష్పాలు మరియు చందనం.',
            hi: 'अभिमंत्रित पुष्प एवं चंदन।'
        },
        displayOrder: 4,
        active: true
    },
    {
        id: 'seva-makara-sankramam-ney-abhishekam',
        slug: 'makara-sankramam-ney-abhishekam',
        name: {
            en: 'Makara Sankramam Ney Abhishekam',
            te: 'మకర సంక్రమణ నెయ్యి అభిషేకం',
            hi: 'मकर संक्रमण घृत अभिषेकम'
        },
        description: {
            en: 'The auspicious offering of pure cow ghee on the sacred day of Makara Sankranti / Sankramam, symbolizing the burning away of worldly karmas.',
            te: 'మకర సంక్రాంతి పుణ్యదినాన స్వామివారికి సమర్పించే అత్యంత పవిత్రమైన గోఘృత (నెయ్యి) అభిషేకం.',
            hi: 'मकर संक्रांति के पावन पर्व पर भगवान अय्यप्पा को शुद्ध गोघृत (घी) का विशेष अभिषेक, जो जन्म-जन्मांतर के कर्म दोषों को शांत करता है।'
        },
        deityId: 'ayyappa-swamy',
        priceInInr: 251,
        isDemoContent: true, // Flagged for temple verification
        requiresConfirmation: true,
        durationMinutes: 45,
        availableDays: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        seasonal: true,
        seasonalPeriod: {
            en: 'Mandalam & Makara Sankramam Season',
            te: 'మండల దీక్ష & మకర సంక్రమణ కాలం',
            hi: 'मंडल एवं मकर संक्रांति काल'
        },
        bookingEnabled: true,
        prasadamDetails: {
            en: 'Ghee prasadam and energized holy sacred ash (Bhasma).',
            te: 'అభిషేకించిన నెయ్యి ప్రసాదం మరియు భస్మం.',
            hi: 'अभिषेकम घृत प्रसादम एवं पवित्र भस्म।'
        },
        displayOrder: 5,
        active: true
    },
    {
        id: 'seva-maladaranam-two-mala',
        slug: 'maladaranam-two-mala',
        name: {
            en: 'Maladaranam + 2 Mala',
            te: 'మాలాధారణ + 2 మాలలు',
            hi: 'मालाधारण + 2 माला'
        },
        description: {
            en: 'Initiation of the sacred 41-day Ayyappa Deeksha by the temple priest (Guruswamy), including 2 consecrated Tulsi/Rudraksha malas and special sankalpa.',
            te: 'గురుస్వామి చేతుల మీదుగా 41 రోజుల మండల దీక్షా స్వీకరణ, సంకల్ప పూజ మరియు 2 పవిత్ర తులసి/రుద్రాక్ష మాలలు.',
            hi: 'गुरुस्वामी के पावन करकमलों द्वारा 41 दिवसीय अय्यप्पा दीक्षा का विधिपूर्वक शुभारंभ, संकल्प पूजा एवं 2 सिद्ध तुलसी/रुद्राक्ष मालाएं।'
        },
        deityId: 'ayyappa-swamy',
        priceInInr: 4200,
        isDemoContent: true, // Flagged for temple verification
        requiresConfirmation: true,
        durationMinutes: 60,
        availableDays: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        seasonal: true,
        seasonalPeriod: {
            en: 'Mandala Season (November to January)',
            te: 'మండల కాలం (నవంబర్ నుండి జనవరి వరకు)',
            hi: 'मंडल काल (नवंबर से जनवरी)'
        },
        bookingEnabled: true,
        prasadamDetails: {
            en: 'Two consecrated malas, Irumudi cloth, sacred thulasi, and Guruswamy blessing.',
            te: 'రెండు దీక్షా మాలలు, ఇరుముడి వస్త్రం, తులసి మరియు గురుస్వామి ఆశీస్సులు.',
            hi: 'दो सिद्ध मालाएं, इरुमुडी वस्त्र, तुलसी एवं गुरुस्वामी का आशीर्वाद।'
        },
        displayOrder: 6,
        active: true
    }
];
