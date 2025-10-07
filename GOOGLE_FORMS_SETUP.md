# Google Forms Integration Setup Guide

## Overview

This guide will help you set up Google Forms integration to automatically submit RSVP data to your Google Sheet.

## Step 1: Make Your Google Sheet Public (for reading data)

1. **Open your Google Sheet**: https://docs.google.com/spreadsheets/d/1zJGegkqKJn6ujXkBI136ewnmK6D8bemIdnhe2xQEpn0/edit
2. **Click "Share"** in the top-right corner
3. **Change permissions to "Anyone with the link can view"**
4. **Copy the link** - this will be used for CSV export

## Step 2: Create a Google Form for RSVP Submissions

### 2.1 Create the Form

1. **Go to**: https://forms.google.com/
2. **Click "Blank"** to create a new form
3. **Title it**: "Charlie & Elysia Wedding RSVP"

### 2.2 Add Form Fields

Add these fields in order:

#### Group Information

1. **Short answer**: "Group Name" (Required)
2. **Short answer**: "Group ID" (Required)

#### Member 1 Details

3. **Short answer**: "Member 1 Name" (Required)
4. **Multiple choice**: "Member 1 Attending"
   - Options: "Yes", "No"
5. **Short answer**: "Member 1 Mobile Number"
6. **Short answer**: "Member 1 Dietary Requirements"

#### Member 2 Details (repeat for each member)

7. **Short answer**: "Member 2 Name"
8. **Multiple choice**: "Member 2 Attending"
   - Options: "Yes", "No"
9. **Short answer**: "Member 2 Mobile Number"
10. **Short answer**: "Member 2 Dietary Requirements"

#### Continue for Members 3-6 (if needed)

- Repeat the pattern for up to 6 members per group

### 2.3 Configure Form Settings

1. **Click the gear icon** (Settings)
2. **Under "Responses"**:
   - ✅ Check "Collect email addresses" (optional)
   - ✅ Check "Limit to 1 response" (recommended)
3. **Click "Save"**

### 2.4 Link to Google Sheet

1. **Click "Responses"** tab
2. **Click the green "Link to Sheets" icon**
3. **Select your existing sheet** or create a new one
4. **Click "Create"**

### 2.5 Get Form URL

1. **Click "Send"** button
2. **Copy the form URL** (looks like: `https://docs.google.com/forms/d/e/1FAIpQLSd.../viewform`)
3. **Extract the form ID** from the URL (the long string between `/d/e/` and `/viewform`)

## Step 3: Update the Code

### 3.1 Update API Endpoint

Replace `YOUR_FORM_ID` in `/src/app/api/update-rsvp/route.ts` with your actual form ID:

```typescript
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/YOUR_ACTUAL_FORM_ID/formResponse";
```

### 3.2 Map Form Fields

Update the form field names in the API to match your Google Form fields:

```typescript
formData.append("entry.group_name", groupName);
formData.append("entry.group_id", groupId.toString());

members.forEach((member, index) => {
  const prefix = `entry.member_${index + 1}_`;
  formData.append(`${prefix}name`, member.name);
  formData.append(`${prefix}attending`, member.attending);
  formData.append(`${prefix}mobile`, member.mobile || "");
  formData.append(`${prefix}dietary`, member.dietary || "None");
});
```

## Step 4: Test the Integration

### 4.1 Test Form Submission

1. **Submit a test RSVP** through your website
2. **Check the console logs** for the formatted data
3. **Verify the data appears** in your Google Sheet

### 4.2 Test CSV Export

1. **Visit the CSV export URL**: `https://docs.google.com/spreadsheets/d/1zJGegkqKJn6ujXkBI136ewnmK6D8bemIdnhe2xQEpn0/export?format=csv&gid=0`
2. **Verify you can see the data** in CSV format
3. **Check that the API can read** the guest list

## Step 5: Final Configuration

### 5.1 Update Form Field Names

You'll need to inspect your Google Form to get the exact field names. Here's how:

1. **Open your Google Form**
2. **Right-click and "Inspect Element"**
3. **Look for `name="entry.XXXXXX"` attributes**
4. **Update the API code** with the correct field names

### 5.2 Handle Multiple Members

The current setup handles up to 6 members per group. If you need more:

1. **Add more fields** to your Google Form
2. **Update the API code** to handle additional members

### 5.3 Edit Functionality

The system now includes edit functionality for resubmissions:

1. **When someone tries to resubmit**: They'll see a prompt asking if they want to edit their response
2. **If they choose "Yes"**: They can modify their previous submission
3. **If they choose "No"**: Their original response is kept

To enable this feature, you need to implement the check-submission API endpoint to read from your Google Sheet and detect existing submissions.

## Troubleshooting

### Common Issues:

1. **"Form not found"**: Check that your form ID is correct
2. **"Field not found"**: Verify field names match exactly
3. **"Permission denied"**: Ensure sheet is public for reading
4. **"CSV export fails"**: Make sure sheet sharing is set to public

### Debug Steps:

1. **Check browser console** for error messages
2. **Check server logs** for API errors
3. **Test form submission manually** first
4. **Verify Google Form field names** match API code

## Alternative: Google Apps Script (Advanced)

If you want more control, you can create a Google Apps Script:

1. **Open your Google Sheet**
2. **Go to Extensions > Apps Script**
3. **Create a web app** that accepts POST requests
4. **Update the API** to send data to the Apps Script URL

This gives you more control over data validation and processing.

## Success Criteria

✅ **Form submissions work**: RSVP data appears in Google Sheet
✅ **Guest list loads**: Website can read guest data from public sheet
✅ **Mobile prepopulation**: Existing mobile numbers appear in form
✅ **Real-time updates**: Changes appear immediately in sheet

Your RSVP system will then be fully integrated with Google Sheets!
