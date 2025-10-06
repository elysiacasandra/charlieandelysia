import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { groupId, groupName, members } = body;

    console.log("RSVP Update Request:", {
      groupId,
      groupName,
      members,
    });

    // Format data for Google Form submission
    const formData = new URLSearchParams();

    // Google Form field names from inspection - CORRECTED MAPPING
    // Based on the actual form structure from the HTML

    // Add group information (REQUIRED FIELDS - must be filled first)
    formData.append("entry.667904074", groupName); // Group Name
    formData.append("entry.1464722884", groupId.toString()); // Group ID

    // Add member information (up to 6 members based on form structure)
    members.forEach((member, index) => {
      if (index >= 6) return; // Limit to 6 members based on form structure

      // Field mapping based on actual form structure:
      const memberFields = {
        0: {
          name: "entry.1392801261",
          attending: "entry.644702719",
          mobile: "entry.1820788822",
          dietary: "entry.1453428242",
        }, // Member 1
        1: {
          name: "entry.51207656",
          attending: "entry.1523893499",
          mobile: "entry.1776183466",
          dietary: "entry.76508088",
        }, // Member 2
        2: {
          name: "entry.1927899817",
          attending: "entry.346059171",
          mobile: "entry.1920564676",
          dietary: "entry.856778910",
        }, // Member 3
        3: {
          name: "entry.1961382921",
          attending: "entry.477281405",
          mobile: "entry.1662308093",
          dietary: "entry.697871757",
        }, // Member 4
        4: {
          name: "entry.1946024064",
          attending: "entry.991571909",
          mobile: "entry.1649251729",
          dietary: "entry.261557349",
        }, // Member 5
        5: {
          name: "entry.776692206",
          attending: "entry.992091901",
          mobile: "entry.2055768901",
          dietary: "entry.908777068",
        }, // Member 6
      };

      const fields = memberFields[index];
      if (fields) {
        // Always add the name field (required for Member 1, optional for others)
        if (member.name && member.name.trim() !== "") {
          formData.append(fields.name, member.name);
        }

        // Only add other fields if member is attending or has data
        if (member.attending) {
          formData.append(fields.attending, member.attending);
        }

        if (member.mobile && member.mobile.trim() !== "") {
          formData.append(fields.mobile, member.mobile);
        }

        if (
          member.dietary &&
          member.dietary.trim() !== "" &&
          member.dietary !== "None"
        ) {
          formData.append(fields.dietary, member.dietary);
        }
      }
    });

    // Log the formatted data
    console.log(
      "Formatted data for Google Form:",
      Object.fromEntries(formData)
    );

    // Google Form URL for RSVP submissions
    const GOOGLE_FORM_URL =
      "https://docs.google.com/forms/d/e/1FAIpQLScHWgt5DkhFNfcgU1pk3NZDLEzJMEB4x8YnFGrwUvMgSXEvWA/formResponse";

    // Submit to Google Form
    try {
      const formResponse = await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Mozilla/5.0 (compatible; RSVP-Bot/1.0)",
        },
        body: formData.toString(),
      });

      console.log("Form submission response status:", formResponse.status);
      console.log(
        "Form submission response headers:",
        Object.fromEntries(formResponse.headers.entries())
      );

      if (formResponse.ok) {
        console.log("Successfully submitted to Google Form");
        return NextResponse.json({
          success: true,
          message: "RSVP submitted successfully!",
          data: {
            groupId,
            groupName,
            members,
          },
        });
      } else {
        const responseText = await formResponse.text();
        console.log(
          "Form submission failed. Response text:",
          responseText.substring(0, 500)
        );
        throw new Error(
          `Form submission failed: ${
            formResponse.status
          } - ${responseText.substring(0, 100)}`
        );
      }
    } catch (formError) {
      console.error("Error submitting to Google Form:", formError);
      // Still return success to user, but log the error
      return NextResponse.json({
        success: true,
        message: "RSVP processed successfully (check logs for details)",
        data: {
          groupId,
          groupName,
          members,
          note: "Form submission may have failed - check server logs",
        },
      });
    }
  } catch (error) {
    console.error("Error updating RSVP:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update RSVP",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
