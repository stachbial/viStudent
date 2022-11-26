import { ChangeEvent, useRef, useState, useCallback } from "react";
import { Button } from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";
import SupportedFormatsDialog from "../dialogs/SupportedFormatsDialog";
import SupportedDimensionsDialog from "../dialogs/SupportedDimensionsDialog";
import { getImageDataFromBuffer } from "../../utils/dataFormattingHelpers";
import { SUPPORTED_IMG_DIMENSIONS } from "../../utils/IMG_PROC_CONSTANTS";
import {
  validateImageFormat,
  validateImageDimensions,
} from "../../utils/inputValidation";
// TODO: adjust next/image formats to opencv formats!! !!!

const ImageInput = ({
  children,
  asButton,
  text,
  setImageData,
}: {
  children?: React.ReactNode;
  asButton?: boolean;
  text?: string;
  setImageData: ({
    imageUrl,
    imageData,
  }: {
    imageUrl: string;
    imageData: Uint8Array;
  }) => void;
}) => {
  const [showFormatsDialog, setShowFormatsDialog] = useState(false);
  const [showDimensionsDialog, setShowDimensionsDialog] = useState(false);
  const inputRef = useRef(null);

  const onCloseDialog = useCallback(() => {
    setShowFormatsDialog(false);
    setShowDimensionsDialog(false);
  }, [setShowFormatsDialog]);

  const handleValidImage = useCallback(
    (imageUrl: string, imageData: Uint8Array) => () => {
      setImageData({
        imageUrl,
        imageData,
      });
    },
    [setImageData]
  );

  const handleInValidDimensions = useCallback(() => {
    setShowDimensionsDialog(true);
  }, [setShowDimensionsDialog]);

  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      event.preventDefault();

      if (event.target.files && event.target.files[0]) {
        if (validateImageFormat(event.target.files[0].type)) {
          const reader = new FileReader();
          reader.readAsArrayBuffer(event.target.files[0]);

          reader.onload = (e) => {
            const { imageUrl, uint8imageData } = getImageDataFromBuffer(
              e.target.result as ArrayBuffer
            );

            validateImageDimensions(
              imageUrl,
              handleValidImage(imageUrl, uint8imageData),
              handleInValidDimensions
            );
          };
        } else {
          setShowFormatsDialog(true);
        }
        if (inputRef.current?.value) inputRef.current.value = "";
      }
    },
    [setImageData, setShowFormatsDialog]
  );

  return (
    <>
      {asButton ? (
        <Button variant="contained" component="label" startIcon={<LoopIcon />}>
          <input
            ref={inputRef}
            hidden
            accept="image/*"
            type="file"
            onChange={onChangeHandler}
          />
          {text}
        </Button>
      ) : (
        <label>
          {children}
          <input
            ref={inputRef}
            hidden
            accept="image/*"
            type="file"
            onChange={onChangeHandler}
          />
        </label>
      )}
      <SupportedFormatsDialog
        open={showFormatsDialog}
        onClose={onCloseDialog}
      />
      <SupportedDimensionsDialog
        open={showDimensionsDialog}
        onClose={onCloseDialog}
      />
    </>
  );
};

export default ImageInput;
