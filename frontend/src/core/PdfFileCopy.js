import { jsPDF } from "jspdf";
import "jspdf-autotable";
import companyLogo from "../assets/pdflogo.png";

export default function generatePdf(data, filename, userName, currentDate,selectedMonth) {
  const doc = new jsPDF();
  //console.log(Object.keys(data[0]))
  let newData = [];
  // newData.pop('user_id');
  // newData.pop('claimed');
  for (let i = 0; i < data.length; i++) {
    //console.log(data[i])
    delete data[i].user_id;
    delete data[i].claimed;
    delete data[i].privacy_policy;
    delete data[i].status;
    delete data[i].account_type;
    delete data[i].address;
    delete data[i].id_number;
    delete data[i].pickup_status;
    newData.push(data[i]);
  }

  
  const columns = Object.keys(newData[0]);
  const tableData = newData.map((item) => Object.values(item));

  // Add current date at the top right corner
  const dateFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString(undefined, dateFormatOptions);
  const dateX = doc.internal.pageSize.width - 30; 
  const dateY = 10;

  doc.setFontSize(8);
  doc.text(formattedDate, dateX, dateY);

  // Add title of the report
  let title = filename;
  if (selectedMonth) {
    title += ` for the month of ${selectedMonth.toLocaleDateString('en-US', { month: 'long' })}`;
  }
  const titleX = doc.internal.pageSize.width / 2;
  const titleY = 20;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(title, titleX, titleY, { align: 'center' });

  // Add footer with page numbers
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
  }


   // Add user name at the bottom of the page
   const footerText = `Generated by: ${userName}`;
   const footerHeight = 10;
   const footerX = 10;
   const footerY = doc.internal.pageSize.height - footerHeight;
 
   doc.setFontSize(8);
   doc.text(footerText, footerX, footerY); 
  
  // Add company logo at the top and center it
  const imgWidth = 70; 
  const imgHeight = 50; 
  const imgX = (doc.internal.pageSize.width - imgWidth) / 2;
  doc.addImage(companyLogo, 'PNG', imgX, 14, imgWidth, imgHeight);


  let startY = 50; 
  //doc.text(filename, 14, startY);
  startY += 10;
  doc.autoTable({
    startY,
    head: [columns],
    body: tableData,
  });
  doc.save(`${filename}.pdf`);
}
