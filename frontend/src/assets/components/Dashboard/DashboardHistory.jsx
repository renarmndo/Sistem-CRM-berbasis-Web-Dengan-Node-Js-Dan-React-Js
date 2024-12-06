import { User } from "lucide-react";

const DashboardHistory = () => {
  return (
    <div className="w-full mt-8">
      <div>
        <h2 className="text-2xl font-semibold font-second text-center">
          History <span className="text-blue-500">Input Costumer</span>
        </h2>
        <div className="w-full border pb-4 mt-4">
          <h1 className="w-full bg-blue-400 py-4 font-second text-white pl-3">
            List History
          </h1>
          <div className="w-full p-4">
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="flex gap-2 items-center">
                <label htmlFor="">Cari..</label>
                <input
                  type="date"
                  className="w-full px-2 py-1 focus:outline-none border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex gap-2 items-center">
                <label htmlFor="">To</label>
                <input
                  type="date"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>
              <div className="flex gap-2 items-center">
                <select
                  name=""
                  id=""
                  className="w-full px-2 py-1 placeholder:Choose Input focus:outline-none"
                >
                  <option value="">Choose Status</option>
                  <option value="">Reject</option>s
                  <option value="">Pending</option>
                  <option value="">Success</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button className="border border-green-400 px-3 py-1 text-green-600 rounded-sm text-sm">
                  Search
                </button>
                <button className="border border-green-400 px-3 py-1 text-green-600 rounded-sm text-sm">
                  Download
                </button>
              </div>
            </div>
            <div className="w-full border-b border-blue-400 mt-4"></div>
            {/* <div className="grid grid-cols-6 gap-4 mt-4">
              <div className="w-42 h-32 bg-green-500 opacity-80 rounded-md p-4 relative">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h1 className="text-white font-bold text-xl mb-2">0</h1>
                      <h1 className="text-white font-semibold text-md mb-2">
                        Actived
                      </h1>
                    </div>
                    <div className="absolute">
                      <User className="text-gray-600 opacity-70 w-24 h-24" />
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="grid grid-cols-5 gap-4 mb-6 mt-6">
              {[
                { label: "Activated", count: 0, color: "green" },
                { label: "Need Call Back", count: 0, color: "blue" },
                { label: "Wait for Activator", count: 0, color: "yellow" },
                { label: "Wait for QC", count: 0, color: "red" },
                { label: "Total", count: 0, color: "purple" },
              ].map((card, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-md shadow-md text-white bg-${card.color}-500 flex flex-col items-center`}
                >
                  <span className="text-3xl font-bold">{card.count}</span>
                  <span className="mt-2 text-center">{card.label}</span>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="bg-white p-5 rounded-md shadow-md">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    {[
                      "Msisdn",
                      "Nama",
                      "MF Package",
                      "CLS",
                      "Migration Bonus",
                      "Users",
                      "Date",
                      "Status",
                      "Action",
                    ].map((header, index) => (
                      <th
                        key={index}
                        className="border border-gray-300 px-4 py-2 text-left text-gray-600"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="9" className="text-center text-gray-500 py-4">
                      No data available in table
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Pagination */}
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Showing 0 to 0 of 0 entries
                </span>
                <div className="flex gap-2">
                  <button className="bg-gray-300 px-3 py-1 rounded-md text-gray-600">
                    Previous
                  </button>
                  <button className="bg-gray-300 px-3 py-1 rounded-md text-gray-600">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHistory;
