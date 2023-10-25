export function formatDate(dateString, includeTime = false) {
    const options = {year: "numeric", month: "long", day: "numeric"};
    if (includeTime) {
        options.hour = "2-digit";
        options.minute = "2-digit";
        options.hourCycle = "h12";
    }
    return new Date(dateString).toLocaleDateString(undefined, options);
}