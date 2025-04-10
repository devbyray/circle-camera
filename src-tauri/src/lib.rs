use tauri::Manager;
use tauri::Emitter;

// Command to close the app
#[tauri::command]
fn close_app(window: tauri::Window) -> Result<(), String> {
    window.close().map_err(|e| e.to_string())
}

// Commands for camera settings
#[tauri::command]
fn set_border_radius(app_handle: tauri::AppHandle, radius: u32) -> Result<(), String> {
    let window = app_handle.get_webview_window("main").ok_or("Window not found")?;
    window.emit("set-border-radius", radius).map_err(|e| e.to_string())
}

#[tauri::command]
fn set_border_width(app_handle: tauri::AppHandle, width: u32) -> Result<(), String> {
    let window = app_handle.get_webview_window("main").ok_or("Window not found")?;
    window.emit("set-border-width", width).map_err(|e| e.to_string())
}

#[tauri::command]
fn set_border_color(app_handle: tauri::AppHandle, color: String) -> Result<(), String> {
    let window = app_handle.get_webview_window("main").ok_or("Window not found")?;
    window.emit("set-border-color", color).map_err(|e| e.to_string())
}

// Commands for direct shape changes
#[tauri::command]
fn set_square_shape(app_handle: tauri::AppHandle) -> Result<(), String> {
    set_border_radius(app_handle, 0)
}

#[tauri::command]
fn set_circle_shape(app_handle: tauri::AppHandle) -> Result<(), String> {
    set_border_radius(app_handle, 50)
}

// Commands for direct border width changes
#[tauri::command]
fn set_no_border(app_handle: tauri::AppHandle) -> Result<(), String> {
    set_border_width(app_handle, 0)
}

#[tauri::command]
fn set_thin_border(app_handle: tauri::AppHandle) -> Result<(), String> {
    set_border_width(app_handle, 2)
}

#[tauri::command]
fn set_medium_border(app_handle: tauri::AppHandle) -> Result<(), String> {
    set_border_width(app_handle, 5)
}

#[tauri::command]
fn set_thick_border(app_handle: tauri::AppHandle) -> Result<(), String> {
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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            close_app,
            set_border_radius,
            set_border_width,
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
            set_green_border
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
