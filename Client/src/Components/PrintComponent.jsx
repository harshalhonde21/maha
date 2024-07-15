import { useRef } from "react";

const PrintComponent = ({ content }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const WindowPrint = window.open("", "", "width=900,height=600");
    WindowPrint.document.write("<html><head><title>Print</title>");
    WindowPrint.document.write(`
      <style>
        @media print {
          body * {
            visibility: hidden;
          }
          .print-container, .print-container * {
            visibility: visible;
          }
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
        }
      </style>
    `);
    WindowPrint.document.write("</head><body>");
    WindowPrint.document.write('<div class="print-container">');
    WindowPrint.document.write(printContent);
    WindowPrint.document.write("</div>");
    WindowPrint.document.write("</body></html>");
    WindowPrint.document.close();
    WindowPrint.focus();
    WindowPrint.print();
    WindowPrint.close();
  };

  return (
    <div>
      <button className="print-button" onClick={handlePrint}>
        Print
      </button>
      <div ref={printRef}>{content}</div>
    </div>
  );
};

export default PrintComponent;
