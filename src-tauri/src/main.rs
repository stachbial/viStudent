#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::ffi::c_uchar;

use opencv::{
    core::{
        Point2i, Scalar_, Size2i, BORDER_CONSTANT, BORDER_DEFAULT, CV_16S, CV_16U, CV_32S,
        CV_32SC1, CV_32SC2, CV_64F, CV_64FC1, CV_8S, CV_8U, CV_8UC1, CV_PI, NORM_MINMAX,
        ROTATE_90_COUNTERCLOCKWISE,
    },
    // videoio,
    imgcodecs::{IMREAD_GRAYSCALE, IMREAD_UNCHANGED, IMWRITE_PNG_STRATEGY_DEFAULT},
    imgproc::{
        morphology_default_border_value, ADAPTIVE_THRESH_GAUSSIAN_C, ADAPTIVE_THRESH_MEAN_C,
        COLOR_GRAY2BGR, LINE_AA, MORPH_BLACKHAT, MORPH_CLOSE, MORPH_CROSS, MORPH_ELLIPSE,
        MORPH_GRADIENT, MORPH_OPEN, MORPH_RECT, MORPH_TOPHAT, THRESH_BINARY, THRESH_BINARY_INV,
        THRESH_OTSU, THRESH_TOZERO, THRESH_TOZERO_INV, THRESH_TRIANGLE, THRESH_TRUNC,
    },
    // highgui,
    prelude::*,
};
use serde::ser::Error;

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
    return img_str
        .split(",")
        .filter_map(|el| el.parse::<u8>().ok())
        .collect();
}

fn deserialize_kernel_string(kernel: &str) -> Mat {
    let mut str_rows: Vec<&str> = kernel.split("],[").collect();
    let kernel_size = str_rows.len() as i32;
    let s = opencv::core::Scalar::default();
    let mut mat_rows = Vec::new();
    let mut kernel_mat =
        opencv::core::Mat::new_rows_cols_with_default(kernel_size, kernel_size, CV_64FC1, s)
            .unwrap();

    for i in str_rows {
        let mut z = str::replace(i, "[", "");
        z = str::replace(&z, "]", "");

        let row: Vec<f64> = z
            .split(",")
            .filter_map(|el| el.parse::<f64>().ok())
            .collect();

        mat_rows.push(row);
    }
    for row in 0..kernel_size {
        for col in 0..kernel_size {
            let mut x = kernel_mat.at_2d_mut::<f64>(row, col).unwrap();
            *x = mat_rows[row as usize][col as usize];
        }
    }

    return kernel_mat;
}

fn format_mat_to_u8_vector_img(output_mat: &Mat) -> opencv::types::VectorOfu8 {
    let mut output_vector = opencv::types::VectorOfu8::new();
    let mut output_params = opencv::core::Vector::from(vec![IMWRITE_PNG_STRATEGY_DEFAULT]);

    opencv::imgcodecs::imencode(".png", &output_mat, &mut output_vector, &output_params).unwrap();

    return output_vector;
}

fn get_morph_kernel(morph_shape: &str, morph_size: &str, anchor: opencv::core::Point_<i32>) -> Mat {
    let ksize_dim: i32 = morph_size.parse::<i32>().unwrap();
    let ksize = Size2i::new(ksize_dim, ksize_dim);
    let mut kernel;
    match morph_shape {
        "MORPH_CROSS" => {
            kernel = opencv::imgproc::get_structuring_element(MORPH_CROSS, ksize, anchor).unwrap()
        }
        "MORPH_RECT" => {
            kernel = opencv::imgproc::get_structuring_element(MORPH_RECT, ksize, anchor).unwrap()
        }
        "MORPH_ELLIPSE" => {
            kernel = opencv::imgproc::get_structuring_element(MORPH_ELLIPSE, ksize, anchor).unwrap()
        }
        &_ => {
            kernel = opencv::imgproc::get_structuring_element(MORPH_CROSS, ksize, anchor).unwrap()
        }
    };
    return kernel;
}

