import React, { useState, useEffect } from "react";
import facultyData from "../../data.js"; // Importing faculty data
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Flatten the data structure into an array of faculty members with department names
  const facultyList = facultyData.flatMap((departmentObj) =>
    Object.entries(departmentObj).flatMap(([department, faculty]) =>
      faculty.map((member) => ({ ...member, department }))
    )
  );

  // Filter faculty members based on search input
  const filteredFaculty = facultyList.filter((faculty) =>
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-fit mt-10 pt-20 max-w-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <h1 className="text-4xl font-extrabold text-center mb-6 drop-shadow-lg">
        Explore Faculty Hub
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search faculty..."
          className={`w-full max-w-lg px-4 py-3 rounded-full shadow-md border-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white transition-all`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Faculty Card Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredFaculty.length > 0 ? (
          filteredFaculty.map((faculty, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-90 text-gray-900 shadow-lg rounded-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl ml-2 mr-2 h-fit"
            >
              <img
                src={faculty.image ? faculty.image : "/images/img3.jpeg"}
                alt={faculty.name || "Default Faculty"}
                className="w-full h-80 object-cover"
              />
              
              <div className="p-4">
                <h2 className="text-xl font-bold">{faculty.name || "Unknown Faculty"}</h2>
                <p className="text-gray-700">{faculty.department || "Department Unknown"}</p>
                <p className="text-gray-700">{faculty.email || "No Email Available"}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-200 col-span-full">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
