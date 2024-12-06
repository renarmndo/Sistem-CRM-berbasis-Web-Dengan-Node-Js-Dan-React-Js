import { useState } from "react";

const DashboardLeader = () => {
  const [searchDate, setSearchDate] = useState("20/11/2024");
  const [toDate, setToDate] = useState("20/11/2024");
  const [status, setStatus] = useState("");

  const handleSearch = () => {
    // Implement search functionality
    console.log("Searching:", searchDate, "to", toDate, "with status:", status);
  };
  return (
    <div className="bg-white transparent max-w-6xl min-h-0 text-white p-6 rounded-lg mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6 text-blue-500">List History</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label htmlFor="searchDate" className="block mb-2 text-black">
            Search
          </label>
          <input
            type="date"
            id="searchDate"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="bg-slate-200 border-blue-700 rounded-md py-2 px-3 w-full text-black"
          />
        </div>
        <div>
          <label htmlFor="toDate" className="block mb-2 text-black">
            To
          </label>
          <input
            type="date"
            id="toDate"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="bg-slate-200 border-gray-300 rounded-md py-2 px-3 w-full text-black"
          />
        </div>
        <div>
          <label htmlFor="status" className="block mb-2 text-black">
            Choose Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-slate-200 border-gray-300 rounded-md py-2 px-3 w-full "
          >
            <option value="" className="text-black">
              -- Choose Status --
            </option>
            <option value="Activated">Activated</option>
            <option value="NeedCallBack">Need Call Back</option>
            <option value="WaitforActivator">Wait for Activator</option>
            <option value="WaitforQC">Wait for QC</option>
            <option value="WaitforValidator">Wait for Validator</option>
          </select>
        </div>
      </div>
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        Search
      </button>

      <div className="grid grid-cols-6 gap-4 mt-6">
        <div className="bg-green-500 p-4 rounded-md flex justify-center items-center">
          <span className="text-2xl font-bold">0</span>
          <span className="ml-2">Activied</span>
        </div>
        <div className="bg-blue-500 p-4 rounded-md flex justify-center items-center">
          <span className="text-2xl font-bold">0</span>
          <span className="ml-2">Need Call Back</span>
        </div>
        <div className="bg-yellow-500 p-4 rounded-md flex justify-center items-center">
          <span className="text-2xl font-bold">0</span>
          <span className="ml-2">Wait for Activator</span>
        </div>
        <div className="bg-red-500 p-4 rounded-md flex justify-center items-center">
          <span className="text-2xl font-bold">0</span>
          <span className="ml-2">Wait for QC</span>
        </div>
        <div className="bg-green-500 p-4 rounded-md flex justify-center items-center">
          <span className="text-2xl font-bold">0</span>
          <span className="ml-2">Wait for Validator</span>
        </div>
        <div className="bg-purple-500 p-4 rounded-md flex justify-center items-center">
          <span className="text-2xl font-bold">0</span>
          <span className="ml-2">Total</span>
        </div>
      </div>

      <div className="my-6">
        <label htmlFor="showEntries" className="mr-2">
          Show
        </label>
        <select
          id="showEntries"
          className="bg-gray-100 border-gray-300 rounded-md py-2 px-3"
        >
          <option value="10">10</option>
          {/* Add more options as needed */}
        </select>
        <span className="ml-2">entries</span>
      </div>
      {/* 
      <div className="bg-blue- text-gray-800 rounded-lg p-4">
        <div className="grid grid-cols-8 gap-4 border-b pb-2 font-medium">
          <div className="col-span-1">Misdsn</div>
          <div className="col-span-1">Nama</div>
          <div className="col-span-1">MF Package</div>
          <div className="col-span-1">CLS</div>
          <div className="col-span-1">Migration Bonus</div>
          <div className="col-span-1">Users</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Action</div>
        </div>
        <div className="text-center py-4">No data available in table</div>
      </div> */}
      <div className="flex justify-between mt-4">
        <div>Previous</div>
        <div>Next</div>
      </div>
    </div>
  );
};

export default DashboardLeader;