fn get_morph_type(morphType: &str) -> i32 {
    let mut morph_type;
    match morphType {
        "MORPH_OPEN" => morph_type = MORPH_OPEN,
        "MORPH_CLOSE" => morph_type = MORPH_CLOSE,
        "MORPH_GRADIENT" => morph_type = MORPH_GRADIENT,
        "MORPH_TOPHAT" => morph_type = MORPH_TOPHAT,
        "MORPH_BLACKHAT" => morph_type = MORPH_BLACKHAT,
        &_ => morph_type = MORPH_OPEN,
    };
    return morph_type;
}

fn create_rect_mask(
    maskH: &str,
    maskW: &str,
    maskX: &str,
    maskY: &str,
    img_width: i32,
    img_height: i32,
) -> opencv::core::Mat {
    let mut mask_h = maskH.parse::<i32>().unwrap();
    let mut mask_w = maskW.parse::<i32>().unwrap();
    let mut mask_x = maskX.parse::<i32>().unwrap();
    let mut mask_y = maskY.parse::<i32>().unwrap();
    let mut mask = opencv::core::Mat::default();

    //validate dimensions
    if mask_x < img_width && mask_y < img_height {
        if mask_w > img_width - mask_x {
            mask_w = img_width - mask_x
        }
        if mask_h > img_height - mask_y {
            mask_h = img_height - mask_y
        }
        if mask_h != 0 && mask_w != 0 {
            mask = opencv::core::Mat::zeros(img_height, img_width, 0)
                .unwrap()
                .to_mat()
                .unwrap();

            for r in mask_y..mask_y + mask_h {
                for c in mask_x..mask_x + mask_w {
                    let mut x = mask.at_2d_mut::<c_uchar>(r, c).unwrap();
                    *x = 255;
                }
            }
        }
    }
    return mask;
}

////////////////////////////////////////////////////////////////////////////////////////////

#[tauri::command]
fn load_image(img: &str, grayscale: &str) -> String {
    let fn_start = std::time::Instant::now();

    let image_vector = deserialize_img_string(img);

    let mut mat = opencv::imgcodecs::imdecode(
        &image_vector,
        if grayscale == "true" {
            IMREAD_GRAYSCALE
        } else {
            IMREAD_UNCHANGED
        },
    )
    .unwrap();

    let output_vector = format_mat_to_u8_vector_img(&mat);
    mat.release().unwrap();

    let fn_duration = fn_start.elapsed();
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

    let output_vector = format_mat_to_u8_vector_img(&output_mat);
    initial_mat.release().unwrap();
    output_mat.release().unwrap();

    let fn_duration = fn_start.elapsed();
    println!("Time elapsed in rotate() is: {:?}", fn_duration);

    format!("{:?}", output_vector)
}

#[tauri::command]
fn threshold(img: &str, thresh: &str, maxval: &str, typ: &str, grayscale: &str) -> String {
    let fn_start = std::time::Instant::now();

    //formatting input image
    let image_vector = deserialize_img_string(img);
    let mut initial_mat = opencv::imgcodecs::imdecode(
        &image_vector,
        if grayscale == "true" {
            IMREAD_GRAYSCALE
        } else {
            IMREAD_UNCHANGED
        },
    )
    .unwrap();

    //setting operation params from next js
    let mut threshold_typ;
    match typ {
        "THRESH_BINARY" => threshold_typ = THRESH_BINARY,
        "THRESH_BINARY_INV" => threshold_typ = THRESH_BINARY_INV,
        "THRESH_TRUNC" => threshold_typ = THRESH_TRUNC,
        "THRESH_TOZERO" => threshold_typ = THRESH_TOZERO,
        "THRESH_TOZERO_INV" => threshold_typ = THRESH_TOZERO_INV,
        "THRESH_OTSU" => threshold_typ = THRESH_OTSU,
        "THRESH_TRIANGLE" => threshold_typ = THRESH_TRIANGLE,
        &_ => threshold_typ = THRESH_BINARY,
    };

    //performing operation
    let mut output_mat = opencv::core::Mat::default();
    opencv::imgproc::threshold(
        &initial_mat,
        &mut output_mat,
        thresh.parse::<f64>().unwrap(),
        maxval.parse::<f64>().unwrap(),
        threshold_typ,
    )
    .unwrap();

    //formatting output
    let output_vector = format_mat_to_u8_vector_img(&output_mat);
    initial_mat.release().unwrap();
    output_mat.release().unwrap();

    //checking performance
    let fn_duration = fn_start.elapsed();
    println!("Time elapsed in threshold() is: {:?}", fn_duration);

    //sending result
    format!("{:?}", output_vector)
}

