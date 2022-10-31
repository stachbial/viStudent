import React from "react";
import MorphErodeOperation from "../../operationFroms/MorphErodeOperation";
import MorphDilateOperation from "../../operationFroms/MorphDilateOperation";
import Divider from "../../components/Divider";

const MorphErodeDilatePanel = () => {
  return (
    <>
      <MorphDilateOperation />
      <Divider />
      <MorphErodeOperation />
    </>
  );
};

export default MorphErodeDilatePanel;
