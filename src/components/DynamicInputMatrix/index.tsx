import React, { useState, useCallback, useEffect } from "react";
import { Typography, TextField, Tooltip, IconButton } from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import {
  StyledContainer,
  StyledMatrixWrapper,
  StyledMatrixRow,
  StyledMatrixActions,
  StyledMatrixTitle,
} from "./styled";
import { validateNumericInputValue } from "../../utils/imageInputValidation";
import { theme } from "../../theme/theme";

const MatrixRow = ({
  columns,
  handleInputChange,
}: {
  columns: number[];
  handleInputChange?: any;
}) => {
  const onInputChange = useCallback(
    (columnIndex: number) =>
      (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        handleInputChange(
          columnIndex,
          validateNumericInputValue(
            event.target.value,
            1,
            -255,
            255,
            parseFloat,
            0.01
          )
        );
      },
    [handleInputChange]
  );

  return (
    <StyledMatrixRow>
      {columns.map((columnValue: number, columnIndex: number) => {
        return (
          <TextField
            key={columnIndex}
            type="number"
            inputMode="decimal"
            InputProps={{
              inputProps: {
                step: 0.01,
                min: -255,
                max: 255,
                style: { height: "30px", textAlign: "center", paddingRight: 0 },
              },
            }}
            value={columnValue}
            sx={{ width: "70px", alignItems: "center" }}
            onChange={onInputChange(columnIndex)}
          />
        );
      })}
    </StyledMatrixRow>
  );
};

const DynamicInputMatrix = ({ onUpdateMatrixParams, title }) => {
  const [matrixValues, setMatrixValues] = useState<number[][]>([
    [0.04, 0.04, 0.04],
    [0.04, 0.04, 0.04],
    [0.04, 0.04, 0.04],
  ]);

  useEffect(() => {
    if (onUpdateMatrixParams) onUpdateMatrixParams(matrixValues);
  }, [onUpdateMatrixParams, matrixValues]);

  const handleInputChange = useCallback(
    (rowIndex: number) => (colIndex: number, newValue: number) => {
      setMatrixValues((prev) => {
        return prev.map((row, index) => {
          if (index !== rowIndex) return row;
          return row.map((column, index) => {
            if (index !== colIndex) return column;
            return newValue;
          });
        });
      });
    },
    [setMatrixValues, matrixValues]
  );

  const handleIncreaseMatSize = useCallback(() => {
    //sizes: 3x3, 5x5, 7x7,
    setMatrixValues((prev) => {
      if (prev.length >= 7) return prev;

      //add ones at the begining and end of every existing row as well as new rows filled with 1
      let increasedMatrix = prev.map((row) => {
        return [0, ...row, 0];
      });
      const rowOfZeros = Array(increasedMatrix[0].length).fill(0);
      increasedMatrix.push(rowOfZeros);
      increasedMatrix.unshift(rowOfZeros);

      return increasedMatrix;
    });
  }, []);

  const handleDecreaseMatSize = useCallback(() => {
    setMatrixValues((prev) => {
      //sizes: 3x3, 5x5, 7x7,
      if (prev.length <= 3) return prev;

      let decreasedMatrix = prev.slice(1, -1);
      decreasedMatrix = decreasedMatrix.map((row) => {
        return row.slice(1, -1);
      });

      return decreasedMatrix;
    });
  }, [setMatrixValues]);

  return (
    <StyledContainer>
      <StyledMatrixTitle>{title}</StyledMatrixTitle>
      <StyledMatrixWrapper>
        {matrixValues.map((columns, rowIndex) => {
          return (
            <MatrixRow
              key={rowIndex}
              columns={columns}
              handleInputChange={handleInputChange(rowIndex)}
            />
          );
        })}
        <StyledMatrixActions>
          <Typography>{`${matrixValues.length} x ${matrixValues.length}`}</Typography>
          <Tooltip
            title="Powiększ macierz (max:  7 x 7)"
            arrow
            sx={{ background: theme.palette.primary.light }}
          >
            <IconButton
              size="small"
              onClick={handleIncreaseMatSize}
              disabled={matrixValues.length >= 7}
            >
              <OpenInFullIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Zmniejsz macierz  (min: 3 x 3)"
            arrow
            sx={{ background: theme.palette.primary.light }}
          >
            <IconButton
              size="small"
              onClick={handleDecreaseMatSize}
              disabled={matrixValues.length <= 3}
            >
              <CloseFullscreenIcon />
            </IconButton>
          </Tooltip>
        </StyledMatrixActions>
      </StyledMatrixWrapper>
    </StyledContainer>
  );
};

export default DynamicInputMatrix;

// const MatrixCell = ({ handleInputChange, value, cellKey }) => {
//   const inputRef = useRef(null);

//   useEffect(() => {
//     const debounceTimer = setTimeout(() => {
//       // if (inputRef?.current)
//       console.log("timeout!");
//     }, 200);

//     console.log(inputRef.current?.value);
//     // console.log(inputRef.current?.target?.value);

//     return clearTimeout(debounceTimer);
//   }, [inputRef.current?.value]);

//   return (
//     <TextField
//       key={cellKey}
//       inputRef={inputRef}
//       type="number"
//       inputMode="decimal"
//       InputProps={{
//         inputProps: {
//           step: 1,
//           min: -255,
//           max: 255,
//           style: { height: "30px", textAlign: "center", paddingRight: 0 },
//         },
//       }}

//       // value={value}
//       sx={{ width: "70px", alignItems: "center" }}
//       // onChange={onInputChange(columnIndex)}
//     />
//   );
// };