#[tauri::command]
fn adaptive_threshold(
    img: &str,
    maxval: &str,
    adaptiveMethod: &str,
    threshTyp: &str,
    blockSize: &str,
    c: &str,
    grayscale: &str,
) -> String {
    let fn_start = std::time::Instant::now();

    //formatting input image
    let image_vector = deserialize_img_string(img);
    let mut initial_mat = opencv::imgcodecs::imdecode(
        &image_vector,
        if grayscale == "true" {
            IMREAD_GRAYSCALE
        } else {
            IMREAD_UNCHANGED
        },
    )
    .unwrap();

    //setting operation params from next js
    let mut thresh_typ_;
    match threshTyp {
        "THRESH_BINARY" => thresh_typ_ = THRESH_BINARY,
        "THRESH_BINARY_INV" => thresh_typ_ = THRESH_BINARY_INV,
        &_ => thresh_typ_ = THRESH_BINARY,
    };
    let mut adaptive_method_;
    match adaptiveMethod {
        "ADAPTIVE_THRESH_MEAN_C" => adaptive_method_ = ADAPTIVE_THRESH_MEAN_C,
        "ADAPTIVE_THRESH_GAUSSIAN_C" => adaptive_method_ = ADAPTIVE_THRESH_GAUSSIAN_C,
        &_ => adaptive_method_ = ADAPTIVE_THRESH_MEAN_C,
    };

    //performing operation
    let mut output_mat = opencv::core::Mat::default();
    opencv::imgproc::adaptive_threshold(
        &initial_mat,
        &mut output_mat,
        maxval.parse::<f64>().unwrap(),
        adaptive_method_,
        thresh_typ_,
        blockSize.parse::<i32>().unwrap(),
        c.parse::<f64>().unwrap(),
    )
    .unwrap();

    //formatting output
    let output_vector = format_mat_to_u8_vector_img(&output_mat);
    initial_mat.release().unwrap();
    output_mat.release().unwrap();

    //checking performance
    let fn_duration = fn_start.elapsed();
    println!("Time elapsed in adapitve_threshold() is: {:?}", fn_duration);

    //sending result
    format!("{:?}", output_vector)
}

#[tauri::command]
fn dilatation(
    img: &str,
    morphShape: &str,
    morphSize: &str,
    iterations: &str,
    grayscale: &str,
) -> String {
    let fn_start = std::time::Instant::now();

    //formatting input image
    let image_vector = deserialize_img_string(img);
    let mut initial_mat = opencv::imgcodecs::imdecode(
        &image_vector,
        if grayscale == "true" {
            IMREAD_GRAYSCALE
        } else {
            IMREAD_UNCHANGED
        },
    )
    .unwrap();

    //setting operation params from next js
    //setting kernel
    let anchor = Point2i::new(-1, -1);
    let kernel = get_morph_kernel(morphShape, morphSize, anchor);

    //performing operation
    let mut output_mat = opencv::core::Mat::default();
    opencv::imgproc::dilate(
        &initial_mat,
        &mut output_mat,
        &kernel,
        anchor,
        iterations.parse::<i32>().unwrap(),
        BORDER_CONSTANT,
        morphology_default_border_value().unwrap(),
    )
    .unwrap();

    //formatting output
    let output_vector = format_mat_to_u8_vector_img(&output_mat);
    initial_mat.release().unwrap();
    output_mat.release().unwrap();

    //checking performance
    let fn_duration = fn_start.elapsed();
    println!("Time elapsed in dilatation() is: {:?}", fn_duration);

    //sending result
    format!("{:?}", output_vector)
}

