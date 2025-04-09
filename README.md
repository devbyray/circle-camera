# Circle Camera

<p align="center">
  <img src="public/icon.svg" alt="Circle Camera Logo" width="200" height="200">
</p>

<p align="center">
  A sleek, minimalist webcam app that displays your camera feed in a perfect circle.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#development">Development</a> •
  <a href="#building">Building</a> •
  <a href="#license">License</a>
</p>

## Features

✨ **Circular Display** - Show your webcam feed in a perfect circle, ideal for screen recordings and presentations

🔍 **Resizable** - Easily adjust the size to fit your needs

🖱️ **Draggable** - Position the camera anywhere on your screen

🎥 **Camera Selection** - Choose between multiple cameras if available

🔄 **Always on Top** - Stay visible over other applications

🎮 **Minimal UI** - Controls only appear when you hover over the camera

🖼️ **Transparent Background** - Seamlessly blend with any desktop

## Installation
Currently we only support MacOS, Windows will come soon.

### macOS

1. Download the latest DMG installer from the [installers](/installers) directory
2. Open the DMG file
3. Drag the Circle Camera app to your Applications folder
4. Open the app from your Applications folder or Launchpad

## Usage

### Basic Controls

- **Drag**: Click and drag anywhere on the circle to move the camera
- **Resize**: Hover over the camera and use the + and - buttons to resize
- **Close**: Hover over the camera and click the X button to close the app
- **Camera Selection**: Hover over the camera and use the dropdown to select a different camera

### Tips

- Position the camera in a corner of your screen during presentations
- Adjust the size based on the importance of your camera feed
- For screen recordings, position the app before starting your recording

## Development

### Prerequisites

- Node.js (v16 or later)
- pnpm
- Rust and Cargo

#### MacOS
- brew install llvm

#### Windows
- choco install llvm

### Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/circle-camera.git
cd circle-camera
```

2. Install dependencies
```bash
pnpm install
```

3. Start the development server
```bash
pnpm tauri dev
```

## Building

### Building for macOS

```bash
pnpm build:installer
```

This will create a DMG installer in the `installers` directory.

### Customizing the App Icon

1. Replace the `public/icon.svg` file with your own SVG icon
2. Generate the app icons:
```bash
pnpm icons
```
3. Rebuild the app

## License

[EUTPL](/LICENSE.md)

---

<p align="center">
  Made with ❤️ using <a href="https://tauri.app">Tauri</a>, <a href="https://vuejs.org">Vue</a>, and <a href="https://www.rust-lang.org">Rust</a>
</p>