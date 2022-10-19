import { StyledPage } from "./styled";

const Page = ({ children, ...gridProps }) => {
  return (
    <StyledPage item {...gridProps}>
      {children}
    </StyledPage>
  );
};

export default Page;