#[tauri::command]
fn erosion(
    img: &str,
    morphShape: &str,
    morphSize: &str,
    iterations: &str,
    grayscale: &str,
) -> String {
    let fn_start = std::time::Instant::now();

    //formatting input image
    let image_vector = deserialize_img_string(img);
    let mut initial_mat = opencv::imgcodecs::imdecode(
        &image_vector,
        if grayscale == "true" {
            IMREAD_GRAYSCALE
        } else {
            IMREAD_UNCHANGED
        },
    )
    .unwrap();

    //setting operation params from next js
    //setting kernel
    let anchor = Point2i::new(-1, -1);
    let kernel = get_morph_kernel(morphShape, morphSize, anchor);

    //performing operation
    let mut output_mat = opencv::core::Mat::default();
    opencv::imgproc::erode(
        &initial_mat,
        &mut output_mat,
        &kernel,
        anchor,
        iterations.parse::<i32>().unwrap(),
        BORDER_CONSTANT,
        morphology_default_border_value().unwrap(),
    )
    .unwrap();

    //formatting output
    let output_vector = format_mat_to_u8_vector_img(&output_mat);
    initial_mat.release().unwrap();
    output_mat.release().unwrap();

    //checking performance
    let fn_duration = fn_start.elapsed();
    println!("Time elapsed in erosion() is: {:?}", fn_duration);

    //sending result
    format!("{:?}", output_vector)
}

#[tauri::command]
fn morph_advanced(
    img: &str,
    morphType: &str,
    morphShape: &str,
    morphSize: &str,
    iterations: &str,
    grayscale: &str,
) -> String {
    let fn_start = std::time::Instant::now();

    //formatting input image
    let image_vector = deserialize_img_string(img);
    let mut initial_mat = opencv::imgcodecs::imdecode(
        &image_vector,
        if grayscale == "true" {
            IMREAD_GRAYSCALE
        } else {
            IMREAD_UNCHANGED
        },
    )
    .unwrap();

    //setting operation params from next js
    //setting kernel
    let anchor = Point2i::new(-1, -1);
    let kernel = get_morph_kernel(morphShape, morphSize, anchor);
    //getting morph_type
    let morph_type = get_morph_type(morphType);

    //performing operation
    let mut output_mat = opencv::core::Mat::default();
    opencv::imgproc::morphology_ex(
        &initial_mat,
        &mut output_mat,
        morph_type,
        &kernel,
        anchor,
        iterations.parse::<i32>().unwrap(),
        BORDER_CONSTANT,
        morphology_default_border_value().unwrap(),
    )
    .unwrap();

    //formatting output
    let output_vector = format_mat_to_u8_vector_img(&output_mat);
    initial_mat.release().unwrap();
    output_mat.release().unwrap();

    //checking performance
    let fn_duration = fn_start.elapsed();
    println!("Time elapsed in morph_advanced() is: {:?}", fn_duration);

    //sending result
    format!("{:?}", output_vector)
}

