import { useState } from "react";
import ReactPlayer from "react-player";

const TestReactPlayer = (url) => {
  console.log(url);
  const [isPlaying, setIsPlaying] = useState("false"); //reload

  const handleBtn = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div height={"700px"}>
      <h2>React Player</h2>
      <button type="primary" onClick={handleBtn} style={{ marginBottom: 20 }}>
        플레이
      </button>
      <ReactPlayer
        url={url.url}
        controls
        palying={isPlaying}
        width={"100%"}
        height={"800px"}
      />
    </div>
  );
};

export default TestReactPlayer;
