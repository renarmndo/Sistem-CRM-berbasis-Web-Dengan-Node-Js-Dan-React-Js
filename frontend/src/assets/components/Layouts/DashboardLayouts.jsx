// import { useState } from "react";
// import Sidebar from "../Sidebar";

// const DashboardLayouts = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   return (
//     <div
//       className={`
//         h-screen
//         bg-gray-100
//         grid
//         grid-cols-[${isSidebarOpen ? "16rem" : "4rem"}_1fr]
//         transition-all
//         duration-300
//         ease-in-out
//         gap-4
//       `}
//     >
//       {/* Sidebar */}
//       <div className="relative">
//         <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
//       </div>

//       {/* Main Content with responsive padding and transition */}
//       <div
//         className={`
//           overflow-auto
//           p-4
//           transition-all
//           duration-300
//           ease-in-out
//           ${isSidebarOpen ? "ml-0" : "ml-2"}
//         `}
//       >
//         <main
//           className={`
//             w-full
//             transition-all
//             duration-300
//             ease-in-out
//             ${isSidebarOpen ? "pl-4" : "pl-0"}
//           `}
//         >
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayouts;

import { useState } from "react";
import Sidebar from "../Sidebar";

const DashboardLayouts = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div
      className={`h-screen bg-gray-100 grid ${
        isSidebarOpen ? "grid-cols-[16rem_1fr]" : "grid-cols-[4rem_1fr]"
      } transition-all duration-300 ease-in-out gap-4`}
    >
      {/* Sidebar */}
      <div className="relative">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>

      {/* Main Content */}
      <div
        className={`overflow-auto p-4 transition-all duration-300 ease-in-out`}
      >
        <main
          className={`w-full transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "pl-4" : "pl-0"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayouts;