#[tauri::command]
fn get_hist(
    img: &str,
    grayscale: &str,
    normalize: &str,
    maskH: &str,
    maskW: &str,
    maskX: &str,
    maskY: &str,
) -> String {
    let fn_start = std::time::Instant::now();

    //formatting input image
    let image_vector = deserialize_img_string(img);
    let mut initial_mat = opencv::imgcodecs::imdecode(
        &image_vector,
        if grayscale == "true" {
            IMREAD_GRAYSCALE
        } else {
            IMREAD_UNCHANGED
        },
    )
    .unwrap();

    let mask = create_rect_mask(
        maskH,
        maskW,
        maskX,
        maskY,
        initial_mat.size().unwrap().width,
        initial_mat.size().unwrap().height,
    );

    //getting color channels as vector of channel's mat
    let mut channel_vector = opencv::types::VectorOfMat::new();
    opencv::core::split(&initial_mat, &mut channel_vector).unwrap();

    //initialize variables
    let mut buff_mat = opencv::core::Mat::default();

    let mut channel_output_vec = opencv::types::VectorOfi32::new();
    let mut current_val;
    let mut current_channel;

    let mut map = serde_json::Map::new();
    let mut channel_json_key;
    let mut hist_json_value;
    //getting histogram data for each channel

    for channel_ in 0..channel_vector.len() {
        current_channel = channel_ as i32;

        //calc histogram data
        opencv::imgproc::calc_hist(
            &channel_vector,
            &opencv::core::Vector::from(vec![current_channel]),
            &mask,
            &mut buff_mat,
            &opencv::core::Vector::from(vec![256]),
            &opencv::core::Vector::from(vec![0., 256.]),
            false,
        )
        .unwrap();

        let mut channel_output_mat = buff_mat.clone();

        if normalize == "true" {
            opencv::core::normalize(
                &buff_mat,
                &mut channel_output_mat,
                0.,
                100.,
                NORM_MINMAX,
                -1,
                &opencv::core::Mat::default(),
            )
            .unwrap();
        }

        //parsing mat values to a vector
        for row in 0..channel_output_mat.rows() {
            current_val = *channel_output_mat.at::<f32>(row).unwrap();
            channel_output_vec.push(current_val as i32);
        }

        //appending output to JSON
        channel_json_key = current_channel.to_string();
        hist_json_value = format!("{:?}", channel_output_vec);
        map.insert(channel_json_key, serde_json::Value::String(hist_json_value));

        //releasing memory
        channel_output_mat.release().unwrap();
        channel_output_vec.clear();
    }

    //formatting output
    let output_json = serde_json::Value::Object(map);

    initial_mat.release().unwrap();
    buff_mat.release().unwrap();

    //checking performance
    let fn_duration = fn_start.elapsed();
    println!("Time elapsed in get_hist() is: {:?}", fn_duration);

    //sending result
    format!("{:?}", output_json)
}

#[tauri::command]
fn apply_rect_mask(
    img: &str,
    grayscale: &str,
    maskH: &str,
    maskW: &str,
    maskX: &str,
    maskY: &str,
) -> String {
    let fn_start = std::time::Instant::now();

    let image_vector = deserialize_img_string(img);
    let mut initial_mat = opencv::imgcodecs::imdecode(
        &image_vector,
        if grayscale == "true" {
            IMREAD_GRAYSCALE
        } else {
            IMREAD_UNCHANGED
        },
    )
    .unwrap();

    let mask = create_rect_mask(
        maskH,
        maskW,
        maskX,
        maskY,
        initial_mat.size().unwrap().width,
        initial_mat.size().unwrap().height,
    );
    let mut output_mat = opencv::core::Mat::default();

    opencv::core::bitwise_and(&initial_mat, &initial_mat, &mut output_mat, &mask).unwrap();

    let output_vector = format_mat_to_u8_vector_img(&output_mat);
    initial_mat.release().unwrap();
    output_mat.release().unwrap();

    let fn_duration = fn_start.elapsed();
    println!("Time elapsed in apply_rect_mask() is: {:?}", fn_duration);

    format!("{:?}", output_vector)
}

