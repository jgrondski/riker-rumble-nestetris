import { middleContainerStyle, headingStyle } from "./RikerRumble.styles";

function TitleSection() {
  return (
    <div style={middleContainerStyle}>
      <h1 className="ribeye-marrow-regular" style={headingStyle}>
        Riker Rumble
      </h1>
    </div>
  );
}

TitleSection.propTypes = {
  // No props needed anymore
};

export default TitleSection;
