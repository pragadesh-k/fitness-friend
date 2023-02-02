const NoPage = () => {
  return (
    <div>
      <div className="no-page-wrapper">
        <div
          className="d-flex flex-row justify-content-center align-items-center"
          style={{ height: "100vh" }}>
          <div className="no-page-content">
            <h1>Oops!</h1>
            <h1 className="text-center">404</h1>
            <p className="text-muted text-center">Page not found.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoPage;
