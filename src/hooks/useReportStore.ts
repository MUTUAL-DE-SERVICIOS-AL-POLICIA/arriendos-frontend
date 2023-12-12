import { coffeApi } from '@/services';


export const useReportStore = () => {
  const getReportXlsx = async (body: any) => {
    try {
      const { data } = await coffeApi.post('/leases/report', {
        start_date: body.get('start_date'),
        end_date: body.get('end_date'),
        state: parseInt(body.get('state'))
      }, {
        responseType: 'arraybuffer',
        headers: {
        },
      });

      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch(error: any) {
      console.log("Error al descargar el archivo: ", error)
    }
  };

  return {
    getReportXlsx,
  }
}