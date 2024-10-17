import React, { useState } from "react";

const MainUserTable = () => {
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [passwordVisible, setPasswordVisible] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const toggleDropdown = (index) => {
    setDropdownVisible((prev) => (prev === index ? null : index));
  };

  const handleCheckboxChange = (index) => {
    setCheckedItems((prev) => {
      const newCheckedItems = new Set(prev);
      if (newCheckedItems.has(index)) {
        newCheckedItems.delete(index);
      } else {
        newCheckedItems.add(index);
      }
      return newCheckedItems;
    });
  };

  const handleAddTask = () => {
    // Logic to add a new task
    console.log("Adding new task:", newTask);
    setIsModalOpen(false);
    setNewTask("");
  };

  const togglePasswordVisibility = (index) => {
    setPasswordVisible((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const mockData = Array.from({ length: 25 }, (_, index) => ({
    email: `user${index + 1}@example.com`,
    phone: `123-456-78${index.toString().padStart(2, "0")}`,
    password: `password${index + 1}`,
    currentStep: ["Login", "Verify", "Withdraw"][index % 3],
    withdrawalStatus: ["Pending", "Completed"][index % 2],
    amountWithdrawn: index % 2 === 0 ? index * 10 : 0,
  }));

  const totalUsers = mockData.length;
  const totalAmountWithdrawn = mockData.reduce(
    (total, user) => total + user.amountWithdrawn,
    0
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full">
      <div className="bg-white p-4 md:p-8 border  rounded-xl">
        <div className="sm:flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-lg font-semibold leading-none text-gray-800">
              Total Users: {totalUsers}
            </p>
            <p className="text-lg font-semibold leading-none text-gray-800 ml-8">
              Total Amount Withdrawn: ${totalAmountWithdrawn}
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
          >
            <p className="text-sm font-medium leading-none text-white">
              Add Task
            </p>
          </button>
        </div>
        <div className="mt-7 overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="h-16 border border-gray-100 rounded">
                <th className="pl-5">Select</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Password</th>
                <th>Current Step</th>
                <th>Withdrawal Status</th>
                <th>Amount Withdrawn</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user, index) => (
                <tr
                  key={index}
                  tabIndex="0"
                  className="focus:outline-none h-16 border border-gray-100 rounded"
                >
                  <td>
                    <div className="ml-5">
                      <div
                        className={`bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative ${
                          checkedItems.has(index) ? "checked" : ""
                        }`}
                      >
                        <input
                          placeholder="checkbox"
                          type="checkbox"
                          checked={checkedItems.has(index)}
                          onChange={() => handleCheckboxChange(index)}
                          className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full"
                        />
                        <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width="20"
                            height="20"
                          >
                            <path d="M173.898 439.404l-166.4-166.4c-12.496-12.497-12.497-32.758 0-45.255l22.627-22.627c12.497-12.497 32.758-12.497 45.255 0L192 312.69l294.627-294.627c12.497-12.497 32.758-12.497 45.255 0l22.627 22.627c12.497 12.497 12.497 32.758 0 45.255L218.857 439.404c-12.497 12.497-32.758 12.497-45.255 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="pl-5">
                    <p className="text-base font-medium leading-none text-gray-700">
                      {user.email}
                    </p>
                  </td>
                  <td className="pl-5">
                    <p className="text-base font-medium leading-none text-gray-700">
                      {user.phone}
                    </p>
                  </td>
                  <td className="pl-5 relative">
                    <div className="flex items-center justify-center">
                      <p
                        className="text-base font-medium leading-none text-gray-700"
                        style={{
                          display: passwordVisible[index] ? "inline" : "none",
                        }}
                      >
                        {user.password}
                      </p>
                      <p
                        className="text-base font-medium leading-none text-gray-700"
                        style={{
                          display: passwordVisible[index] ? "none" : "inline",
                        }}
                      >
                        {"*".repeat(user.password.length)}
                      </p>
                      {!passwordVisible[index] ? (
                        <div
                          className="inline-flex text-IconNormal w-5 h-5 ml-2"
                          onClick={() => togglePasswordVisibility(index)}
                        >
                          <svg
                            fill="iconNormal"
                            className="bn-svg cursor-pointer text-iconNormal"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                              fill="currentColor"
                            ></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.555 6.31L1 12l5.555 5.69a7.572 7.572 0 0010.89 0L23 12l-5.555-5.69a7.572 7.572 0 00-10.89 0zM17 12a5 5 0 11-10 0 5 5 0 0110 0z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      ) : (
                        <div
                          className="inline-flex text-IconNormal w-5 h-5 ml-2"
                          onClick={() => togglePasswordVisibility(index)}
                        >
                          <svg
                            fill="iconNormal"
                            className="bn-svg cursor-pointer text-iconNormal"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M2.94 5.06l16 16 2.12-2.12-2.446-2.447L23 12l-5.555-5.69a7.566 7.566 0 00-9.883-.87L5.06 2.94 2.939 5.06zm6.747 2.506a5 5 0 016.747 6.747L9.687 7.566z"
                              fill="currentColor"
                            ></path>
                            <path
                              d="M1 12l2.29-2.346 10.198 10.198a7.574 7.574 0 01-6.933-2.162L1 12z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="pl-5">
                    <p className="text-base font-medium leading-none text-gray-700">
                      {user.currentStep}
                    </p>
                  </td>
                  <td className="pl-5">
                    <p className="text-base font-medium leading-none text-gray-700">
                      {user.withdrawalStatus}
                    </p>
                  </td>
                  <td className="pl-5">
                    <p className="text-base font-medium leading-none text-gray-700">
                      ${user.amountWithdrawn}
                    </p>
                  </td>
                  <td className="pl-4">
                    <button className="focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:bg-gray-100 inline-flex cursor-pointer items-center justify-center p-2 border border-transparent rounded-full hover:bg-gray-200 focus:outline-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 9L18 9"
                          stroke="#52525B"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M10 13L14 13"
                          stroke="#52525B"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3 5C3 3.34315 4.34315 2 6 2H18C19.6569 2 21 3.34315 21 5V19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V5ZM6 4C5.44772 4 5 4.44772 5 5V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V5C19 4.44772 18.5523 4 18 4H6Z"
                          fill="#52525B"
                        ></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {Array.from(
              { length: Math.ceil(mockData.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`mx-1 px-3 py-1 border ${
                    currentPage === index + 1
                      ? "bg-indigo-500 text-white"
                      : "bg-white text-gray-700"
                  } rounded`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
          <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
            <span className="absolute right-0 top-0 p-4">
              <button onClick={() => setIsModalOpen(false)}>
                <svg
                  className="h-6 w-6 text-gray-900"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
            <h2 className="text-2xl mb-4">Add New Task</h2>
            <input
              type="text"
              className="border p-2 mb-4"
              placeholder="Task Name"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainUserTable;
