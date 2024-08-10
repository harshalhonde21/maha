import "../Css/Loader.css"

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div><br /><br />
      <div className="loading-name">Please wait while data is been fetching...</div>
    </div>
  );
};

export default Loader;
