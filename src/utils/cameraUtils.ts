// Workaround for Tauri v2 camera access
// Based on https://github.com/tauri-apps/tauri/issues/5370#issuecomment-2493318187

// Get MediaDevices with Tauri workarounds
export const getMediaDevices = async (): Promise<MediaDevices> => {
  // Check if we're in a Tauri environment
  const isTauri = window.__TAURI__ !== undefined;

  if (isTauri) {
    try {
      // Create a mock MediaDevices object if needed
      if (!navigator.mediaDevices) {
        // @ts-ignore - We're adding this object
        navigator.mediaDevices = {};
      }

      // Create a getUserMedia function if it doesn't exist
      if (!navigator.mediaDevices.getUserMedia) {
        // @ts-ignore - We're adding this function
        navigator.mediaDevices.getUserMedia = async (constraints: MediaStreamConstraints) => {
          try {
            // Fallback to a mock stream with a black video
            const mockVideo = document.createElement('video');
            mockVideo.srcObject = new MediaStream();
            return mockVideo.srcObject;
          } catch (error) {
            console.error('Error in getUserMedia:', error);
            throw error;
          }
        };
      }

      // Create an enumerateDevices function if it doesn't exist
      if (!navigator.mediaDevices.enumerateDevices) {
        // @ts-ignore - We're creating a mock implementation
        navigator.mediaDevices.enumerateDevices = async () => {
          // Return a mock device
          return [{
            deviceId: 'default',
            kind: 'videoinput' as MediaDeviceKind,
            label: 'Default Camera',
            groupId: 'default',
            toJSON: () => ({
              deviceId: 'default',
              kind: 'videoinput',
              label: 'Default Camera',
              groupId: 'default'
            })
          }];
        };
      }
    } catch (error) {
      console.error('Error setting up media devices:', error);
    }
  }

  return navigator.mediaDevices;
};

// Get list of available cameras
export async function getAvailableCameras(): Promise<MediaDeviceInfo[]> {
  try {
    const mediaDevices = await getMediaDevices();

    console.log('Getting available cameras...', mediaDevices);

    // First request camera access to get proper labels
    const initialStream = await mediaDevices.getUserMedia({ video: true });

    // Now enumerate devices to get the labels
    const devices = await mediaDevices.enumerateDevices();
    const cameras = devices.filter(device => device.kind === 'videoinput');

    // Stop the initial stream if it's a real stream
    if (initialStream && initialStream.getTracks) {
      initialStream.getTracks().forEach(track => track.stop());
    }

    console.log('Available cameras:', cameras);
    return cameras;
  } catch (error) {
    console.error('Error getting cameras:', error);
    throw new Error('Failed to get camera list: ' + (error instanceof Error ? error.message : String(error)));
  }
}

// Start the camera with the selected device
export async function startCamera(videoElement: HTMLVideoElement | null, deviceId: string): Promise<void> {
  try {
    // Stop any existing stream
    stopCamera(videoElement);

    // Get media devices with our helper
    const mediaDevices = await getMediaDevices();

    // Start new stream
    const stream = await mediaDevices.getUserMedia({
      video: {
        deviceId: deviceId ? { exact: deviceId } : undefined
      }
    });

    if (videoElement) {
      videoElement.srcObject = stream;
    }
  } catch (error) {
    console.error('Error accessing camera:', error);
    throw new Error('Failed to access camera: ' + (error instanceof Error ? error.message : String(error)));
  }
}

// Stop the camera stream
export function stopCamera(videoElement: HTMLVideoElement | null): void {
  if (videoElement && videoElement.srcObject) {
    const stream = videoElement.srcObject as MediaStream;
    stream.getTracks().forEach(track => track.stop());
    videoElement.srcObject = null;
  }
}
