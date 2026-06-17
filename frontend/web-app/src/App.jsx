import { useEffect, useState } from "react";

function App() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchRequests = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/requests"
      );

      const data = await response.json();

      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();

    const interval = setInterval(() => {
      fetchRequests();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getHost = (url) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  const filteredRequests = requests.filter((req) =>
    req.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">

      <header className="header">
        <h1>VAPT Traffic Monitor</h1>
      </header>

      <div className="toolbar">
        <input
          type="text"
          placeholder="Search URLs..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />
      </div>

      <div className="main-content">

        <div className="traffic-panel">

          <h3>
            Requests ({filteredRequests.length})
          </h3>

          {filteredRequests.map((req, index) => (

            <div
              key={index}
              className="request-row"
              onClick={() =>
                setSelectedRequest(req)
              }
            >

              <span
                className={`method method-${req.method.toLowerCase()}`}
              >
                {req.method}
              </span>

              <span className="host">
                {getHost(req.url)}
              </span>

            </div>

          ))}

        </div>

        <div className="details-panel">

          {selectedRequest ? (

            <>

              <h3>
                Request Details
              </h3>

              <div className="detail-box">

                <strong>Method</strong>

                <p>
                  {selectedRequest.method}
                </p>

              </div>

              <div className="detail-box">

                <strong>URL</strong>

                <p>
                  {selectedRequest.url}
                </p>

              </div>

            </>

          ) : (

            <>
              <h3>
                Request Details
              </h3>

              <p>
                Select a request from the left panel.
              </p>
            </>

          )}

        </div>

      </div>

    </div>
  );
}

export default App;