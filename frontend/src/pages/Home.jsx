import { useState } from "react";
import Professionals from "../components/Professionals";
import Clinics from "../components/Clinics";

const Home = ({ user }) => {
  const [selectedClinic, setSelectedClinic] = useState();

  return (
    <div>
      <>
        <Clinics setSelectedClinic={setSelectedClinic} user={user} />

        <Professionals clinicId={selectedClinic} />
      </>
    </div>
  );
};

export default Home;
