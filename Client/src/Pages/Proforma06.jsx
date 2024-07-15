import React, { useEffect, useState, useCallback } from "react";

const Proforma06 = React.memo(() => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://maha-lrki.onrender.com/api/v3/unloadingEnd/get-proforma"
        );
        const result = await response.json();
        if (result.success) {
          const rawData = result.data.find((item) => item.coalMode === "Road");
          setData(rawData ? rawData.coalTypes : []);
        }
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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
          <table>
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
                <td colSpan="8">RAW COAL</td>
                <td colSpan="6">IIA UNLOADING END ANALYSIS RESULT</td>
              </tr>
              {data.map((coalType, index) => (
                coalType.coalType === "Raw Coal" ? coalType.components.map(renderComponentSection) : null
              ))}
              <tr>
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
                <td colSpan="5">WASHED COAL (WCL RAIL + ROAD)</td>
                <td>87 RAKES & 5813 TRUCKS</td>
                <td>552843.87</td>
                <td>554232.85</td>
                <td>15.73</td>
                <td>6.18</td>
                <td>38.14</td>
                <td>3975</td>
                <td>G12</td>
                <td>3569</td>
              </tr>
              <tr>
                <td colSpan="5">WASHED COAL BY RAIL MODE(MCL+SECL+WCL)</td>
                <td>161</td>
                <td>635420.01</td>
                <td>631781.58</td>
                <td>14.79</td>
                <td>6.10</td>
                <td>39.27</td>
                <td>3932</td>
                <td>G12</td>
                <td>3568</td>
              </tr>
              <tr>
                <td colSpan="5">WASHED COAL BY RAIL+ROAD MODE(MCL+SECL+WCL)</td>
                <td>161 RAKES & 5813 TRUCKS</td>
                <td>845843.84</td>
                <td>843503.70</td>
                <td>15.29</td>
                <td>6.15</td>
                <td>38.46</td>
                <td>3984</td>
                <td>G12</td>
                <td>3596</td>
              </tr>
              <tr>
                <td colSpan="5">RAW+WASHED COAL (RAIL + ROAD)</td>
                <td>161 RAKES & 5813 TRUCKS</td>
                <td>845843.84</td>
                <td>843503.70</td>
                <td>15.29</td>
                <td>6.15</td>
                <td>38.46</td>
                <td>3984</td>
                <td>G12</td>
                <td>3596</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
});

Proforma06.displayName = "Proforma 06";

export default Proforma06;
