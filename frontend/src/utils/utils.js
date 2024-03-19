export const formatDates = (dates) => {
    return dates.map(date => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    });
};