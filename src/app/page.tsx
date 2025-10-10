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
      group: "Peter Robinson & Joanne Ferguson",
      members: [
        { name: "Peter Robinson", mobile: "" },
        { name: "Joanne Ferguson", mobile: "" },
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

  // Scroll reveal animation
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    const handleScroll = () => {
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
          element.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentStep]);

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

  const checkExistingSubmission = async (
    groupId: number,
    personName: string
  ) => {
    try {
      const response = await fetch(
        `/api/check-submission?groupId=${groupId}&personName=${encodeURIComponent(
          personName
        )}`
      );

      if (!response.ok) {
        console.warn(`API request failed with status: ${response.status}`);
        return false;
      }

      const data = await response.json();
      return data.hasExistingSubmission || false;
    } catch (error) {
      console.error("Error checking existing submission:", error);
      // Return false to allow new submissions when API is unavailable
      return false;
    }
  };

  const handleGroupSelect = async (group: any) => {
    setSelectedGroup(group);

    // Check for existing submission using the searched name
    const nameToCheck = typeof searchName === "string" ? searchName : "";
    console.log(
      "Checking existing submission for:",
      nameToCheck,
      "in group:",
      group.id
    );
    const hasExisting = await checkExistingSubmission(group.id, nameToCheck);
    console.log("Has existing submission:", hasExisting);
    setExistingSubmission(hasExisting);

    // If there's an existing submission, show the edit prompt in the confirm step
    if (hasExisting) {
      setShowEditPrompt(true);
      // Stay in confirm step to show the edit prompt
    } else {
      setShowEditPrompt(false);
      setCurrentStep("details");
    }

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

    // If edit prompt is showing, don't submit yet - wait for user's choice
    if (showEditPrompt) {
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

    // Submit to Google Sheets - use update endpoint for both new and existing submissions
    // The API will handle the distinction internally
    console.log("About to submit RSVP form...");
    console.log("Selected group:", selectedGroup);
    console.log("Attendance status:", attendanceStatus);
    console.log("Dietary requirements:", dietaryRequirements);
    console.log("Mobile numbers:", mobileNumbers);

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
        isNewSubmission: !existingSubmission, // Flag to indicate if this is a new submission
      }),
    })
      .then((response) => {
        console.log("Response received:", response.status, response.statusText);
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
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
      setCurrentStep("details");
      // Allow form submission to proceed
    } else {
      setShowEditPrompt(false);
      setCurrentStep("complete");
    }
  };

  // Check if form is valid (all guests have attendance status and attending guests have dietary requirements)
  const isFormValid = () => {
    if (!selectedGroup) return false;

    // Check if all members have attendance status selected
    const allMembersHaveAttendance = selectedGroup.members.every(
      (member: any) =>
        attendanceStatus[member.name] === "attending" ||
        attendanceStatus[member.name] === "not_attending"
    );

    if (!allMembersHaveAttendance) return false;

    // Check if all attending members have dietary requirements
    const attendingMembers = selectedGroup.members.filter(
      (member: any) => attendanceStatus[member.name] === "attending"
    );

    const hasAllDietary = attendingMembers.every((member: any) => {
      const hasDietary = (dietaryRequirements[member.name] || []).length > 0;
      const hasCustomDietary = (
        dietaryRequirements[member.name] || []
      ).includes("Other")
        ? customDietary[member.name] && customDietary[member.name].trim() !== ""
        : true;
      return hasDietary && hasCustomDietary;
    });

    return hasAllDietary;
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
    <main
      className="flex min-h-screen flex-col justify-between overflow-x-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div>
        <div className="h-screen">
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
              className="animate-fade-in"
              style={{
                fontSize: "clamp(3rem, 10vw, 8rem)",
                marginBottom: "0.5rem",
                fontFamily: "var(--font-serif)",
                fontWeight: "400",
                letterSpacing: "-0.03em",
                whiteSpace: "nowrap",
                lineHeight: "1",
              }}
            >
              Charlie & Elysia
            </div>
            <div
              className="animate-fade-in animate-delay-200"
              style={{
                fontSize: "clamp(1rem, 2vw, 1.5rem)",
                fontFamily: "var(--font-sans)",
                fontWeight: "300",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              a decade distilled
            </div>
            <div
              className="animate-fade-in animate-delay-400"
              onClick={scrollToRsvp}
              style={{
                fontSize: "0.875rem",
                fontFamily: "var(--font-sans)",
                fontWeight: "400",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginTop: "0",
                cursor: "pointer",
                position: "relative",
                display: "inline-block",
                transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
                border: "1px solid #FFFFFF",
                borderRadius: "50px",
                padding: "0.75rem 2.5rem",
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.backgroundColor = "#FFFFFF";
                target.style.color = "#1C1C1C";
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.backgroundColor = "transparent";
                target.style.color = "#FFFFFF";
              }}
            >
              rsvp
            </div>
          </div>
        </div>
      </div>
      <div
        id="itinerary"
        className="min-h-screen"
        style={{
          backgroundColor: "#F5F5F2",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem 1rem",
        }}
      >
        <div
          className="reveal"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            color: "#1C1C1C",
            fontFamily: "var(--font-serif)",
            fontWeight: "400",
            letterSpacing: "-0.02em",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          Itinerary
        </div>
        <div
          style={{
            fontSize: "0.875rem",
            color: "#1C1C1C",
            textAlign: "center",
            fontFamily: "var(--font-sans)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: "400",
            marginBottom: "2rem",
          }}
        >
          <p
            className="reveal"
            style={{ marginBottom: "0.25rem", color: "#777777" }}
          >
            14 february 2026
          </p>
          <p
            className="reveal animate-delay-100"
            style={{ marginBottom: "0.25rem", color: "#777777" }}
          >
            sunnyside estate
          </p>
          <p className="reveal animate-delay-200" style={{ color: "#777777" }}>
            1 sunnyside rd, mount eliza, vic
          </p>
        </div>
        {/* Desktop Layout - Horizontal */}
        <div className="hidden lg:flex">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "4rem",
              marginTop: "2rem",
              maxWidth: "1000px",
              margin: "2rem auto 0",
              padding: "0 2rem",
            }}
          >
            {/* 4pm Ceremony */}
            <div style={{ textAlign: "center", maxWidth: "280px" }}>
              <div
                className="reveal"
                style={{
                  fontSize: "1.25rem",
                  color: "#3E5C3C",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                4pm
              </div>
              <div
                className="reveal animate-delay-100"
                style={{
                  fontSize: "1.5rem",
                  color: "#1C1C1C",
                  fontFamily: "var(--font-sans)",
                  fontWeight: "300",
                  marginBottom: "0.75rem",
                }}
              >
                Ceremony
              </div>
              <div
                className="reveal animate-delay-200"
                style={{
                  fontSize: "0.875rem",
                  color: "#777777",
                  fontFamily: "var(--font-sans)",
                  fontWeight: "300",
                  lineHeight: "1.6",
                }}
              >
                Please arrive at 3:45pm.
              </div>
            </div>

            {/* 5pm Meze & Drinks */}
            <div style={{ textAlign: "center", maxWidth: "280px" }}>
              <div
                className="reveal"
                style={{
                  fontSize: "1.25rem",
                  color: "#3E5C3C",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                5pm
              </div>
              <div
                className="reveal animate-delay-100"
                style={{
                  fontSize: "1.5rem",
                  color: "#1C1C1C",
                  fontFamily: "var(--font-sans)",
                  fontWeight: "300",
                  marginBottom: "0.75rem",
                }}
              >
                Meze & Drinks
              </div>
              <div
                className="reveal animate-delay-200"
                style={{
                  fontSize: "0.875rem",
                  color: "#777777",
                  fontFamily: "var(--font-sans)",
                  fontWeight: "300",
                  lineHeight: "1.6",
                }}
              >
                Open bar and canapés.
              </div>
            </div>

            {/* 7pm Reception */}
            <div style={{ textAlign: "center", maxWidth: "280px" }}>
              <div
                className="reveal"
                style={{
                  fontSize: "1.25rem",
                  color: "#3E5C3C",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                7pm
              </div>
              <div
                className="reveal animate-delay-100"
                style={{
                  fontSize: "1.5rem",
                  color: "#1C1C1C",
                  fontFamily: "var(--font-sans)",
                  fontWeight: "300",
                  marginBottom: "0.75rem",
                }}
              >
                Reception
              </div>
              <div
                className="reveal animate-delay-200"
                style={{
                  fontSize: "0.875rem",
                  color: "#777777",
                  fontFamily: "var(--font-sans)",
                  fontWeight: "300",
                  lineHeight: "1.6",
                }}
              >
                Concluding at midnight.
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Vertical */}
        <div
          className="flex flex-col lg:hidden px-6"
          style={{
            gap: "1.5rem",
            marginTop: "2rem",
          }}
        >
          {/* 4pm Ceremony */}
          <div style={{ textAlign: "center", maxWidth: "280px" }}>
            <div
              className="reveal"
              style={{
                fontSize: "1.25rem",
                color: "#3E5C3C",
                fontFamily: "var(--font-sans)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              4pm
            </div>
            <div
              className="reveal animate-delay-100"
              style={{
                fontSize: "1.5rem",
                color: "#1C1C1C",
                fontFamily: "var(--font-sans)",
                fontWeight: "300",
                marginBottom: "0.75rem",
              }}
            >
              Ceremony
            </div>
            <div
              className="reveal animate-delay-200"
              style={{
                fontSize: "0.875rem",
                color: "#777777",
                fontFamily: "var(--font-sans)",
                fontWeight: "300",
                lineHeight: "1.6",
              }}
            >
              Please arrive at 3:45pm.
            </div>
          </div>

          {/* 5pm Meze & Drinks */}
          <div style={{ textAlign: "center", maxWidth: "280px" }}>
            <div
              className="reveal"
              style={{
                fontSize: "1.25rem",
                color: "#3E5C3C",
                fontFamily: "var(--font-sans)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              5pm
            </div>
            <div
              className="reveal animate-delay-100"
              style={{
                fontSize: "1.5rem",
                color: "#1C1C1C",
                fontFamily: "var(--font-sans)",
                fontWeight: "300",
                marginBottom: "0.75rem",
              }}
            >
              Meze & Drinks
            </div>
            <div
              className="reveal animate-delay-200"
              style={{
                fontSize: "0.875rem",
                color: "#777777",
                fontFamily: "var(--font-sans)",
                fontWeight: "300",
                lineHeight: "1.6",
              }}
            >
              Open bar and canapés.
            </div>
          </div>

          {/* 7pm Reception */}
          <div style={{ textAlign: "center", maxWidth: "280px" }}>
            <div
              className="reveal"
              style={{
                fontSize: "1.25rem",
                color: "#3E5C3C",
                fontFamily: "var(--font-sans)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              7pm
            </div>
            <div
              className="reveal animate-delay-100"
              style={{
                fontSize: "1.5rem",
                color: "#1C1C1C",
                fontFamily: "var(--font-sans)",
                fontWeight: "300",
                marginBottom: "0.75rem",
              }}
            >
              Reception
            </div>
            <div
              className="reveal animate-delay-200"
              style={{
                fontSize: "0.875rem",
                color: "#777777",
                fontFamily: "var(--font-sans)",
                fontWeight: "300",
                lineHeight: "1.6",
              }}
            >
              Concluding at midnight.
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <div
          id="venue"
          style={{
            minHeight: "50vh",
            backgroundColor: "#F5F5F2",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "6rem 1.5rem",
          }}
        >
          <div
            className="py-16 w-full"
            style={{ display: "flex", justifyContent: "center", width: "90%" }}
          >
            <div style={{ color: "#1C1C1C", width: "60%" }}>
              <img
                src="/IMG_8807.JPG"
                alt="Venue"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  marginBottom: "2rem",
                  borderRadius: "8px",
                }}
              />
              <h3
                className="text-center reveal"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  marginBottom: "1.5rem",
                  fontFamily: "var(--font-serif)",
                  fontWeight: "400",
                  letterSpacing: "-0.02em",
                }}
              >
                Accomodation
              </h3>
              <p
                className="text-center reveal animate-delay-100"
                style={{
                  fontSize: "1rem",
                  fontFamily: "var(--font-sans)",
                  fontWeight: "300",
                  color: "#777777",
                  lineHeight: "1.7",
                }}
              >
                Sunnyside Estate is less than an hour's drive from Melbourne.
                Should you choose to book accommodation nearby for the wedding
                night, there are a number of hotels and airbnbs in the area. We
                have been recommended Brooklands Hotel in Mornington.
              </p>
            </div>
          </div>
          <div
            className="pb-16 w-full"
            style={{ display: "flex", justifyContent: "center", width: "90%" }}
          >
            <div style={{ color: "#1C1C1C", width: "60%" }}>
              <img
                src="/IMG_8811.JPG"
                alt="Parking"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  marginBottom: "2rem",
                  borderRadius: "8px",
                }}
              />
              <h3
                className="text-center reveal"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  marginBottom: "1.5rem",
                  fontFamily: "var(--font-serif)",
                  fontWeight: "400",
                  letterSpacing: "-0.02em",
                }}
              >
                Transport
              </h3>
              <p
                className="text-center reveal animate-delay-100"
                style={{
                  fontSize: "1rem",
                  fontFamily: "var(--font-sans)",
                  fontWeight: "300",
                  color: "#777777",
                  lineHeight: "1.7",
                }}
              >
                There is free parking in the estate. Please park your car
                outside the estate, on Sunnyside Rd, if you plan to leave it
                overnight. If you choose to rideshare, we encourage you to book
                ahead of time so that there are enough vehicles in the area for
                all our guests.
              </p>
            </div>
          </div>
          <div
            className="pb-16 w-full"
            style={{ display: "flex", justifyContent: "center", width: "90%" }}
          >
            <div style={{ color: "#1C1C1C", width: "60%" }}>
              <img
                src="/IMG_8806.JPG"
                alt="Gifts"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  marginBottom: "2rem",
                  borderRadius: "8px",
                }}
              />
              <h3
                className="text-center reveal"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  marginBottom: "1.5rem",
                  fontFamily: "var(--font-serif)",
                  fontWeight: "400",
                  letterSpacing: "-0.02em",
                }}
              >
                Gifts
              </h3>
              <p
                className="text-center reveal animate-delay-100"
                style={{
                  fontSize: "1rem",
                  fontFamily: "var(--font-sans)",
                  fontWeight: "300",
                  color: "#777777",
                  lineHeight: "1.7",
                }}
              >
                Your presence at our wedding is truly the greatest gift. However
                should you wish to honour us further, a wishing well will be
                present on the evening.
              </p>
            </div>
          </div>
          <div
            className="pb-16 w-full"
            style={{ display: "flex", justifyContent: "center", width: "90%" }}
          >
            <div style={{ color: "#1C1C1C", width: "60%" }}>
              <img
                src="/grapes.JPG"
                alt="Children"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  marginBottom: "2rem",
                  borderRadius: "8px",
                }}
              />
              <h3
                className="text-center reveal"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  marginBottom: "1.5rem",
                  fontFamily: "var(--font-serif)",
                  fontWeight: "400",
                  letterSpacing: "-0.02em",
                }}
              >
                Guests
              </h3>
              <p
                className="text-center reveal animate-delay-100"
                style={{
                  fontSize: "1rem",
                  fontFamily: "var(--font-sans)",
                  fontWeight: "300",
                  color: "#777777",
                  lineHeight: "1.7",
                }}
              >
                We kindly request that only those listed in the RSVP group join
                us in celebrating. This event is for people who are 12+ years
                old unless your children are directly invited.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <div
          id="venue1"
          style={{
            backgroundColor: "#F5F5F2",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "6rem 2rem",
          }}
        >
          <div
            className="w-full"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "2rem",
              width: "90%",
              maxWidth: "1400px",
            }}
          >
            <div style={{ color: "#1C1C1C" }}>
              <img
                src="/IMG_8807.JPG"
                alt="Venue"
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  marginBottom: "1.5rem",
                  borderRadius: "8px",
                }}
              />
              <h3
                className="reveal"
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                  fontFamily: "var(--font-serif)",
                  fontWeight: "400",
                  letterSpacing: "-0.02em",
                }}
              >
                Accomodation
              </h3>
              <p
                className="reveal animate-delay-100"
                style={{
                  fontSize: "0.875rem",
                  fontFamily: "var(--font-sans)",
                  fontWeight: "300",
                  color: "#777777",
                  lineHeight: "1.7",
                }}
              >
                Sunnyside Estate is less than an hour's drive from Melbourne.
                Should you choose to book accommodation nearby for the wedding
                night, there are a number of hotels and airbnbs in the area. We
                have been recommended Brooklands Hotel in Mornington.
              </p>
            </div>
            <div style={{ color: "#1C1C1C" }}>
              <img
                src="/IMG_8811.JPG"
                alt="Parking"
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  marginBottom: "1.5rem",
                  borderRadius: "8px",
                }}
              />
              <h3
                className="reveal"
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                  fontFamily: "var(--font-serif)",
                  fontWeight: "400",
                  letterSpacing: "-0.02em",
                }}
              >
                Transport
              </h3>
              <p
                className="reveal animate-delay-100"
                style={{
                  fontSize: "0.875rem",
                  fontFamily: "var(--font-sans)",
                  fontWeight: "300",
                  color: "#777777",
                  lineHeight: "1.7",
                }}
              >
                There is free parking in the estate. Please park your car
                outside the estate, on Sunnyside Rd, if you plan to leave it
                overnight. If you choose to rideshare, we encourage you to book
                ahead of time so that there are enough vehicles in the area for
                all our guests.
              </p>
            </div>
            <div style={{ color: "#1C1C1C" }}>
              <img
                src="/IMG_8806.JPG"
                alt="Gifts"
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  marginBottom: "1.5rem",
                  borderRadius: "8px",
                }}
              />
              <h3
                className="reveal"
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                  fontFamily: "var(--font-serif)",
                  fontWeight: "400",
                  letterSpacing: "-0.02em",
                }}
              >
                Gifts
              </h3>
              <p
                className="reveal animate-delay-100"
                style={{
                  fontSize: "0.875rem",
                  fontFamily: "var(--font-sans)",
                  fontWeight: "300",
                  color: "#777777",
                  lineHeight: "1.7",
                }}
              >
                Your presence at our wedding is truly the greatest gift. However
                should you wish to honour us further, a wishing well will be
                present on the evening.
              </p>
            </div>
            <div style={{ color: "#1C1C1C" }}>
              <img
                src="/grapes.JPG"
                alt="Children"
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  marginBottom: "1.5rem",
                  borderRadius: "8px",
                }}
              />
              <h3
                className="reveal"
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                  fontFamily: "var(--font-serif)",
                  fontWeight: "400",
                  letterSpacing: "-0.02em",
                }}
              >
                Guests
              </h3>
              <p
                className="reveal animate-delay-100"
                style={{
                  fontSize: "0.875rem",
                  fontFamily: "var(--font-sans)",
                  fontWeight: "300",
                  color: "#777777",
                  lineHeight: "1.7",
                }}
              >
                We kindly request that only those listed in the RSVP group join
                us in celebrating. This event is for people who are 12+ years
                old unless your children are directly invited.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dress Code Section */}
      <div
        style={{
          backgroundImage: "url('/IMG_9189.JPG')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "50vh",
          minHeight: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Overlay for better text readability */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 1,
          }}
        />

        {/* Content overlay */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "600px",
            width: "100%",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h3
            className="reveal"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              color: "#FFFFFF",
              fontFamily: "var(--font-serif)",
              fontWeight: "400",
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            Dress Code
          </h3>
          <p
            className="reveal animate-delay-100"
            style={{
              fontSize: "1rem",
              color: "#FFFFFF",
              fontFamily: "var(--font-sans)",
              fontWeight: "300",
              lineHeight: "1.7",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            For Men: Black Suits, Tie / Bow Tie Optional
            <br />
            For Women: Full Length Dresses
          </p>
        </div>
      </div>

      <div
        id="rsvp"
        className="md:mx-0 pb-16 min-h-screen flex flex-col items-center justify-center"
        style={{ backgroundColor: "#F5F5F2", padding: "8rem 2rem" }}
      >
        <div
          className="reveal"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            color: "#1C1C1C",
            fontFamily: "var(--font-serif)",
            fontWeight: "400",
            letterSpacing: "-0.02em",
            marginBottom: "0.75rem",
          }}
        >
          RSVP
        </div>

        {currentStep === "search" && (
          <>
            <div
              className="reveal animate-delay-200"
              style={{
                fontSize: "0.875rem",
                color: "#777777",
                marginBottom: "2rem",
                fontFamily: "var(--font-sans)",
                letterSpacing: "0.05em",
                textAlign: "center",
                fontWeight: "300",
              }}
            >
              Please RSVP by the 1st of December.
            </div>
            <div className="mb-4">
              <label
                className="block mb-2"
                style={{
                  color: "#1C1C1C",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  fontWeight: "400",
                }}
              >
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
              className="btn-primary"
              style={{
                backgroundColor:
                  searchName &&
                  typeof searchName === "string" &&
                  searchName.trim()
                    ? "#C9BCB0"
                    : "#E5E5E5",
                color:
                  searchName &&
                  typeof searchName === "string" &&
                  searchName.trim()
                    ? "#FFFFFF"
                    : "#999",
                padding: "1rem 2.5rem",
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
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: "400",
                borderRadius: "50px",
                transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                if (
                  searchName &&
                  typeof searchName === "string" &&
                  searchName.trim()
                ) {
                  target.style.backgroundColor = "#3E3E36";
                }
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                if (
                  searchName &&
                  typeof searchName === "string" &&
                  searchName.trim()
                ) {
                  target.style.backgroundColor = "#C9BCB0";
                }
              }}
            >
              search
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
              <h3
                style={{ fontFamily: "var(--font-sans)", fontWeight: "500" }}
                className="text-lg mb-2"
              >
                {foundGroup.group}
              </h3>
              <div className="space-y-1">
                {foundGroup.members.map((member: any, index: number) => (
                  <div key={index} className="text-gray-700">
                    {member.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Edit Prompt for Existing Submissions */}
            {showEditPrompt && (
              <div
                className="p-6 mt-6"
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <h3
                  className="mb-3 text-center"
                  style={{
                    fontSize: "1rem",
                    fontFamily: "var(--font-sans)",
                    fontWeight: "400",
                    color: "#1C1C1C",
                    letterSpacing: "0.02em",
                  }}
                >
                  You've already submitted an RSVP for this group.
                </h3>
                <p
                  className="mb-4 text-center"
                  style={{
                    fontSize: "0.875rem",
                    fontFamily: "var(--font-sans)",
                    fontWeight: "300",
                    color: "#777777",
                  }}
                >
                  Would you like to edit your previous response?
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    type="button"
                    onClick={() => handleEditResponse(true)}
                    className="btn-primary"
                    style={{
                      backgroundColor: "#C9BCB0",
                      color: "#FFFFFF",
                      padding: "1rem 2rem",
                      border: "none",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.875rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fontWeight: "400",
                      borderRadius: "50px",
                      cursor: "pointer",
                      transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    }}
                    onMouseEnter={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.backgroundColor = "#3E3E36";
                    }}
                    onMouseLeave={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.backgroundColor = "#C9BCB0";
                    }}
                  >
                    yes
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEditResponse(false)}
                    className="btn-secondary"
                    style={{
                      backgroundColor: "transparent",
                      color: "#1C1C1C",
                      padding: "1rem 2rem",
                      border: "1px solid #1C1C1C",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.875rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fontWeight: "400",
                      borderRadius: "50px",
                      cursor: "pointer",
                      transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    }}
                    onMouseEnter={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.backgroundColor = "#1C1C1C";
                      target.style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.backgroundColor = "transparent";
                      target.style.color = "#1C1C1C";
                    }}
                  >
                    no
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => setCurrentStep("search")}
              className="mt-6 text-gray-600 underline hover:text-gray-800 transition-colors duration-200"
              style={{ fontSize: "0.9rem" }}
            >
              Not you? Search again
            </button>
          </>
        )}

        {currentStep === "details" && selectedGroup && (
          <form style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
            <div
              style={{
                fontSize: "0.875rem",
                color: "#1C1C1C",
                marginBottom: "2rem",
                fontFamily: "var(--font-sans)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontWeight: "300",
                textAlign: "center",
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
                        className="px-3 py-1 text-white text-sm"
                        style={{
                          backgroundColor: "#C9BCB0",
                          borderRadius: "50px",
                          border: "none",
                          cursor: "pointer",
                          transition: "background-color 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          const target = e.target as HTMLElement;
                          target.style.backgroundColor = "#3E3E36";
                        }}
                        onMouseLeave={(e) => {
                          const target = e.target as HTMLElement;
                          target.style.backgroundColor = "#C9BCB0";
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelNameEdit}
                        className="px-3 py-1 text-white text-sm"
                        style={{
                          backgroundColor: "#777777",
                          borderRadius: "50px",
                          border: "none",
                          cursor: "pointer",
                          transition: "background-color 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          const target = e.target as HTMLElement;
                          target.style.backgroundColor = "#1C1C1C";
                        }}
                        onMouseLeave={(e) => {
                          const target = e.target as HTMLElement;
                          target.style.backgroundColor = "#777777";
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <h4
                        className="text-lg"
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontWeight: "300",
                        }}
                      >
                        {member.name}
                      </h4>
                      <button
                        onClick={() => handleEditName(member.name)}
                        className="text-sm underline"
                        style={{
                          color: "#C9BCB0",
                          fontFamily: "var(--font-sans)",
                          transition: "color 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          const target = e.target as HTMLElement;
                          target.style.color = "#3E3E36";
                        }}
                        onMouseLeave={(e) => {
                          const target = e.target as HTMLElement;
                          target.style.color = "#C9BCB0";
                        }}
                      >
                        Edit spelling
                      </button>
                    </>
                  )}
                </div>

                {/* Attendance Status */}
                <div className="mb-4">
                  <span
                    className="block mb-2"
                    style={{
                      color: "#1C1C1C",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.875rem",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      fontWeight: "400",
                    }}
                  >
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
                    <label
                      className="block mb-2"
                      style={{
                        color: "#1C1C1C",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.875rem",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        fontWeight: "400",
                      }}
                    >
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
                    <label
                      className="block mb-2"
                      style={{
                        color: "#1C1C1C",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.875rem",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        fontWeight: "400",
                      }}
                    >
                      Dietary Requirements* (select all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
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
                          <span className="ml-2 text-gray-700 text-sm">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>

                    {(dietaryRequirements[member.name] || []).includes(
                      "Other"
                    ) && (
                      <div className="mt-2">
                        <Input
                          className="mt-8 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          onChange={(value) =>
                            handleCustomDietaryChange(member.name, value)
                          }
                          value={customDietary[member.name] || ""}
                          placeholder="Please specify dietary requirements"
                          required
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            <div className="flex flex-col items-center justify-center mt-6">
              <button
                type="submit"
                onClick={submitForm}
                disabled={showEditPrompt || !isFormValid()}
                className="btn-primary"
                style={{
                  backgroundColor:
                    showEditPrompt || !isFormValid() ? "#E5E5E5" : "#C9BCB0",
                  color: showEditPrompt || !isFormValid() ? "#999" : "#FFFFFF",
                  padding: "1rem 2.5rem",
                  border: "none",
                  cursor:
                    showEditPrompt || !isFormValid()
                      ? "not-allowed"
                      : "pointer",
                  opacity: showEditPrompt || !isFormValid() ? 0.5 : 1,
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: "400",
                  borderRadius: "50px",
                  transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  if (!showEditPrompt && isFormValid()) {
                    target.style.backgroundColor = "#3E3E36";
                  }
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement;
                  if (!showEditPrompt && isFormValid()) {
                    target.style.backgroundColor = "#C9BCB0";
                  }
                }}
              >
                {existingSubmission ? "edit rsvp" : "submit rsvp"}
              </button>

              {!showEditPrompt && !isFormValid() && (
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Please select attendance status for all guests and provide
                  dietary requirements for attending guests
                </p>
              )}
            </div>

            <div className="flex items-center justify-center mt-4">
              <button
                type="button"
                onClick={() => setCurrentStep("search")}
                className="text-gray-600 underline hover:text-gray-800 transition-colors duration-200"
                style={{ fontSize: "0.9rem" }}
              >
                Not you? Search again
              </button>
            </div>
          </form>
        )}

        {currentStep === "complete" && (
          <div className="text-center">
            <p
              className="text-lg mb-4"
              style={{
                color: "#1C1C1C",
                fontFamily: "var(--font-sans)",
                fontWeight: "300",
              }}
            >
              Thank you for your RSVP! We look forward to seeing you on our
              special day.
            </p>
            <button
              onClick={resetForm}
              className="btn-primary"
              style={{
                backgroundColor: "#C9BCB0",
                color: "#FFFFFF",
                padding: "1rem 2.5rem",
                border: "none",
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: "400",
                borderRadius: "50px",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.backgroundColor = "#3E3E36";
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.backgroundColor = "#C9BCB0";
              }}
            >
              submit another rsvp
            </button>
          </div>
        )}

        {error && (
          <div
            className="mt-4 p-4"
            style={{
              backgroundColor: "#F5F5F2",
              border: "1px solid #C9BCB0",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "#1C1C1C",
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                fontWeight: "300",
                lineHeight: "1.6",
              }}
            >
              {typeof error === "string"
                ? error
                : `Error: ${JSON.stringify(error)}`}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
