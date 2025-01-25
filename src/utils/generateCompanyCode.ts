export function generateCompanyCode(companyName: string): string {
    const now = new Date();
    const companyPrefix = companyName.slice(0, 3).toUpperCase();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const date = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    return `${companyPrefix}-${year}${month}${date}${hours}${minutes}`;
}