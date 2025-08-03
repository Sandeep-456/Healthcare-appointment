import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import BookingForm from "../../components/BookingForm";
import { IoIosArrowBack } from "react-icons/io";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import API_BASE_URL from "../../config.ts";
import "./index.css";

interface Doctor {
  id: number;
  name: string;
  profile_image_url?: string;
  specialization?: string;
  availability?: boolean;
  about?: string;
  schedule?: string[];
  experience_years?: number;
  consultation_fee?: number;
  hospital_name?: string;
  languages_spoken?: string;
  rating?: number;
  review_count?: number;
  gender?: string;
  location?: string;
  is_verified?: boolean;
  supports_video_consult?: boolean;
}

const DoctorsProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/doctors/${id}`);
        if (!response.ok) throw new Error("Failed to fetch doctor");
        const data = await response.json();
        setDoctor(data);
      } catch (err: any) {
        setError(err.message || "Error fetching doctor");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-opacity-50"></div>
      </div>
    );
  }

  if (error)
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  if (!doctor) return <div className="text-center mt-4">No doctor found.</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center font-bold text-4xl Roboto m-7">
        Doctor Profile
      </h1>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <IoIosArrowBack className="mr-2" />
          Back
        </Link>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={doctor.profile_image_url || "/default-doctor.png"}
            alt={doctor.name}
            className="w-28 h-28 rounded-full object-cover border border-gray-300"
          />

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-800">
                {doctor.name}
              </h2>
              {doctor.is_verified && (
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                  Verified
                </span>
              )}
            </div>

            <p className="text-sm text-gray-500">{doctor.specialization}</p>
            <p
              className={`text-sm mt-1 ${
                doctor.availability ? "text-green-600" : "text-red-500"
              }`}
            >
              {doctor.availability ? "Available Today" : "Not Available"}
            </p>

            <div className="mt-3 text-sm text-gray-600 space-y-1">
              {doctor.hospital_name && <p>🏥 {doctor.hospital_name}</p>}
              {doctor.location && <p>📍 {doctor.location}</p>}
              {doctor.experience_years !== undefined && (
                <p>🧠 {doctor.experience_years}+ years experience</p>
              )}
              {doctor.consultation_fee !== undefined && (
                <p>💰 ₹{doctor.consultation_fee} consultation fee</p>
              )}
              {doctor.languages_spoken && <p>🗣️ {doctor.languages_spoken}</p>}
              {doctor.supports_video_consult && (
                <p>📹 Video Consult Available</p>
              )}
              {doctor.rating && doctor.review_count !== undefined && (
                <p>
                  ⭐ {doctor.rating} ({doctor.review_count} reviews)
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
          <p className="text-sm text-gray-700">
            {doctor.about || "No information available."}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Schedule</h3>
          <div className="flex flex-wrap gap-2">
            {doctor.schedule && doctor.schedule.length > 0 ? (
              doctor.schedule.map((time, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
                >
                  {time}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">No schedule available.</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Popup
            modal
            open={showBookingForm}
            onClose={() => setShowBookingForm(false)}
            trigger={
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium"
                onClick={() => setShowBookingForm(true)}
              >
                Book Appointment
              </button>
            }
          >
            {
              ((close: () => void) => (
                <BookingForm
                  doctor={doctor}
                  onCancel={() => {
                    close();
                    setShowBookingForm(false);
                  }}
                />
              )) as unknown as React.ReactNode
            }
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default DoctorsProfile;
