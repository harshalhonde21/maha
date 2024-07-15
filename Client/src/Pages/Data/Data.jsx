import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChpEntries } from "../../actions/chpAction.js";
import "../../Css/Data.css";
import Loader from "../../Components/Loader.jsx";

const Data = React.memo(() => {
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.chp.entries);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const printRef = useRef();

  useEffect(() => {
    dispatch(fetchChpEntries());
  }, [dispatch]);

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

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  if (!entries) {
    return <Loader />;
  }

  const rawCoalEntries = entries["Raw Coal"];

  if (!rawCoalEntries || rawCoalEntries.length === 0) {
    return <Loader /> || <div>No raw coal entries available.</div>;
  }

  let filteredEntries = [...rawCoalEntries];

  if (fromDate && toDate) {
    filteredEntries = filteredEntries.filter((entry) => {
      const receiptDate = new Date(entry.receiptDate);
      return (
        receiptDate >= new Date(fromDate) && receiptDate <= new Date(toDate)
      );
    });
  }

  filteredEntries.sort((a, b) => {
    const dateA = new Date(a.receiptDate);
    const dateB = new Date(b.receiptDate);
    return dateA - dateB;
  });

  return (
    <div>
      <button className="print-button" onClick={handlePrint}>
        Print
      </button>

      <h2>Raw Coal Entries</h2>
      <div
        className="search-filters"
        style={{
          display: "flex",
          marginBottom: "2rem",
          justifyContent: "center",
          gap: "2rem",
          border: "2px solid black",
        }}
      >
        <div>
          <label>From:</label>
          <input type="date" value={fromDate} onChange={handleFromDateChange} />
        </div>
        <div>
          <label>To:</label>
          <input type="date" value={toDate} onChange={handleToDateChange} />
        </div>
      </div>
      <div className="container-table-raw" ref={printRef}>
        <table>
          <thead>
            <tr>
              <th>Coal Mode</th>
              <th>Coal Type</th>
              <th>Coal Component</th>
              <th>Declared Grade</th>
              <th>Mine/Sliding</th>
              <th>RR NO.</th>
              <th>RR Date</th>
              <th>Receipt Date</th>
              <th>Boxes</th>
              <th>Rake No</th>
              <th>RR Wt</th>
              <th>Tps Wt</th>
              <th>Wt Avg</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.coalMode}</td>
                <td>{entry.coalType}</td>
                <td>{entry.coalComponent}</td>
                <td>{entry.selectDeclared}</td>
                <td>{entry.selectMine}</td>
                <td>{entry.rrNo}</td>
                <td>{formatDate(entry.rrDate)}</td>
                <td>{formatDate(entry.receiptDate)}</td>
                <td>{entry.noBox}</td>
                <td>{entry.rakeNo}</td>
                <td>{entry.rrWt}</td>
                <td>{entry.tpsWt}</td>
                <td>{entry.wtAvg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

Data.displayName = "Data";

export default Data;