#[tauri::command]
fn convolve(img: &str, kernel: &str) -> String {
    let fn_start = std::time::Instant::now();

    let image_vector = deserialize_img_string(img);
    let mut initial_mat = opencv::imgcodecs::imdecode(&image_vector, IMREAD_UNCHANGED).unwrap();

    let kernel_mat = deserialize_kernel_string(kernel);
    let mut output_mat = opencv::core::Mat::default();

    opencv::imgproc::filter_2d(
        &initial_mat,
        &mut output_mat,
        -1,
        &kernel_mat,
        Point2i::new(-1, -1),
        0.0,
        BORDER_DEFAULT,
    )
    .unwrap();

    let output_vector = format_mat_to_u8_vector_img(&output_mat);
    initial_mat.release().unwrap();
    output_mat.release().unwrap();

    let fn_duration = fn_start.elapsed();
    println!("Time elapsed in convolve() is: {:?}", fn_duration);

    format!("{:?}", output_vector)
}

#[tauri::command]
fn gaussian_blur(
    img: &str,
    grayscale: &str,
    kernelW: &str,
    kernelH: &str,
    stdDeviation: &str,
) -> String {
    let fn_start = std::time::Instant::now();

    let image_vector = deserialize_img_string(img);
    let mut initial_mat = opencv::imgcodecs::imdecode(
        &image_vector,
        if grayscale == "true" {
            IMREAD_GRAYSCALE
        } else {
            IMREAD_UNCHANGED
        },
    )
    .unwrap();

    let gauss_ksize = Size2i::new(
        kernelW.parse::<i32>().unwrap(),
        kernelH.parse::<i32>().unwrap(),
    );
    let mut output_mat = opencv::core::Mat::default();

    opencv::imgproc::gaussian_blur(
        &initial_mat,
        &mut output_mat,
        gauss_ksize,
        stdDeviation.parse::<f64>().unwrap(),
        0.0,
        BORDER_DEFAULT,
    )
    .unwrap();

    let output_vector = format_mat_to_u8_vector_img(&output_mat);
    initial_mat.release().unwrap();
    output_mat.release().unwrap();

    let fn_duration = fn_start.elapsed();
    println!("Time elapsed in gaussian_blur() is: {:?}", fn_duration);

    format!("{:?}", output_vector)
}

#[tauri::command]
fn median_blur(img: &str, grayscale: &str, aperture: &str) -> String {
    let fn_start = std::time::Instant::now();

    let image_vector = deserialize_img_string(img);
    let mut initial_mat = opencv::imgcodecs::imdecode(
        &image_vector,
        if grayscale == "true" {
            IMREAD_GRAYSCALE
        } else {
            IMREAD_UNCHANGED
        },
    )
    .unwrap();

    let mut output_mat = opencv::core::Mat::default();

    opencv::imgproc::median_blur(
        &initial_mat,
        &mut output_mat,
        aperture.parse::<i32>().unwrap(),
    )
    .unwrap();

    let output_vector = format_mat_to_u8_vector_img(&output_mat);
    initial_mat.release().unwrap();
    output_mat.release().unwrap();

    let fn_duration = fn_start.elapsed();
    println!("Time elapsed in median_blur() is: {:?}", fn_duration);

    format!("{:?}", output_vector)
}

#[tauri::command]
fn bilateral_blur(
    img: &str,
    grayscale: &str,
    d: &str,
    sigmaColor: &str,
    sigmaSpace: &str,
) -> String {
    let fn_start = std::time::Instant::now();

    let image_vector = deserialize_img_string(img);
    let mut initial_mat = opencv::imgcodecs::imdecode(
        &image_vector,
        if grayscale == "true" {
            IMREAD_GRAYSCALE
        } else {
            IMREAD_UNCHANGED
        },
    )
    .unwrap();

    let mut output_mat = opencv::core::Mat::default();

    opencv::imgproc::bilateral_filter(
        &initial_mat,
        &mut output_mat,
        d.parse::<i32>().unwrap(),
        sigmaColor.parse::<f64>().unwrap(),
        sigmaSpace.parse::<f64>().unwrap(),
        BORDER_DEFAULT,
    )
    .unwrap();

    let output_vector = format_mat_to_u8_vector_img(&output_mat);
    initial_mat.release().unwrap();
    output_mat.release().unwrap();

    let fn_duration = fn_start.elapsed();
    println!("Time elapsed in bilateral_blur() is: {:?}", fn_duration);

    format!("{:?}", output_vector)
}

