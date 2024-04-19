

import printJS from "print-js";

export const printDocument = (res: any) => {
   const contentType = res.headers['content-type']
   if(contentType != 'application/pdf') {
      return
   }
   const blob = new Blob([res.data], {
      type: "application/pdf"
   })
   const pdfURL = window.URL.createObjectURL(blob)
   printJS(pdfURL)
}