import React, { useState } from "react";
import "./chatroom.css";
function Deposition() {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const Depositionurl =
    "https://t86a6l5lk4.execute-api.us-east-1.amazonaws.com/production";
  const DepositionHandleChnage = async (e) => {
    setLoading(true);
    console.log(e.target.value);
    const myValue = localStorage.getItem("myKey");
    if (myValue) {
      //post method
      const data = {
        disposition_code: e.target.value,
        contact_id: myValue,
      };
      // console.log(data);
      const response = await fetch(Depositionurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      setLoading(false);
      console.log(json);
      if (json.statusCode === 200) {
        alert("Contact attributes updated successfully");
      } else {
        alert("Contact attributes updated failed");
      }
    } else {
      alert("something went wrong");
      setLoading(false);
    }
    console.log(myValue);
  };
  //   const sahil = "232332222";
  //   localStorage.setItem("myKey", sahil);

  const resume =
    "https://928d9w8i2k.execute-api.us-east-1.amazonaws.com/production/resumerecording";
  const pauseapi =
    "https://928d9w8i2k.execute-api.us-east-1.amazonaws.com/production/suspendrecording";

  const startbuttonfnc = async (e) => {
    console.log("start button clicked");
    e.preventDefault();
    //post request
    const myValue = localStorage.getItem("myKey");
    if (myValue) {
      //post method

      const response = await fetch(resume, {
        method: "POST",

        body: JSON.stringify({
          contactid: myValue,
        }),
      });
      const data = await response.json();
      if (data.body === "True") {
        alert("Recording resume");
        setIsActive(true);
      } else {
        alert("Recording not resume");
        setIsActive(false);
      }
      console.log(data);
    }
  };
  const pausebuttonfnc = async (e) => {
    console.log("pause button clicked");
    e.preventDefault();
    //post request
    const myValue = localStorage.getItem("myKey");
    if (myValue) {
      //post method

      const response = await fetch(pauseapi, {
        method: "POST",

        body: JSON.stringify({
          contactid: myValue,
        }),
      });
      const data = await response.json();
      if (data.body === "True") {
        setIsActive(false);

        alert("Recording paused");
      } else {
        alert("Recording not paused");
        setIsActive(true);
      }

      console.log(data);
    }
  };
  return (
    <div className="DepositionContainer">
      <div style={{ height: "70%" }}>
        <div className="Depositionheader">
          <p>Disposition</p>
        </div>
        {loading ? (
          <div className="DepositionCode">Loading...</div>
        ) : (
          <div className="DepositionCode">
            <button
              value="Genral-Modification question"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Genral-Modification question
            </button>
            <button
              value="General-Policy question"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              General-Policy question
            </button>
            <button
              value="General-Hotel confirmation Number"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              General-Hotel confirmation Number
            </button>
            <button
              value="General-confirming booking"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              General-confirming booking
            </button>
            <button
              value="Genral-Resend itinerary"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              General-Resend itinerary
            </button>
            <button
              value="General - Special Request"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              General - Special Request
            </button>
            <button
              value=" General-update contact information"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              General-update contact information
            </button>
            <button
              value="Cancel-In penalty"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Cancel-In penalty
            </button>
            <button
              value="Cancel-Not in penalty"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Cancel-Not in penalty
            </button>
            <button
              value="Cancel-Waiver request"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Cancel-Waiver request
            </button>
            <button
              value="Pre booking-Shopping assistance"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Pre booking-Shopping assistance
            </button>
            <button
              value="Pre booking-Points query"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Pre booking-Points query
            </button>
            <button
              value="Pre booking-Programs query"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Pre booking-Programs query
            </button>
            <button
              value="Pre booking-Advance Booking Window Concern"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Pre booking-Advance Booking Window Concern
            </button>
            <button
              value="Complaints-Complaint during travel"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Complaints-Complaint during travel
            </button>
            <button
              value="Complaints-Complaint After travel"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Complaints-Complaint After travel
            </button>
            <button
              value="Complaints-Complaint supplier"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Complaints-Complaint supplier
            </button>
            <button
              value="Complaints-Complaint booking experience"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Complaints-Complaint booking experience
            </button>
            <button
              value="Complaints-Complaint customer service  experience"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Complaints-Complaint customer service experience
            </button>
            <button
              value="Change and modifications-Change dates"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Change and modifications-Change dates
            </button>
            <button
              value="Change and modifications-Change lead traveler"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Change and modifications-Change lead traveler
            </button>
            <button
              value="Change and modifications-Change room type"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Change and modifications-Change room type
            </button>
            <button
              value=" Change and modifications-Change  Add room "
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Change and modifications-Change Add room
            </button>
           
            <button
              value="  Change and modifications-Change  Add Activity  "
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Change and modifications-Change Add Activity
            </button>
            <button
              value=" Change and modifications-Change  Add car "
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Change and modifications-Change Add car
            </button>
            <button
              value=" Change and modifications-Change  Add flight "
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Change and modifications-Change Add flight
            </button>
            <button
              value=" Change and modifications-Change  Add travelers "
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Change and modifications-Change Add travelers
            </button>
            <button
              value=" Follow up-Voicemail call back "
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Follow up-Voicemail call back
            </button>
            <button
              value="Follow up-Refund update"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Follow up-Refund update
            </button>
            <button value=" IROP" onClick={(e) => DepositionHandleChnage(e)}>
              IROP
            </button>
            <button
              value=" General Air -Modification Question"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              General Air -Modification Question
            </button>{" "}
            <button
              value=" General Air -Fare rules Question"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              General Air -Fare rules Question
            </button>{" "}
            <button
              value=" General Air -Flexiblity Policies"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              General Air -Flexiblity Policies
            </button>{" "}
            <button
              value=" General Air -confirm flight details"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              General Air -confirm flight details
            </button>{" "}
            <button
              value=" Change and Modifications Air - Voluntary Change Request"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Change and Modifications Air - Voluntary Change Request
            </button>{" "}
            <button
              value="Change and Modifications Air - Schedule Change Involuntary"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Change and Modifications Air - Schedule Change Involuntary
            </button>{" "}
            <button
              value=" Cancel Air-Fully Refundable"
              onClick={(e) => DepositionHandleChnage(e)}
            >
              Cancel Air-Fully Refundable
            </button>
           
          </div>
        )}
      </div>
      <div style={{ height: "30%" }}>
        <div className={isActive ? "Recordingcontrol" : "inactive"}>
          <p>{isActive ? "Recording" : "Recording Stopped"}</p>
        </div>
        <div className="controlsbutton">
          <button className="pauseButton" onClick={pausebuttonfnc}>
            Pause
          </button>
          <button className="startButton" onClick={startbuttonfnc}>
            Resume
          </button>
        </div>
      </div>
    </div>
  );
}

export default Deposition;
