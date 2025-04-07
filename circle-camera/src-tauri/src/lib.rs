// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// Command to drag the window
#[tauri::command]
fn drag_window(window: tauri::Window, delta_x: f64, delta_y: f64) -> Result<(), String> {
    let position = window.inner_position().map_err(|e| e.to_string())?;
    let new_position = tauri::LogicalPosition::new(
        position.x as f64 + delta_x,
        position.y as f64 + delta_y,
    );
    window.set_position(new_position).map_err(|e| e.to_string())
}

// Command to close the app
#[tauri::command]
fn close_app(window: tauri::Window) -> Result<(), String> {
    window.close().map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, drag_window, close_app])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
