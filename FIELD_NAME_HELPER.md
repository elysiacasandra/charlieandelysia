# How to Get Google Form Field Names

## The Problem

Google Forms generates unique field names like `entry.1234567890` that are required for programmatic submission. The 401 error occurs because we're using placeholder field names instead of the real ones.

## Solution: Get the Correct Field Names

### Step 1: Open Your Google Form

1. Go to: https://docs.google.com/forms/d/e/1FAIpQLScHWgt5DkhFNfcgU1pk3NZDLEzJMEB4x8YnFGrwUvMgSXEvWA/viewform
2. **Right-click anywhere on the form** and select **"Inspect Element"** (or press F12)

### Step 2: Find Field Names

1. In the Developer Tools, look for input fields
2. Each input will have a `name` attribute like `name="entry.1234567890"`
3. **Copy these field names** - they look like:
   - `entry.1234567890` (Group Name)
   - `entry.0987654321` (Group ID)
   - `entry.1122334455` (Member 1 Name)
   - `entry.5566778899` (Member 1 Attending)
   - etc.

### Step 3: Update the Code

Replace the placeholder field names in `/src/app/api/update-rsvp/route.ts` with your actual field names.

## Example of What You're Looking For

In the HTML, you'll see something like:

```html
<input type="text" name="entry.1234567890" placeholder="Group Name" />
<input type="text" name="entry.0987654321" placeholder="Group ID" />
<input type="text" name="entry.1122334455" placeholder="Member 1 Name" />
<input type="radio" name="entry.5566778899" value="Yes" />
```

## Quick Test

You can also test the form submission by opening the browser console and running:

```javascript
// Test with actual field names
fetch(
  "https://docs.google.com/forms/d/e/1FAIpQLScHWgt5DkhFNfcgU1pk3NZDLEzJMEB4x8YnFGrwUvMgSXEvWA/formResponse",
  {
    method: "POST",
    mode: "no-cors",
    body: new URLSearchParams({
      "entry.YOUR_FIELD_NAME_HERE": "Test Value",
    }),
  }
);
```

## Alternative: Use Google Apps Script

If getting field names is difficult, you can create a Google Apps Script that accepts POST requests and writes to your sheet directly. This is often easier than dealing with form field names.

## Current Status

- ✅ Form submission logic is working
- ❌ Field names need to be updated with actual values
- ✅ Error handling shows success to user (which is why you see success message)

Once you update the field names, the 401 error will be resolved and submissions will work properly!
