import Image from "next/image";
import { StyledCard, StyledBackdrop, StyledTextWrapper } from "./styled";
import Typography from "@mui/material/Typography";

interface Props {
  src: string;
  text: string;
  onClick?: () => void;
}

const ImageCard = ({ src, text, onClick }: Props) => {
  return (
    <StyledCard onClick={onClick}>
      <Image src={src} width={300} height={400} objectFit="cover" />
      <StyledBackdrop />
      <StyledTextWrapper>
        <Typography fontWeight="bold">{text}</Typography>
      </StyledTextWrapper>
    </StyledCard>
  );
};

export default ImageCard;
