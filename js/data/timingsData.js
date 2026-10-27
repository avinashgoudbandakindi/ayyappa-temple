/**
 * Standard Weekly Temple Timings
 * Asia/Kolkata Standard Timezone
 */

export const TIMINGS_DATA = {
    weeklySchedule: [
        {
            dayOfWeek: 'ALL_DAYS', // Applies to Sunday through Saturday
            days: ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
            isTempleOpen: true,
            sessions: [
                {
                    id: 'morning-darshan',
                    label: {
                        en: 'Morning Darshan',
                        te: 'ఉదయ దర్శనం',
                        hi: 'प्रातःकालीन दर्शन'
                    },
                    openTime24: '05:30',
                    closeTime24: '11:30',
                    rituals: [
                        {
                            name: {
                                en: 'Nirmalya Darshan & Ganapathi Homam',
                                te: 'నిర్మాల్య దర్శనం & గణపతి హోమం',
                                hi: 'निर्माल्या दर्शन एवं गणपति होम'
                            },
                            time24: '05:30',
                            significance: {
                                en: 'First auspicious view of the consecrated deities accompanied by sacred conch.',
                                te: 'శంఖనాదంతో ప్రారంభమయ్యే తొలి దర్శనం.',
                                hi: 'शंख ध्वनि के साथ दिन का प्रथम मंगला दर्शन।'
                            }
                        },
                        {
                            name: {
                                en: 'Usha Pooja & Abhishekam',
                                te: 'ఉషఃకాల పూజ & అభిషేకం',
                                hi: 'उषः पूजा एवं अभिषेकम'
                            },
                            time24: '07:30',
                            significance: {
                                en: 'Dawn pooja with Vedic chants and offerings.',
                                te: 'వేద మంత్రోచ్ఛారణలతో అభిషేకం.',
                                hi: 'वैदिक मंत्रों के साथ प्रातःकालीन अभिषेक।'
                            }
                        },
                        {
                            name: {
                                en: 'Ucha Pooja (Noon Ritual)',
                                te: 'ఉచ్ఛ పూజ (మధ్యాహ్న పూజ)',
                                hi: 'उचा पूजा (मध्याह्न महापूजा)'
                            },
                            time24: '11:00',
                            significance: {
                                en: 'Elaborate noon pooja followed by midday sanctum closing at 11:30 AM.',
                                te: 'మధ్యాహ్న మహా నివేదన.',
                                hi: 'दोपहर की महापूजा जिसके पश्चात 11:30 बजे पट बंद होते हैं।'
                            }
                        }
                    ]
                },
                {
                    id: 'evening-darshan',
                    label: {
                        en: 'Evening Darshan',
                        te: 'సాయం దర్శనం',
                        hi: 'सायंकालीन दर्शन'
                    },
                    openTime24: '17:00',
                    closeTime24: '20:30',
                    rituals: [
                        {
                            name: {
                                en: 'Evening Temple Re-opening',
                                te: 'సాయంత్రం ఆలయ ద్వారములు తెరుచుట',
                                hi: 'सायंकाल मंदिर पट उद्घाटन'
                            },
                            time24: '17:00',
                            significance: {
                                en: 'Sanctum reopens with evening temple bells.',
                                te: 'సాయంత్రం దర్శనం ప్రారంభం.',
                                hi: 'सायंकालीन दर्शन का शुभारंभ।'
                            }
                        },
                        {
                            name: {
                                en: 'Sayahna Deeparadhana (Grand Lamp Aarti)',
                                te: 'సాయాహ్న దీపారాధన (మహా హారతి)',
                                hi: 'सायाह्न दीपाराधना (महा आरती)'
                            },
                            time24: '18:30',
                            significance: {
                                en: 'The most sacred evening ritual with multi-tiered camphor flames and traditional drums.',
                                te: 'మంగళ హారతుల వెలుగులలో స్వామివారి దర్శనం.',
                                hi: 'कर्पूर एवं दीपों की अलौकिक ज्योति के मध्य भव्य आरती।'
                            }
                        },
                        {
                            name: {
                                en: 'Pushpabhishekam & Sahasranama Archana',
                                te: 'పుష్పాభిషేకం & సహస్రనామార్చన',
                                hi: 'पुष्पाभिषेक एवं सहस्रनाम अर्चना'
                            },
                            time24: '19:30',
                            significance: {
                                en: 'Floral tribute and chanting of 1,008 divine names.',
                                te: 'సుగంధ పుష్పాలతో అర్చన.',
                                hi: 'भगवान के 1008 नामों का पवित्र उच्चारण।'
                            }
                        },
                        {
                            name: {
                                en: 'Athazha Pooja & Harivarasanam',
                                te: 'అత్తాళ పూజ & హరివరాసనం',
                                hi: 'अत्ताड़ा पूजा एवं हरिवरासनम'
                            },
                            time24: '20:15',
                            significance: {
                                en: 'Sacred lullaby recited to Lord Ayyappa followed by night sanctum closing at 8:30 PM.',
                                te: 'స్వామివారి నిద్రోత్సవ స్తోత్రం హరివరాసనం.',
                                hi: 'भगवान अय्यप्पा की पावन शयन स्तुति हरिवरासनम।'
                            }
                        }
                    ]
                }
            ]
        }
    ]
};
