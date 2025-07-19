import { useState } from "react";
import Professionals from "../components/Professionals";
import Clinics from "../components/Clinics";

const Home = () => {
  const [selectedClinic, setSelectedClinic] = useState();

  return (
    <div className="min-h-screen bg-gray-400 pt-20">
      <Clinics
        setSelectedClinic={setSelectedClinic}
        selectedClinic={selectedClinic}
      />

      <Professionals clinicId={selectedClinic} />
    </div>
  );
};

export default Home;
