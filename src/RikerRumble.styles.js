export const globalRootStyle = {
  minHeight: "100vh",
  color: "white",
};

export const containerStyle = {
  display: "flex",
  marginTop: "10px",
  marginLeft: "20px",
  marginRight: "20px",
};

// A smaller font container for Timer + Player Info
export const upperContainerStyle = {
  fontSize: "0.9em",
};

// Each PlayerColumn is 250px wide
export const columnStyle = {
  width: "250px",
  marginRight: "16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "1em",
  textAlign: "center",
};

// For typical PlayerColumn inputs
export const inputStyle = {
  width: "225px",
  height: "35px",
  boxSizing: "border-box",
  marginBottom: "5px",
  textAlign: "center",
  fontSize: "1em",
};

export const buttonGroupStyle = {
  display: "flex",
  gap: "10px",
  width: "225px",
  marginBottom: "10px",
};

export const buttonStyle = {
  flex: 1,
  height: "35px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

export const headingStyle = {
  margin: "0",
  fontSize: "2.8em",
  textAlign: "center",
};

// Tables remain the same
export const tableStyle = {
  margin: "0 auto",
  borderCollapse: "collapse",
  border: "1px solid #ccc",
  width: "185px",
};

export const thStyle = {
  border: "1px solid #ccc",
  padding: "5px",
  backgroundColor: "black",
  color: "white",
  fontSize: "20px",
  fontWeight: "bold",
  textAlign: "center",
};

export const rowBaseStyle = {
  border: "1px solid #ccc",
  padding: "5px",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  textAlign: "center",
};

export const middleContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "10px",
  marginBottom: "10px",
};

export const countdownDisplayStyle = {
  fontSize: "2.8em",
};

export const nameContainerStyle = {
  marginBottom: "10px",
  textAlign: "center",
};

export const scoreContainerStyle = {
  marginBottom: "5px",
};

export const clearAllButtonStyle = {
  width: "120px",
  backgroundColor: "gray",
  border: "1px solid #ccc",
};

export const scoreStyle = {
  fontSize: "2.8em",
  color: "white",
  textAlign: "center",
};

/* ------------------- EXTRACTED STYLES FOR TimerSection ------------------- */
export const timerSectionContainer = {
  width: "625px",
  height: "50px",
  margin: "30px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};

export const timerSectionOuterContainerStyle = {
  transition: "margin-left 0.3s",
};

export const resetAllScoresWrapper = {
  position: "relative",
  width: "140px",
  height: "35px",
  marginLeft: "10px", // added 10px cushion on the left side
  marginRight: "30px",
};

export const timerMiddleWrapper = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "5px",
  marginRight: "10px",
};

export const timerInputWrapper = {
  position: "relative",
  width: "120px",
  height: "35px",
};

export const playersDropdownWrapper = {
  position: "relative",
  width: "120px",
  height: "35px",
  marginLeft: "10px", // add a 10px gap between controls
  marginRight: "10px",
};

/* ------------------- New Styles for "# Of Scores" Input ------------------- */
export const scoresCountWrapperStyle = {
  position: "relative",
  width: "120px",
  height: "35px",
  marginLeft: "10px",
};

export const scoresCountLabelStyle = {
  ...labelStyle,
  marginBottom: 0,
  position: "absolute",
  textAlign: "center",
  top: "-20px",
  left: 0,
  right: 0,
};

export const scoresCountInputStyle = {
  ...inputStyle,
  width: "120px",
  height: "35px",
  marginBottom: 0,
};

export const applyButtonStyle = {
  width: "60px",
  height: "35px",
};

export const scoresCountApplyButtonStyle = {
  ...applyButtonStyle,
  marginLeft: "5px",
};

/* ------------------- TitleSection Styles ------------------- */
export const titleSectionWrapperStyle = {
  marginTop: "20px",
  textAlign: "center",
};

/* ------------------- CountdownDisplay Styles ------------------- */
export const countdownDisplayWrapperStyle = {
  textAlign: "center",
  marginTop: "10px",
};

/* ------------------- Player Table Styles ------------------- */
export const tableWrapperStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginRight: "16px",
};

export const scoreboardStyle = {
  fontSize: "2em",
  marginTop: "10px",
  textAlign: "center",
};

/* ------------------- Existing extracted styles for TimerSection buttons ------------------- */
export const resetAllButtonStyle = {
  width: "150px",
  height: "35px",
};

export const minutesInputStyle = {
  width: "120px",
  height: "35px",
  marginBottom: 0,
};

export const startPauseButtonStyle = {
  width: "100px",
  height: "35px",
};
