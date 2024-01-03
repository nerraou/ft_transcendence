import RCSlider from "rc-slider";
import "rc-slider/assets/index.css";

interface SLiderProps {
  value: number | number[];
  step: number;
  onChange: (value: number | number[]) => void;
  min: number;
  max: number;
}

function Slider(props: SLiderProps) {
  return (
    <RCSlider
      step={props.step}
      value={props.value}
      min={props.min}
      max={props.max}
      onChange={props.onChange}
      styles={{
        track: {
          backgroundColor: "#EF9935",
          height: 10,
        },
        rail: {
          backgroundColor: "#FCF9E8",
          height: 10,
        },
        handle: {
          borderColor: "#7E2625",
          height: 20,
          width: 20,
          marginLeft: -1,
          marginTop: -5,
          backgroundColor: "#7E2625",
        },
      }}
    />
  );
}

export default Slider;
