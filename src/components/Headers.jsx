import React from "react";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
const Headers = () => {
  return (
    <>
      <div className="header d-flex justify-content-between">
        <div className="containers">
          <div className="left">
            <MedicalInformationIcon className="mb-2 me-1" />
            <h3>Informations</h3>
          </div>
          <div className="left">
            {/* <Link to="/auth">
              <Button>Auth</Button>
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Headers;
