import { useState } from "react";
import Professionals from "../components/Professionals";
import Clinics from "../components/Clinics";

const Home = ({ user }) => {
  const [selectedClinic, setSelectedClinic] = useState();

  return (
    <div className="min-h-screen bg-gray-400 pt-20">
      <Clinics setSelectedClinic={setSelectedClinic} user={user} />

      <Professionals clinicId={selectedClinic} />
    </div>
  );
};

export default Home;
