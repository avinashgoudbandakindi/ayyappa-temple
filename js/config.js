/**
 * Global Configuration for Sree Ayyappa Swamy Temple Portal
 * Somajiguda, Hyderabad
 */

export const CONFIG = {
    // Backend-Ready Switch: 'local' (static JSON/JS) or 'api' (future REST API)
    DATA_SOURCE: 'local',
    API_BASE_URL: 'https://api.somajigudaayyappa.org/v1',
    
    // Internationalization
    DEFAULT_LOCALE: 'en',
    SUPPORTED_LOCALES: ['en', 'te', 'hi'],
    
    // Strict Temple Timezone (all timings resolve in Asia/Kolkata, never client timezone)
    TIMEZONE: 'Asia/Kolkata',

    // Fixed Institutional Data (Non-negotiable)
    TEMPLE: {
        NAME: 'Sree Ayyappa Swamy Temple',
        SAMITHI: 'Sree Ayyappa Bhaktha Samithi',
        ADDRESS: 'Raj Bhavan Road, near Matrika Hospital, B.S. Maqta, Kundanbagh Colony, Somajiguda, Hyderabad, Telangana 500082',
        LANDMARK: 'Near Matrika Hospital, Raj Bhavan Road',
        COORDINATES: {
            latitude: 17.4283,
            longitude: 78.4603
        },
        GOOGLE_MAPS_DIRECTIONS: 'https://www.google.com/maps/dir/?api=1&destination=17.4283,78.4603'
    }
};
