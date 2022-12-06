#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::ffi::c_uchar;

use opencv::{
    core::{
        Point2i, Size2i, BORDER_CONSTANT, BORDER_DEFAULT, CV_64FC1, CV_8U, CV_PI, NORM_MINMAX,
        ROTATE_90_COUNTERCLOCKWISE,
    },
    imgcodecs::{IMREAD_GRAYSCALE, IMREAD_UNCHANGED, IMWRITE_PNG_STRATEGY_DEFAULT},
    imgproc::{
        morphology_default_border_value, ADAPTIVE_THRESH_GAUSSIAN_C, ADAPTIVE_THRESH_MEAN_C,
        COLOR_GRAY2BGR, LINE_AA, MORPH_BLACKHAT, MORPH_CLOSE, MORPH_CROSS, MORPH_ELLIPSE,
        MORPH_GRADIENT, MORPH_OPEN, MORPH_RECT, MORPH_TOPHAT, THRESH_BINARY, THRESH_BINARY_INV,
        THRESH_OTSU, THRESH_TOZERO, THRESH_TOZERO_INV, THRESH_TRIANGLE, THRESH_TRUNC,
    },
    prelude::*,
};

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
fn load_image(img: &str, grayscale: &str) -> Result<String, String> {
    fn handle_load_image(img: &str, grayscale: &str) -> Result<String, opencv::Error> {
        let image_vector = deserialize_img_string(img);

        let mut mat = opencv::imgcodecs::imdecode(
            &image_vector,
            if grayscale == "true" {
                IMREAD_GRAYSCALE
            } else {
                IMREAD_UNCHANGED
            },
        )?;

        let output_vector = format_mat_to_u8_vector_img(&mat);
        mat.release()?;

        Ok(format!("{:?}", output_vector))
    }

    let result = handle_load_image(img, grayscale);

    match result {
        Ok(result) => Ok(result),
        Err(error) => {
            println!("{:?}", error);
            Err("Wystąpił błąd podczas wczytywania obrazu. Wybierz inny plik lub uruchom aplikację ponownie".into())
        }
    }
}

#[tauri::command]
fn rotate(img: &str) -> Result<String, String> {
    fn handle_rotate(img: &str) -> Result<String, opencv::Error> {
        let image_vector = deserialize_img_string(img);
        let mut initial_mat = opencv::imgcodecs::imdecode(&image_vector, IMREAD_UNCHANGED)?;

        let mut output_mat = opencv::core::Mat::default();
        opencv::core::rotate(&initial_mat, &mut output_mat, ROTATE_90_COUNTERCLOCKWISE)?;

        let output_vector = format_mat_to_u8_vector_img(&output_mat);
        initial_mat.release()?;
        output_mat.release()?;

        Ok(format!("{:?}", output_vector))
    }

    let result = handle_rotate(img);

    match result {
        Ok(result) => Ok(result),
        Err(error) => {
            println!("{:?}", error);
            Err("Wystąpił błąd podczas rotacji obrazu.".into())
        }
    }
}

#[tauri::command]
fn threshold(
    img: &str,
    thresh: &str,
    maxval: &str,
    typ: &str,
    grayscale: &str,
) -> Result<String, String> {
    fn handle_threshold(
        img: &str,
        thresh: &str,
        maxval: &str,
        typ: &str,
        grayscale: &str,
    ) -> Result<String, opencv::Error> {
        //formatting input image
        let image_vector = deserialize_img_string(img);
        let mut initial_mat = opencv::imgcodecs::imdecode(
            &image_vector,
            if grayscale == "true" {
                IMREAD_GRAYSCALE
            } else {
                IMREAD_UNCHANGED
            },
        )?;

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
        )?;

        //formatting output
        let output_vector = format_mat_to_u8_vector_img(&output_mat);
        initial_mat.release()?;
        output_mat.release()?;

        //checking performance

        //sending result
        Ok(format!("{:?}", output_vector))
    }

    let result = handle_threshold(img, thresh, maxval, typ, grayscale);

    match result {
        Ok(result) => Ok(result),
        Err(error) => {
            println!("{:?}", error);
            Err("Progowanie proste: błąd!. Upewnij się, że wprowadzono poprawne parametry".into())
        }
    }
}

