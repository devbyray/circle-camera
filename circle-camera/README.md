# Circle Camera

A simple Tauri app that displays your webcam in a circle. Perfect for screen recordings when you want to include your webcam feed without taking up too much space.

## Features

- Circular webcam display
- Transparent background
- Draggable window
- Camera selection
- Resizable
- Controls only visible on hover

## Installation

### macOS

Download the latest DMG installer from the [installers](/installers) directory and open it.

## Development

### Prerequisites

- Node.js (v16 or later)
- pnpm
- Rust and Cargo

### Setup

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

### Development

Run the app in development mode:

```bash
pnpm tauri dev
```

### Building

Build the app for production:

```bash
pnpm build:installer
```

This will create installers in the `installers` directory.

### Updating the App Icon

1. Replace the `public/icon.svg` file with your own SVG icon
2. Generate the app icons:

```bash
pnpm icons
```

3. Rebuild the app:

```bash
pnpm build:installer
```

## License

MIT
