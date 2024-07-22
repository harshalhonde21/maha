import React, { useState } from "react";
import axios from "axios";
import "../Css/ChpEntry.css";
import toast from "react-hot-toast";

const ChpEntry = React.memo(() => {
  const [formData, setFormData] = useState({
    coalMode: "",
    coalType: "",
    coalComponent: "",
    selectDeclared: "",
    selectWasheryOperator: "",
    selectMine: "",
    rrNo: "",
    rrDate: "",
    receiptDate: "",
    noBox: "",
    rakeNo: "",
    rrWt: "",
    tpsWt: "",
    wtAvg: "",
  });

  const [mineOptions, setMineOptions] = useState([]);

  const firstOptions = ["Raw Coal", "Washed Coal", "Imported Coal", "Other"];
  const declaredGrade = ["G1(7001-7300)", "G2(6701-7000)", "G3(6401-6700)", "G4(6100-6400)", "G5(5801-6100)", "G6(5501-5800)", "G7(5201-5500)", "G8(4901-5200)", "G9(4601-4900)", "G10(4301-4600)", "G11(4001-4300)", "G12(3701-4000)", "G13(3401-3700)", "G14(3101-3400)", "G15(2801-3100)", "G16(2501-2800)", "G17(2201-2500)"];

  const secondOptions = {
    "Raw Coal": ["WCL", "MCL", "SECL", "SCCL", "OTHER"],
    "Washed Coal": ["MCL", "WCL", "SECL", "OTHER"],
    "Imported Coal": ["Option I", "Option II", "Option III"],
    Other: ["other"],
  };

  const mineMapping = {
    MCL: ["PGBB", "PAHD", "LPG", "OTHER"],
    WCL: ["GOCM", "TAE", "PVIT", "RAJR", "WANI", "PRPI", "MKCW", "OTHER"],
    SECL: ["GPCK", "DSGR", "PMCJ", "HSLH", "PHEC", "OTHER"],
    OTHER: ["other"],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFirstChange = (event) => {
    const value = event.target.value;
    setFormData({ ...formData, coalType: value, selectMine: "" });
    setMineOptions([]);
  };

  const handleSecondChange = (event) => {
    const value = event.target.value;
    setFormData({ ...formData, coalComponent: value });
    setMineOptions(mineMapping[value.toUpperCase()] || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      await axios.post(
        "https://mahagenco.onrender.com/api/v2/chp/chp-entry",
        formData, 
        config
      );
      toast.success("Chp Entry is Done");
      setFormData({
        coalMode: "",
        coalType: "",
        coalComponent: "",
        selectDeclared: "",
        selectWasheryOperator: "",
        selectMine: "",
        rrNo: "",
        rrDate: "",
        receiptDate: "",
        noBox: "",
        rakeNo: "",
        rrWt: "",
        tpsWt: "",
        wtAvg: "",
      });
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || "Server Error";
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("No response received from the server");
      } else {
        toast.error("Error submitting form data:", error.message);
      }
    }
  };

  return (
    <main className="chp-component">
      <h1 className="heading-chp">WTP ENTRY SECTION</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="form-column">
            <label htmlFor="selectMode">Select Mode:</label>
            <select
              id="coalMode"
              name="coalMode"
              value={formData.coalMode}
              onChange={handleInputChange}
            >
              <option value="">Please select</option>
              <option value="Road">Road</option>
              <option value="Rail">Rail</option>
              <option value="Conveyor">Conveyor</option>
            </select>
          </div>

          <div className="form-column">
            <label htmlFor="coalType">Select Coal Type:</label>
            <select
              id="coalType"
              name="coalType"
              value={formData.coalType}
              onChange={handleFirstChange}
            >
              <option value="">Please select</option>
              {firstOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {formData.coalType && (
            <div className="form-column">
              <label htmlFor="coalComponent">Select Coal Company</label>
              <select
                id="coalComponent"
                name="coalComponent"
                value={formData.coalComponent}
                onChange={handleSecondChange}
              >
                <option value="">Please select</option>
                {secondOptions[formData.coalType].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          {["Raw Coal", "Other"].includes(formData.coalType) && (
            <div className="form-column">
              <label htmlFor="selectDeclared">Select Declared Grade:</label>
              <select
                id="selectDeclared"
                name="selectDeclared"
                value={formData.selectDeclared}
                onChange={handleInputChange}
              >
                <option value="">Please select</option>
                {declaredGrade.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          {["Washed Coal", "Other"].includes(formData.coalType) && (
            <div className="form-column">
              <label htmlFor="selectWasheryOperator">
                Select Washery Operator:
              </label>
              <input
                type="text"
                id="selectWasheryOperator"
                name="selectWasheryOperator"
                value={formData.selectWasheryOperator}
                onChange={handleInputChange}
              />
            </div>
          )}

          {formData.coalType === "Washed Coal" && (
            <div className="form-column">
              <label htmlFor="selectMine">Select Mine/Siding:</label>
              <select
                id="selectMine"
                name="selectMine"
                value={formData.selectMine}
                onChange={handleInputChange}
              >
                <option value="">Please select</option>
                {mineOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          {["Raw Coal"].includes(formData.coalType) && (
            <div className="form-column">
              <label htmlFor="selectMine">Select Mine/Siding:</label>
              <input
                type="text"
                id="selectMine"
                name="selectMine"
                value={formData.selectMine}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className="form-column">
            <label htmlFor="rrNo">RR No:</label>
            <input
              type="text"
              id="rrNo"
              name="rrNo"
              value={formData.rrNo}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-column">
            <label htmlFor="rrDate">RR Date:</label>
            <input
              type="date"
              id="rrDate"
              name="rrDate"
              value={formData.rrDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-column">
            <label htmlFor="receiptDate">Receipt Date:</label>
            <input
              type="date"
              id="receiptDate"
              name="receiptDate"
              value={formData.receiptDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-column">
            <label htmlFor="noBox">No of Box:</label>
            <input
              type="number"
              id="noBox"
              name="noBox"
              value={formData.noBox}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-column">
            <label htmlFor="rakeNo">Rake No:</label>
            <input
              type="text"
              id="rakeNo"
              name="rakeNo"
              value={formData.rakeNo}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-column">
            <label htmlFor="rrWt">RR Wt:</label>
            <input
              type="number"
              id="rrWt"
              name="rrWt"
              value={formData.rrWt}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-column">
            <label htmlFor="tpsWt">TPS Wt:</label>
            <input
              type="number"
              id="tpsWt"
              name="tpsWt"
              value={formData.tpsWt}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-column">
            <label htmlFor="wtAvg">Wt Avg:</label>
            <input
              type="number"
              id="wtAvg"
              name="wtAvg"
              value={formData.wtAvg}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="place-order">
            Submit
          </button>
        </div>
      </form>
    </main>
  );
});

ChpEntry.displayName = "ChpEntry";

export default ChpEntry;
