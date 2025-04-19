# Troubleshooting

If you're experiencing issues with Circle Camera, this guide may help you resolve them.

## Camera Access Issues

### Camera Not Working

If your camera isn't working in Circle Camera, try the following:

1. **Check Camera Permissions**
   - Go to System Preferences > Security & Privacy > Privacy > Camera
   - Make sure Circle Camera is checked in the list of apps allowed to access your camera

2. **Check if Camera Works in Other Apps**
   - Try using your camera in another app like FaceTime or Photo Booth
   - If it doesn't work there either, the issue might be with your camera or system

3. **Restart Your Computer**
   - Sometimes a simple restart can resolve camera issues

### No Cameras Found

If Circle Camera doesn't detect any cameras:

1. **Check Camera Connection**
   - Make sure your external camera is properly connected
   - Try a different USB port if using an external camera

2. **Check System Information**
   - Open "About This Mac" > "System Report" > "Camera"
   - Verify that your camera is listed and recognized by macOS

## App Behavior Issues

### App Won't Start

If Circle Camera won't start:

1. **Check for Error Messages**
   - Look for any error messages when launching the app

2. **Reinstall the App**
   - Delete the app from your Applications folder
   - Empty the Trash
   - Download and install the app again

### App Crashes

If Circle Camera crashes:

1. **Update macOS**
   - Make sure you're running the latest version of macOS

2. **Check for Conflicting Software**
   - Some security software or other camera utilities might conflict with Circle Camera

3. **Reinstall the App**
   - Delete the app from your Applications folder
   - Empty the Trash
   - Download and install the app again

## Performance Issues

### High CPU Usage

If Circle Camera is using a lot of CPU:

1. **Reduce Camera Resolution**
   - Some high-resolution cameras might cause performance issues
   - Try using a different camera if available

2. **Close Other Applications**
   - Other applications might be competing for resources

### Laggy or Delayed Video

If the video feed is laggy or delayed:

1. **Check Your Camera**
   - Some cameras have inherent lag or delay
   - Try a different camera if available

2. **Reduce Camera Resolution**
   - High-resolution cameras might cause performance issues

## Installation Issues

### macOS: "Circle Camera" cannot be opened because the developer cannot be verified.

When you first try to open Circle Camera on macOS, you might see a warning message like this:

![macOS Gatekeeper Warning](/images/gatekeeper-warning.png)

This happens because the application is not yet notarized by Apple. This is expected behavior for applications downloaded directly from developers outside the App Store.

**To allow the app to run:**

1.  Go to **System Settings** > **Privacy & Security**.
2.  Scroll down to the **Security** section.
3.  You should see a message: *"Circle Camera" was blocked from use because it is not from an identified developer.*
4.  Click the **"Open Anyway"** button next to the message. You might need to enter your administrator password.
    ![macOS Privacy & Security Settings](/images/gatekeeper-allow.png)
5.  You should now be able to open Circle Camera from your Applications folder or Launchpad.

## Still Need Help?

If you're still experiencing issues after trying these troubleshooting steps, please contact our [support](mailto:camera@byrayray.dev) with the following information:

- Your macOS version
- Your computer model
- The camera you're using
- A detailed description of the issue
- Any error messages you're seeing
