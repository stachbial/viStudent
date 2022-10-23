#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use opencv::{
    core::{ ROTATE_90_COUNTERCLOCKWISE},
    highgui,
    prelude::*,
    videoio, imgcodecs::{IMREAD_UNCHANGED, IMWRITE_PNG_STRATEGY_DEFAULT},
};



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
// runopencvexample().unwrap();

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

fn deserialize_img_string(img_str: &str) -> opencv::types::VectorOfu8 {
    return  img_str
        .split(",")
        .filter_map(|el| el.parse::<u8>().ok())
        .collect();
}   

#[tauri::command]
fn load_image(img: &str) -> String {
    let fn_start = std::time::Instant::now();
    
    let image_vector = deserialize_img_string(img);

    let mut mat = opencv::imgcodecs::imdecode(&image_vector, IMREAD_UNCHANGED).unwrap();

    let mut output = opencv::types::VectorOfu8::new();
    let output_params =  opencv::types::VectorOfi32::new();
    opencv::imgcodecs::imencode(".png", &mat, &mut output, &output_params ).unwrap();
     mat.release().unwrap();

    let  fn_duration = fn_start.elapsed();
    println!("Time elapsed in load_image() is: {:?}", fn_duration);
     
    format!("{:?}", output)
}

#[tauri::command]
fn rotate(img: &str) -> String {
    let fn_start = std::time::Instant::now();

    let image_vector = deserialize_img_string(img);
    let mut mat = opencv::imgcodecs::imdecode(&image_vector, IMREAD_UNCHANGED).unwrap();

    let mut buff_mat = opencv::core::Mat::default();
    opencv::core::rotate(&mat, &mut buff_mat, ROTATE_90_COUNTERCLOCKWISE).unwrap();

    let mut output = opencv::types::VectorOfu8::new();
    let mut output_params =  opencv::types::VectorOfi32::new();
    output_params.push(
        IMWRITE_PNG_STRATEGY_DEFAULT);

    opencv::imgcodecs::imencode(".png", &buff_mat, &mut output, &output_params ).unwrap();
    mat.release().unwrap();
    buff_mat.release().unwrap();
    

    let fn_duration = fn_start.elapsed();
    println!("Time elapsed in rotate() is: {:?}", fn_duration);

    format!("{:?}", output)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![ load_image, rotate])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
