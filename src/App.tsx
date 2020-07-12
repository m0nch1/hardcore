import React, { useRef, useCallback, useState } from "react";
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
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import { Canvas } from "react-three-fiber";
import landscape from "./images/landscape.jpg";
import sampleJacket from "./images/sample-jacket.jpg";
import spotifyIcon from "./images/spotify_icons/Green.png";
import Particles from "./components/particles";

import { parse } from "querystring";
import { ScriptCache } from "./ScriptCache";

interface Props {}

interface SProps {
  onSubmitURL: (spotifyUrl: string) => void;
}

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

const MenuButtons = styled.div`
  position: fixed;
  z-index: 100;
  top: 10px;
  right: 10px;
`;

const SpotifyButton = styled.button`
  appearance: none;
  outline: none;
  background: none;
  border: none;
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

const getToken = (): string => {
  const location = parse(window.location.hash.slice(1));
  return location.access_token ? location.access_token.toString() : "";
};

const ModalComponent: React.FC<SProps> = (props) => {
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const clientId = "285998fe3500467bb715878d0a767dbf";
  const redirectUri = "http://localhost:3000";
  const scopes = [
    "streaming",
    "user-read-private",
    "user-read-email",
    "user-modify-playback-state",
    "app-remote-control",
  ];

  const token = getToken();

  const [open, setOpen] = useState(false);
  const [spotifyUrl, setSpotifyUrl] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImport = (spotifyUrl: string) => {
    props.onSubmitURL(spotifyUrl);
    handleClose();
  };

  return (
    <div>
      {!token ? (
        <a
          href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            "%20"
          )}&response_type=token&show_dialog=true`}
        >
          <MenuButtons>
            <SpotifyButton type="button">
              <img src={spotifyIcon} alt="spotifyのアイコン" width="40px" />
            </SpotifyButton>
          </MenuButtons>
        </a>
      ) : (
        <MenuButtons>
          <SpotifyButton type="button" onClick={handleOpen}>
            <img src={spotifyIcon} alt="spotifyのアイコン" width="40px" />
          </SpotifyButton>
        </MenuButtons>
      )}
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
              value={spotifyUrl}
              onChange={(event) => {
                setSpotifyUrl(event.target.value);
              }}
              name="spotify_url"
              type="text"
              placeholder="e.g. https://open.spotify.com/track/..."
              style={{ marginBottom: "1em" }}
            ></Input>
            <Button
              onClick={(e) => handleImport(spotifyUrl)}
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

  const token = getToken();
  const [player, setPlayer] = useState<Spotify.SpotifyPlayer | undefined>();
  const [deviceId, setDeviceId] = useState("");
  const [playState, setPlayState] = useState(false);

  const playMusic = (spotifyUrl: string) => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      body: JSON.stringify({ uris: [spotifyUrl] }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setPlayState(true);
  };

  const pauseMusic = () => {
    if (player !== undefined) {
      player.pause().then(() => {
        console.log("Paused!");
        setPlayState(false);
      });
    }
  };

  const resumeMusic = () => {
    if (player !== undefined) {
      player.resume().then(() => {
        console.log("Resumed!");
        setPlayState(true);
      });
    }
  };

  const initSpotifyInstance = () => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      // eslint-disable-next-line no-undef
      if (player === undefined) {
        const splayer = new Spotify.Player({
          name: "particle music player🌟",
          getOAuthToken: (cb) => {
            cb(token);
          },
          volume: 0.5,
        });
        setPlayer(splayer);
        console.log(splayer);
      } else {
        // Error handling
        player.addListener("initialization_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("authentication_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("account_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("playback_error", ({ message }) => {
          console.error(message);
        });

        // Playback status updates
        player.addListener("player_state_changed", (state) => {
          // console.log(state);
        });

        // Ready
        // eslint-disable-next-line camelcase
        player.addListener("ready", ({ device_id }) => {
          setDeviceId(device_id);
          console.log("Ready with Device ID", device_id);
        });

        // Not Ready
        // eslint-disable-next-line camelcase
        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        // Connect to the player!
        player.connect();
      }
    };
  };

  if (token) {
    // eslint-disable-next-line no-unused-vars
    const LoadScript = new ScriptCache([
      {
        name: "https://sdk.scdn.co/spotify-player.js",
        callback: initSpotifyInstance(),
      },
    ]);
  }

  return (
    <>
      <Screen>
        <FixedCanvas onMouseMove={onMouseMove}>
          <Particles count={500} mouse={mouse} />
        </FixedCanvas>

        {playState ? (
          <PauseCircleOutlineIcon
            style={{ fontSize: 40, position: "fixed", zIndex: 99999 }}
            onClick={() => {
              pauseMusic();
            }}
          />
        ) : (
          <PlayCircleOutlineIcon
            style={{ fontSize: 40, position: "fixed", zIndex: 99999 }}
            onClick={() => {
              resumeMusic();
            }}
          />
        )}

        <ModalComponent onSubmitURL={playMusic}></ModalComponent>

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
    </>
  );
};

export default App;
