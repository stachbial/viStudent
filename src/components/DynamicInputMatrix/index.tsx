import React, { useState, useCallback, useEffect } from "react";
import { Typography, TextField, Button } from "@mui/material";

import {
  StyledMatrixContainer,
  StyledMatrixRow,
  StyledMatrixActions,
} from "./styled";

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
        handleInputChange(columnIndex, parseInt(event.target.value));
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
                step: 1,
                min: -255,
                max: 255,
                style: { height: "30px", textAlign: "center" },
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

const DynamicInputMatrix = ({ onUpdateMatrixParams }) => {
  const [matrixValues, setMatrixValues] = useState<number[][]>([
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ]);

  const handleInputChange = useCallback(
    (rowIndex: number) => (colIndex: number, newValue: number) => {
      setMatrixValues((prev) => {
        return prev.map((row, index) => {
          if (index !== rowIndex) return row;
          return row.map((column, index) => {
            if (index !== colIndex) return column;
            // TODO: input validation
            return newValue;
          });
        });
      });
    },
    [setMatrixValues, matrixValues]
  );

  const handleIncreaseMatSize = useCallback(() => {
    //sizes: 3x3, 5x5, 7x7, 9x9
    setMatrixValues((prev) => {
      if (prev.length >= 9) return prev;

      //add columns filled with 1 to existing rows
      let increasedMatrix = prev.map((row, index) => {
        return [...row, 1, 1];
      });
      // add new rows
      for (let i = 0; i < 2; i++) {
        const emptyRow = Array(increasedMatrix[0].length).fill(1);
        increasedMatrix.push(emptyRow);
      }
      return increasedMatrix;
    });
  }, []);

  const handleDecreaseMatSize = useCallback(() => {
    setMatrixValues((prev) => {
      //sizes: 3x3, 5x5, 7x7, 9x9
      if (prev.length <= 3) return prev;

      let decreasedMatrix = prev.slice(0, -2);
      decreasedMatrix = decreasedMatrix.map((row) => {
        return row.slice(0, -2);
      });

      return decreasedMatrix;
    });
  }, [setMatrixValues]);

  return (
    <StyledMatrixContainer>
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
        <Button onClick={handleIncreaseMatSize}>increase</Button>
        <Button onClick={handleDecreaseMatSize}>decrease</Button>
      </StyledMatrixActions>
    </StyledMatrixContainer>
  );
};

export default DynamicInputMatrix;
