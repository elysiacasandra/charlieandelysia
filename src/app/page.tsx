"use client";
import Input from "@/components/Input";
import axios from "axios";
import InputSelect from "@/components/InputSelect";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

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
        "https://api.jotform.com/form/242380990130856/submissions?apiKey=bde7681abe1e68fe08c8ebfeb33075d1",
        newData
      )
      .then((response) => {
        console.log("Success:", response);
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
        console.log("ERROR");
      });
  };

  const handleAdditionalGuestsChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAdditionalGuests(event.target.value);
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-[#f8f6f2]">
      {/* Minimal Top Navigation */}
      <nav
        className="w-full flex justify-between items-center px-8 py-6 border-b border-earth-light bg-white/80 fixed top-0 left-0 z-50"
        style={{
          fontFamily: "Playfair Display, serif",
          letterSpacing: "0.04em",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="flex gap-8 text-earth-brown text-lg">
          <a href="#about" className="hover:underline">
            About
          </a>
          <a href="#gallery" className="hover:underline">
            Gallery
          </a>
        </div>
        <div className="text-2xl font-semibold tracking-widest text-earth-brown">
          CHARLIE & ELYSIA
        </div>
        <div className="flex gap-8 text-earth-brown text-lg">
          <a href="#rsvp" className="hover:underline">
            RSVP
          </a>
          <a href="#itinerary" className="hover:underline">
            Itinerary
          </a>
        </div>
      </nav>
      {/* Fullscreen Hero Section */}
      <section
        className="relative w-full h-screen flex items-center justify-center"
        style={{ minHeight: "100vh", marginTop: "72px" }}
      >
        <Image
          src="/sunnyside.JPG"
          alt="Venue"
          fill
          style={{ objectFit: "cover", zIndex: 0 }}
          priority
        />
        <div className="absolute inset-0 bg-[#f8f6f2]/60 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full">
          <h1
            className="text-5xl md:text-7xl font-serif mb-4 text-earth-brown drop-shadow-lg"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            Charlie & Elysia
          </h1>
          <div
            className="text-2xl md:text-3xl text-earth-olive mb-2 tracking-wide"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            May 10, 2025
          </div>
          <div
            className="text-lg md:text-xl text-earth-brown mb-6"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            St Vasilios Greek Orthodox Church | Carousel
          </div>
        </div>
      </section>
      {/* About Section */}
      <section
        id="about"
        className="w-full flex flex-col items-center py-20 px-4 bg-[#f8f6f2]"
      >
        <div className="max-w-3xl w-full flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2
              className="text-3xl font-serif mb-4 text-earth-brown"
              style={{ fontFamily: "Playfair Display, serif", fontWeight: 600 }}
            >
              About Us
            </h2>
            <p
              className="text-lg text-earth-brown leading-relaxed"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              We are so excited to celebrate our special day with you. Our story
              is one of love, laughter, and adventure, and we can’t wait to
              share this next chapter with our closest friends and family.
              Please join us for a day filled with joy, beauty, and
              unforgettable memories.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-earth-light w-72 h-96 bg-white/80">
              <Image
                src="/ann.jpg"
                alt="Charlie & Elysia"
                width={288}
                height={384}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Gallery Section */}
      <section
        id="gallery"
        className="w-full flex flex-col items-center py-20 px-4 bg-[#f8f6f2]"
      >
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl overflow-hidden border border-earth-light shadow-sm aspect-[4/5] bg-white/80">
            <Image
              src="/carousel-intro-4.jpg"
              alt="Gallery 1"
              width={400}
              height={500}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
          <div className="rounded-2xl overflow-hidden border border-earth-light shadow-sm aspect-[4/5] bg-white/80">
            <Image
              src="/jake&taylor.png"
              alt="Gallery 2"
              width={400}
              height={500}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
          <div className="rounded-2xl overflow-hidden border border-earth-light shadow-sm aspect-[4/5] bg-white/80">
            <Image
              src="/ann.jpg"
              alt="Gallery 3"
              width={400}
              height={500}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </section>
      {/* Itinerary Section */}
      <section
        id="itinerary"
        className="w-full flex flex-col items-center py-20 px-4 bg-[#f8f6f2]"
      >
        <div className="max-w-3xl w-full flex flex-col items-center">
          <h2
            className="text-3xl font-serif mb-8 text-earth-brown"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 600 }}
          >
            Itinerary
          </h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-earth-light bg-white/80 p-8 flex flex-col items-center shadow-sm">
              <div
                className="text-xl font-semibold text-earth-brown mb-2"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                1:00pm — Ceremony
              </div>
              <div className="text-earth-brown mb-1">
                St Vasilios Greek Orthodox Church
              </div>
              <div className="text-earth-olive mb-1">
                15 Staley St, Brunswick 3056
              </div>
              <div className="text-sm text-earth-olive">
                Please arrive 15 mins early.
              </div>
            </div>
            <div className="rounded-2xl border border-earth-light bg-white/80 p-8 flex flex-col items-center shadow-sm">
              <div
                className="text-xl font-semibold text-earth-brown mb-2"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                6:00pm — Reception
              </div>
              <div className="text-earth-brown mb-1">Carousel</div>
              <div className="text-earth-olive mb-1">
                22 Aughtie Dr, Albert Park 3205
              </div>
              <div className="text-sm text-earth-olive">
                Will conclude at approximately 11pm.
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* RSVP Section */}
      <section
        id="rsvp"
        className="w-full flex flex-col items-center py-20 px-4 bg-[#f8f6f2]"
      >
        <div className="max-w-2xl w-full flex flex-col items-center rounded-2xl border border-earth-light bg-white/80 p-10 shadow-md">
          <h2
            className="text-3xl font-serif mb-6 text-earth-brown"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 600 }}
          >
            RSVP
          </h2>
          <div
            className="text-lg text-earth-brown mb-6"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Please RSVP by the 10th of March.
          </div>
          {/* RSVP form remains, but styled for minimal look */}
          {/* ...insert RSVP form JSX here, using existing logic but updating classes for minimal look... */}
        </div>
      </section>
      <div className="sm:hidden">
        <div
          id="venue"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.35)), url('/ann.jpg')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            className="py-16 w-full"
            style={{
              display: "flex",
              justifyContent: "center",
              width: "60%",
              backgroundColor: "#FFFFFF",
              opacity: "50%",
            }}
          >
            <div style={{ color: "#2B1105", width: "60%" }}>
              <h3
                className="text-center"
                style={{
                  fontSize: "2rem",
                  marginBottom: "1rem",
                }}
              >
                Parking
              </h3>
              <p className="text-center" style={{ fontSize: "1rem" }}>
                There is ample public parking spaces in front of Carousel which
                costs $6.
              </p>
            </div>
          </div>
          <div
            className="pb-16 w-full"
            style={{
              display: "flex",
              justifyContent: "center",
              width: "60%",
              backgroundColor: "#FFFFFF",
              opacity: "50%",
            }}
          >
            <div style={{ color: "#2B1105", width: "60%" }}>
              <h3
                className="text-center"
                style={{
                  fontSize: "2rem",
                  marginBottom: "1rem",
                }}
              >
                Dress Code
              </h3>
              <p className="text-center" style={{ fontSize: "1rem" }}>
                Black Tie.
              </p>
            </div>
          </div>
          <div
            className="pb-16 w-full"
            style={{
              display: "flex",
              justifyContent: "center",
              width: "60%",
              backgroundColor: "#FFFFFF",
              opacity: "50%",
            }}
          >
            <div style={{ color: "#2B1105", width: "60%" }}>
              <h3
                className="text-center"
                style={{
                  fontSize: "2rem",
                  marginBottom: "1rem",
                }}
              >
                Gifts
              </h3>
              <p className="text-center" style={{ fontSize: "1rem" }}>
                Your presence at our wedding is the greatest gift of all.
                However should you wish to honour us with a gift, a wishing well
                will be available at the reception.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <div
          id="venue1"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), url('/carousel-intro-4.jpg')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          className="text-center"
        >
          <div
            className="py-36 w-full"
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "60%",
            }}
          >
            <div
              style={{
                color: "#000000",
                width: "30%",
                backgroundColor: "#FFFFFF",
                opacity: "50%",
              }}
            >
              <h3
                style={{
                  fontSize: "2rem",
                  marginBottom: "1rem",
                  marginTop: "1rem",
                }}
              >
                Parking
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  marginLeft: "1rem",
                  marginRight: "1rem",
                }}
              >
                There is ample public parking spaces in front of Carousel which
                costs $6.
              </p>
            </div>
            <div
              style={{
                color: "#000000",
                width: "30%",
                backgroundColor: "#FFFFFF",
                opacity: "50%",
              }}
            >
              <h3
                style={{
                  fontSize: "2rem",
                  marginBottom: "1rem",
                  marginTop: "1rem",
                }}
              >
                Dress Code
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  marginLeft: "1rem",
                  marginRight: "1rem",
                }}
              >
                Black Tie.
              </p>
            </div>
            <div
              style={{
                color: "#000000",
                width: "30%",
                backgroundColor: "#FFFFFF",
                opacity: "50%",
              }}
            >
              <h3
                style={{
                  fontSize: "2rem",
                  marginBottom: "1rem",
                  marginTop: "1rem",
                }}
              >
                Gifts
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  marginLeft: "1rem",
                  marginRight: "1rem",
                  marginBottom: "1rem",
                }}
              >
                Your presence at our wedding is the greatest gift of all.
                However should you wish to honour us with a gift, a wishing well
                will be available at the reception.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        id="rsvp"
        className="mx-8 sm:mx-0 pb-16 min-h-screen bg-FFFFFF flex flex-col items-center justify-center"
      >
        <div
          className="pt-16 pb-4"
          style={{
            fontSize: "3rem",
            color: "#2B1105",
            fontFamily: "Silenter, cursive",
          }}
        >
          Your Attendance
        </div>

        {success === "" && (
          <div style={{ fontSize: "1rem", color: "#2B1105" }}>
            Please RSVP by the 10th of March.
          </div>
        )}
        {success !== "" && (
          <p className="text-black">
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
                  backgroundColor: "#FFFFFF",
                  color: "#d4af37",
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
                  backgroundColor: "#FFFFFF",
                  color: "#57575757",
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