#[tauri::command]
fn adaptive_threshold(
    img: &str,
    maxval: &str,
    adaptiveMethod: &str,
    threshTyp: &str,
    blockSize: &str,
    c: &str,
) -> Result<String, String> {
    fn handle_adaptive_threshold(
        img: &str,
        maxval: &str,
        adaptiveMethod: &str,
        threshTyp: &str,
        blockSize: &str,
        c: &str,
    ) -> Result<String, opencv::Error> {
        //formatting input image
        let image_vector = deserialize_img_string(img);
        let mut initial_mat = opencv::imgcodecs::imdecode(&image_vector, IMREAD_GRAYSCALE)?;

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
        )?;

        //formatting output
        let output_vector = format_mat_to_u8_vector_img(&output_mat);
        initial_mat.release()?;
        output_mat.release()?;

        //checking performance

        //sending result
        Ok(format!("{:?}", output_vector))
    }

    let result = handle_adaptive_threshold(img, maxval, adaptiveMethod, threshTyp, blockSize, c);

    match result {
        Ok(result) => Ok(result),
        Err(error) => {
            println!("{:?}", error);
            Err(
                "Progowanie adaptacyjne: błąd!. Upewnij się, że wprowadzono poprawne parametry"
                    .into(),
            )
        }
    }
}

#[tauri::command]
fn dilatation(
    img: &str,
    morphShape: &str,
    morphSize: &str,
    iterations: &str,
    grayscale: &str,
) -> Result<String, String> {
    fn handle_dilatation(
        img: &str,
        morphShape: &str,
        morphSize: &str,
        iterations: &str,
        grayscale: &str,
    ) -> Result<String, opencv::Error> {
        //formatting input image
        let image_vector = deserialize_img_string(img);
        let mut initial_mat = opencv::imgcodecs::imdecode(
            &image_vector,
            if grayscale == "true" {
                IMREAD_GRAYSCALE
            } else {
                IMREAD_UNCHANGED
            },
        )?;

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
        )?;

        //formatting output
        let output_vector = format_mat_to_u8_vector_img(&output_mat);
        initial_mat.release()?;
        output_mat.release()?;

        //checking performance

        //sending result
        Ok(format!("{:?}", output_vector))
    }

    let result = handle_dilatation(img, morphShape, morphSize, iterations, grayscale);

    match result {
        Ok(result) => Ok(result),
        Err(error) => {
            println!("{:?}", error);
            Err("Dylatacja: błąd!. Upewnij się, że wprowadzono poprawne parametry".into())
        }
    }
}

#[tauri::command]
fn erosion(
    img: &str,
    morphShape: &str,
    morphSize: &str,
    iterations: &str,
    grayscale: &str,
) -> Result<String, String> {
    fn handle_erosion(
        img: &str,
        morphShape: &str,
        morphSize: &str,
        iterations: &str,
        grayscale: &str,
    ) -> Result<String, opencv::Error> {
        let image_vector = deserialize_img_string(img);
        let mut initial_mat = opencv::imgcodecs::imdecode(
            &image_vector,
            if grayscale == "true" {
                IMREAD_GRAYSCALE
            } else {
                IMREAD_UNCHANGED
            },
        )?;

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
        )?;

        //formatting output
        let output_vector = format_mat_to_u8_vector_img(&output_mat);
        initial_mat.release()?;
        output_mat.release()?;

        //checking performance

        //sending result
        Ok(format!("{:?}", output_vector))
    }

    let result = handle_erosion(img, morphShape, morphSize, iterations, grayscale);

    match result {
        Ok(result) => Ok(result),
        Err(error) => {
            println!("{:?}", error);
            Err("Erozja: błąd!. Upewnij się, że wprowadzono poprawne parametry".into())
        }
    }
}

