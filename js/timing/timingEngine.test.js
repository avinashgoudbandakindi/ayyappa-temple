/**
 * Unit Test Suite for Timing Engine
 */

import { resolveTempleTiming, timeToMinutes, getKolkataTimeComponents } from './timingEngine.js';

console.log('--- RUNNING TIMING ENGINE UNIT TESTS ---');

let passed = 0;
let failed = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`[PASS] ${message}`);
        passed++;
    } else {
        console.error(`[FAIL] ${message}`);
        failed++;
    }
}

// Test 1: Morning Darshan Active (08:00 AM IST)
// 08:00 AM IST = 02:30 AM UTC
const morningDate = new Date('2026-10-28T02:30:00Z');
const resMorning = resolveTempleTiming(morningDate);
assert(resMorning.isOpen === true, '08:00 AM IST: Temple must be OPEN');
assert(resMorning.currentSession?.id === 'morning-darshan', '08:00 AM IST: Current session must be morning-darshan');
assert(resMorning.resolvedFrom === 'weekly', 'Standard day must resolve from weekly schedule');

// Test 2: Midday Gap / Closed Period (02:00 PM IST = 14:00 IST)
// 14:00 IST = 08:30 AM UTC
const middayDate = new Date('2026-10-28T08:30:00Z');
const resMidday = resolveTempleTiming(middayDate);
assert(resMidday.isOpen === false, '02:00 PM IST: Temple must be CLOSED');
assert(resMidday.nextSession?.id === 'evening-darshan', '02:00 PM IST: Next session must be evening-darshan');
assert(resMidday.nextSession?.isTomorrow === false, '02:00 PM IST: Next session is today');

// Test 3: Evening Darshan Active (06:30 PM IST = 18:30 IST)
// 18:30 IST = 13:00 UTC
const eveningDate = new Date('2026-10-28T13:00:00Z');
const resEvening = resolveTempleTiming(eveningDate);
assert(resEvening.isOpen === true, '06:30 PM IST: Temple must be OPEN');
assert(resEvening.currentSession?.id === 'evening-darshan', '06:30 PM IST: Current session must be evening-darshan');

// Test 4: Late Night Closed (11:00 PM IST = 23:00 IST)
// 23:00 IST = 17:30 UTC
const nightDate = new Date('2026-10-28T17:30:00Z');
const resNight = resolveTempleTiming(nightDate);
assert(resNight.isOpen === false, '11:00 PM IST: Temple must be CLOSED');
assert(resNight.nextSession?.isTomorrow === true, '11:00 PM IST: Next session must be tomorrow morning');

// Test 5: Special Override Day (Makara Sankramam on 2027-01-14 at 04:45 AM IST = 2027-01-13T23:15:00Z)
const specialDate = new Date('2027-01-13T23:15:00Z');
const resSpecial = resolveTempleTiming(specialDate);
assert(resSpecial.resolvedFrom === 'special', 'Special date must resolveFrom: special');
assert(resSpecial.isOpen === true, 'Special date 04:45 AM: Temple must be OPEN');
assert(resSpecial.specialNotice !== null, 'Special notice must be present on override day');

console.log(`\nTEST SUMMARY: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
