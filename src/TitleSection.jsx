import { headingStyle, titleSectionWrapperStyle } from "./RikerRumble.styles";

/**
 * TitleSection: "Riker Rumble"
 * Moves the marginTop & textAlign styles into the component itself.
 */
function TitleSection() {
  return (
    <div style={titleSectionWrapperStyle}>
      <h1 className="ribeye-marrow-regular" style={headingStyle}>
        Riker Rumble
      </h1>
    </div>
  );
}

export default TitleSection;
