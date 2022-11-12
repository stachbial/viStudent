import { ChangeEvent, useRef, useState, useCallback } from "react";
import { Button } from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";
import { getImageDataFromBuffer } from "../../utils/dataFormattingHelpers";
import { validateImageInput } from "../../utils/inputValidation";
import SupportedFormatsDialog from "../dialogs/SupportedFormatsDialog";

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
  const [showDialog, setShowDialog] = useState(false);
  const inputRef = useRef(null);

  const onCloseDialog = useCallback(() => {
    setShowDialog(false);
  }, [setShowDialog]);

  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      event.preventDefault();

      if (event.target.files && event.target.files[0]) {
        if (validateImageInput(event.target.files[0].type)) {
          const reader = new FileReader();
          reader.readAsArrayBuffer(event.target.files[0]);

          reader.onload = (e) => {
            const { imageUrl, uint8imageData } = getImageDataFromBuffer(
              e.target.result as ArrayBuffer
            );
            setImageData({ imageUrl: imageUrl, imageData: uint8imageData });
          };
        } else {
          setShowDialog(true);
        }
        if (inputRef.current?.value) inputRef.current.value = "";
      }
    },
    [setImageData, setShowDialog]
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
      <SupportedFormatsDialog open={showDialog} onClose={onCloseDialog} />
    </>
  );
};

export default ImageInput;
