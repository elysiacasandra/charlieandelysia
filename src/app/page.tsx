"use client";
import Input from "@/components/Input";
import axios from "axios";
import InputSelect from "@/components/InputSelect";
import React, { useRef, useEffect, useState } from "react";

export default function Home() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dietaryRequirement, setDietaryRequirement] = useState<string>("");
  const [additionalGuests, setAdditionalGuests] = useState<string>("");
  const [firstNameAG1, setFirstNameAG1] = useState<string>("");
  const [lastNameAG1, setLastNameAG1] = useState<string>("");
  const [dietaryRequirementAG1, setDietaryRequirementAG1] =
    useState<string>("");
  const [firstNameAG2, setFirstNameAG2] = useState<string>("");
  const [lastNameAG2, setLastNameAG2] = useState<string>("");
  const [dietaryRequirementAG2, setDietaryRequirementAG2] =
    useState<string>("");
  const [firstNameAG3, setFirstNameAG3] = useState<string>("");
  const [lastNameAG3, setLastNameAG3] = useState<string>("");
  const [dietaryRequirementAG3, setDietaryRequirementAG3] =
    useState<string>("");
  const [firstNameAG4, setFirstNameAG4] = useState<string>("");
  const [lastNameAG4, setLastNameAG4] = useState<string>("");
  const [dietaryRequirementAG4, setDietaryRequirementAG4] =
    useState<string>("");
  const [firstNameAG5, setFirstNameAG5] = useState<string>("");
  const [lastNameAG5, setLastNameAG5] = useState<string>("");
  const [dietaryRequirementAG5, setDietaryRequirementAG5] =
    useState<string>("");
  const [attendanceStatus, setAttendanceStatus] = useState<string>("");
  const [attendanceStatusFinal, setAttendanceStatusFinal] =
    useState<string>("");
  const [screenSize, setScreenSize] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const handleWindowResize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleWindowResize);
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }
  }, []);

  const scrollToRsvp = () => {
    const element = document.getElementById("rsvp");
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const scrollToVenue = () => {
    if (screenSize < 768) {
      const element = document.getElementById("venue");
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    } else {
      const element = document.getElementById("venue1");
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  const scrollToItinerary = () => {
    const element = document.getElementById("itinerary");
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleAttendanceChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAttendanceStatus(event.target.value);
    if (event.target.value === "acceptWithPleasure") {
      setAttendanceStatusFinal("Accept with pleasure");
    } else {
      setAttendanceStatusFinal("Regretfully decline");
    }
  };

  const submitForm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const newData = new URLSearchParams();
    newData.append("submission[4_first]", firstName);
    newData.append("submission[4_last]", lastName);
    newData.append("submission[7_first]", firstNameAG1);
    newData.append("submission[7_last]", lastNameAG1);
    newData.append("submission[13_first]", firstNameAG2);
    newData.append("submission[13_last]", lastNameAG2);
    newData.append("submission[14_first]", firstNameAG3);
    newData.append("submission[14_last]", lastNameAG3);
    newData.append("submission[15_first]", firstNameAG4);
    newData.append("submission[15_last]", lastNameAG4);
    newData.append("submission[16_first]", firstNameAG5);
    newData.append("submission[16_last]", lastNameAG5);
    newData.append("submission[30]", mobileNumber);
    newData.append("submission[23]", email);
    newData.append("submission[11]", additionalGuests);
    newData.append("submission[24]", dietaryRequirement);
    newData.append("submission[25]", dietaryRequirementAG1);
    newData.append("submission[26]", dietaryRequirementAG2);
    newData.append("submission[27]", dietaryRequirementAG3);
    newData.append("submission[28]", dietaryRequirementAG4);
    newData.append("submission[29]", dietaryRequirementAG5);
    newData.append("submission[22]", attendanceStatusFinal);

    axios
      .post(
        "https://api.jotform.com/form/231597280572058/submissions?apiKey=29c52d502b1011d0b7099b54077218ca",
        newData
      )
      .then((response) => {
        setMobileNumber("");
        setEmail("");
        setFirstName("");
        setLastName("");
        setDietaryRequirement("");
        setAdditionalGuests("");
        setFirstNameAG1("");
        setLastNameAG1("");
        setDietaryRequirementAG1("");
        setFirstNameAG2("");
        setLastNameAG2("");
        setDietaryRequirementAG2("");
        setFirstNameAG3("");
        setLastNameAG3("");
        setDietaryRequirementAG3("");
        setFirstNameAG4("");
        setLastNameAG4("");
        setDietaryRequirementAG4("");
        setFirstNameAG5("");
        setLastNameAG5("");
        setDietaryRequirementAG5("");
        setAttendanceStatus("");
        setAttendanceStatusFinal("");
        scrollToRsvp();
        setSuccess(" ");
      })
      .catch((error) => {
        console.error(error);
        setError(" ");
      });
  };

  const handleAdditionalGuestsChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAdditionalGuests(event.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col justify-between overflow-x-hidden">
      <div>
        <div className="h-screen">
          <div className="md:hidden">
            <video
              src="/Video-453.mov"
              autoPlay
              muted
              playsInline
              loop
              style={{
                width: "100vw",
                height: "100vh",
                objectFit: "cover",
                objectPosition: "center",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <source src="video.mov" type="video/mov" />
            </video>
          </div>
          <div className="hidden md:block">
            <video
              src="/sunnyside.mp4"
              autoPlay
              muted
              playsInline
              loop
              style={{
                width: "100vw",
                height: "100vh",
                objectFit: "cover",
                objectPosition: "center",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <source src="video.mp4" type="video/mp4" />
            </video>
          </div>
          <div
            className="absolute top-1/2 left-15 transform -translate-y-1/2 p-4"
            style={{ fontSize: "1.2rem" }}
          >
            <button onClick={scrollToItinerary} style={{ color: "#FFFFFF" }}>
              Itinerary
            </button>
            <br></br>
            <br></br>
            <button onClick={scrollToVenue} style={{ color: "#FFFFFF" }}>
              Venue
            </button>
            <br></br>
            <br></br>
            <button onClick={scrollToRsvp} style={{ color: "#FFFFFF" }}>
              RSVP
            </button>
          </div>
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              padding: "2rem",
            }}
          >
            <button
              onClick={scrollToRsvp}
              style={{
                backgroundColor: "#BFDACC",
                color: "#729A90",
                padding: "0.5rem 1.5rem",
                border: "none",
              }}
            >
              RSVP
            </button>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "15%",
              width: "100%",
              textAlign: "center",
            }}
          >
            <div className="text-white text-6xl md:text-8xl">CHARLIE</div>
            <div className="text-white text-6xl md:text-8xl">& ELYSIA</div>
            <div className="justify-between text-white text-lg md:text-xl">
              <p style={{ fontFamily: "var(--font-adelia)" }}>
                a decade distilled
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        id="itinerary"
        className="py-16"
        style={{
          height: "33%",
          backgroundColor: "FCF9F7",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="" style={{ fontSize: "3rem", color: "#2B1105" }}>
          Itinerary
        </div>
        <div
          className=""
          style={{ fontSize: "1rem", color: "#2B1105", textAlign: "center" }}
        >
          <p>December 30, 2023</p>
          <p>The Continental Hotel Sorrento</p>
        </div>
        <div className="hidden md:block">
          <div style={{ display: "flex", marginTop: "2rem" }}>
            <div
              className=""
              style={{
                fontSize: "1.5rem",
                marginRight: "35rem",
                color: "#729A90",
              }}
            >
              2pm
            </div>
            <div>
              <div
                style={{
                  fontSize: "1.5rem",
                  color: "#2B1105",
                  marginLeft: "-25rem",
                }}
              >
                Ceremony
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  color: "#2B1105",
                  marginLeft: "-25rem",
                }}
              >
                Hosted in the Grand Ballroom.
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  color: "#2B1105",
                  marginLeft: "-25rem",
                }}
              >
                Please arrive 15 mins early.
              </div>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "2rem" }}>
            <div
              style={{
                fontSize: "1.5rem",
                marginRight: "35rem",
                color: "#729A90",
              }}
            >
              5pm
            </div>
            <div>
              <div
                style={{
                  fontSize: "1.5rem",
                  color: "#2B1105",
                  marginLeft: "-25rem",
                }}
              >
                Drinks
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  color: "#2B1105",
                  marginLeft: "-25rem",
                }}
              >
                Meet at the Sunset Terrace.
              </div>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "2rem" }}>
            <div
              style={{
                fontSize: "1.5rem",
                marginRight: "35rem",
                color: "#729A90",
              }}
            >
              6pm
            </div>
            <div>
              <div
                style={{
                  fontSize: "1.5rem",
                  color: "#2B1105",
                  marginLeft: "-25rem",
                }}
              >
                Reception
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  color: "#2B1105",
                  marginLeft: "-25rem",
                }}
              >
                Held at Halcyon Hall.
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  color: "#2B1105",
                  marginLeft: "-25rem",
                }}
              >
                Will conclude at approximately 11pm.
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <div style={{ display: "flex", marginTop: "2rem" }}>
            <div
              className=""
              style={{
                fontSize: "1.5rem",
                marginLeft: "35rem",
                color: "#729A90",
              }}
            ></div>
            <div>
              <div
                className=""
                style={{
                  fontSize: "1.5rem",
                  marginLeft: "-25rem",
                  color: "#729A90",
                }}
              >
                2pm
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  color: "#2B1105",
                  marginLeft: "-25rem",
                }}
              >
                Ceremony
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  color: "#2B1105",
                  marginLeft: "-25rem",
                }}
              >
                Hosted in the Grand Ballroom.
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  color: "#2B1105",
                  marginLeft: "-25rem",
                }}
              >
                Please arrive 15 mins early.
              </div>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "2rem" }}>
            <div
              className=""
              style={{
                fontSize: "1.5rem",
                marginLeft: "35rem",
                color: "#729A90",
              }}
            ></div>
            <div>
              <div
                className=""
                style={{
                  fontSize: "1.5rem",
                  marginLeft: "-25rem",
                  color: "#729A90",
                }}
              >
                5pm
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  color: "#2B1105",
                  marginLeft: "-25rem",
                }}
              >
                Drinks
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  color: "#2B1105",
                  marginLeft: "-25rem",
                }}
              >
                Meet at the Sunset Terrace.
              </div>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "2rem" }}>
            <div
              className=""
              style={{
                fontSize: "1.5rem",
                marginLeft: "35rem",
                color: "#729A90",
              }}
            ></div>
            <div>
              <div
                className=""
                style={{
                  fontSize: "1.5rem",
                  marginLeft: "-25rem",
                  color: "#729A90",
                }}
              >
                6pm
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  color: "#2B1105",
                  marginLeft: "-25rem",
                }}
              >
                Reception
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  color: "#2B1105",
                  marginLeft: "-25rem",
                }}
              >
                Held at Halcyon Hall.
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  color: "#2B1105",
                  marginLeft: "-25rem",
                }}
              >
                Will conclude at approximately 11pm.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <div
          id="venue"
          style={{
            // backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.35)), url('/jake&taylor.png')`,
            backgroundPosition: "top",
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            className="py-16 w-full"
            style={{ display: "flex", justifyContent: "center", width: "90%" }}
          >
            <div style={{ color: "#2B1105", width: "60%" }}>
              <h3
                className="text-center"
                style={{ fontSize: "2rem", marginBottom: "1rem" }}
              >
                Venue
              </h3>
              <p className="text-center" style={{ fontSize: "1rem" }}>
                Hosted at The Continental Hotel Sorrento. There will be signage
                around the venue to help direct guests during the day.
              </p>
            </div>
          </div>
          <div
            className="pb-16 w-full"
            style={{ display: "flex", justifyContent: "center", width: "90%" }}
          >
            <div style={{ color: "#2B1105", width: "60%" }}>
              <h3
                className="text-center"
                style={{ fontSize: "2rem", marginBottom: "1rem" }}
              >
                Parking
              </h3>
              <p className="text-center" style={{ fontSize: "1rem" }}>
                There are public parking spaces under the hotel, however, these
                can not be reserved. There is full day parking behind IGA and on
                Kerferd Avenue that we recommend using.
              </p>
            </div>
          </div>
          <div
            className="pb-16 w-full"
            style={{ display: "flex", justifyContent: "center", width: "90%" }}
          >
            <div style={{ color: "#2B1105", width: "60%" }}>
              <h3
                className="text-center"
                style={{ fontSize: "2rem", marginBottom: "1rem" }}
              >
                Gifts
              </h3>
              <p className="text-center" style={{ fontSize: "1rem" }}>
                Your presence at our wedding is truly the greatest gift. However
                should you wish to honour us further, a wishing well will be
                present on the evening.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <div
          id="venue1"
          style={{
            // backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), url('/theconti.jpeg')`,
            backgroundPosition: "top",
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            className="py-36 w-full"
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "60%",
            }}
          >
            <div style={{ color: "#FFFFFF", width: "30%" }}>
              <h3 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Venue</h3>
              <p style={{ fontSize: "1rem" }}>
                Hosted at The Continental Hotel Sorrento. There will be signage
                around the venue to help direct guests during the day.
              </p>
            </div>
            <div style={{ color: "#FFFFFF", width: "30%" }}>
              <h3 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                Parking
              </h3>
              <p style={{ fontSize: "1rem" }}>
                There are public parking spaces under the hotel, however, these
                can not be reserved. There is full day parking behind IGA and on
                Kerferd Avenue that we recommend using.
              </p>
            </div>
            <div style={{ color: "#FFFFFF", width: "30%" }}>
              <h3 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Gifts</h3>
              <p style={{ fontSize: "1rem" }}>
                Your presence at our wedding is truly the greatest gift. However
                should you wish to honour us further, a wishing well will be
                present on the evening.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        id="rsvp"
        className="mx-8 md:mx-0 pb-16 min-h-screen bg-FCF9F7 flex flex-col items-center justify-center"
      >
        <div
          className="pt-16 pb-4"
          style={{ fontSize: "3rem", color: "#2B1105" }}
        >
          RSVP
        </div>

        {success === "" && (
          <div style={{ fontSize: "1rem", color: "#2B1105" }}>
            Please RSVP by the 1st of August.
          </div>
        )}
        {success !== "" && (
          <p className="text-green-700">
            Thank you for your RSVP. We look forward to seeing you on our
            special day.
          </p>
        )}
        <form>
          <div className="mt-8 mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="mobile-number"
            >
              Mobile number*
            </label>
            <Input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              onChange={(value) => setMobileNumber(value)}
              value={mobileNumber}
            />
          </div>
          <div className="mt-4 mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="mobile-number"
            >
              Email
            </label>
            <Input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              onChange={(value) => setEmail(value)}
              value={email}
            />
          </div>
          <div className="grid grid-cols-2">
            <div className="col-span-1 mr-1">
              <label
                className="block text-gray-700 font-bold"
                htmlFor="first-name"
              >
                First name*
              </label>
              <Input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                onChange={(value) => setFirstName(value)}
                value={firstName}
              />
            </div>
            <div className="col-span-1 ml-1">
              <label
                htmlFor="lastName"
                className="mb-2 font-semibold text-gray-600"
              >
                Last name*
              </label>
              <Input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                onChange={(value) => setLastName(value)}
                value={lastName}
              />
            </div>
          </div>
          <div className="flex flex-col my-4 ">
            <label
              className="block text-gray-700 font-bold"
              htmlFor="mobile-number"
            >
              Dietary requirements - if any
            </label>
            <Input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              onChange={(value) => setDietaryRequirement(value)}
              value={dietaryRequirement}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="additionalGuests"
              className="mb-2 font-semibold text-gray-600"
            >
              Number of additional guests (excluding yourself)*
            </label>
            <div className="flex flex-row justify-start items-center">
              {[0, 1, 2, 3, 4, 5].map((option) => (
                <label key={option} className="inline-flex items-center mx-2">
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-green-700 checked:bg-green-700 transition duration-150 ease-in-out"
                    name="additionalGuests"
                    value={option}
                    checked={additionalGuests === option.toString()}
                    onChange={handleAdditionalGuestsChange}
                  />
                  <span className="ml-2 text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
          {additionalGuests !== "" && additionalGuests !== "0" && (
            <>
              <div className="grid grid-cols-2">
                <div className="col-span-1 mr-1">
                  <label
                    className="block text-gray-700 font-bold"
                    htmlFor="first-name"
                  >
                    First name*
                  </label>
                  <Input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    onChange={(value) => setFirstNameAG1(value)}
                    value={firstNameAG1}
                  />
                </div>
                <div className="col-span-1 ml-1">
                  <label
                    htmlFor="lastName"
                    className="mb-2 font-semibold text-gray-600"
                  >
                    Last name*
                  </label>
                  <Input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    onChange={(value) => setLastNameAG1(value)}
                    value={lastNameAG1}
                  />
                </div>
              </div>
              <div className="flex flex-col my-4 ">
                <label
                  className="block text-gray-700 font-bold"
                  htmlFor="mobile-number"
                >
                  Dietary requirements - if any
                </label>
                <Input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  onChange={(value) => setDietaryRequirementAG1(value)}
                  value={dietaryRequirementAG1}
                />
              </div>
            </>
          )}
          {additionalGuests !== "" &&
            additionalGuests !== "0" &&
            additionalGuests !== "1" && (
              <>
                <div className="grid grid-cols-2">
                  <div className="col-span-1 mr-1">
                    <label
                      className="block text-gray-700 font-bold"
                      htmlFor="first-name"
                    >
                      First name*
                    </label>
                    <Input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      onChange={(value) => setFirstNameAG2(value)}
                      value={firstNameAG2}
                    />
                  </div>
                  <div className="col-span-1 ml-1">
                    <label
                      htmlFor="lastName"
                      className="mb-2 font-semibold text-gray-600"
                    >
                      Last name*
                    </label>
                    <Input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      onChange={(value) => setLastNameAG2(value)}
                      value={lastNameAG2}
                    />
                  </div>
                </div>
                <div className="flex flex-col my-4 ">
                  <label
                    className="block text-gray-700 font-bold"
                    htmlFor="mobile-number"
                  >
                    Dietary requirements - if any
                  </label>
                  <Input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    onChange={(value) => setDietaryRequirementAG2(value)}
                    value={dietaryRequirementAG2}
                  />
                </div>
              </>
            )}
          {additionalGuests !== "" &&
            additionalGuests !== "0" &&
            additionalGuests !== "1" &&
            additionalGuests !== "2" && (
              <>
                <div className="grid grid-cols-2">
                  <div className="col-span-1 mr-1">
                    <label
                      className="block text-gray-700 font-bold"
                      htmlFor="first-name"
                    >
                      First name*
                    </label>
                    <Input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      onChange={(value) => setFirstNameAG3(value)}
                      value={firstNameAG3}
                    />
                  </div>
                  <div className="col-span-1 ml-1">
                    <label
                      htmlFor="lastName"
                      className="mb-2 font-semibold text-gray-600"
                    >
                      Last name*
                    </label>
                    <Input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      onChange={(value) => setLastNameAG3(value)}
                      value={lastNameAG3}
                    />
                  </div>
                </div>
                <div className="flex flex-col my-4 ">
                  <label
                    className="block text-gray-700 font-bold"
                    htmlFor="mobile-number"
                  >
                    Dietary requirements - if any
                  </label>
                  <Input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    onChange={(value) => setDietaryRequirementAG3(value)}
                    value={dietaryRequirementAG3}
                  />
                </div>
              </>
            )}
          {additionalGuests !== "" &&
            additionalGuests !== "0" &&
            additionalGuests !== "1" &&
            additionalGuests !== "2" &&
            additionalGuests !== "3" && (
              <>
                <div className="grid grid-cols-2">
                  <div className="col-span-1 mr-1">
                    <label
                      className="block text-gray-700 font-bold"
                      htmlFor="first-name"
                    >
                      First name*
                    </label>
                    <Input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      onChange={(value) => setFirstNameAG4(value)}
                      value={firstNameAG4}
                    />
                  </div>
                  <div className="col-span-1 ml-1">
                    <label
                      htmlFor="lastName"
                      className="mb-2 font-semibold text-gray-600"
                    >
                      Last name*
                    </label>
                    <Input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      onChange={(value) => setLastNameAG4(value)}
                      value={lastNameAG4}
                    />
                  </div>
                </div>
                <div className="flex flex-col my-4 ">
                  <label
                    className="block text-gray-700 font-bold"
                    htmlFor="mobile-number"
                  >
                    Dietary requirements - if any
                  </label>
                  <Input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    onChange={(value) => setDietaryRequirementAG4(value)}
                    value={dietaryRequirementAG4}
                  />
                </div>
              </>
            )}
          {additionalGuests === "5" && (
            <>
              <div className="grid grid-cols-2">
                <div className="col-span-1 mr-1">
                  <label
                    className="block text-gray-700 font-bold"
                    htmlFor="first-name"
                  >
                    First name*
                  </label>
                  <Input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    onChange={(value) => setFirstNameAG5(value)}
                    value={firstNameAG5}
                  />
                </div>
                <div className="col-span-1 ml-1">
                  <label
                    htmlFor="lastName"
                    className="mb-2 font-semibold text-gray-600"
                  >
                    Last name*
                  </label>
                  <Input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    onChange={(value) => setLastNameAG5(value)}
                    value={lastNameAG5}
                  />
                </div>
              </div>
              <div className="flex flex-col my-4 ">
                <label
                  className="block text-gray-700 font-bold"
                  htmlFor="mobile-number"
                >
                  Dietary requirements - if any
                </label>
                <Input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  onChange={(value) => setDietaryRequirementAG5(value)}
                  value={dietaryRequirementAG5}
                />
              </div>
            </>
          )}
          <div className="flex flex-col mb-4">
            <span className="mb-2 font-semibold text-gray-600">
              Attendance status*
            </span>
            <div className="flex flex-row justify-start items-center">
              <label className="inline-flex items-center mx-2">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-green-700 transition duration-150 ease-in-out checked:bg-green-700"
                  name="acceptance"
                  value="acceptWithPleasure"
                  checked={attendanceStatus === "acceptWithPleasure"}
                  onChange={handleAttendanceChange}
                />
                <span className="ml-2 text-gray-700">Accept with pleasure</span>
              </label>
              <label className="inline-flex items-center mx-2">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-green-700 transition duration-150 ease-in-out checked:bg-green-700"
                  name="acceptance"
                  value="regretfullyDecline"
                  checked={attendanceStatus === "regretfullyDecline"}
                  onChange={handleAttendanceChange}
                />
                <span className="ml-2 text-gray-700">Regretfully decline</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-center">
            {mobileNumber !== "" &&
            firstName !== "" &&
            lastName !== "" &&
            additionalGuests !== "" &&
            attendanceStatus !== "" ? (
              <button
                type="submit"
                onClick={(event) => submitForm(event)}
                className="px-6 py-2 text-white font-semibold transition duration-150 ease-in-out shadow-md hover:bg-green-700 focus:outline-none focus:shadow-outline-blue active:bg-green-700"
                style={{
                  backgroundColor: "#BFDACC",
                  color: "#729A90",
                  padding: "0.5rem 1.5rem",
                  border: "none",
                }}
              >
                Submit
              </button>
            ) : (
              <button
                disabled
                type="submit"
                onClick={(event) => submitForm(event)}
                className="px-6 py-2 text-white font-semibold transition duration-150 ease-in-out shadow-md hover:bg-green-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-700"
                style={{
                  backgroundColor: "#BFDACC",
                  color: "#729A90",
                  padding: "0.5rem 1.5rem",
                  border: "none",
                  cursor: "not-allowed",
                  opacity: 0.5,
                }}
              >
                Submit
              </button>
            )}

            {error !== "" && (
              <p className="text-red-700">
                We were unable to submit your RSVP. Please review your form
                inputs.
              </p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
