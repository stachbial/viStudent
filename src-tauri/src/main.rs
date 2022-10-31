#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use opencv::{
    core::{ ROTATE_90_COUNTERCLOCKWISE, Point2l, Point2i, Size2i, BORDER_CONSTANT},
    // highgui,
    prelude::*,
    // videoio, 
    imgcodecs::{IMREAD_UNCHANGED, IMWRITE_PNG_STRATEGY_DEFAULT, IMREAD_GRAYSCALE}, imgproc::{ THRESH_BINARY, THRESH_BINARY_INV, THRESH_TRUNC, THRESH_TOZERO, THRESH_TOZERO_INV, THRESH_OTSU, THRESH_TRIANGLE, ADAPTIVE_THRESH_MEAN_C, ADAPTIVE_THRESH_GAUSSIAN_C, morphology_default_border_value, MORPH_CROSS, MORPH_RECT, MORPH_ELLIPSE, MORPH_OPEN, MORPH_CLOSE, MORPH_GRADIENT, MORPH_TOPHAT, MORPH_BLACKHAT},
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

// helpers:

fn deserialize_img_string(img_str: &str) -> opencv::types::VectorOfu8 {
    return  img_str
        .split(",")
        .filter_map(|el| el.parse::<u8>().ok())
        .collect();
}   

fn format_mat_to_u8_vector(output_mat: &Mat) -> opencv::types::VectorOfu8{
    let mut output_vector = opencv::types::VectorOfu8::new();
    let mut output_params =  opencv::types::VectorOfi32::new();
    output_params.push(
        IMWRITE_PNG_STRATEGY_DEFAULT);

    opencv::imgcodecs::imencode(".png", &output_mat, &mut output_vector, &output_params ).unwrap();

    return output_vector;
}

fn get_morph_kernel(morph_shape: &str, morph_size: &str, anchor: opencv::core::Point_<i32>) -> Mat{
    let ksize_dim: i32 = morph_size.parse::<i32>().unwrap();
    let ksize = Size2i::new(ksize_dim, ksize_dim);
    let mut kernel;
    match morph_shape{
        "MORPH_CROSS"=> kernel =  opencv::imgproc::get_structuring_element(MORPH_CROSS, ksize, anchor).unwrap(),
        "MORPH_RECT"=> kernel =  opencv::imgproc::get_structuring_element(MORPH_RECT, ksize, anchor).unwrap(),
        "MORPH_ELLIPSE"=> kernel =  opencv::imgproc::get_structuring_element(MORPH_ELLIPSE, ksize, anchor).unwrap(),
        &_=>kernel =  opencv::imgproc::get_structuring_element(MORPH_CROSS, ksize, anchor).unwrap()
    };
    return kernel;
}

fn get_morph_type(morphType: &str) -> i32{
    let mut morph_type;
    match morphType{
        "MORPH_OPEN"=> morph_type =  MORPH_OPEN,
        "MORPH_CLOSE"=> morph_type =  MORPH_CLOSE,
        "MORPH_GRADIENT"=> morph_type =  MORPH_GRADIENT,
        "MORPH_TOPHAT"=> morph_type =  MORPH_TOPHAT,
        "MORPH_BLACKHAT"=> morph_type =  MORPH_BLACKHAT,
        &_=>morph_type =   MORPH_OPEN
    };
    return morph_type;
}

////////////////////////////////////////////////////////////////////////////////////////////

#[tauri::command]
fn load_image(img: &str) -> String {
    let fn_start = std::time::Instant::now();
    
    let image_vector = deserialize_img_string(img);

    let mut mat = opencv::imgcodecs::imdecode(&image_vector, IMREAD_UNCHANGED).unwrap();

    let output_vector = format_mat_to_u8_vector(&mat);
     mat.release().unwrap();

    let  fn_duration = fn_start.elapsed();
    println!("Time elapsed in load_image() is: {:?}", fn_duration);
     
    format!("{:?}", output_vector)
}

