import PropTypes from "prop-types";
import PlayerTable from "./PlayerTable";
import { containerStyle } from "./RikerRumble.styles";

function PlayerTablesContainer({ playerCount, players, tableRows, getScore }) {
  const tables = [];
  for (let i = 0; i < playerCount; i++) {
    const p = players[i];
    tables.push(
      <PlayerTable
        key={i}
        playerName={p.name}
        rows={tableRows(i)} // pass playerIndex => tableRows will build <tr>
        score={getScore(i)} // scoreboard count
      />
    );
  }

  return (
    <div
      style={{ ...containerStyle, justifyContent: "center", marginTop: "20px" }}
    >
      {tables}
    </div>
  );
}

PlayerTablesContainer.propTypes = {
  playerCount: PropTypes.number.isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      scoreInput: PropTypes.string.isRequired,
      scores: PropTypes.arrayOf(PropTypes.number).isRequired,
      history: PropTypes.array.isRequired,
    })
  ).isRequired,
  tableRows: PropTypes.func.isRequired,
  getScore: PropTypes.func.isRequired,
};

export default PlayerTablesContainer;
