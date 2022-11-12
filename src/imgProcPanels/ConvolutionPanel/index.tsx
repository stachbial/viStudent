import React, { useState, useContext, useCallback } from "react";
import { ImageProcessingContext } from "../../store/ImageProcessingContext";
import { Button } from "@mui/material";
import DynamicInputMatrix from "../../components/DynamicInputMatrix";
import { IMG_PROC_METHODS } from "../../utils/IMG_PROC_CONSTANTS";
import { serializeKernelValues } from "../../utils/dataFormattingHelpers";

const ConvolutionPanel = () => {
  const { processImage, isLoading } = useContext(ImageProcessingContext);
  const [kernelValues, setKernelValues] = useState<number[][]>();

  const handleConvolveOperation = useCallback(() => {
    // console.log(kernelValues[0].toString());
    // console.log(serializeKernelValues(kernelValues));
    processImage({
      type: IMG_PROC_METHODS.CONVOLVE,
      payload: { kernel: serializeKernelValues(kernelValues) },
    });
  }, [processImage, kernelValues]);

  return (
    <>
      <DynamicInputMatrix
        onUpdateMatrixParams={setKernelValues}
        title="Maska filtru konwolucyjnego :"
      />
      <Button
        variant="contained"
        sx={{ marginLeft: "30px", marginRight: "30px" }}
        disabled={isLoading}
        onClick={handleConvolveOperation}
      >
        Wykonaj konwolucję maski z obrazem
      </Button>
    </>
  );
};

export default ConvolutionPanel;