#[tauri::command]
fn rotate(img: &str) -> String {
    let fn_start = std::time::Instant::now();

    let image_vector = deserialize_img_string(img);
    let mut initial_mat = opencv::imgcodecs::imdecode(&image_vector, IMREAD_UNCHANGED).unwrap();

    let mut output_mat = opencv::core::Mat::default();
    opencv::core::rotate(&initial_mat, &mut output_mat, ROTATE_90_COUNTERCLOCKWISE).unwrap();

    let output_vector = format_mat_to_u8_vector(&output_mat);
    initial_mat.release().unwrap();
    output_mat.release().unwrap();
    

    let fn_duration = fn_start.elapsed();
    println!("Time elapsed in rotate() is: {:?}", fn_duration);

    format!("{:?}", output_vector)
}


#[tauri::command]
fn threshold(img: &str,thresh: &str, maxval: &str,  typ: &str, grayscale: &str) -> String {
    let fn_start = std::time::Instant::now();

    //formatting input image
    let image_vector = deserialize_img_string(img);
    let mut initial_mat = opencv::imgcodecs::imdecode(&image_vector, if grayscale == "true" {IMREAD_GRAYSCALE} else {IMREAD_UNCHANGED}).unwrap();

    //setting operation params from next js
    let mut threshold_typ ;
    match typ{
        "THRESH_BINARY"=> threshold_typ = THRESH_BINARY,
        "THRESH_BINARY_INV"=>threshold_typ= THRESH_BINARY_INV,
        "THRESH_TRUNC"=>threshold_typ= THRESH_TRUNC,
        "THRESH_TOZERO"=>threshold_typ= THRESH_TOZERO,
        "THRESH_TOZERO_INV"=>threshold_typ= THRESH_TOZERO_INV,
        "THRESH_OTSU"=>threshold_typ= THRESH_OTSU,
        "THRESH_TRIANGLE"=>threshold_typ= THRESH_TRIANGLE,
        &_=> threshold_typ = THRESH_BINARY
    };
    
    //performing operation
    let mut output_mat = opencv::core::Mat::default();
    opencv::imgproc::threshold(&initial_mat, &mut output_mat, thresh.parse::<f64>().unwrap(), maxval.parse::<f64>().unwrap(), threshold_typ).unwrap();

    //formatting output
    let output_vector = format_mat_to_u8_vector(&output_mat);
    initial_mat.release().unwrap();
    output_mat.release().unwrap();

    //checking performance
    let fn_duration = fn_start.elapsed();
    println!("Time elapsed in threshold() is: {:?}", fn_duration);

    //sending result
    format!("{:?}", output_vector)
}


#[tauri::command]
fn adaptive_threshold(img: &str, maxval: &str, adaptiveMethod: &str, threshTyp: &str, blockSize: &str, c: &str, grayscale: &str) -> String {
    let fn_start = std::time::Instant::now();

    //formatting input image
    let image_vector = deserialize_img_string(img);
    let mut initial_mat = opencv::imgcodecs::imdecode(&image_vector, if grayscale == "true" {IMREAD_GRAYSCALE} else {IMREAD_UNCHANGED}).unwrap();

    //setting operation params from next js
    let mut thresh_typ_;
    match threshTyp{
        "THRESH_BINARY"=> thresh_typ_ = THRESH_BINARY,
        "THRESH_BINARY_INV"=>thresh_typ_= THRESH_BINARY_INV,
        &_=> thresh_typ_ = THRESH_BINARY
    };
    let mut adaptive_method_;
    match adaptiveMethod{
        "ADAPTIVE_THRESH_MEAN_C"=> adaptive_method_ =ADAPTIVE_THRESH_MEAN_C,
        "ADAPTIVE_THRESH_GAUSSIAN_C"=> adaptive_method_ = ADAPTIVE_THRESH_GAUSSIAN_C,
        &_=>adaptive_method_ =ADAPTIVE_THRESH_MEAN_C
    };

    //performing operation
    let mut output_mat = opencv::core::Mat::default();
    opencv::imgproc::adaptive_threshold(&initial_mat, &mut output_mat, maxval.parse::<f64>().unwrap(),adaptive_method_,thresh_typ_, blockSize.parse::<i32>().unwrap(),c.parse::<f64>().unwrap()).unwrap();

    //formatting output
    let output_vector = format_mat_to_u8_vector(&output_mat);
    initial_mat.release().unwrap();
    output_mat.release().unwrap();

    //checking performance
    let fn_duration = fn_start.elapsed();
    println!("Time elapsed in adapitve_threshold() is: {:?}", fn_duration);

    //sending result
    format!("{:?}", output_vector)
}


