import { useState } from "react";
import "./index.css";

interface Doctor {
  id: number;
  name: string;
}

interface BookingFormProps {
  doctor: Doctor;
  onSuccess: () => void;
  onCancel: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  doctor,
  onSuccess,
  onCancel,
}) => {
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const API_BASE_URL = import.meta.env.PROD ? import.meta.env.VITE_BACKEND_URL : "http://localhost:5000";
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
    <div className="form-bg-container bg-transparent p-8 rounded-lg w-full">
      <div className="bg-transparent p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          Book Appointment with {doctor.name}
        </h2>

        {success ? (
          <div className="text-green-600 font-semibold text-lg">
            ✅ Appointment booked successfully!
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Patient Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Patient Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Preferred Date & Time</label>
              <input
                type="datetime-local"
                className="w-full p-2 border rounded"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                required
              />
            </div>
            {error && <div className="mb-4 text-red-500">{error}</div>}
            <div className="flex justify-end">
              <button
                type="button"
                className="mr-4 bg-gray-200 p-2 rounded"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
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