#[tauri::command]
fn canny_edges(img: &str, threshold1: &str, threshold2: &str, L2gradient: &str) -> String {
    let fn_start = std::time::Instant::now();

    let image_vector = deserialize_img_string(img);
    let mut initial_mat = opencv::imgcodecs::imdecode(&image_vector, IMREAD_GRAYSCALE).unwrap();

    let mut output_mat = opencv::core::Mat::default();

    opencv::imgproc::canny(
        &initial_mat,
        &mut output_mat,
        threshold1.parse::<f64>().unwrap(),
        threshold2.parse::<f64>().unwrap(),
        3,
        if L2gradient == "true" { true } else { false },
    )
    .unwrap();

    let output_vector = format_mat_to_u8_vector_img(&output_mat);
    initial_mat.release().unwrap();
    output_mat.release().unwrap();

    let fn_duration = fn_start.elapsed();
    println!("Time elapsed in canny_edges() is: {:?}", fn_duration);

    format!("{:?}", output_vector)
}

#[tauri::command]
fn sobel_edges(img: &str, dx: &str, dy: &str, ksize: &str) -> String {
    let fn_start = std::time::Instant::now();

    let image_vector = deserialize_img_string(img);
    let mut initial_mat = opencv::imgcodecs::imdecode(&image_vector, IMREAD_GRAYSCALE).unwrap();

    let mut output_mat = opencv::core::Mat::default();

    opencv::imgproc::sobel(
        &initial_mat,
        &mut output_mat,
        CV_8U,
        dx.parse::<i32>().unwrap(),
        dy.parse::<i32>().unwrap(),
        ksize.parse::<i32>().unwrap(),
        1.0,
        0.0,
        BORDER_DEFAULT,
    )
    .unwrap();

    let output_vector = format_mat_to_u8_vector_img(&output_mat);
    initial_mat.release().unwrap();
    output_mat.release().unwrap();

    let fn_duration = fn_start.elapsed();
    println!("Time elapsed in sobel_edges() is: {:?}", fn_duration);

    format!("{:?}", output_vector)
}

#[tauri::command]
fn laplacian_edges(img: &str, ksize: &str) -> String {
    let fn_start = std::time::Instant::now();

    let image_vector = deserialize_img_string(img);
    let mut initial_mat = opencv::imgcodecs::imdecode(&image_vector, IMREAD_GRAYSCALE).unwrap();

    let mut output_mat = opencv::core::Mat::default();

    opencv::imgproc::laplacian(
        &initial_mat,
        &mut output_mat,
        CV_8U,
        ksize.parse::<i32>().unwrap(),
        1.0,
        0.0,
        BORDER_DEFAULT,
    )
    .unwrap();

    let output_vector = format_mat_to_u8_vector_img(&output_mat);
    initial_mat.release().unwrap();
    output_mat.release().unwrap();

    let fn_duration = fn_start.elapsed();
    println!("Time elapsed in laplacian() is: {:?}", fn_duration);

    format!("{:?}", output_vector)
}

// #[tauri::command]
// fn distance_transf() -> String {
//     let fn_start = std::time::Instant::now();

//     let image_vector = deserialize_img_string(img);
//     let mut initial_mat = opencv::imgcodecs::imdecode(&image_vector, IMREAD_GRAYSCALE).unwrap();

//     let mut output_mat = opencv::core::Mat::default();

//     opencv::imgproc::laplacian(
//         &initial_mat,
//         &mut output_mat,
//         CV_8U,
//         ksize.parse::<i32>().unwrap(),
//         1.0,
//         0.0,
//         BORDER_DEFAULT,
//     )
//     .unwrap();

//     let output_vector = format_mat_to_u8_vector_img(&output_mat);
//     initial_mat.release().unwrap();
//     output_mat.release().unwrap();

//     let fn_duration = fn_start.elapsed();
//     println!("Time elapsed in distance_transf() is: {:?}", fn_duration);

