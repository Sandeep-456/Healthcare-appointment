import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import API_BASE_URL from "../../config.ts";
import "./index.css";

interface Doctor {
  id: number;
  name: string;
  profile_image_url?: string;
  specialization?: string;
  availability?: boolean;
}

const DoctorList = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/doctors`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDoctors(data);
        } else {
          setDoctors([]);
        }
      })
      .catch(() => setDoctors([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      (doctor.specialization ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-container">
      <h1 className="text-5xl font-bold text-center mb-20 Roboto">
        Healthcare Appointment Booking
      </h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50"></div>
        </div>
      ) : (
        <>
          <div className="search-container w-150 p-2 border rounded mb-10">
            <div className="mr-3">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search by name or specialization"
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="p-4 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 scale-95 hover:scale-100"
                >
                  <img
                    src={doctor.profile_image_url || "/default-doctor.png"}
                    alt={doctor.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                  />
                  <h2 className="text-xl font-bold">{doctor.name}</h2>
                  <p className="text-gray-600">
                    {doctor.specialization || "Specialization not specified"}
                  </p>
                  <div
                    className={`flex items-center gap-2 px-4 py-1 w-fit rounded-full mt-3 ${
                      doctor.availability ? "bg-green-500/20" : "bg-red-500/20"
                    }`}
                  >
                    <div
                      className={`h-2 w-2 rounded-full ${
                        doctor.availability ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <p
                      className={`font-bold text-sm ${
                        doctor.availability ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {doctor.availability ? "Available" : "Not Available"}
                    </p>
                  </div>
                  <Link to={`/doctor/${doctor.id}`}>
                    <button className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
                      View Profile
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center w-full h-[100%] p-4 justify-center">
              <img className="w-[40%]" src="/assets/no_data_found.svg" />
              <p className="text-black text-4xl font-bold mt-6">
                No Data Found
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DoctorList;
