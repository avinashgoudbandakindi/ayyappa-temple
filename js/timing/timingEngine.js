/**
 * Pure Functional Timing Engine for Sree Ayyappa Swamy Temple
 * Resolves temple open/closed status, active sessions, and rituals strictly in Asia/Kolkata timezone.
 * 
 * Rules:
 * 1. Checks special date overrides first (specialTimings)
 * 2. Falls back to standard weekly schedule
 * 3. Handles split morning and evening sessions
 * 4. Determines next upcoming ritual and opening/closing times
 */

import { TIMINGS_DATA } from '../data/timingsData.js';
import { SPECIAL_TIMINGS_DATA } from '../data/specialTimingsData.js';

const TIMEZONE = 'Asia/Kolkata';

/**
 * Returns current date and time formatted in Asia/Kolkata
 * @param {Date} [referenceDate] Optional reference date for testing
 * @returns {{ dateIso: string, time24: string, hours: number, minutes: number, dayOfWeek: string }}
 */
export function getKolkataTimeComponents(referenceDate = new Date()) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: TIMEZONE,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        weekday: 'long',
        hourCycle: 'h23'
    });

    const parts = formatter.formatToParts(referenceDate);
    const map = {};
    parts.forEach(p => { map[p.type] = p.value; });

    const year = map.year;
    const month = map.month;
    const day = map.day;
    const hour = map.hour.padStart(2, '0');
    const minute = map.minute.padStart(2, '0');
    const weekday = map.weekday.toUpperCase(); // e.g. "SUNDAY"

    return {
        dateIso: `${year}-${month}-${day}`,
        time24: `${hour}:${minute}`,
        hours: parseInt(hour, 10),
        minutes: parseInt(minute, 10),
        dayOfWeek: weekday
    };
}

/**
 * Converts "HH:mm" time string into total minutes from midnight
 * @param {string} timeStr "HH:mm"
 * @returns {number} minutes
 */
export function timeToMinutes(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
}

/**
 * Pure function to resolve temple status for a given point in time
 * @param {Date} [refDate]
 * @returns {Object} Complete TimingEngineResult
 */
export function resolveTempleTiming(refDate = new Date()) {
    const kolkata = getKolkataTimeComponents(refDate);
    const currentMinutes = kolkata.hours * 60 + kolkata.minutes;

    // 1. Check for Special Date Override
    const specialOverride = SPECIAL_TIMINGS_DATA.find(s => s.dateIso === kolkata.dateIso);
    let resolvedFrom = 'weekly';
    let activeDayConfig = null;
    let specialNotice = null;

    if (specialOverride) {
        resolvedFrom = 'special';
        activeDayConfig = specialOverride;
        specialNotice = specialOverride.specialNotice;
    } else {
        // 2. Fall back to standard weekly schedule
        const weekly = TIMINGS_DATA.weeklySchedule.find(s => 
            s.dayOfWeek === 'ALL_DAYS' || (s.days && s.days.includes(kolkata.dayOfWeek))
        );
        activeDayConfig = weekly || TIMINGS_DATA.weeklySchedule[0];
    }

    if (!activeDayConfig.isTempleOpen) {
        return {
            isOpen: false,
            resolvedFrom,
            currentDateInKolkata: kolkata.dateIso,
            currentTimeInKolkata: kolkata.time24,
            specialNotice,
            currentSession: null,
            nextSession: null,
            nextRitual: null
        };
    }

    const sessions = activeDayConfig.sessions || [];
    let isOpen = false;
    let currentSession = null;
    let nextSession = null;
    let nextRitual = null;

    // Check sessions
    for (let i = 0; i < sessions.length; i++) {
        const session = sessions[i];
        const openMin = timeToMinutes(session.openTime24);
        const closeMin = timeToMinutes(session.closeTime24);

        if (currentMinutes >= openMin && currentMinutes < closeMin) {
            isOpen = true;
            currentSession = {
                id: session.id,
                label: session.label,
                opensAt24: session.openTime24,
                closesAt24: session.closeTime24,
                timeRemainingMinutes: closeMin - currentMinutes
            };

            // Find next ritual in current session
            const upcomingRituals = (session.rituals || []).filter(r => timeToMinutes(r.time24) >= currentMinutes);
            if (upcomingRituals.length > 0) {
                nextRitual = upcomingRituals[0];
            }
            break;
        } else if (currentMinutes < openMin) {
            if (!nextSession) {
                nextSession = {
                    id: session.id,
                    label: session.label,
                    opensAt24: session.openTime24,
                    closesAt24: session.closeTime24,
                    isTomorrow: false
                };
                if (session.rituals && session.rituals.length > 0) {
                    nextRitual = session.rituals[0];
                }
            }
        }
    }

    // If temple is closed and no later session today, next session is tomorrow's first session
    if (!isOpen && !nextSession && sessions.length > 0) {
        const firstSession = sessions[0];
        nextSession = {
            id: firstSession.id,
            label: firstSession.label,
            opensAt24: firstSession.openTime24,
            closesAt24: firstSession.closeTime24,
            isTomorrow: true
        };
        if (firstSession.rituals && firstSession.rituals.length > 0) {
            nextRitual = firstSession.rituals[0];
        }
    }

    return {
        isOpen,
        resolvedFrom,
        currentDateInKolkata: kolkata.dateIso,
        currentTimeInKolkata: kolkata.time24,
        specialNotice,
        currentSession,
        nextSession,
        nextRitual
    };
}
