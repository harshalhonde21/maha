import { useState, useEffect, useRef } from "react";
import "../../Css/SeeUnloadingEnd.css";
import Loader from "../../Components/Loader"

const SeeUnloadingEnd = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [rrNo, setRrNo] = useState("");
  const [coalType, setCoalType] = useState("");
  const printRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mahagenco.onrender.com/api/v3/unloadingEnd/get-unloadingEndTps"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setEntries(data.data.entries);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filteredData = entries;

    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      filteredData = filteredData.filter((entry) => {
        const rrDate = new Date(entry.chpEntry.rrDate);
        return rrDate >= from && rrDate <= to;
      });
    }

    if (rrNo) {
      filteredData = filteredData.filter((entry) =>
        entry.chpEntry.rrNo.toLowerCase().includes(rrNo.toLowerCase())
      );
    }

    if (coalType) {
      filteredData = filteredData.filter((entry) =>
        entry.chpEntry.coalType.toLowerCase().includes(coalType.toLowerCase())
      );
    }

    setFilteredEntries(filteredData);
  }, [entries, fromDate, toDate, rrNo, coalType]);

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // if (!filteredEntries || filteredEntries.length === 0) {
  //   return <div>No data available</div>;
  // }

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
            padding: 1px;
            text-align: center;
            fontsize:0.2rem;
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

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <div>
      <h2>Unloading End Data</h2>
      <div
        style={{
          display: "flex",
          marginBottom: "2rem",
          justifyContent: "space-between",
        }}
        className="search-filterss"
      >
        <div>
          <label>
            From Date:
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            To Date:
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            RR No:
            <input
              type="text"
              value={rrNo}
              onChange={(e) => setRrNo(e.target.value)}
              placeholder="Search by RR No"
            />
          </label>
        </div>
        <div>
          <label>
            Coal Type:
            <input
              type="text"
              value={coalType}
              onChange={(e) => setCoalType(e.target.value)}
              placeholder="Search by Coal Type"
            />
          </label>
        </div>
      </div>

      <button className="print-button" onClick={handlePrint}>
        Print
      </button>
      <div className="container-table-raw" ref={printRef}>
        <table>
          <thead>
            <tr>
              <th>Coal Type</th>
              <th>RR No</th>
              <th>RR Date</th>
              <th>Fines</th>
              <th>tM</th>
              <th>ADBm</th>
              <th>ADBash</th>
              <th>ADBvm</th>
              <th>ADBgcv</th>
              <th>EQ_M</th>
              <th>ADBCALGcv</th>
              <th>ADBFC</th>
              <th>ARBASH</th>
              <th>ARBCALGcv</th>
              <th>ARBFC</th>
              <th>ARBGCV</th>
              <th>ARBVM</th>
              <th>EQASH</th>
              <th>EQFC</th>
              <th>EQGCV</th>
              <th>EQVM</th>
              <th>SM</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.chpEntry.coalType}</td>
                <td>{entry.chpEntry.rrNo}</td>
                <td>{formatDate(entry.chpEntry.rrDate)}</td>
                <td>{entry.fines}</td>
                <td>{entry.tM}</td>
                <td>{entry.ADBm}</td>
                <td>{entry.ADBash}</td>
                <td>{entry.ADBvm}</td>
                <td>{entry.ADBgcv}</td>
                <td>{entry.EQ_M}</td>
                <td>{entry.ADBCALGcv}</td>
                <td>{entry.ADBFC}</td>
                <td>{entry.ARBASH}</td>
                <td>{entry.ARBCALGcv}</td>
                <td>{entry.ARBFC}</td>
                <td>{entry.ARBGCV}</td>
                <td>{entry.ARBVM}</td>
                <td>{entry.EQASH}</td>
                <td>{entry.EQFC}</td>
                <td>{entry.EQGCV}</td>
                <td>{entry.EQVM}</td>
                <td>{entry.SM}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeeUnloadingEnd;
