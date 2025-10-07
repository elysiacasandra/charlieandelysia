import { NextRequest, NextResponse } from "next/server";

// Google Sheets configuration
const SPREADSHEET_ID = "1zJGegkqKJn6ujXkBI136ewnmK6D8bemIdnhe2xQEpn0";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=0`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const groupId = searchParams.get("groupId");
  const personName = searchParams.get("personName");

  try {
    if (!groupId) {
      return NextResponse.json(
        {
          success: false,
          error: "Group ID is required",
        },
        { status: 400 }
      );
    }

    // Fetch data from Google Sheet to check for existing submissions
    const cacheBuster = `&_t=${Date.now()}`;
    const csvUrlWithCacheBuster = CSV_URL + cacheBuster;

    const response = await fetch(csvUrlWithCacheBuster, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn(
        `Failed to fetch CSV data for checking submissions: ${response.status}`
      );
      // Return false if we can't check - allow new submissions
      return NextResponse.json({
        success: true,
        hasExistingSubmission: false,
        groupId: parseInt(groupId),
        note: "Could not check existing submissions - allowing new submission",
      });
    }

    const csvText = await response.text();
    const lines = csvText.split("\n");

    if (lines.length < 2) {
      // No data in sheet
      return NextResponse.json({
        success: true,
        hasExistingSubmission: false,
        groupId: parseInt(groupId),
      });
    }

    // Parse CSV headers
    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""));
    const firstNameIndex = headers.indexOf("First Name");
    const lastNameIndex = headers.indexOf("Last Name");
    const attendingIndex = headers.indexOf("Attending");

    // If required columns don't exist, assume no submissions exist
    if (
      firstNameIndex === -1 ||
      lastNameIndex === -1 ||
      attendingIndex === -1
    ) {
      return NextResponse.json({
        success: true,
        hasExistingSubmission: false,
        groupId: parseInt(groupId),
        note: "Required columns not found - assuming no existing submissions",
      });
    }

    // Parse CSV data rows to find the specific person's submission
    let hasExistingSubmission = false;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const row = line.split(",").map((cell) => cell.trim().replace(/"/g, ""));
      if (row.length <= Math.max(firstNameIndex, lastNameIndex, attendingIndex))
        continue;

      const firstName = row[firstNameIndex] || "";
      const lastName = row[lastNameIndex] || "";
      const fullName = `${firstName} ${lastName}`.trim();
      const attendingValue = row[attendingIndex];

      // Check if this row matches the person we're looking for
      if (personName && fullName.toLowerCase() === personName.toLowerCase()) {
        // If there's a Yes/No value in the "Attending" column for this person,
        // it means they have submitted an RSVP
        if (
          attendingValue &&
          attendingValue !== "#N/A" &&
          attendingValue.trim() !== "" &&
          (attendingValue.toLowerCase() === "yes" ||
            attendingValue.toLowerCase() === "no")
        ) {
          hasExistingSubmission = true;
          console.log(
            `Found existing submission for ${personName}: ${attendingValue}`
          );
          break;
        }
      }
    }

    console.log(
      `Checking submission for Group ID ${groupId}: ${hasExistingSubmission}`
    );

    return NextResponse.json({
      success: true,
      hasExistingSubmission,
      groupId: parseInt(groupId),
    });
  } catch (error) {
    console.error("Error checking existing submission:", error);

    // Return false on error to allow new submissions
    return NextResponse.json({
      success: true,
      hasExistingSubmission: false,
      groupId: groupId ? parseInt(groupId) : 0,
      note: "Error checking submissions - allowing new submission",
    });
  }
}
