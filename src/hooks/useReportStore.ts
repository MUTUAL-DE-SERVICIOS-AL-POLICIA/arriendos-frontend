import { coffeApi } from '@/services';

const printExcelFile = (fileUrl:any) => {
  const newWindow = window.open(fileUrl, '_blank')

  if(newWindow)
  newWindow.onload = () => {
    newWindow.print()
    newWindow.close()
  }
}

export const useReportStore = () => {
  const getReportXlsx = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/leases/report', body, {
        responseType: 'arraybuffer'
      });

      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      printExcelFile(url)
    } catch(error: any) {
      console.log("Error al descargar el archivo: ", error)
    }
  };

  return {
    getReportXlsx,
  }
}