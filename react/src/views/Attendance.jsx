import React, { useEffect, useState } from "react";
import { useStateContext } from "./../context/ContextProvider";

const Attendance = () => {
  const { employees, setEmployees, filterString } = useStateContext();
  const [filteredEmp, setFilteredEmp] = useState([]);

  const getEmployees = () => {
    // setLoading(true);
    fetch("/employees.json")
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data.employees);
        return data.employees;
      })
      .then((emps) => setFilteredEmp(emps))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getEmployees();
  }, []);

  useEffect(() => {
    if (filterString !== "") {
      setFilteredEmp(
        employees.filter((employee) =>
          employee.name.toLowerCase().includes(filterString.toLowerCase())
        )
      );
    } else {
      setFilteredEmp(employees);
    }
  }, [filterString]);

  return (
    <>
      <div className="artboard horizontal artboard-demo mr-6">
        <div className="overflow-x-auto w-full">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>EMPLOYEE</th>
                <th>TEAM</th>
                <th>DATE</th>
                <th>CLOCK-IN</th>
                <th>CLOCK-OUT</th>
                <th>WORK TIME</th>
                <th>PRODUCTIVE TIME</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmp.length > 0 &&
                filteredEmp.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={`images/inday-${employee.id}.png`}
                              alt={employee.name}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{employee.name}</div>
                          <div className="text-sm opacity-50">
                            <span className="badge badge-ghost badge-sm">
                              {employee.position}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{employee.team}</td>
                    <td>{employee.date}</td>
                    <td>{employee.clockin}</td>
                    <td>{employee.clockout}</td>
                    <td>{employee.worktime} h</td>
                    <td className="text-success font-bold">
                      {employee.productive} h
                    </td>
                    <td>
                      <button className="btn btn-outline btn-xs">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 384 512"
                        >
                          <path d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z" />
                        </svg>{" "}
                        details
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
            {/* foot */}
            {/* <tfoot></tfoot> */}
          </table>
        </div>
      </div>
      <nav
        className="flex items-center justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-400 ">
          Showing <span className="font-semibold text-black ">1-10</span> of{" "}
          <span className="font-semibold text-black ">{employees.length}</span>
        </span>
        <ul className="inline-flex -space-x-px text-sm h-8">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Attendance;