#[tauri::command]
fn morph_advanced(
    img: &str,
    morphType: &str,
    morphShape: &str,
    morphSize: &str,
    iterations: &str,
    grayscale: &str,
) -> Result<String, String> {
    fn handle_morph_advanced(
        img: &str,
        morphType: &str,
        morphShape: &str,
        morphSize: &str,
        iterations: &str,
        grayscale: &str,
    ) -> Result<String, opencv::Error> {
        let image_vector = deserialize_img_string(img);
        let mut initial_mat = opencv::imgcodecs::imdecode(
            &image_vector,
            if grayscale == "true" {
                IMREAD_GRAYSCALE
            } else {
                IMREAD_UNCHANGED
            },
        )?;

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
        )?;

        //formatting output
        let output_vector = format_mat_to_u8_vector_img(&output_mat);
        initial_mat.release()?;
        output_mat.release()?;

        //sending result
        Ok(format!("{:?}", output_vector))
    }

    let result =
        handle_morph_advanced(img, morphType, morphShape, morphSize, iterations, grayscale);

    match result {
        Ok(result) => Ok(result),
        Err(error) => {
            println!("{:?}", error);
            Err("Zaawansowane Warianty Operacji Morfologicznych: błąd!. Upewnij się, że wprowadzono poprawne parametry".into())
        }
    }
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
) -> Result<String, String> {
    fn handle_get_hist(
        img: &str,
        grayscale: &str,
        normalize: &str,
        maskH: &str,
        maskW: &str,
        maskX: &str,
        maskY: &str,
    ) -> Result<String, opencv::Error> {
        //formatting input image
        let image_vector = deserialize_img_string(img);
        let mut initial_mat = opencv::imgcodecs::imdecode(
            &image_vector,
            if grayscale == "true" {
                IMREAD_GRAYSCALE
            } else {
                IMREAD_UNCHANGED
            },
        )?;

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
        opencv::core::split(&initial_mat, &mut channel_vector)?;

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
            )?;

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
                )?;
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
            channel_output_mat.release()?;
            channel_output_vec.clear();
        }

        //formatting output
        let output_json = serde_json::Value::Object(map);

        initial_mat.release()?;
        buff_mat.release()?;

        //checking performance

        //sending result
        Ok(format!("{:?}", output_json))
    }

    let result = handle_get_hist(img, grayscale, normalize, maskH, maskW, maskX, maskY);

    match result {
        Ok(result) => Ok(result),
        Err(error) => {
            println!("{:?}", error);
            Err("Wystąpił błąd uzyskiwania danych histogramu. Wybierz inny obraz lub uruchom aplikację ponownie".into())
        }
    }
}

#[tauri::command]
fn apply_rect_mask(
    img: &str,
    grayscale: &str,
    maskH: &str,
    maskW: &str,
    maskX: &str,
    maskY: &str,
) -> Result<String, String> {
    fn handle_apply_rect_mask(
        img: &str,
        grayscale: &str,
        maskH: &str,
        maskW: &str,
        maskX: &str,
        maskY: &str,
    ) -> Result<String, opencv::Error> {
        let image_vector = deserialize_img_string(img);
        let mut initial_mat = opencv::imgcodecs::imdecode(
            &image_vector,
            if grayscale == "true" {
                IMREAD_GRAYSCALE
            } else {
                IMREAD_UNCHANGED
            },
        )?;

        let mask = create_rect_mask(
            maskH,
            maskW,
            maskX,
            maskY,
            initial_mat.size().unwrap().width,
            initial_mat.size().unwrap().height,
        );
        let mut output_mat = opencv::core::Mat::default();

        opencv::core::bitwise_and(&initial_mat, &initial_mat, &mut output_mat, &mask)?;

        let output_vector = format_mat_to_u8_vector_img(&output_mat);
        initial_mat.release()?;
        output_mat.release()?;

        Ok(format!("{:?}", output_vector))
    }

    let result = handle_apply_rect_mask(img, grayscale, maskH, maskW, maskX, maskY);

    match result {
        Ok(result) => Ok(result),
        Err(error) => {
            println!("{:?}", error);
            Err("Maska prostokątna: błąd!. Upewnij się, że wprowadzono poprawne parametry".into())
        }
    }
}

