import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const groupId = searchParams.get("groupId");

    if (!groupId) {
      return NextResponse.json(
        {
          success: false,
          error: "Group ID is required",
        },
        { status: 400 }
      );
    }

    // For now, we'll simulate checking for existing submissions
    // In a real implementation, you would:
    // 1. Read from your Google Sheet
    // 2. Check if there are any entries for this group ID
    // 3. Return true if submissions exist

    // Simulate checking - you can replace this with actual Google Sheets logic
    const hasExistingSubmission = false; // This would be determined by checking your sheet

    return NextResponse.json({
      success: true,
      hasExistingSubmission,
      groupId: parseInt(groupId),
    });
  } catch (error) {
    console.error("Error checking existing submission:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to check existing submission",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
