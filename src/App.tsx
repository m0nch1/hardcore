import React, { useRef, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import {
  CssBaseline,
  Container,
  Grid,
  Modal,
  Button,
  FormControl,
  Input,
} from "@material-ui/core";
import { Canvas } from "react-three-fiber";

import landscape from "./images/landscape.jpg";
import sampleJacket from "./images/sample-jacket.jpg";
import spotifyIcon from "./images/spotify_icons/Green.png";

import Particles from "./components/particles";

interface Props {}

const Screen = styled.div`
  flex-grow: 1;
  height: 100vh;
  background-color: #546788;
  background-image: url(${landscape});
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  overflow: hidden;
`;

const MainContainer = styled(Container)`
  && {
    height: 100%;
    backdrop-filter: blur(5px);
    display: flex;
  }
`;

const horizontal = keyframes`
  from { transform: translateX( -8px); }
  to { transform: translateX(  0px); }
`;

const GridContainer = styled(Grid)`
  margin: 0 auto;
  width: 100%;
  align-items: center;
  animation-name: ${horizontal};
  animation-duration: 1.5s;
  animation-delay: 0s;
  animation-timing-function: ease-in-out;
  animation-direction: alternate;
  animation-iteration-count: infinite;
`;

const GridItem = styled(Grid)`
  width: 50%;
  height: 50%;
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const leftIn = keyframes`
  from { left: -50%; }
  to { left: 0; }
`;

const LeftGridItem = styled(GridItem)`
  animation-name: ${leftIn};
  animation-duration: 3s;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
`;

const rightIn = keyframes`
  from { right: -50%; }
  to { right: 0; }
`;

const RightGridItem = styled(GridItem)`
  animation-name: ${rightIn};
  animation-duration: 3s;
  animation-delay: 0s;
  animation-timing-function: ease-in-out;
`;

const vertical = keyframes`
  from { transform: translateY(-5%) }
  to { transform: translateY(5%) }
`;

const JacketImgWrap = styled.div`
  top: 50%;
  left: 50%;
  width: 50%;
  margin: auto;
  animation-name: ${vertical};
  animation-duration: 1s;
  animation-delay: 0s;
  animation-timing-function: ease-in-out;
  animation-direction: alternate;
  animation-iteration-count: infinite;
`;

const JacketImg = styled.img`
  width: 100%;
  box-shadow: 0px 0px 25px 5px;
`;

const lineFade = keyframes`
  from {
    transform: rotate(90deg) scaleX(0);
    visibility: visible;
  }
  to {
    transform: rotate(90deg) scaleX(1);
    visibility: visible;
  }
`;

const CenterBar = styled.hr`
  height: 4px;
  width: 40%;
  position: absolute;
  right: 0;
  left: 0;
  background-color: #fff;
  border: 0;
  visibility: hidden;
  animation-name: ${lineFade};
  animation-duration: 2s;
  animation-delay: 3s;
  animation-fill-mode: forwards;
  animation-play-state: running;
`;

const Card = styled.div`
  font-family: "Contrail One", cursive;
  width: 100%;
  border-bottom: 0.3vw dashed;
  text-align: center;
  color: white;
  font-size: 3vw;
  line-height: 0.4em;
  font-weight: bold;
`;

const FixedCanvas = styled(Canvas)`
  position: fixed !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 1;
  top: 0;
  left: 0;
`;

const SpotifyButton = styled.button`
  position: fixed;
  z-index: 100;
  top: 10px;
  right: 10px;
  appearance: none;
  outline: none;
  background: none;
  border: none;
  width: 50px;
`;

const FixedModal = styled(Modal)`
  display: grid;
  place-items: center;
`;

const SpotifyForm = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background-color: white;
  padding: 16px;
  outline: none;
  width: 70%;
`;

const ModalComponent = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <SpotifyButton type="button" onClick={handleOpen}>
        <img src={spotifyIcon} alt="spotifyのアイコン" width="100%" />
      </SpotifyButton>
      <FixedModal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <SpotifyForm>
          <h2>Play Audio via Spotify</h2>
          <FormControl>
            <Input
              name="spotify_url"
              type="text"
              placeholder="e.g. https://open.spotify.com/track/..."
              style={{ marginBottom: "1em" }}
            ></Input>
            <Button
              variant="contained"
              style={{ width: "200px", margin: "0 auto" }}
            >
              Import
            </Button>
          </FormControl>
        </SpotifyForm>
      </FixedModal>
    </div>
  );
};

const App: React.FC<Props> = (props) => {
  const mouse = useRef([0, 0]);
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  );

  return (
    <Screen>
      <FixedCanvas onMouseMove={onMouseMove}>
        <Particles count={500} mouse={mouse} />
      </FixedCanvas>

      <ModalComponent></ModalComponent>

      <CssBaseline />
      <MainContainer maxWidth={false}>
        <GridContainer container spacing={3}>
          <LeftGridItem item xs={12} sm={6}>
            <JacketImgWrap>
              <JacketImg src={sampleJacket} alt="sample jacket image" />
            </JacketImgWrap>
          </LeftGridItem>
          <CenterBar />
          <RightGridItem item xs={12} sm={6}>
            <Card>
              <p>You Are Listening to</p>
              <p>
                -<span>music</span>-
              </p>
              <p>This is awesome song</p>
            </Card>
          </RightGridItem>
        </GridContainer>
      </MainContainer>
    </Screen>
  );
};

export default App;
