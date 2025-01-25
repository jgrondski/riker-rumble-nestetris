import { headingStyle } from "./RikerRumble.styles";

/**
 * TitleSection: "Riker Rumble"
 * We rely on the parent container for horizontal centering.
 */
function TitleSection() {
  return (
    <div style={{ marginTop: "20px" }}>
      <h1 className="ribeye-marrow-regular" style={headingStyle}>
        Riker Rumble
      </h1>
    </div>
  );
}

export default TitleSection;
