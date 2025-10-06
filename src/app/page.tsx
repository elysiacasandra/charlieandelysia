"use client";
import Input from "@/components/Input";
import axios from "axios";
import InputSelect from "@/components/InputSelect";
import React, { useRef, useEffect, useState } from "react";

export default function Home() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [searchName, setSearchName] = useState("");
  const [foundGroup, setFoundGroup] = useState<any>(null);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [attendanceStatus, setAttendanceStatus] = useState<{
    [key: string]: string;
  }>({});
  const [mobileNumbers, setMobileNumbers] = useState<{ [key: string]: string }>(
    {}
  );
  const [dietaryRequirements, setDietaryRequirements] = useState<{
    [key: string]: string[];
  }>({});
  const [customDietary, setCustomDietary] = useState<{ [key: string]: string }>(
    {}
  );
  const [editingName, setEditingName] = useState<string | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<
    "search" | "confirm" | "details" | "complete"
  >("search");
  const [existingSubmission, setExistingSubmission] = useState<boolean>(false);
  const [showEditPrompt, setShowEditPrompt] = useState<boolean>(false);
  const [screenSize, setScreenSize] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // RSVP database - loaded from Google Sheets
  const [rsvpDatabase, setRsvpDatabase] = useState([
    {
      id: 1,
      group: "Charlie Robinson & Elysia Giannis",
      members: [
        { name: "Charlie Robinson", mobile: "" },
        { name: "Elysia Giannis", mobile: "" },
      ],
    },
    {
      id: 2,
      group: "Jake & Taylor Cunningham",
      members: [
        { name: "Jake Cunningham", mobile: "" },
        { name: "Taylor Giannis", mobile: "" },
      ],
    },
    {
      id: 3,
      group: "Jordan Giannis & Daniel Gordan",
      members: [
        { name: "Jordan Giannis", mobile: "" },
        { name: "Daniel Gordon", mobile: "" },
      ],
    },
    {
      id: 4,
      group: "Lou Giannis & Kathy Vlahakis",
      members: [
        { name: "Kathy Vlahakis", mobile: "" },
        { name: "Lou Giannis", mobile: "" },
      ],
    },
    {
      id: 5,
      group: "Con & Effie Vlahakis & Georgia Karaboiki",
      members: [
        { name: "Effie Vlahakis", mobile: "" },
        { name: "Con Vlahakis", mobile: "" },
        { name: "Georgia Karaboiki", mobile: "" },
      ],
    },
    {
      id: 6,
      group: "John & Maria Vlahogiannis",
      members: [
        { name: "Maria Vlahogiannis", mobile: "" },
        { name: "John Vlahogiannis", mobile: "" },
      ],
    },
    {
      id: 7,
      group: "The Gonopoulos Family",
      members: [
        { name: "Mary Vlahakis", mobile: "" },
        { name: "Stam Gonopoulos", mobile: "" },
        { name: "Anston Gonopoulos", mobile: "" },
        { name: "Matisse Gonopoulos", mobile: "" },
        { name: "Liselle Gonopoulos", mobile: "" },
      ],
    },
    {
      id: 8,
      group: "The Koutouzis Family",
      members: [
        { name: "Tassy Koutouzis", mobile: "" },
        { name: "John Koutouzis", mobile: "" },
        { name: "Darius Koutouzis", mobile: "" },
        { name: "Matea Koutouzis", mobile: "" },
      ],
    },
    {
      id: 9,
      group: "The Nastas Family",
      members: [
        { name: "Angela Nastas", mobile: "" },
        { name: "George Nastas", mobile: "" },
        { name: "Shana Nastas", mobile: "" },
      ],
    },
    {
      id: 10,
      group: "Troy Pirani",
      members: [{ name: "Troy Pirani", mobile: "" }],
    },
    {
      id: 11,
      group: "Mitch French & Alex Powell",
      members: [
        { name: "Mitch French", mobile: "" },
        { name: "Alex Powell", mobile: "" },
      ],
    },
    {
      id: 12,
      group: "David Mcfarlane & Georgie Tonkin",
      members: [
        { name: "Georgie Tonkin", mobile: "" },
        { name: "David Mcfarlane", mobile: "" },
      ],
    },
    {
      id: 13,
      group: "Dylan Clements",
      members: [{ name: "Dylan Clements", mobile: "" }],
    },
    {
      id: 14,
      group: "Mathew & Sally Powell",
      members: [
        { name: "Matthew Powell", mobile: "" },
        { name: "Sally Powell", mobile: "" },
      ],
    },
    {
      id: 15,
      group: "Olivia Ferella",
      members: [{ name: "Olivia Ferella", mobile: "" }],
    },
    {
      id: 16,
      group: "Daniel Phan",
      members: [{ name: "Daniel Phan", mobile: "" }],
    },
    {
      id: 17,
      group: "Ricardo Gallardo",
      members: [{ name: "Ricardo Gallardo", mobile: "" }],
    },
    {
      id: 18,
      group: "Liam Crough",
      members: [{ name: "Liam Crough", mobile: "" }],
    },
    {
      id: 19,
      group: "Nathan Genovese",
      members: [{ name: "Nathan Genovese", mobile: "" }],
    },
    {
      id: 20,
      group: "Kathy Nguyen",
      members: [{ name: "Kathy Nguyen", mobile: "" }],
    },
    {
      id: 21,
      group: "Melinda Mann",
      members: [{ name: "Melinda Mann", mobile: "" }],
    },
    {
      id: 22,
      group: "Ivan & Sandra Cindric",
      members: [
        { name: "Sandra Cindric", mobile: "" },
        { name: "Ivan Cindric", mobile: "" },
      ],
    },
    {
      id: 23,
      group: "Anthony & Tracy Spadafora",
      members: [
        { name: "Anthony Spadafora", mobile: "" },
        { name: "Tracy Spadafora", mobile: "" },
      ],
    },
    {
      id: 24,
      group: "Lou & Kathy Kourouklis",
      members: [
        { name: "Kathy Kourouklis", mobile: "" },
        { name: "Lou Kourouklis", mobile: "" },
      ],
    },
    {
      id: 25,
      group: "Samuel Robinson & Olivia La Selva",
      members: [
        { name: "Samuel Robinson", mobile: "" },
        { name: "Olivia La Selva", mobile: "" },
      ],
    },
    {
      id: 26,
      group: "Edward & Georgia Robinson",
      members: [
        { name: "Edward Robinson", mobile: "" },
        { name: "Georgia Robinson", mobile: "" },
      ],
    },
    {
      id: 27,
      group: "Peter Robinson & Joanne Furguson",
      members: [
        { name: "Peter Robinson", mobile: "" },
        { name: "Joanne Furgerson", mobile: "" },
      ],
    },
    {
      id: 28,
      group: "Grant, Jenny, Olivia & Liam Holmes",
      members: [{ name: "Jenny Holmes", mobile: "" }],
    },
  ]);

  // Load RSVP database from Google Sheets
  useEffect(() => {
    const loadRsvpData = async () => {
      try {
        const response = await fetch("/api/read-rsvp");
        const data = await response.json();

        if (data.success) {
          setRsvpDatabase(data.data);
          console.log("Loaded RSVP data from Google Sheets:", data.data);
        } else {
          console.error("Failed to load RSVP data:", data.error);
        }
      } catch (error) {
        console.error("Error loading RSVP data:", error);
      }
    };

    loadRsvpData();
  }, []);

  const dietaryOptions = [
    "None",
    "Gluten free",
    "Dairy Free",
    "Vegetarian",
    "Vegan",
    "Nut free",
    "Seafood Allergy",
    "Other",
  ];

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

  const handleSearch = () => {
    const searchTerm = searchName.toLowerCase().trim();

    if (!searchTerm) {
      setError("Please enter a name to search.");
      return;
    }

    // Clear any previous errors
    setError("");

    // Find exact matches only
    const found = rsvpDatabase.find((group) =>
      group.members.some((member) => member.name.toLowerCase() === searchTerm)
    );

    if (found) {
      setFoundGroup(found);
      setCurrentStep("confirm");
    } else {
      setError(
        "Name not found. Please check your spelling, type the name of another member of your party or contact us at 0434488448."
      );
    }
  };

  const checkExistingSubmission = async (groupId: number) => {
    try {
      // For now, we'll simulate checking for existing submissions
      // In a real implementation, you would check your Google Sheet for existing entries
      const response = await fetch(`/api/check-submission?groupId=${groupId}`);
      const data = await response.json();
      return data.hasExistingSubmission || false;
    } catch (error) {
      console.error("Error checking existing submission:", error);
      return false;
    }
  };

  const handleGroupSelect = async (group: any) => {
    setSelectedGroup(group);
    setCurrentStep("details");

    // Check for existing submission
    const hasExisting = await checkExistingSubmission(group.id);
    setExistingSubmission(hasExisting);

    // Initialize attendance status and mobile numbers for all members
    const initialAttendance: { [key: string]: string } = {};
    const initialDietary: { [key: string]: string[] } = {};
    const initialMobile: { [key: string]: string } = {};
    group.members.forEach((member: any) => {
      initialAttendance[member.name] = "";
      initialDietary[member.name] = [];
      // Prepopulate mobile number if it exists in the database
      initialMobile[member.name] = member.mobile || "04";
    });
    setAttendanceStatus(initialAttendance);
    setDietaryRequirements(initialDietary);
    setMobileNumbers(initialMobile);
  };

  const handleAttendanceChange = (memberName: string, status: string) => {
    setAttendanceStatus((prev) => ({
      ...prev,
      [memberName]: status,
    }));
  };

  const handleMobileChange = (memberName: string, mobile: string) => {
    setMobileNumbers((prev) => ({
      ...prev,
      [memberName]: mobile,
    }));
  };

  const handleCustomDietaryChange = (memberName: string, custom: string) => {
    setCustomDietary((prev) => ({
      ...prev,
      [memberName]: custom,
    }));
  };

  const handleEditName = (memberName: string) => {
    setEditingName(memberName);
    setEditedName(memberName);
  };

  const handleSaveNameEdit = () => {
    if (!editingName || !editedName.trim()) return;

    // Update the member name in the selected group
    const updatedGroup = {
      ...selectedGroup,
      members: selectedGroup.members.map((member: any) =>
        member.name === editingName
          ? { ...member, name: editedName.trim() }
          : member
      ),
    };

    // Update group name if this was the primary member
    const primaryMember = updatedGroup.members.find((m: any) => m.isPrimary);
    if (primaryMember && editingName === primaryMember.name) {
      updatedGroup.group = updatedGroup.group.replace(
        editingName,
        editedName.trim()
      );
    }

    setSelectedGroup(updatedGroup);
    setEditingName(null);
    setEditedName("");
  };

  const handleCancelNameEdit = () => {
    setEditingName(null);
    setEditedName("");
  };

  const submitForm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    // Check if this is a resubmission
    if (existingSubmission && !showEditPrompt) {
      setShowEditPrompt(true);
      return;
    }

    // Validate all attending guests have dietary requirements
    const attendingMembers = selectedGroup.members.filter(
      (member: any) => attendanceStatus[member.name] === "attending"
    );

    const missingDietary = attendingMembers.some((member: any) => {
      const hasDietary = (dietaryRequirements[member.name] || []).length > 0;
      const hasCustomDietary = (
        dietaryRequirements[member.name] || []
      ).includes("Other")
        ? customDietary[member.name] && customDietary[member.name].trim() !== ""
        : true;
      return !hasDietary || !hasCustomDietary;
    });

    if (missingDietary) {
      setError("Please provide dietary requirements for all attending guests.");
      return;
    }

    // Prepare data for submission
    const newData = new URLSearchParams();
    newData.append("group_id", selectedGroup.id.toString());
    newData.append("group_name", selectedGroup.group);

    selectedGroup.members.forEach((member: any, index: number) => {
      const isAttending = attendanceStatus[member.name] === "attending";
      const memberDietary = dietaryRequirements[member.name] || [];
      const hasCustom = memberDietary.includes("Other");
      const dietary =
        hasCustom && customDietary[member.name]
          ? [
              ...memberDietary.filter((item) => item !== "Other"),
              customDietary[member.name],
            ].join(", ")
          : memberDietary.join(", ");

      newData.append(`member_${index}_name`, member.name);
      newData.append(`member_${index}_attending`, isAttending ? "Yes" : "No");
      newData.append(
        `member_${index}_mobile`,
        mobileNumbers[member.name] || ""
      );
      newData.append(`member_${index}_dietary`, dietary || "None");
    });

    // Submit to Google Sheets
    fetch("/api/update-rsvp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: selectedGroup.id,
        groupName: selectedGroup.group,
        members: selectedGroup.members.map((member: any, index: number) => ({
          name: member.name,
          attending:
            attendanceStatus[member.name] === "attending" ? "Yes" : "No",
          mobile: mobileNumbers[member.name] || "",
          dietary: (() => {
            const memberDietary = dietaryRequirements[member.name] || [];
            const hasCustom = memberDietary.includes("Other");
            return hasCustom && customDietary[member.name]
              ? [
                  ...memberDietary.filter((item) => item !== "Other"),
                  customDietary[member.name],
                ].join(", ")
              : memberDietary.join(", ") || "None";
          })(),
        })),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCurrentStep("complete");
          setSuccess("Thank you for your RSVP!");
          scrollToRsvp();
        } else {
          throw new Error(data.error || "Failed to update RSVP");
        }
      })
      .catch((error) => {
        console.error("Error submitting RSVP:", error);
        setError("We were unable to submit your RSVP. Please try again.");
      });
  };

  const handleEditResponse = (shouldEdit: boolean) => {
    if (shouldEdit) {
      setShowEditPrompt(false);
      // Allow form submission to proceed
    } else {
      setShowEditPrompt(false);
      setCurrentStep("complete");
    }
  };

  const resetForm = () => {
    setSearchName("");
    setFoundGroup(null);
    setSelectedGroup(null);
    setAttendanceStatus({});
    setMobileNumbers({});
    setDietaryRequirements({});
    setCustomDietary({});
    setEditingName(null);
    setEditedName("");
    setExistingSubmission(false);
    setShowEditPrompt(false);
    setCurrentStep("search");
    setError("");
    setSuccess("");
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
            <img
              src="/fig.jpg"
              alt="Background"
              style={{
                width: "100vw",
                height: "100vh",
                objectFit: "cover",
                objectPosition: "center",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "75%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "#FFFFFF",
            }}
          >
            <div
              style={{
                fontSize: "clamp(2rem, 8vw, 3rem)",
                marginBottom: "0.5rem",
                fontWeight: "400",
                whiteSpace: "nowrap",
              }}
            >
              Charlie & Elysia
            </div>
            <div
              style={{
                fontSize: "1.2rem",
                fontWeight: "300",
                fontStyle: "italic",
              }}
            >
              a decade distilled
            </div>
            <div
              onClick={scrollToRsvp}
              style={{
                fontSize: "1rem",
                fontWeight: "400",
                marginTop: "2rem",
                cursor: "pointer",
                textDecoration: "underline",
                textDecorationThickness: "1px",
                textUnderlineOffset: "4px",
                transition: "all 0.3s ease",
                opacity: 0.9,
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.opacity = "1";
                target.style.textDecorationThickness = "2px";
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.opacity = "0.9";
                target.style.textDecorationThickness = "1px";
              }}
            >
              RSVP
            </div>
          </div>
        </div>
      </div>
      <div
        id="itinerary"
        className="py-16"
        style={{
          height: "33%",
          backgroundColor: "#F5F5F0",
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
          <p>THE FOURTEENTH OF FEBRUARY TWO THOUSAND AND TWENTY SIX</p>
          <p>SUNNYSIDE ESTATE</p>
          <p>1 SUNNYSIDE RD, MOUNT ELIZA, VIC</p>
        </div>
        <div className="hidden md:block">
          <div style={{ display: "flex", marginTop: "2rem" }}>
            <div
              className=""
              style={{
                fontSize: "1.5rem",
                marginRight: "35rem",
                color: "#686a4f",
              }}
            >
              4pm
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
                Please arrive at 3:45pm so there is time to walk to the Manor
                Gardens and find your seat.
              </div>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "2rem" }}>
            <div
              style={{
                fontSize: "1.5rem",
                marginRight: "35rem",
                color: "#686a4f",
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
                Meze & Drinks
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  color: "#2B1105",
                  marginLeft: "-25rem",
                }}
              >
                Let us break bread together beneath the late afternoon sun -
                with flowing wine, live music, and good company.
              </div>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "2rem" }}>
            <div
              style={{
                fontSize: "1.5rem",
                marginRight: "35rem",
                color: "#686a4f",
              }}
            >
              7pm
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
                A night of feasting and celebration, concluding at midnight.
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
                  color: "#686a4f",
                }}
              >
                4pm
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
                Please arrive at 3:45pm so there is time to walk to the Manor
                Gardens and find your seat.
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
                  color: "#686a4f",
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
                Meze & Drinks
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  color: "#2B1105",
                  marginLeft: "-25rem",
                }}
              >
                Let us break bread together - with flowing wine, live music, and
                good company.
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
                  color: "#686a4f",
                }}
              >
                7pm
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
                A night of celebration, concluding at midnight.
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
                All the events of the day will be hosted at Sunnyside Estate,
                which is less than an hours drive from Melbourne. Food and
                drinks will be provided between the ceremony and the reception,
                so there is no need to leave the estate prior to the reception.
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
                There are free and ample parking spaces on site. However, cars
                are unable to be parked here overnight. Please park your car
                outside the estate, on Sunnyside Rd, if you plan to leave it
                overnight.
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
                Transport
              </h3>
              <p className="text-center" style={{ fontSize: "1rem" }}>
                You are able to drive or organise a car service like taxi or
                uber to get you to and from the wedding. We encourage you to
                book ahead of time so that there are enough ride shares in the
                area for all our guests.
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
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              width: "80%",
            }}
          >
            <div style={{ color: "#FFFFFF" }}>
              <h3 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Venue</h3>
              <p style={{ fontSize: "1rem" }}>
                All the events of the day will be hosted at Sunnyside Estate,
                which is less than an hours drive from Melbourne. Food and
                drinks will be provided between the ceremony and the reception,
                so there is no need to leave the estate prior to the reception.
              </p>
            </div>
            <div style={{ color: "#FFFFFF" }}>
              <h3 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                Parking
              </h3>
              <p style={{ fontSize: "1rem" }}>
                There are free and ample parking spaces on site. However, cars
                are unable to be parked here overnight. Please park your car
                outside the estate, on Sunnyside Rd, if you plan to leave it
                overnight.
              </p>
            </div>
            <div style={{ color: "#FFFFFF" }}>
              <h3 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                Transport
              </h3>
              <p style={{ fontSize: "1rem" }}>
                You are able to drive or organise a car service like taxi or
                uber to get you to and from the wedding. We encourage you to
                book ahead of time so that there are enough ride shares in the
                area for all our guests.
              </p>
            </div>
            <div style={{ color: "#FFFFFF" }}>
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

        {currentStep === "search" && (
          <>
            <div
              style={{
                fontSize: "1rem",
                color: "#2B1105",
                marginBottom: "2rem",
              }}
            >
              Please RSVP by the 1st of December.
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Full Name*
              </label>
              <Input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                onChange={(value) => setSearchName(value)}
                value={typeof searchName === "string" ? searchName : ""}
                placeholder="Enter your full name"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={
                !searchName ||
                typeof searchName !== "string" ||
                !searchName.trim()
              }
              className="px-6 py-2 text-white font-semibold transition duration-150 ease-in-out shadow-md"
              style={{
                backgroundColor:
                  searchName &&
                  typeof searchName === "string" &&
                  searchName.trim()
                    ? "#BFDACC"
                    : "#E5E5E5",
                color:
                  searchName &&
                  typeof searchName === "string" &&
                  searchName.trim()
                    ? "#729A90"
                    : "#999",
                padding: "0.5rem 1.5rem",
                border: "none",
                cursor:
                  searchName &&
                  typeof searchName === "string" &&
                  searchName.trim()
                    ? "pointer"
                    : "not-allowed",
                opacity:
                  searchName &&
                  typeof searchName === "string" &&
                  searchName.trim()
                    ? 1
                    : 0.5,
              }}
            >
              Search
            </button>
          </>
        )}

        {currentStep === "confirm" && foundGroup && (
          <>
            <div
              style={{
                fontSize: "1rem",
                color: "#2B1105",
                marginBottom: "2rem",
              }}
            >
              Is this you?
            </div>
            <div
              onClick={() => handleGroupSelect(foundGroup)}
              className="p-4 border-2 border-gray-300 rounded cursor-pointer hover:border-gray-400 transition-colors"
              style={{ backgroundColor: "#F5F5F0" }}
            >
              <h3 className="font-semibold text-lg mb-2">{foundGroup.group}</h3>
              <div className="space-y-1">
                {foundGroup.members.map((member: any, index: number) => (
                  <div key={index} className="text-gray-700">
                    {member.name}
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setCurrentStep("search")}
              className="mt-4 text-gray-600 underline"
            >
              Not you? Search again
            </button>
          </>
        )}

        {currentStep === "details" && selectedGroup && (
          <form>
            {/* Edit Prompt for Resubmissions */}
            {showEditPrompt && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-4">
                  You've already submitted an RSVP for this group.
                </h3>
                <p className="text-yellow-700 mb-4">
                  Would you like to edit your previous response?
                </p>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => handleEditResponse(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Yes, Edit My Response
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEditResponse(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    No, Keep Original
                  </button>
                </div>
              </div>
            )}
            <div
              style={{
                fontSize: "1rem",
                color: "#2B1105",
                marginBottom: "2rem",
              }}
            >
              RSVP for {selectedGroup.group}
            </div>

            {selectedGroup.members.map((member: any, index: number) => (
              <div
                key={index}
                className="mb-6 p-4 border rounded"
                style={{ backgroundColor: "#F5F5F0" }}
              >
                <div className="flex items-center justify-between mb-3">
                  {editingName === member.name ? (
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        className="appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1"
                        type="text"
                        onChange={(value) => setEditedName(value)}
                        value={editedName}
                        placeholder="Enter name"
                      />
                      <button
                        onClick={handleSaveNameEdit}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelNameEdit}
                        className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <h4 className="font-semibold text-lg">{member.name}</h4>
                      <button
                        onClick={() => handleEditName(member.name)}
                        className="text-green-700 text-sm underline hover:text-green-800"
                      >
                        Edit spelling
                      </button>
                    </>
                  )}
                </div>

                {/* Attendance Status */}
                <div className="mb-4">
                  <span className="block text-gray-700 font-bold mb-2">
                    Attendance*
                  </span>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-green-700"
                        name={`attendance_${member.name}`}
                        value="attending"
                        checked={attendanceStatus[member.name] === "attending"}
                        onChange={(e) =>
                          handleAttendanceChange(member.name, e.target.value)
                        }
                      />
                      <span className="ml-2 text-gray-700">Attending</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-green-700"
                        name={`attendance_${member.name}`}
                        value="not_attending"
                        checked={
                          attendanceStatus[member.name] === "not_attending"
                        }
                        onChange={(e) =>
                          handleAttendanceChange(member.name, e.target.value)
                        }
                      />
                      <span className="ml-2 text-gray-700">Not Attending</span>
                    </label>
                  </div>
                </div>

                {/* Mobile Number (only if attending) */}
                {attendanceStatus[member.name] === "attending" && (
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Mobile Number
                    </label>
                    <Input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="tel"
                      onChange={(value) =>
                        handleMobileChange(member.name, value)
                      }
                      value={mobileNumbers[member.name] || "04"}
                      placeholder="04"
                    />
                  </div>
                )}

                {/* Dietary Requirements (only if attending) */}
                {attendanceStatus[member.name] === "attending" && (
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Dietary Requirements* (select all that apply)
                    </label>
                    <div className="space-y-2">
                      {dietaryOptions.map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-green-700"
                            checked={(
                              dietaryRequirements[member.name] || []
                            ).includes(option)}
                            onChange={() => {
                              const currentDietary =
                                dietaryRequirements[member.name] || [];
                              const newDietary = currentDietary.includes(option)
                                ? currentDietary.filter(
                                    (item) => item !== option
                                  )
                                : [...currentDietary, option];

                              setDietaryRequirements((prev) => ({
                                ...prev,
                                [member.name]: newDietary,
                              }));
                            }}
                          />
                          <span className="ml-2 text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>

                    {(dietaryRequirements[member.name] || []).includes(
                      "Other"
                    ) && (
                      <Input
                        className="mt-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        onChange={(value) =>
                          handleCustomDietaryChange(member.name, value)
                        }
                        value={customDietary[member.name] || ""}
                        placeholder="Please specify dietary requirements"
                        required
                      />
                    )}
                  </div>
                )}
              </div>
            ))}

            <div className="flex items-center justify-center mt-6">
              <button
                type="submit"
                onClick={submitForm}
                className="px-6 py-2 text-white font-semibold transition duration-150 ease-in-out shadow-md"
                style={{
                  backgroundColor: "#BFDACC",
                  color: "#729A90",
                  padding: "0.5rem 1.5rem",
                  border: "none",
                }}
              >
                Submit RSVP
              </button>
            </div>
          </form>
        )}

        {currentStep === "complete" && (
          <div className="text-center">
            <p className="text-green-700 text-lg mb-4">
              Thank you for your RSVP! We look forward to seeing you on our
              special day.
            </p>
            <button
              onClick={resetForm}
              className="px-6 py-2 text-white font-semibold transition duration-150 ease-in-out shadow-md"
              style={{
                backgroundColor: "#BFDACC",
                color: "#729A90",
                padding: "0.5rem 1.5rem",
                border: "none",
              }}
            >
              Submit Another RSVP
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {typeof error === "string"
              ? error
              : `Error: ${JSON.stringify(error)}`}
          </div>
        )}
      </div>
    </main>
  );
}
