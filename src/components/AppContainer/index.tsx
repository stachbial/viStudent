import { StyledContainer } from "./styled";

// type Props = {
//   children?: ReactNode;
// };

const AppContainer = ({ children }) => {
  return <StyledContainer container>{children}</StyledContainer>;
};

export default AppContainer;
