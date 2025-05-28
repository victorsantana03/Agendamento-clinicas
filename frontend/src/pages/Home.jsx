import { useState } from "react";
import Professionals from "../components/Professionals";
import Clinics from "../components/Clinics";

const Home = () => {
  const [selectedClinic, setSelectedClinic] = useState();

  return (
    <div>
      <>
        <Clinics setSelectedClinic={setSelectedClinic} />

        <Professionals clinicId={selectedClinic} />
      </>
    </div>
  );
};

export default Home;
