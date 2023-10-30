
export const formatDate = (isoDate: string): Date => {
  const date = new Date(isoDate);
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  return utcDate;
};
export const getDateJSON = (date: Date | null) => {
  if (!date) return null;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const fechaEnFormatoJSON = `${year}-${(month < 10 ? '0' : '') + month}-${(day < 10 ? '0' : '') + day}T${(hours < 10 ? '0' : '') + hours}:${(minutes < 10 ? '0' : '') + minutes}:${(seconds < 10 ? '0' : '') + seconds}.000Z`;
  return fechaEnFormatoJSON
}
export const virifyDate = (dayEvaluation: Date) => {
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0);
  return dayEvaluation > currentDate;
}