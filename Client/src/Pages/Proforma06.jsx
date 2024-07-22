import React, { useEffect, useState, useCallback, useRef } from "react";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import "../Css/Proforma06.css";

const Proforma06 = React.memo(() => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [rawDataOptions, setRawDataOptions] = useState([]);
  const [selectedRawData, setSelectedRawData] = useState(null);
  const [coalTypes, setCoalTypes] = useState([]);
  const [selectedCoalType, setSelectedCoalType] = useState("");

  const tableRef = useRef(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://maha-lrki.onrender.com/api/v3/unloadingEnd/get-proforma"
        );
        const result = await response.json();
        if (result.success) {
          const rawData = result.data.filter((item) => item.coalMode);
          if (rawData.length > 0) {
            setRawDataOptions(rawData);
            setSelectedRawData(rawData[0]);
            setCoalTypes(rawData[0].coalTypes.map((type) => type.coalType));
            setData(rawData[0].coalTypes[0].components); 
            setSelectedCoalType(rawData[0].coalTypes[0].coalType); 
          }
        }
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleRawDataChange = (event) => {
    const selectedRawData = rawDataOptions.find(
      (item) => item.coalMode === event.target.value
    );
    setSelectedRawData(selectedRawData);
    setCoalTypes(selectedRawData.coalTypes.map((type) => type.coalType));
    setSelectedCoalType(selectedRawData.coalTypes[0].coalType);
    setData(selectedRawData.coalTypes[0].components);
  };

  const handleCoalTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedCoalType(selectedType);
    const selectedData = selectedRawData.coalTypes.find(
      (type) => type.coalType === selectedType
    );
    setData(selectedData ? selectedData.components : []);
  };

  const renderEntryRow = useCallback((entry, entryIndex) => (
    <tr key={entryIndex}>
      <td>{entryIndex + 1}</td>
      <td>{entry.sliding}</td>
      <td>-</td>
      <td>-</td>
      <td>{entry.entryCount}</td>
      <td>{entry.totalRrWt}</td>
      <td>{entry.totalTpsWt}</td>
      <td>{entry.tmPercentage}</td>
      <td>{entry.mPercentage}</td>
      <td>{entry.ashPercentage}</td>
      <td>{entry.gcvKcalKg}</td>
      <td>{entry.gcvGrade}</td>
      <td>{entry.arbGcvKcalKg}</td>
    </tr>
  ), []);

  const renderComponentSection = useCallback((component, componentIndex) => {
    const totalEntryCount = component.entries.reduce((sum, entry) => sum + entry.entryCount, 0);
    const totalRrWtCount = component.entries.reduce((sum, entry) => sum + entry.totalRrWt, 0);
    const totalTpsWtCount = component.entries.reduce((sum, entry) => sum + entry.totalTpsWt, 0);
    const totalTmPercentage = component.entries.reduce((sum, entry) => sum + parseFloat(entry.tmPercentage), 0);
    const totalMPercentage = component.entries.reduce((sum, entry) => sum + parseFloat(entry.mPercentage), 0);
    const totalAshPercentage = component.entries.reduce((sum, entry) => sum + parseFloat(entry.ashPercentage), 0);
    const totalGcvKcalKg = component.entries.reduce((sum, entry) => sum + parseFloat(entry.gcvKcalKg), 0);
    const totalArbGcvKcalKg = component.entries.reduce((sum, entry) => sum + parseFloat(entry.arbGcvKcalKg), 0);

    return (
      <React.Fragment key={componentIndex}>
        <tr>
          <td rowSpan={component.entries.length + 1}>{component.coalComponent}</td>
          <td colSpan="13">{component.coalComponent} ({component.coalMode} Mode)</td>
        </tr>
        {component.entries.map(renderEntryRow)}
        <tr style={{ color: 'red' }}>
          <td colSpan="5">WT. AVG({component.coalComponent} {component.coalMode} MODE)</td>
          <td>{totalEntryCount}</td>
          <td>{totalRrWtCount}</td>
          <td>{totalTpsWtCount}</td>
          <td>{totalTmPercentage}</td>
          <td>{totalMPercentage}</td>
          <td>{totalAshPercentage}</td>
          <td>{totalGcvKcalKg}</td>
          <td>G11</td>
          <td>{totalArbGcvKcalKg}</td>
        </tr>
      </React.Fragment>
    );
  }, [renderEntryRow]);

  return (
    <div>
      <h2>Proforma 06</h2>
      <div className="container-table-raw">
        {error ? (
          <p>{error}</p>
        ) : (
          <>
            <div className="filter">
            <div>
              <label htmlFor="rawData">Select Raw Data: </label>
              <select id="rawData" value={selectedRawData?.coalMode} onChange={handleRawDataChange}>
                {rawDataOptions.map((option) => (
                  <option key={option.coalMode} value={option.coalMode}>
                    {option.coalMode}
                  </option>
                ))}
              </select>
              </div>
              <div>
              <label htmlFor="coalType">Select Coal Type: </label>
              <select id="coalType" value={selectedCoalType} onChange={handleCoalTypeChange}>
                {coalTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              </div>
              <div className="button-container">
              <DownloadTableExcel
                filename="Proforma06 Data"
                sheet="Proforma06"
                currentTableRef={tableRef.current}
              >
                <button className="export-button">Export to Excel</button>
              </DownloadTableExcel>
            </div>
            </div>
            
            <div ref={tableRef}>
              <table style={{marginLeft:'14rem'}}>
                <thead>
                  <tr>
                    <th rowSpan="3">MONTH</th>
                    <th rowSpan="3">COAL COMPANY</th>
                    <th rowSpan="3">SR. NO.</th>
                    <th rowSpan="3">NAME OF COLLIERY/SIDING</th>
                    <th rowSpan="3">DECL. GCV GR.</th>
                    <th rowSpan="3">GCV BAND</th>
                    <th rowSpan="3">TOTAL NO OF RAKES</th>
                    <th rowSpan="3">RR QTY (MT)</th>
                    <th rowSpan="3">TPS QTY (MT)</th>
                    <th rowSpan="3">T.M%</th>
                    <th colSpan="4">IIA UNLOADING END ANALYSIS RESULT</th>
                    <th rowSpan="3">ARB Basis GCV (Kcal/kg)</th>
                  </tr>
                  <tr>
                    <th rowSpan="2">M%</th>
                    <th rowSpan="2">ASH%</th>
                    <th rowSpan="2">GCV (Kcal/kg)</th>
                    <th rowSpan="2">GCV GRADE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan="23">Dec-23</td>
                    <td colSpan="8">{selectedCoalType}</td>
                    <td colSpan="6">IIA UNLOADING END ANALYSIS RESULT</td>
                  </tr>
                  {data.map(renderComponentSection)}
                  {/* <tr>
                    <td colSpan="5">WASHED COAL BY ROAD MODE(WCL)</td>
                    <td>5813 TRUCKS</td>
                    <td>210423.83</td>
                    <td>211722.12</td>
                    <td>16.78</td>
                    <td>6.32</td>
                    <td>36.04</td>
                    <td>4141</td>
                    <td>G11</td>
                    <td>3678</td>
                  </tr>
                  <tr>
                    <td colSpan="5">WASHED COAL (WCL)</td>
                    <td>120 RAKES</td>
                    <td>474844.99</td>
                    <td>482984.05</td>
                    <td>14.42</td>
                    <td>5.08</td>
                    <td>34.99</td>
                    <td>4195</td>
                    <td>G11</td>
                    <td>3627</td>
                  </tr>
                  <tr>
                    <td colSpan="5">RAW COAL (WCL)</td>
                    <td>9 RAKES</td>
                    <td>34047.20</td>
                    <td>34632.25</td>
                    <td>11.79</td>
                    <td>8.67</td>
                    <td>36.84</td>
                    <td>3822</td>
                    <td>G12</td>
                    <td>3652</td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

Proforma06.displayName="proforma";

export default Proforma06;