#[tauri::command]
fn convolve(img: &str, kernel: &str) -> Result<String, String> {
    fn handle_convolve(img: &str, kernel: &str) -> Result<String, opencv::Error> {
        let image_vector = deserialize_img_string(img);
        let mut initial_mat = opencv::imgcodecs::imdecode(&image_vector, IMREAD_UNCHANGED)?;

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
        )?;

        let output_vector = format_mat_to_u8_vector_img(&output_mat);
        initial_mat.release()?;
        output_mat.release()?;

        Ok(format!("{:?}", output_vector))
    }

    let result = handle_convolve(img, kernel);

    match result {
        Ok(result) => Ok(result),
        Err(error) => {
            println!("{:?}", error);
            Err("Konwolucja: błąd!. Upewnij się, że wprowadzono poprawne parametry".into())
        }
    }
}

#[tauri::command]
fn gaussian_blur(
    img: &str,
    grayscale: &str,
    kernelW: &str,
    kernelH: &str,
    stdDeviation: &str,
) -> Result<String, String> {
    fn handle_gaussian_blur(
        img: &str,
        grayscale: &str,
        kernelW: &str,
        kernelH: &str,
        stdDeviation: &str,
    ) -> Result<String, opencv::Error> {
        let image_vector = deserialize_img_string(img);
        let mut initial_mat = opencv::imgcodecs::imdecode(
            &image_vector,
            if grayscale == "true" {
                IMREAD_GRAYSCALE
            } else {
                IMREAD_UNCHANGED
            },
        )?;

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
        )?;

        let output_vector = format_mat_to_u8_vector_img(&output_mat);
        initial_mat.release()?;
        output_mat.release()?;

        Ok(format!("{:?}", output_vector))
    }

    let result = handle_gaussian_blur(img, grayscale, kernelW, kernelH, stdDeviation);

    match result {
        Ok(result) => Ok(result),
        Err(error) => {
            println!("{:?}", error);
            Err("Rozmycie Gaussa: błąd!. Upewnij się, że wprowadzono poprawne parametry".into())
        }
    }
}

#[tauri::command]
fn median_blur(img: &str, grayscale: &str, aperture: &str) -> Result<String, String> {
    fn handle_median_blur(
        img: &str,
        grayscale: &str,
        aperture: &str,
    ) -> Result<String, opencv::Error> {
        let image_vector = deserialize_img_string(img);
        let mut initial_mat = opencv::imgcodecs::imdecode(
            &image_vector,
            if grayscale == "true" {
                IMREAD_GRAYSCALE
            } else {
                IMREAD_UNCHANGED
            },
        )?;

        let mut output_mat = opencv::core::Mat::default();

        opencv::imgproc::median_blur(
            &initial_mat,
            &mut output_mat,
            aperture.parse::<i32>().unwrap(),
        )?;

        let output_vector = format_mat_to_u8_vector_img(&output_mat);
        initial_mat.release()?;
        output_mat.release()?;

        Ok(format!("{:?}", output_vector))
    }

    let result = handle_median_blur(img, grayscale, aperture);

    match result {
        Ok(result) => Ok(result),
        Err(error) => {
            println!("{:?}", error);
            Err("Rozmycie Medianowe: błąd!. Upewnij się, że wprowadzono poprawne parametry".into())
        }
    }
}

#[tauri::command]
fn bilateral_blur(
    img: &str,
    grayscale: &str,
    d: &str,
    sigmaColor: &str,
    sigmaSpace: &str,
) -> Result<String, String> {
    fn handle_bilateral_blur(
        img: &str,
        grayscale: &str,
        d: &str,
        sigmaColor: &str,
        sigmaSpace: &str,
    ) -> Result<String, opencv::Error> {
        let image_vector = deserialize_img_string(img);
        let mut initial_mat = opencv::imgcodecs::imdecode(
            &image_vector,
            if grayscale == "true" {
                IMREAD_GRAYSCALE
            } else {
                IMREAD_UNCHANGED
            },
        )?;

        let mut output_mat = opencv::core::Mat::default();

        opencv::imgproc::bilateral_filter(
            &initial_mat,
            &mut output_mat,
            d.parse::<i32>().unwrap(),
            sigmaColor.parse::<f64>().unwrap(),
            sigmaSpace.parse::<f64>().unwrap(),
            BORDER_DEFAULT,
        )?;

        let output_vector = format_mat_to_u8_vector_img(&output_mat);
        initial_mat.release()?;
        output_mat.release()?;

        Ok(format!("{:?}", output_vector))
    }

    let result = handle_bilateral_blur(img, grayscale, d, sigmaColor, sigmaSpace);

    match result {
        Ok(result) => Ok(result),
        Err(error) => {
            println!("{:?}", error);
            Err("Filtr Bilateralny: błąd!. Upewnij się, że wprowadzono poprawne parametry".into())
        }
    }
}

