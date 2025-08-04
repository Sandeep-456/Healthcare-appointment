import { useState } from "react";
import API_BASE_URL from "../../config.ts";
import "./index.css";

interface Doctor {
  id: number;
  name: string;
}

interface BookingFormProps {
  doctor: Doctor;
  onCancel: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ doctor, onCancel }) => {
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctor_id: doctor.id,
          patient_name: patientName,
          patient_email: patientEmail,
          appointment_date: appointmentDate,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to book appointment");
      }

      await res.json();
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:px-6 sm:py-8">
      <div className="bg-white rounded-lg p-6 sm:p-8 w-full">
        <h2 className="text-xl font-bold text-center mb-6">
          Book Appointment with <br />
          <span className="text-blue-600">{doctor.name}</span>
        </h2>

        {success ? (
          <div className="text-green-600 font-semibold text-center">
            ✅ Appointment booked successfully!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-sm">
                Patient Name
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-sm">
                Patient Email
              </label>
              <input
                type="email"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-sm">
                Preferred Date & Time
              </label>
              <input
                type="datetime-local"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="w-full sm:w-auto bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
