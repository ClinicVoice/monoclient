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

export const convertTo24HourFormat = (time12h: string) => {
    const [time, modifier] = time12h.split(' ');
    // eslint-disable-next-line prefer-const
    let [hours, minutes] = time.split(':');

    if (modifier === 'PM' && hours !== '12') {
        hours = String(parseInt(hours, 10) + 12);
    } else if (modifier === 'AM' && hours === '12') {
        hours = '00';
    }

    return `${hours.padStart(2, '0')}:${minutes}`;
};
