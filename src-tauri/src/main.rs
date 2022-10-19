#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use opencv::{
    core,
    highgui,
    prelude::*,
    videoio, imgcodecs::IMREAD_UNCHANGED,
};


// use core::str::Bytes;

// fn runopencvexample() -> opencv::Result<()> {
//     let window = "video capture";
//     highgui::named_window(window, 1)?;
//     #[cfg(feature = "opencv-32")]
//     let mut cam = videoio::VideoCapture::new_default(0)?;  // 0 is the default camera
//     #[cfg(not(feature = "opencv-32"))]
//     let mut cam = videoio::VideoCapture::new(0, videoio::CAP_ANY)?;  // 0 is the default camera
//     let opened = videoio::VideoCapture::is_opened(&cam)?;
//     if !opened {
//         panic!("Unable to open default camera!");
//     }
//     loop {
//         let mut frame = core::Mat::default();
//         cam.read(&mut frame)?;
//         if frame.size()?.width > 0 {
//             highgui::imshow(window, &mut frame)?;
//         }
//         let key = highgui::wait_key(10)?;
//         if key > 0 && key != 255 {
//             break;
//         }
//     }
//     Ok(())
// }

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    // runopencv().unwrap();
    format!("Hello, {}! You've been greeted from Rust!", name)
}


fn convert_str_to_u8vector(str: &str) -> opencv::types::VectorOfu8 {
    // runopencvexample().unwrap();
    let split = str.split(",");
    let string_vec = split.collect::<Vec<&str>>();
    let mut u8vec = Vec::new();

    for i in string_vec {
        let el = i.parse::<u8>().unwrap();
        u8vec.push(el)
    }

    let opencv_vector = opencv::types::VectorOfu8::from_iter(u8vec);
    return opencv_vector;

}   

#[tauri::command]
fn load_image(img: &str) -> String {
    let image_vector = convert_str_to_u8vector(img);
    
    let mat = opencv::imgcodecs::imdecode(&image_vector, IMREAD_UNCHANGED).unwrap();

    let mut buffer = opencv::types::VectorOfu8::new();
    let params =  opencv::types::VectorOfi32::new();
    let _test = opencv::imgcodecs::imencode(".jpg", &mat, &mut buffer, &params ).unwrap();
    let output  = buffer.as_slice();

    format!("{:?}", output)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, load_image])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
