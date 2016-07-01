import React, { PropTypes } from 'react';

function Button(props) {
  function loadGameBtnClick() {
    console.log(props.url);
    return props.loadGame(props.url.URL);
  }

  return (
    <button onClick={loadGameBtnClick}>Load Game</button>
  );
}

Button.propTypes = {
  loadGame: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired,
};

export default Button;
