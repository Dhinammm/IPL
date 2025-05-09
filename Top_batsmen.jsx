import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function Top_batsmen() {
  const [top_batsmen, setTopBatsmen] = useState([]);
  const [id, setId] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/?id=${id}`);

        setTopBatsmen(response.data.top_batsmen);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);
  const batsmanHeaders = [
    "POS",
    "PLAYER",
    "RUNS",
    "MAT",
    "INNS",
    "NOT OUTS",
    "HIGHEST SCORE",
    "AVERAGE",
    "BEST FIGURES",
    "STRIKE RATE",
    "100s",
    "50s",
    "4s",
    "6s",
  ];
  return (
    <div className="min-h-screen bg-white-100 py-10 px-4 font-serif text">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 text-xl">
        <h1 className="text-3xl font-extrabold text-center text-green-700 mb-6">
          Top batsmen
        </h1>

        <table className="min-w-full border text-xs md:text-sm mb-4">
          <thead className="bg-blue-200">
            <tr>
              {batsmanHeaders.map((header, index) => (
                <th key={index} className="p-2 border text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {top_batsmen.map((batsmen, i) => (
              <tr key={i} className="hover:bg-blue-100">
                {batsmen.map((value, j) => (
                  <td key={j} className="p-2 border">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Top_batsmen;
