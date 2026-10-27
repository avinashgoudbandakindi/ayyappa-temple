/**
 * Special Timing Overrides
 * Handled with top priority by the timing engine
 */

export const SPECIAL_TIMINGS_DATA = [
    {
        id: 'special-makara-sankramam-2027',
        dateIso: '2027-01-14',
        reason: {
            en: 'Makara Sankramam & Makaravilakku Mahotsavam',
            te: 'మకర సంక్రమణ & మకరవిళక్కు మహోత్సవం',
            hi: 'मकर संक्रमण एवं मकरविलक्कु महोत्सव'
        },
        isTempleOpen: true,
        specialNotice: {
            en: 'Continuous darshan throughout the day on account of Makara Sankramam. Special Neyyabhishekam commences at 4:30 AM.',
            te: 'మకర సంక్రమణ పర్వదినాన్ని పురస్కరించుకుని రోజంతా నిరంతర దర్శనం. ఉదయం 4:30 గంటలకు ప్రత్యేక నేతి అభిషేకం.',
            hi: 'मकर संक्रमण के पावन अवसर पर दिनभर निरंतर दर्शन। प्रातः 4:30 बजे से विशेष घृत अभिषेक प्रारंभ।'
        },
        sessions: [
            {
                id: 'full-day-darshan',
                label: {
                    en: 'Festival Continuous Darshan',
                    te: 'మహోత్సవ నిరంతర దర్శనం',
                    hi: 'महोत्सव निरंतर दर्शन'
                },
                openTime24: '04:30',
                closeTime24: '22:00',
                rituals: [
                    {
                        name: {
                            en: 'Maha Sankramam Neyyabhishekam',
                            te: 'మహా సంక్రమణ నెయ్యి అభిషేకం',
                            hi: 'महा संक्रमण घृत अभिषेक'
                        },
                        time24: '05:00',
                        significance: null
                    },
                    {
                        name: {
                            en: 'Grand Sayahna Deeparadhana',
                            te: 'సాయాహ్న మహా దీపారాధన',
                            hi: 'सायाह्न महा दीपाराधना'
                        },
                        time24: '18:30',
                        significance: null
                    }
                ]
            }
        ]
    }
];