#[tauri::command]
fn dilatation(img: &str, morphShape: &str, morphSize: &str, iterations: &str, grayscale: &str) -> String {
    let fn_start = std::time::Instant::now();

    //formatting input image
    let image_vector = deserialize_img_string(img);
    let mut initial_mat = opencv::imgcodecs::imdecode(&image_vector, if grayscale == "true" {IMREAD_GRAYSCALE} else {IMREAD_UNCHANGED}).unwrap();

    //setting operation params from next js
    //setting kernel
    let anchor = Point2i::new(-1, -1);
    let kernel = get_morph_kernel(morphShape, morphSize, anchor);

    //performing operation
    let mut output_mat = opencv::core::Mat::default();
    opencv::imgproc::dilate(&initial_mat, &mut output_mat, &kernel, anchor, iterations.parse::<i32>().unwrap(), BORDER_CONSTANT, morphology_default_border_value().unwrap()).unwrap();

    //formatting output
    let output_vector = format_mat_to_u8_vector(&output_mat);
    initial_mat.release().unwrap();
    output_mat.release().unwrap();

    //checking performance
    let fn_duration = fn_start.elapsed();
    println!("Time elapsed in dilate() is: {:?}", fn_duration);

    //sending result
    format!("{:?}", output_vector)
}


#[tauri::command]
fn erosion(img: &str, morphShape: &str, morphSize: &str, iterations: &str, grayscale: &str) -> String {
    let fn_start = std::time::Instant::now();

    //formatting input image
    let image_vector = deserialize_img_string(img);
    let mut initial_mat = opencv::imgcodecs::imdecode(&image_vector, if grayscale == "true" {IMREAD_GRAYSCALE} else {IMREAD_UNCHANGED}).unwrap();

    //setting operation params from next js
    //setting kernel
    let anchor = Point2i::new(-1, -1);
    let kernel = get_morph_kernel(morphShape, morphSize, anchor);

    //performing operation
    let mut output_mat = opencv::core::Mat::default();
    opencv::imgproc::erode(&initial_mat, &mut output_mat, &kernel, anchor, iterations.parse::<i32>().unwrap(), BORDER_CONSTANT, morphology_default_border_value().unwrap()).unwrap();

    //formatting output
    let output_vector = format_mat_to_u8_vector(&output_mat);
    initial_mat.release().unwrap();
    output_mat.release().unwrap();

    //checking performance
    let fn_duration = fn_start.elapsed();
    println!("Time elapsed in dilate() is: {:?}", fn_duration);

    //sending result
    format!("{:?}", output_vector)
}


#[tauri::command]
fn morph_advanced(img: &str, morphType: &str, morphShape: &str, morphSize: &str, iterations: &str, grayscale: &str) -> String {
    let fn_start = std::time::Instant::now();

    //formatting input image
    let image_vector = deserialize_img_string(img);
    let mut initial_mat = opencv::imgcodecs::imdecode(&image_vector, if grayscale == "true" {IMREAD_GRAYSCALE} else {IMREAD_UNCHANGED}).unwrap();

    //setting operation params from next js
    //setting kernel
    let anchor = Point2i::new(-1, -1);
    let kernel = get_morph_kernel(morphShape, morphSize, anchor);
    //getting morph_type
    let morph_type = get_morph_type(morphType);

    //performing operation
    let mut output_mat = opencv::core::Mat::default();
    opencv::imgproc::morphology_ex(&initial_mat, &mut output_mat, morph_type, &kernel, anchor, iterations.parse::<i32>().unwrap(), BORDER_CONSTANT, morphology_default_border_value().unwrap()).unwrap();

    //formatting output
    let output_vector = format_mat_to_u8_vector(&output_mat);
    initial_mat.release().unwrap();
    output_mat.release().unwrap();

    //checking performance
    let fn_duration = fn_start.elapsed();
    println!("Time elapsed in dilate() is: {:?}", fn_duration);

    //sending result
    format!("{:?}", output_vector)
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![ load_image, rotate, threshold, adaptive_threshold, dilatation, erosion, morph_advanced])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
