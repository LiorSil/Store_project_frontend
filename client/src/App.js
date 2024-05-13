import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const resp = await axios.get("/api");
      setData(resp.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Hello World!</h1>
      <p>{data}</p>
    </div>
  );
};

export default App;
