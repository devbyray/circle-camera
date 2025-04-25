use tauri::Manager;
use tauri::Emitter;

#[cfg(target_os = "windows")]
use window_vibrancy::{apply_blur, clear_blur};

#[cfg(target_os = "macos")]
use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};

// Command to close the app
#[tauri::command]
fn close_app(window: tauri::Window) -> Result<(), String> {
    window.close().map_err(|e| e.to_string())
}

// Commands for camera settings
#[tauri::command]
fn set_border_radius(app_handle: tauri::AppHandle, radius: u32) -> Result<(), String> {
    println!("Setting border radius to {}", radius);
    let window = app_handle.get_webview_window("main").ok_or("Window not found")?;
    window.emit("set-border-radius", radius).map_err(|e| e.to_string())
}

#[tauri::command]
fn set_border_width(app_handle: tauri::AppHandle, width: u32) -> Result<(), String> {
    println!("Setting border width to {}", width);
    let window = app_handle.get_webview_window("main").ok_or("Window not found")?;
    window.emit("set-border-width", width).map_err(|e| e.to_string())
}

#[tauri::command]
fn set_border_color(app_handle: tauri::AppHandle, color: String) -> Result<(), String> {
    println!("Setting border color to {}", color);
    let window = app_handle.get_webview_window("main").ok_or("Window not found")?;
    window.emit("set-border-color", color).map_err(|e| e.to_string())
}

// Commands for direct shape changes
#[tauri::command]
fn set_square_shape(app_handle: tauri::AppHandle) -> Result<(), String> {
    println!("Setting square shape");
    set_border_radius(app_handle, 0)
}

#[tauri::command]
fn set_circle_shape(app_handle: tauri::AppHandle) -> Result<(), String> {
    println!("Setting circle shape");
    set_border_radius(app_handle, 50)
}

// Commands for direct border width changes
#[tauri::command]
fn set_no_border(app_handle: tauri::AppHandle) -> Result<(), String> {
    println!("Setting no border");
    set_border_width(app_handle, 0)
}

#[tauri::command]
fn set_thin_border(app_handle: tauri::AppHandle) -> Result<(), String> {
    println!("Setting thin border");
    set_border_width(app_handle, 2)
}

#[tauri::command]
fn set_medium_border(app_handle: tauri::AppHandle) -> Result<(), String> {
    println!("Setting medium border");
    set_border_width(app_handle, 5)
}

#[tauri::command]
fn set_thick_border(app_handle: tauri::AppHandle) -> Result<(), String> {
    println!("Setting thick border");
    set_border_width(app_handle, 10)
}

// Commands for direct border color changes
#[tauri::command]
fn set_white_border(app_handle: tauri::AppHandle) -> Result<(), String> {
    set_border_color(app_handle, "#ffffff".to_string())
}

#[tauri::command]
fn set_black_border(app_handle: tauri::AppHandle) -> Result<(), String> {
    set_border_color(app_handle, "#000000".to_string())
}

#[tauri::command]
fn set_red_border(app_handle: tauri::AppHandle) -> Result<(), String> {
    set_border_color(app_handle, "#ff0000".to_string())
}

#[tauri::command]
fn set_blue_border(app_handle: tauri::AppHandle) -> Result<(), String> {
    set_border_color(app_handle, "#0000ff".to_string())
}

#[tauri::command]
fn set_green_border(app_handle: tauri::AppHandle) -> Result<(), String> {
    set_border_color(app_handle, "#00ff00".to_string())
}

#[tauri::command]
async fn open_url(url: String) -> Result<(), String> {
    use std::process::Command;

    #[cfg(target_os = "macos")]
    {
        Command::new("open")
            .arg(url)
            .spawn()
            .map_err(|e| e.to_string())?;
    }

    #[cfg(target_os = "windows")]
    {
        Command::new("cmd")
            .args(["/c", "start", "", &url])
            .spawn()
            .map_err(|e| e.to_string())?;
    }

    #[cfg(target_os = "linux")]
    {
        Command::new("xdg-open")
            .arg(url)
            .spawn()
            .map_err(|e| e.to_string())?;
    }

    Ok(())
}

// Dummy command to trigger camera permission dialog on Windows
#[tauri::command]
fn dummy_camera_permission_check() -> Result<(), String> {
    // This function doesn't need to do anything
    // Just invoking it will trigger the permission dialog on Windows
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            // Get the main window
            let main_window = app.get_webview_window("main").expect("Failed to get main window");

            // Apply platform-specific window effects
            #[cfg(target_os = "macos")]
            {
                // On macOS, apply vibrancy effect to make the window truly transparent
                apply_vibrancy(&main_window, NSVisualEffectMaterial::HudWindow, None, None)
                    .expect("Failed to apply vibrancy effect on macOS");
            }

            #[cfg(target_os = "windows")]
            {
                // On Windows, apply a clear effect with full transparency to remove the shadow
                // This will make the window fully transparent outside the webcam area

                // First apply blur to make the window transparent
                apply_blur(&main_window, None)
                    .expect("Failed to apply blur effect on Windows");

                // Then clear the blur to remove any system-added effects like shadows
                clear_blur(&main_window)
                    .expect("Failed to clear blur effect on Windows");

                // Explicitly disable the window shadow
                main_window.set_shadow(false)
                    .expect("Failed to disable window shadow on Windows");
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            close_app,
            set_border_radius,
            set_border_width,
            open_url,
            set_border_color,
            set_square_shape,
            set_circle_shape,
            set_no_border,
            set_thin_border,
            set_medium_border,
            set_thick_border,
            set_white_border,
            set_black_border,
            set_red_border,
            set_blue_border,
            set_green_border,
            dummy_camera_permission_check
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
