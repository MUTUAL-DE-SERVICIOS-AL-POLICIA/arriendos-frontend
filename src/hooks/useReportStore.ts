import { coffeApi } from '@/services';
import Swal from 'sweetalert2';


export const useReportStore = () => {
  const getReportXlsx = async (body: { start_date: string; end_date: string; state: number }) => {
    try {
      const { data } = await coffeApi.post('/leases/report', {
        start_date: body.start_date,
        end_date: body.end_date,
        state: body.state
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
    } catch(error) {
      Swal.fire('Error', 'No se pudo descargar el reporte', 'error')
    }
  };

  const getDocumentsByRental = async () => {
    try {
      const { data } = await coffeApi.get('/records/available_by_rental/');
      return data;
    } catch(error) {
      Swal.fire('Error', 'No se pudo cargar los documentos', 'error')
      return { rentals: [] };
    }
  };

  return {
    getReportXlsx,
    getDocumentsByRental,
  }
}
