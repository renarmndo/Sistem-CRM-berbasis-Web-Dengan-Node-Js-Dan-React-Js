import React, { useEffect, useState } from "react";
import axios from "axios";
import { Download, Loader2 } from "lucide-react";
import * as XLSX from "xlsx";

const DashboardReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customers, setCostumers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/agent/all-costumer"
      );
      setCostumers(response.data.data);
    } catch (error) {
      console.log("Gagal Mendapatkan Data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  // const handleExport = async () => {
  //   try {
  //     // Ambil header dengan format rapi
  //     const headers = Object.keys(customers[0] || {}).map((header) =>
  //       header
  //         .split("_")
  //         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //         .join(" ")
  //     );

  //     // Convert selected customers to CSV
  //     //
  //     // const csvRows = [
  //     //   headers.join(","), // Tambahkan header sebagai baris pertama
  //     //   ...selectedCustomers.map((customer) =>
  //     //     Object.values(customer)
  //     //       .map((value) => {
  //     //         // Tangani nilai kosong atau null
  //     //         const formattedValue =
  //     //           value === null || value === undefined ? "N/A" : String(value);

  //     //         // Escape koma dan tanda kutip dalam nilai
  //     //         return `"${formattedValue.replace(/"/g, '""')}"`;
  //     //       })
  //     //       .join(",")
  //     //   ),
  //     // ];

  //     const csvRows = [
  //       headers.join(","), // Tambahkan header sebagai baris pertama
  //       ...selectedCustomers.map((customer) =>
  //         Object.values(customer)
  //           .map((value) => {
  //             // Tangani nilai kosong atau null
  //             const formattedValue =
  //               value === null || value === undefined ? "N/A" : String(value);

  //             // Escape koma dan tanda kutip dalam nilai
  //             return `"${formattedValue.replace(/"/g, '""')}"`;
  //           })
  //           .join(",")
  //       ),
  //     ];

  //     const csvData = csvRows.join("\n");
  //     const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  //     const link = document.createElement("a");
  //     const url = URL.createObjectURL(blob);

  //     link.setAttribute("href", url);
  //     link.setAttribute("download", "selected_customers.csv");
  //     link.style.visibility = "hidden";

  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.error("Export failed:", error);
  //   }
  // };
  const handleExport = async () => {
    try {
      // Buat array objek dengan header yang diformat dengan baik
      const formattedData = selectedCustomers.map((customer) => {
        const formattedCustomer = {};

        Object.keys(customer).forEach((key) => {
          // Ubah nama kolom menjadi format title case
          const formattedKey = key
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          // Format nilai
          let value = customer[key];
          if (value === null || value === undefined) {
            value = "N/A";
          } else if (typeof value === "number") {
            // Pastikan angka diformat dengan benar
            value = Number(value.toFixed(2));
          } else {
            value = String(value);
          }

          formattedCustomer[formattedKey] = value;
        });

        return formattedCustomer;
      });

      // Buat worksheet
      const worksheet = XLSX.utils.json_to_sheet(formattedData);

      // Buat workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

      // Ekspor file
      XLSX.writeFile(workbook, "Selected_Customers.xlsx", {
        bookType: "xlsx",
        type: "binary",
      });
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const toggleCustomerSelection = (customerId) => {
    setSelectedCustomers((prev) =>
      prev.includes(customerId)
        ? prev.filter((id) => id !== customerId)
        : [...prev, customerId]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }
  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="text-blue-500 p-4 rounded-md shadow-md mb-6">
        <h1 className="text-xl font-bold">Dashboard Report</h1>
      </div>
      {/* Filter Section */}
      <div className="bg-white p-5 rounded-md shadow-md mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">From</label>
          <input
            type="date"
            className="border rounded p-2 text-gray-700 w-40"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">To</label>
          <input
            type="date"
            className="border rounded p-2 text-gray-700 w-40"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Category</label>
          <select className="border rounded p-2 text-gray-700 w-40">
            <option>All</option>
            <option>Pending</option>
            <option>Success</option>
          </select>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-6">
          Report
        </button>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Reports", count: 0, color: "blue" },
          { label: "Completed", count: 0, color: "green" },
          { label: "Pending", count: 0, color: "red" },
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
      {/* Chart Section */}
      {/* <div className="bg-white p-5 rounded-md shadow-md mb-6">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Report Chart</h2>
        <div className="h-60 bg-gray-100 rounded flex justify-center items-center">

        </div>
      </div> */}
      {/*  */}
      {/* <div className="p-4 bg-white shadow rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Export Customer Data
          </h2>
          <button
            onClick={handleExport}
            disabled={loading}
            className={`flex items-center px-4 py-2 rounded ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            <Download className="mr-2 h-5 w-5" />
            {loading ? "Exporting..." : "Export to CSV"}
          </button>
        </div>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
      </div> */}
      <div className="p-4 bg-white rounded-md shadow-md mb-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Report Customers</h2>
          <button
            onClick={handleExport}
            disabled={selectedCustomers.length === 0}
            className={`flex items-center px-4 py-2 rounded ${
              selectedCustomers.length > 0
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            <Download className="mr-2" />
            Export Selected ({selectedCustomers.length})
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedCustomers.length === customers.length}
                    onChange={() =>
                      setSelectedCustomers(
                        selectedCustomers.length === customers.length
                          ? []
                          : [...customers]
                      )
                    }
                  />
                </th>
                {Object.keys(customers[0] || {}).map((key) => (
                  <th key={key} className="p-3 text-left">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedCustomers.includes(customer)}
                      onChange={() => toggleCustomerSelection(customer)}
                    />
                  </td>
                  {Object.values(customer).map((value, idx) => (
                    <td key={idx} className="p-3">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Showing 1 to 5 of 120 entries
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
  );
};

export default DashboardReport;
