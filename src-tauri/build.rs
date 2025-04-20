use std::fs::File;
use std::io::{BufRead, BufReader};
use std::path::Path;
use std::env;

fn main() {
    // Load environment variables from .env file
    if let Ok(lines) = read_lines("../.env") {
        for line in lines.flatten() {
            if line.starts_with('#') || line.trim().is_empty() {
                continue;
            }
            
            if let Some(pos) = line.find('=') {
                let key = line[..pos].trim();
                let value = line[pos + 1..].trim();
                // Remove quotes if present
                let value = value.trim_matches(|c| c == '\'' || c == '"');
                
                println!("cargo:rustc-env={}={}", key, value);
                
                // Also set environment variable for the current process
                env::set_var(key, value);
            }
        }
    }

    // Add specific configuration for Mac builds
    #[cfg(target_os = "macos")]
    {
        println!("cargo:rustc-link-lib=framework=WebKit");
    }
    
    tauri_build::build()
}

// Helper function to read lines from a file
fn read_lines<P>(filename: P) -> std::io::Result<std::io::Lines<BufReader<File>>>
where
    P: AsRef<Path>,
{
    let file = File::open(filename)?;
    Ok(BufReader::new(file).lines())
}
