// Function to close the app
export async function closeApp(): Promise<void> {
  try {
    console.log('Attempting to close app...');
    
    // Use the Rust command to close the app
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      await invoke('close_app');
    } catch (error) {
      console.error('Error closing app with Rust command:', error);

      // Fallback to JS API
      try {
        const { Window } = await import('@tauri-apps/api/window');
        const appWindow = Window.getCurrent();
        await appWindow.close();
      } catch (fallbackError) {
        console.error('Error with fallback close method:', fallbackError);
      }
    }
  } catch (error) {
    console.error('Error in closeApp:', error);
  }
}

// Drag functionality using Tauri's built-in startDragging method
export async function startDrag(event: MouseEvent): Promise<void> {
  try {
    // Prevent default to avoid text selection during drag
    event.preventDefault();

    // Don't drag if clicking on a control element
    if (
      (event.target as HTMLElement).closest('.controls-dropdown') ||
      (event.target as HTMLElement).closest('.window-controls') ||
      (event.target as HTMLElement).closest('.settings-overlay')
    ) {
      return;
    }

    console.log('Starting window drag...');
    const { Window } = await import('@tauri-apps/api/window');
    const appWindow = Window.getCurrent();
    await appWindow.startDragging();
    console.log('Window drag started successfully');
  } catch (error) {
    console.error('Error starting window drag:', error);
  }
}