#[tauri::command]
fn canny_edges(
    img: &str,
    threshold1: &str,
    threshold2: &str,
    L2gradient: &str,
) -> Result<String, String> {
    fn handle_canny_edges(
        img: &str,
        threshold1: &str,
        threshold2: &str,
        L2gradient: &str,
    ) -> Result<String, opencv::Error> {
        let image_vector = deserialize_img_string(img);
        let mut initial_mat = opencv::imgcodecs::imdecode(&image_vector, IMREAD_GRAYSCALE)?;

        let mut output_mat = opencv::core::Mat::default();

        opencv::imgproc::canny(
            &initial_mat,
            &mut output_mat,
            threshold1.parse::<f64>().unwrap(),
            threshold2.parse::<f64>().unwrap(),
            3,
            if L2gradient == "true" { true } else { false },
        )?;

        let output_vector = format_mat_to_u8_vector_img(&output_mat);
        initial_mat.release()?;
        output_mat.release()?;

        Ok(format!("{:?}", output_vector))
    }

    let result = handle_canny_edges(img, threshold1, threshold2, L2gradient);

    match result {
        Ok(result) => Ok(result),
        Err(error) => {
            println!("{:?}", error);
            Err("Filtr Canny'ego: błąd!. Upewnij się, że wprowadzono poprawne parametry".into())
        }
    }
}

#[tauri::command]
fn sobel_edges(img: &str, dx: &str, dy: &str, ksize: &str) -> Result<String, String> {
    fn handle_sobel_edges(
        img: &str,
        dx: &str,
        dy: &str,
        ksize: &str,
    ) -> Result<String, opencv::Error> {
        let image_vector = deserialize_img_string(img);
        let mut initial_mat = opencv::imgcodecs::imdecode(&image_vector, IMREAD_GRAYSCALE)?;

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
        )?;

        let output_vector = format_mat_to_u8_vector_img(&output_mat);
        initial_mat.release()?;
        output_mat.release()?;

        Ok(format!("{:?}", output_vector))
    }

    let result = handle_sobel_edges(img, dx, dy, ksize);

    match result {
        Ok(result) => Ok(result),
        Err(error) => {
            println!("{:?}", error);
            Err("Filtr Sobel'a: błąd!. Upewnij się, że wprowadzono poprawne parametry".into())
        }
    }
}

#[tauri::command]
fn laplacian_edges(img: &str, ksize: &str) -> Result<String, String> {
    fn handle_laplacian_edges(img: &str, ksize: &str) -> Result<String, opencv::Error> {
        let image_vector = deserialize_img_string(img);
        let mut initial_mat = opencv::imgcodecs::imdecode(&image_vector, IMREAD_GRAYSCALE)?;

        let mut output_mat = opencv::core::Mat::default();

        opencv::imgproc::laplacian(
            &initial_mat,
            &mut output_mat,
            CV_8U,
            ksize.parse::<i32>().unwrap(),
            1.0,
            0.0,
            BORDER_DEFAULT,
        )?;

        let output_vector = format_mat_to_u8_vector_img(&output_mat);
        initial_mat.release()?;
        output_mat.release()?;

        Ok(format!("{:?}", output_vector))
    }

    let result = handle_laplacian_edges(img, ksize);

    match result {
        Ok(result) => Ok(result),
        Err(error) => {
            println!("{:?}", error);
            Err("Filtr Laplace'a: błąd!. Upewnij się, że wprowadzono poprawne parametry".into())
        }
    }
}

