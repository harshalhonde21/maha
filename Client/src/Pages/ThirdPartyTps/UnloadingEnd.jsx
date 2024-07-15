import React, { useEffect, useState } from "react";
import "../../Css/UnloadingEnd.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchChpPlainEntries } from "../../actions/chpAction";
import { updateUnloadingEnd } from "../../actions/unloadingEndAction";
import Loader from "../../Components/Loader";
import PrintComponent from "../../Components/PrintComponent";

const UnloadingEnd = React.memo(() => {
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.chp.entries);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [formData, setFormData] = useState({
    fines: "",
    tM: "",
    ADBm: "",
    ADBash: "",
    ADBvm: "",
    ADBgcv: "",
    EQ_M: "",
  });
  const [searchRRNo, setSearchRRNo] = useState("");
  const [searchCoalType, setSearchCoalType] = useState("");

  useEffect(() => {
    dispatch(fetchChpPlainEntries());
  }, [dispatch]);

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const handleUpdateButtonClick = (entry) => {
    setSelectedEntry(entry);
    setFormData({
      fines: entry.fines || "",
      tM: entry.tM || "",
      ADBm: entry.ADBm || "",
      ADBash: entry.ADBash || "",
      ADBvm: entry.ADBvm || "",
      ADBgcv: entry.ADBgcv || "",
      EQ_M: entry.EQ_M || "",
    });
    setIsUpdateFormVisible(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      chpEntryId: selectedEntry._id,
    };
    dispatch(updateUnloadingEnd(updatedData));
    setIsUpdateFormVisible(false);
  };

  const handleCloseForm = () => {
    setIsUpdateFormVisible(false);
  };

  if (!Array.isArray(entries)) {
    return <Loader />;
  }

  let filteredEntries = [...entries];

  if (fromDate && toDate) {
    filteredEntries = filteredEntries.filter((entry) => {
      const receiptDate = new Date(entry.receiptDate);
      return (
        receiptDate >= new Date(fromDate) && receiptDate <= new Date(toDate)
      );
    });
  }

  if (searchRRNo) {
    filteredEntries = filteredEntries.filter((entry) =>
      entry.rrNo.toLowerCase().includes(searchRRNo.toLowerCase())
    );
  }

  if (searchCoalType) {
    filteredEntries = filteredEntries.filter((entry) =>
      entry.coalType.toLowerCase().includes(searchCoalType.toLowerCase())
    );
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

  const printContent = (
    <div className="container-table-raw">
      <table>
        <thead>
          <tr>
            <th>Coal Type</th>
            <th>RR NO.</th>
            <th>RR Date</th>
            <th>Receipt Date</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntries.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.coalType}</td>
              <td>{entry.rrNo}</td>
              <td>{formatDate(entry.rrDate)}</td>
              <td>{formatDate(entry.receiptDate)}</td>
              <td>
                <button
                  style={{
                    border: "1px solid grey",
                    padding: "2px",
                    borderRadius: "5px",
                  }}
                  onClick={() => handleUpdateButtonClick(entry)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <h2>Unloading End Tps</h2>
      <div
        className="search-filters"
        style={{
          display: "flex",
          marginBottom: "2rem",
          justifyContent: "space-between",
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
        <div>
          <label>RR No.:</label>
          <input
            type="text"
            value={searchRRNo}
            onChange={(e) => setSearchRRNo(e.target.value)}
            placeholder="Search by RR No."
          />
        </div>
        <div>
          <label>Coal Type:</label>
          <input
            type="text"
            value={searchCoalType}
            onChange={(e) => setSearchCoalType(e.target.value)}
            placeholder="Search by Coal Type"
          />
        </div>
      </div>

      <PrintComponent content={printContent} />

      {isUpdateFormVisible && (
        <div className="update-form">
          <h3>Update Entry</h3>
          <form className="form-main" onSubmit={handleFormSubmit}>
            <div>
              <label>Fines:</label>
              <input
                type="text"
                name="fines"
                value={formData.fines}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label>tM:</label>
              <input
                type="text"
                name="tM"
                value={formData.tM}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label>ADBm:</label>
              <input
                type="text"
                name="ADBm"
                value={formData.ADBm}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label>ADBaash:</label>
              <input
                type="text"
                name="ADBash"
                value={formData.ADBash}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label>ADBvm:</label>
              <input
                type="text"
                name="ADBvm"
                value={formData.ADBvm}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label>ADBgcv:</label>
              <input
                type="text"
                name="ADBgcv"
                value={formData.ADBgcv}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label>EQ_M:</label>
              <input
                type="text"
                name="EQ_M"
                value={formData.EQ_M}
                onChange={handleFormChange}
              />
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={handleCloseForm}>
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
});

UnloadingEnd.displayName = "Unloading End TPS";

export default UnloadingEnd;
