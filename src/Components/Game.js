import React, { Component } from "react";

class Game extends Component {
  constructor(props) {
    super(props);
    const { width, height } = props;
    this.enemiesPos = this.generateenemiesPos(width, height);
    this.steps = 0;
    this.remainingEnemies = height;

    this.state = {
      playerPos: {
        x: Math.floor(width / 2),
        y: Math.floor(height / 2),
      },
      hasFinished: false,
    };
  }

  generateenemiesPos(width, height) {
    const enemiesPos = [];
    for (let i = 0; i < height; i += 1) {
      const spritePos = Math.floor(Math.random() * width);
      enemiesPos.push(spritePos);
    }

    return enemiesPos;
  }

  updateMove({ x, y }) {
    if (this.enemiesPos[y] === x) {
      this.enemiesPos[y] = -1;
      this.remainingEnemies -= 1;
    }

    const hasFinished = this.remainingEnemies === 0;

    if (!this.state.hasFinished && hasFinished) {
      this.setState({ hasFinished: true });
      return;
    }
    this.steps += 1;
  }

  moveUp = ({ playerPos }) => {
    const playerPosY = playerPos.y;
    let newY;

    if (playerPosY > 0) {
      newY = playerPosY - 1;
    } else {
      newY = playerPosY;
    }

    const newplayerPos = {
      x: playerPos.x,
      y: newY,
    };

    return {
      playerPos: newplayerPos,
    };
  };

  moveDown = ({ playerPos }) => {
    const playerPosY = playerPos.y;
    let newY;
    const { height } = this.props;

    if (playerPosY < height - 1) {
      newY = playerPosY + 1;
    } else {
      newY = playerPosY;
    }

    const newplayerPos = {
      x: playerPos.x,
      y: newY,
    };

    return {
      playerPos: newplayerPos,
    };
  };

  moveLeft = ({ playerPos }) => {
    const playerPosX = playerPos.x;
    let newX;

    if (playerPosX > 0) {
      newX = playerPosX - 1;
    } else {
      newX = playerPosX;
    }

    const newplayerPos = {
      x: newX,
      y: playerPos.y,
    };

    return {
      playerPos: newplayerPos,
    };
  };

  moveRight = ({ playerPos }) => {
    const playerPosX = playerPos.x;
    let newX;
    const { width } = this.props;

    if (playerPosX < width - 1) {
      newX = playerPosX + 1;
    } else {
      newX = playerPosX;
    }

    const newplayerPos = {
      x: newX,
      y: playerPos.y,
    };

    return {
      playerPos: newplayerPos,
    };
  };

  keyHandler = (event) => {
    const { key } = event;
    const arrowMapping = {
      ArrowLeft: this.moveLeft,
      ArrowRight: this.moveRight,
      ArrowUp: this.moveUp,
      ArrowDown: this.moveDown,
    };
    const stateUpdater = arrowMapping[key];
    this.setState(stateUpdater);
    this.updateMove(this.state.playerPos);
  };

  renderBoard(width, height) {
    const {
      playerPos: { x: playerPosX, y: playerPosY },
    } = this.state;
    const tbody = [];
    for (let i = 0; i < height; i++) {
      const cells = [];
      for (let j = 0; j < width; j++) {
        const classList = ["cell"];
        if (this.enemiesPos[i] === j) {
          classList.push("enemy");
        }

        if (playerPosY === i && playerPosX === j) {
          classList.push("player");
        }

        const className = classList.join(" ");
        cells.push(<td key={`${i}+${j}`} className={className} />);
      }
      const row = <tr key={i}>{cells}</tr>;
      tbody.push(row);
    }
    return tbody;
  }

  render() {
    const { width, height } = this.props;
    return (
      <div tabIndex="0" onKeyDown={this.keyHandler}>
        {this.state.hasFinished ? (
          <p>
            Took <strong>{this.steps} </strong>
            No of steps
          </p>
        ) : (
          <div>
            <table>
              <tbody>{this.renderBoard(width, height)}</tbody>
            </table>
            <p style={{ float: "left", marginLeft: "25px" }}>
              No of steps
              <strong> {this.steps}</strong>
            </p>
          </div>
        )}
      </div>
    );
  }
}

export { Game };
