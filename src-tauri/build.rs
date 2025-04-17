fn main() {
    // Add specific configuration for Mac builds
    #[cfg(target_os = "macos")]
    {
        println!("cargo:rustc-link-lib=framework=WebKit");
    }
    
    tauri_build::build()
}
