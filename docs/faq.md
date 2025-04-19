# Frequently Asked Questions

## General Questions

### What is Circle Camera?

Circle Camera is a desktop application that displays your webcam feed in a perfect circle. It's designed for content creators, presenters, and professionals who want to include their webcam feed in screen recordings or presentations without taking up too much space.

### Which platforms does Circle Camera support?

Currently, Circle Camera is available for macOS. Windows and Linux versions are planned for future releases.

### Is Circle Camera free?

Yes, currently Circle Camera is free to download and use. (_In the future that might change_)

## Technical Questions

### Does Circle Camera work with virtual cameras?

Yes, Circle Camera should work with any camera that your operating system recognizes, including virtual cameras like OBS Virtual Camera, Snap Camera, and others.

### Can I use Circle Camera with video conferencing software?

Circle Camera is designed to display your webcam feed on your screen. It doesn't replace your webcam in video conferencing software. However, you can use it alongside video conferencing software to see your own webcam feed in a circle.

### Does Circle Camera record video?

No, Circle Camera only displays your webcam feed. It doesn't record video. To record your screen with the Circle Camera feed, you'll need to use screen recording software like OBS, QuickTime, or similar.

### How much system resources does Circle Camera use?

Circle Camera is designed to be lightweight and efficient. It uses minimal CPU and memory resources.

### Why does macOS say "Circle Camera cannot be opened because the developer cannot be verified"?

![macOS Gatekeeper Warning](/images/gatekeeper-warning.png)

This is a standard macOS security feature called Gatekeeper. It appears when you try to open an application downloaded from the internet that hasn't been notarized by Apple (a process to verify the developer's identity).

Since Circle Camera is distributed directly and not through the Mac App Store, you might see this warning the first time you open it.

**To allow the app to run:**

1.  After trying to open the app and seeing the warning, go to **System Settings** > **Privacy & Security**.
2.  Scroll down to the **Security** section.
3.  You'll find a message saying *"Circle Camera" was blocked...*
    ![macOS Privacy & Security Settings](/images/gatekeeper-allow.png)
4.  Click the **"Open Anyway"** button.
5.  You may need to confirm or enter your password.

After doing this once, you should be able to open Circle Camera normally.

## Usage Questions

### How do I move the camera?

Click and drag anywhere on the circle to move the camera to a different position on your screen.

### How do I resize the camera?

Hover over the camera to reveal the controls, then click the + or - buttons to increase or decrease the size of the camera.

### How do I select a different camera?

If you have multiple cameras connected to your computer, hover over the camera to reveal the controls, then use the dropdown menu to select a different camera.

### How do I close the app?

Hover over the camera to reveal the controls, then click the X button to close the app.

## Support

### I found a bug. How do I report it?

Please report bugs by opening an issue on our [GitHub repository](https://github.com/devbyray/circle-camera/issues).

### I have a feature request. How do I submit it?

Feature requests can be submitted by opening an issue on our [GitHub repository](https://github.com/devbyray/circle-camera/issues).

### How do I contact support?

For support inquiries, please email [support](mailto:camera@byrayray.dev).
