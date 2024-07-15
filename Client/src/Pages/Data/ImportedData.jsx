import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchChpEntries } from "../../actions/chpAction.js";
import "../../Css/Data.css";

const ImportedData = React.memo(() => {
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.chp.entries);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    dispatch(fetchChpEntries());
  }, [dispatch]);

  const handlePrint = () => {
    window.print();
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  if (!entries) {
    return <div>Loading...</div>;
  }

  const importedCoalEntries = entries["Imported Coal"];

  if (!importedCoalEntries || importedCoalEntries.length === 0) {
    return <div>No imported coal entries available.</div>;
  }

  let filteredEntries = [...importedCoalEntries];

  if (fromDate && toDate) {
    filteredEntries = filteredEntries.filter(entry => {
      const receiptDate = new Date(entry.receiptDate);
      return receiptDate >= new Date(fromDate) && receiptDate <= new Date(toDate);
    });
  }

  filteredEntries.sort((a, b) => {
    const dateA = new Date(a.receiptDate);
    const dateB = new Date(b.receiptDate);
    return dateA - dateB;
  });

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <div>
      <button className="print-button" onClick={handlePrint}>Print</button>
      <h2>Imported Coal Entries</h2>
      <div className="search-filters" style={{ display: 'flex', marginBottom: '2rem', justifyContent: 'center', gap: '2rem', border:'2px solid black' }}>
        <div>
          <label>From:</label>
          <input type="date" value={fromDate} onChange={handleFromDateChange} /></div>
        <div><label>To:</label>
          <input type="date" value={toDate} onChange={handleToDateChange} /></div>
      </div>
      <div className="container-table-raw">
        <table>
          <thead>
            <tr>
              <th>Coal Mode</th>
              <th>Coal Type</th>
              <th>Coal Component</th>
              <th>RR NO.</th>
              <th>RR Date</th>
              <th>Receipt Data</th>
              <th>Boxes</th>
              <th>Rake No</th>
              <th>RR Wt</th>
              <th>Tps Wt</th>
              <th>Wt Avg</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map(entry => (
              <tr key={entry._id}>
                <td>{entry.coalMode}</td>
                <td>{entry.coalType}</td>
                <td>{entry.coalComponent}</td>
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
  )
});

ImportedData.displayName = 'ImportedData';

export default ImportedData;
