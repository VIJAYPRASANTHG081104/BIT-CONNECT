import React from "react";
import "./style.css";
import Plus from "../../../svg/plus";
import ArrowRight from "../../../svg/arrowRight";
import { stories } from "../../../data/home";
import Story from "./Story";
import { useMediaQuery } from "react-responsive";

const Stories = () => {
  const query1175px = useMediaQuery({
    query: "(max-width:1175px)",
  });
  const query1010px = useMediaQuery({
    query: "(max-width:1010px)",
  });
  const query960px = useMediaQuery({
    query: "(max-width: 960px)",
  });
  const query885px = useMediaQuery({
    query: "(max-width: 885px)",
  });
  const max = query885px
    ? 5
    : query960px
    ? 4
    : query1010px
    ? 5
    : query1175px
    ? 4
    : stories.length;
  return (
    <div className="stories">
      <div className="create_story_card">
        <img
          className="create_story_img"
          src="../../../images/default_pic.png"
        />
        <div className="plus_story">
          <Plus color="#fff" />
        </div>
        <div className="story_create_text">Create Story</div>
      </div>
      {stories.slice(0, max).map((story, i) => {
        return <Story story={story} key={i} />;
      })}
      <div className="white_circle">
        <ArrowRight color="#65676b" />
      </div>
    </div>
  );
};

export default Stories;