#[tauri::command]
fn hough_lines_p(
    img: &str,
    rho: &str,
    theta: &str,
    threshold: &str,
    minLineLength: &str,
    maxLineGap: &str,
    lineColor: &str,
) -> Result<String, String> {
    fn handle_hough_lines_p(
        img: &str,
        rho: &str,
        theta: &str,
        threshold: &str,
        minLineLength: &str,
        maxLineGap: &str,
        lineColor: &str,
    ) -> Result<String, opencv::Error> {
        let image_vector = deserialize_img_string(img);
        let mut initial_mat = opencv::imgcodecs::imdecode(&image_vector, IMREAD_UNCHANGED)?;

        let mut output_mat = opencv::core::Mat::default();

        let mut line_color = opencv::core::Scalar::default();
        match lineColor {
            "red" => line_color = opencv::core::Scalar::new(0., 0., 255., 0.),
            "blue" => line_color = opencv::core::Scalar::new(255., 0., 0., 0.),
            "green" => line_color = opencv::core::Scalar::new(0., 255., 0., 0.),
            &_ => line_color = opencv::core::Scalar::new(0., 0., 255., 0.),
        };

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
                line_color,
                1,
                LINE_AA,
                0,
            )?;
        }

        let output_vector = format_mat_to_u8_vector_img(&output_mat);
        initial_mat.release()?;
        output_mat.release()?;

        Ok(format!("{:?}", output_vector))
    }

    let result = handle_hough_lines_p(
        img,
        rho,
        theta,
        threshold,
        minLineLength,
        maxLineGap,
        lineColor,
    );

    match result {
        Ok(result) => Ok(result),
        Err(error) => {
            println!("{:?}", error);
            Err("Transformata Hougha: błędne paramerty. Upewnij się, że obraz ma postać jednokanałową (najlepiej zbinaryzowaną), a parametry akumulatora są właściwie dobrane względem siebie.".into())
        }
    }
}

#[tauri::command]
fn dist_transf(img: &str, distanceType: &str, maskSize: &str) -> Result<String, String> {
    fn handle_dist_transf(
        img: &str,
        distanceType: &str,
        maskSize: &str,
    ) -> Result<String, opencv::Error> {
        let image_vector = deserialize_img_string(img);
        let mut initial_mat = opencv::imgcodecs::imdecode(&image_vector, IMREAD_GRAYSCALE)?;

        let mut output_mat = opencv::core::Mat::default();

        let mut distance_type;
        match distanceType {
            "DIST_L1" => distance_type = opencv::imgproc::DIST_L1,
            "DIST_L2" => distance_type = opencv::imgproc::DIST_L2,
            "DIST_C" => distance_type = opencv::imgproc::DIST_C,
            "DIST_L12" => distance_type = opencv::imgproc::DIST_L12,
            "DIST_FAIR" => distance_type = opencv::imgproc::DIST_FAIR,
            "DIST_WELSCH" => distance_type = opencv::imgproc::DIST_WELSCH,
            "DIST_HUBER" => distance_type = opencv::imgproc::DIST_HUBER,
            &_ => distance_type = opencv::imgproc::DIST_L1,
        };

        let mut mask_size;
        match maskSize {
            "DIST_MASK_3" => mask_size = opencv::imgproc::DIST_MASK_3,
            "DIST_MASK_5" => mask_size = opencv::imgproc::DIST_MASK_5,
            "DIST_MASK_PRECISE" => mask_size = opencv::imgproc::DIST_MASK_PRECISE,
            &_ => mask_size = opencv::imgproc::DIST_MASK_3,
        }

        opencv::imgproc::distance_transform(
            &initial_mat,
            &mut output_mat,
            distance_type,
            mask_size,
            CV_8U,
        )?;

        let output_vector = format_mat_to_u8_vector_img(&output_mat);
        initial_mat.release()?;
        output_mat.release()?;

        Ok(format!("{:?}", output_vector))
    }

    let result = handle_dist_transf(img, distanceType, maskSize);

    match result {
        Ok(result) => Ok(result),
        Err(error) => {
            println!("{:?}", error);
            Err("Transformata Dystansowa: błędne paramerty. Wartości numeryczne rozmiaru maski (np. 3x3) można uzyć tylko dla metod L1, L2, C.".into())
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
            hough_lines_p,
            dist_transf
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
