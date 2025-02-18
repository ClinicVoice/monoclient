import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

/**
 * Extracts and formats appointment start times from available slots.
 * @param availableTimes Array of time slots (each slot is [start, end])
 * @returns Array of formatted start times (e.g., ["8:00 AM", "8:30 AM"])
 */
export const extractStartTimes = (availableTimes: string[][]): string[] => {
    return availableTimes.map((slot) => {
        const startTimeUtc = toZonedTime(parseISO(slot[0]), 'America/Toronto');
        return format(startTimeUtc, 'h:mm a');
    });
};
