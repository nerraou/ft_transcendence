import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import CleanSheet from "@atoms/achievements/CleanSheet";
import FirstWin from "@atoms/achievements/FirstWin";
import FirstRanked from "@atoms/achievements/FirstRanked";
import OneHundredWins from "@atoms/achievements/OneHundredWins";
import LastRanked from "@atoms/achievements/LastRanked";
import FiveWins from "@components/atoms/achievements/FiveWins";
import SecondRanked from "@components/atoms/achievements/SecondRanked";
import ThirdRanked from "@components/atoms/achievements/ThirdRanked";
import { ReactNode } from "react";

interface UserAchievementsProps {
  achievements: string[];
}

const achievements: Record<string, ReactNode> = {
  CleanSheet: <CleanSheet />,
  FirstWin: <FirstWin />,
  FirstRanked: <FirstRanked />,
  SecondRanked: <SecondRanked />,
  ThirdRanked: <ThirdRanked />,
  LastRanked: <LastRanked />,
  FiveWins: <FiveWins />,
  OneHundredWins: <OneHundredWins />,
};

function UserAchievements(props: UserAchievementsProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 9,
    },
    breakpoints: {
      "(max-width: 500px)": {
        slides: {
          perView: 3,
        },
      },
    },
  });

  return (
    <div
      ref={sliderRef}
      className="keen-slider flex items-center bg-light-bg-tertiary border border-light-fg-link rounded-full px-4 overflow-visible"
    >
      {props.achievements.map((achievement, index) => {
        return (
          <div
            key={index}
            className="keen-slider__slide flex justify-center overflow-visible"
          >
            {achievements[achievement]}
          </div>
        );
      })}
    </div>
  );
}

export default UserAchievements;
