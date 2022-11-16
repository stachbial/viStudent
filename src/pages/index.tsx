import { useState, useCallback, useEffect } from "react";

import Page from "../components/Page";
import HomePagePanel from "../modules/HomePagePanel";
import WelcomeScreenOverlay from "../components/WelcomeScreenOverlay";

function HomePage() {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState<boolean>(null);

  const handleWelcomeAnimationEnd = useCallback(() => {
    window.sessionStorage.setItem("hideWelcomeScreen", "1");
    setShowWelcomeScreen(false);
  }, []);

  useEffect(() => {
    if (!window.sessionStorage.getItem("hideWelcomeScreen")) {
      setShowWelcomeScreen(true);
    } else {
      setShowWelcomeScreen(false);
    }
  }, [showWelcomeScreen]);

  return (
    <Page
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      {showWelcomeScreen === false && <HomePagePanel />}
      <WelcomeScreenOverlay
        open={showWelcomeScreen}
        onAnimationComplete={handleWelcomeAnimationEnd}
      />
    </Page>
  );
}

export default HomePage;