//     format!("{:?}", output_vector)
// }

#[tauri::command]
fn hough_lines_p(
    img: &str,
    rho: &str,
    theta: &str,
    threshold: &str,
    minLineLength: &str,
    maxLineGap: &str,
) -> Result<String, String> {
    fn handle_hough_lines_p(
        img: &str,
        rho: &str,
        theta: &str,
        threshold: &str,
        minLineLength: &str,
        maxLineGap: &str,
    ) -> Result<String, opencv::Error> {
        let fn_start = std::time::Instant::now();

        let image_vector = deserialize_img_string(img);
        let mut initial_mat = opencv::imgcodecs::imdecode(&image_vector, IMREAD_UNCHANGED)?;

        let mut output_mat = opencv::core::Mat::default();

        //creating template mat for lines
        opencv::imgproc::cvt_color(&initial_mat, &mut output_mat, COLOR_GRAY2BGR, 0)?;

        let mut lines_p = opencv::types::VectorOfVec4i::default();

        opencv::imgproc::hough_lines_p(
            &initial_mat,
            &mut lines_p,
            rho.parse::<f64>().unwrap(),
            CV_PI / 180. * theta.parse::<f64>().unwrap(),
            threshold.parse::<i32>().unwrap(),
            minLineLength.parse::<f64>().unwrap(),
            maxLineGap.parse::<f64>().unwrap(),
        )?;

        //draw lines
        for line_p in lines_p {
            opencv::imgproc::line(
                &mut output_mat,
                opencv::core::Point2i::new(line_p[0], line_p[1]),
                opencv::core::Point2i::new(line_p[2], line_p[3]),
                opencv::core::Scalar::new(0., 0., 255., 0.),
                1,
                LINE_AA,
                0,
            )?;
        }

        let output_vector = format_mat_to_u8_vector_img(&output_mat);
        initial_mat.release()?;
        output_mat.release()?;

        let fn_duration = fn_start.elapsed();
        println!("Time elapsed hough_lines_p() is: {:?}", fn_duration);

        Ok(format!("{:?}", output_vector))
    }

    let result = handle_hough_lines_p(img, rho, theta, threshold, minLineLength, maxLineGap);

    match result {
        Ok(result) => Ok(result),
        Err(error) => {
            println!("{:?}", error);
            Err("hough_lines_p".into())
        }
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            load_image,
            rotate,
            threshold,
            adaptive_threshold,
            dilatation,
            erosion,
            morph_advanced,
            get_hist,
            apply_rect_mask,
            convolve,
            gaussian_blur,
            median_blur,
            bilateral_blur,
            canny_edges,
            sobel_edges,
            laplacian_edges,
            hough_lines_p
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// let mut lines = opencv::types::VectorOfVec2f::new();
// opencv::imgproc::hough_lines(
//     &buff_mat,
//     &mut lines,
//     1.,
//     CV_PI / 180.,
//     100,
//     0.,
//     0.,
//     0.,
//     2. * CV_PI,
// )
// .unwrap();

// for line in lines {
//     // let q = lines.into_iter();

//     let rho = line[0];
//     let theta = line[1];

//     let mut a = theta.cos();
//     let mut b = theta.sin();

//     let mut p1 = Point2i::default();
//     let mut p2 = Point2i::default();

//     let mut x0 = a * rho;
//     let mut y0 = b * rho;

//     p1.x = (x0 + 1000. * (-b)).round() as i32;
//     p1.y = (y0 + 1000. * (a)).round() as i32;
//     p2.x = (x0 - 1000. * (-b)).round() as i32;
//     p2.y = (y0 - 1000. * (a)).round() as i32;

//     opencv::imgproc::line(
//         &mut output_mat,
//         p1,
//         p2,
//         opencv::core::Scalar::new(0., 0., 255., 0.),
//         1,
//         LINE_AA,
//         0,
//     )
//     .unwrap();
// }
