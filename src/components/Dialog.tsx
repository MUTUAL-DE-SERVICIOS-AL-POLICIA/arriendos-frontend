import Swal from "sweetalert2";

export const DialogComponent = () => {
  const dialogDelete = async (title: string, buttonText: string = 'Sí, Eliminar') => {
    return Swal.fire({
      title: '¿Está seguro?',
      text: title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0B815A',
      confirmButtonText: buttonText,
      cancelButtonColor: '#F04438',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        return true;
      } else {
        return false;
      }
    })
  }
  return {
    dialogDelete
  }
}
