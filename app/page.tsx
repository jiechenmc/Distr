// @ts-nocheck
"use client";
import { Bar } from "react-chartjs-2";
import { use } from "react";
import DataTable from "./components/DataTable";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  PointElement,
  LineElement,
  LineController,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  PointElement,
  LineElement,
  LineController
);

const fetchTerms = async () => {
  return await (await fetch("https://gradus.jiechen.dev/api/meta/")).json();
};

const Home = () => {
  const data = use(fetchTerms());

  const supportedTerms = data.map((e: string) => {
    return (
      <tr key={e}>
        <td>{e}</td>
      </tr>
    );
  });

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Sample (CSE214)",
      },
      colors: {
        forceOverride: true,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += `${(Math.round(context.parsed.y * 100) / 100).toFixed(
                2
              )}%`;
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Percentage of Students",
          font: {
            size: 16,
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Grades",
          font: {
            size: 16,
          },
        },
      },
    },
  };

  const chartData = {
    labels: ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F"],
    datasets: [
      {
        label: "Ahmad Esmaili",
        data: [
          16.51376146788991, 10.275229357798166, 10.458715596330276,
          11.559633027522937, 10.642201834862385, 11.009174311926607,
          9.357798165137615, 6.238532110091743, 4.220183486238533,
          4.220183486238533, 5.5045871559633035,
        ],
        borderWidth: 1,
      },
      {
        label: "Ritwik Banerjee",
        data: [
          10.256410256410255, 7.6923076923076925, 10.256410256410255,
          12.82051282051282, 20.51282051282051, 8.974358974358974,
          3.8461538461538463, 7.6923076923076925, 3.8461538461538463,
          3.8461538461538463, 10.256410256410255,
        ],
        borderWidth: 1,
      },
      {
        label: "Byungkon Kang",
        data: [
          7.4074074074074066, 11.11111111111111, 11.11111111111111,
          11.11111111111111, 7.4074074074074066, 7.4074074074074066,
          14.814814814814813, 7.4074074074074066, 11.11111111111111,
          3.7037037037037033, 7.4074074074074066,
        ],
        borderWidth: 1,
      },
      {
        label: "Pramod Ganapathi",
        data: [
          16.3265306122449, 15.306122448979592, 12.244897959183673,
          11.224489795918368, 11.224489795918368, 9.183673469387756,
          4.081632653061225, 6.122448979591836, 1.0204081632653061,
          3.061224489795918, 10.204081632653061,
        ],
        borderWidth: 1,
      },
      {
        label: "YoungMin Kwon",
        data: [
          8, 12, 10.666666666666668, 13.333333333333334, 10.666666666666668,
          6.666666666666667, 8, 13.333333333333334, 4, 2.666666666666667,
          10.666666666666668,
        ],
        borderWidth: 1,
      },
      {
        label: "Praveen Tripathi",
        data: [
          15.65217391304348, 13.043478260869565, 18.26086956521739,
          6.956521739130435, 7.82608695652174, 6.086956521739131,
          3.4782608695652173, 4.3478260869565215, 5.217391304347826,
          6.956521739130435, 12.173913043478262,
        ],
        borderWidth: 1,
      },

      {
        type: "line",
        label: "Average",
        data: [
          9.607087031517674, 9.85883658554466, 10.423325926431517,
          9.240994800001012, 9.606245223222448, 6.386510506593322,
          5.703477030599184, 6.483887249932799, 4.199177404146348,
          3.372378407575095, 8.451413167769275,
        ],
        fill: false,
      },
    ],
  };

  const handleKeyDown = (k: KeyboardEvent) => {
    if (k.key == "Enter" && document.getElementById("search").value) {
      handleClick();
    }
  };

  const handleClick = () => {
    const queryBy = document.getElementById("queryBySelect").value;

    if (document.getElementById("search").value && queryBy) {
      window.location.href = `/chart/${queryBy}/${
        document.getElementById("search").value
      }`;
    }
  };

  const calcSemesters = () => {
    const currentDate = new Date();

    const before2015 = 2;
    const yearsElapsed = currentDate.getFullYear() - 2015;
    const after2015 = yearsElapsed * 4;

    // 1 - Fall
    // 2 - Winter
    // 6 - Spring
    // 9 - Summer

    const month = currentDate.getMonth() + 1;

    if (month >= 9) {
      return before2015 + after2015 + 4;
    } else if (month >= 6) {
      return before2015 + after2015 + 3;
    } else if (month >= 2) {
      return before2015 + after2015 + 2;
    } else if (month >= 1) {
      return before2015 + after2015 + 1;
    }
  };

  const totalSemester = calcSemesters();

  const completeness = Math.round(
    (supportedTerms.length / totalSemester) * 100
  );

  // TODO Add professor view to show trend in grades given

  return (
    <div>
      <div className="flex gap-2 mx-4 mt-4">
        <div className="flex w-full items-center">
          <div id="open-tip-modal">
            <label htmlFor="my-modal-4" className="btn">
              Open Tips
            </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
              <label className="modal-box relative" htmlFor="">
                <h3 className="text-lg font-bold">Welcome to Distr</h3>
                <ol className="grid gap-2">
                  <li>
                    All courses are available provided that they are on
                    ClassieEval!
                  </li>
                  <li>
                    Click on a key in the legend to hide them from the chart!
                  </li>
                  <li>
                    Multiple classes can be separated by semicolons:
                    CSE214;CSE215;CSE216
                  </li>
                </ol>
              </label>
            </label>
          </div>

          <div
            id="drop-down-query"
            className="ml-4 border-b-2 border-emerald-200 h-full items-center grid justify-center"
          >
            <select name="queryBy" id="queryBySelect">
              <option value="course">Course(s)</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>

          <input
            id="search"
            type="text"
            placeholder="Search... (course code can't have spaces (CSE214 is accepted but not CSE 214))"
            onKeyUp={handleKeyDown}
            className="input input-bordered input-accent w-full mx-4"
          ></input>
        </div>
        <kbd className="kbd mr-4 hover:bg-gray-400" onClick={handleClick}>
          Enter
        </kbd>
      </div>
      <Bar options={options} data={chartData} />
      <DataTable completeness={completeness} supportedTerms={supportedTerms} />
    </div>
  );
};

export default Home;
