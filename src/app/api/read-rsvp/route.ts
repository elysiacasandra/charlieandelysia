import { NextRequest, NextResponse } from "next/server";

// Google Sheets configuration
const SPREADSHEET_ID = "1zJGegkqKJn6ujXkBI136ewnmK6D8bemIdnhe2xQEpn0";
const SHEET_NAME = "Sheet1";

// CSV export URL for public sheet
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=0`;

export async function GET(request: NextRequest) {
  try {
    // Add cache-busting parameter to force fresh data
    const cacheBuster = `&_t=${Date.now()}`;
    const csvUrlWithCacheBuster = CSV_URL + cacheBuster;

    // Fetch data from public Google Sheet via CSV export
    const response = await fetch(csvUrlWithCacheBuster, {
      cache: "no-store", // Disable Next.js caching
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch CSV data: ${response.status}`);
    }

    const csvText = await response.text();
    const lines = csvText.split("\n");

    if (lines.length < 2) {
      throw new Error("No data found in spreadsheet");
    }

    // Parse CSV headers
    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""));
    const firstNameIndex = headers.indexOf("First Name");
    const lastNameIndex = headers.indexOf("Last Name");
    const groupNameIndex = headers.indexOf("Group Name");
    const mobileIndex = headers.indexOf("Mobile Number");

    if (
      firstNameIndex === -1 ||
      lastNameIndex === -1 ||
      groupNameIndex === -1
    ) {
      throw new Error("Required columns not found in spreadsheet");
    }

    // Parse CSV data rows
    const guestData = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue; // Skip empty lines

      const row = line.split(",").map((cell) => cell.trim().replace(/"/g, ""));
      if (
        row.length <
        Math.max(firstNameIndex, lastNameIndex, groupNameIndex) + 1
      )
        continue;

      const firstName = row[firstNameIndex] || "";
      const lastName = row[lastNameIndex] || "";
      const fullName = `${firstName} ${lastName}`.trim();
      const groupName = row[groupNameIndex] || "";
      const rawMobile = row[mobileIndex] || "";

      // Clean up mobile number: replace #N/A with empty string, otherwise use the value
      const mobile = rawMobile === "#N/A" ? "" : rawMobile;

      if (fullName && groupName) {
        guestData.push({
          name: fullName,
          groupName,
          mobile,
        });
      }
    }

    // Group by Group Name
    const groupedData = guestData.reduce((acc, guest) => {
      const groupName = guest.groupName;
      if (!acc[groupName]) {
        acc[groupName] = [];
      }
      acc[groupName].push({
        name: guest.name,
        mobile: guest.mobile,
      });
      return acc;
    }, {} as Record<string, any[]>);

    // Convert to the format expected by the frontend
    const rsvpDatabase = Object.entries(groupedData).map(
      ([groupName, members], index) => ({
        id: index + 1,
        group: groupName,
        members: members,
      })
    );

    return NextResponse.json({
      success: true,
      data: rsvpDatabase,
      note: "Data loaded from public Google Sheet via CSV export.",
    });
  } catch (error) {
    console.error("Error reading RSVP data:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to read RSVP data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
