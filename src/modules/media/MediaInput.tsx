import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import {
  StyledModuleWrapper,
  StyledContentWrapper,
  StyledInputControlsWrapper,
} from "./styled";

import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import ImageSearchOutlinedIcon from "@mui/icons-material/ImageSearchOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

import { invoke } from "@tauri-apps/api/tauri";

const MediaInput = () => {
  const [uploadedImageData, setUploadedImageData] = useState<string>();

  const testRustInvoke = async (params: { img: string }) => {
    const msgFromRust = await invoke("test", params);
    return msgFromRust as string;
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(event.target.files[0]);

      reader.onload = async (ev) => {
        const u8data = new Uint8Array(ev.target.result as ArrayBuffer);

        const rustString = await testRustInvoke({ img: u8data.toString() });
        console.log(rustString);
        const arrayFromRustStr = rustString
          .replace("[", "")
          .replace("]", "")
          .split(",")
          .map((el) => parseInt(el));
        const u8fromRustStr = new Uint8Array(arrayFromRustStr);
        const blob = new Blob([u8fromRustStr]);
        let imageUrl = window.URL.createObjectURL(blob);
        setUploadedImageData(imageUrl);
      };
    }
  };

  return (
    <StyledModuleWrapper item sm>
      <StyledContentWrapper>
        {uploadedImageData && (
          <Image
            width={300}
            height={300}
            objectFit="cover"
            src={uploadedImageData}
          />
        )}
        <AttachFileOutlinedIcon sx={{ fontSize: 80 }} />
        <StyledInputControlsWrapper>
          <Button
            variant="contained"
            startIcon={<ImageSearchOutlinedIcon />}
            component="label"
          >
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={onChangeHandler}
            />
            Dodaj zdjęcie
          </Button>
          <Button variant="contained" startIcon={<CameraAltOutlinedIcon />}>
            Zrób zdjęcie
          </Button>
        </StyledInputControlsWrapper>
      </StyledContentWrapper>
    </StyledModuleWrapper>
  );
};

export default MediaInput;
