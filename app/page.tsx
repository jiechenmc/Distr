// @ts-nocheck
"use client";
import { use } from "react";
import DataTable from "./components/DataTable";

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
      <DataTable completeness={completeness} supportedTerms={supportedTerms} />
    </div>
  );
};

export default Home;
