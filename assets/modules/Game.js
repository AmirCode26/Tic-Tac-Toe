//Clase game
/*
  Game.js
  - Clase que representa el estado del juego (tablero, movimientos, ganador).
  - Responsabilidades principales:
      * Mantener una matriz interna 3x3 con los valores "X" / "O" / "".
      * Registrar movimientos y evitar movimientos repetidos.
      * Determinar si hay un ganador consultando `winCases`.
      * Resetear el tablero y las animaciones.
*/
import { winCases } from "/assets/modules/winCases.js";

export class Game {
  constructor(parentElement) {
    this.parentElement = parentElement; // elemento DOM que representa el tablero
    this._moves = []; // array de objetos Move
    this._winner = ""; // "X" | "O" | "" (si no hay ganador)
    this._winLines = []; // ids de las líneas de victoria para animar
    // Matriz interna (fila y columna) indexada [fila][col]
    this._matrix = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  }

  // Restablece el tablero a su estado inicial y limpia animaciones/contadores
  _reset() {
    const boxes = this.parentElement.querySelectorAll("div");
    boxes.forEach((box) => (box.textContent = ""));

    this._matrix = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    // Quitar clase de animación a las líneas de victoria
    this._winLines.forEach((winLine) =>
      document.getElementById(winLine).classList.remove("apper")
    );
    this._winLines = [];
    this._moves = [];
    this._winner = "";
  }

  // Revisa si alguna de las combinaciones de winCases está presente
  _checkWinner() {
    // Convertir la matriz a dos representaciones binarias para X y O
    const parsedArrayX = this._matrix.map((e) => {
      return e.map((i) => {
        const moveToBin = i == "X" ? 1 : 0;
        return moveToBin;
      });
    });
    const parsedArrayO = this._matrix.map((e) => {
      return e.map((i) => {
        const moveToBin = i == "O" ? 1 : 0;
        return moveToBin;
      });
    });

    // Iterar sobre los casos de victoria definidos y comprobar coincidencias
    return winCases.some((winCaseObj) => {
      const winCase = winCaseObj.matrix;

      // Calcular índices activos (coordenadas) del winCase
      let activeIndexes = [];
      winCase.forEach((row, rowIdx) => {
        row.forEach((e, numIdx) => {
          if (e == 1) activeIndexes.push(`${numIdx}-${rowIdx}`);
        });
      });

      // Contar coincidencias para X
      let matchesX = 0;
      activeIndexes.forEach((cordinate) => {
        const x = cordinate.split("-")[0];
        const y = cordinate.split("-")[1];

        if (parsedArrayX[y][x] == winCase[y][x]) matchesX++;
      });

      // Contar coincidencias para O
      let matchesO = 0;
      activeIndexes.forEach((cordinate) => {
        const x = cordinate.split("-")[0];
        const y = cordinate.split("-")[1];

        if (parsedArrayO[y][x] == winCase[y][x]) matchesO++;
      });

      const isWinnerCase =
        matchesX == activeIndexes.length || matchesO == activeIndexes.length;
      if (isWinnerCase) this._winLines = winCaseObj.traceLines; // guardar líneas para animación
      return isWinnerCase;
    });
  }

  // Intenta registrar un movimiento.
  // Retorna false si la casilla ya está ocupada; true si se aplicó correctamente.
  setMove(move) {
    if (this._moves.some((moveMade) => moveMade.cords == move.cords))
      return false; // movimiento inválido (coordenada ya ocupada)

    this._moves.push(move);

    let [moveX, moveY] = move.cords.split("-");
    moveX = parseInt(moveX);
    moveY = parseInt(moveY);

    // Actualizar matriz interna
    this._matrix[moveY - 1][moveX - 1] = move.player;
    // Renderizar en DOM
    move.render(this.parentElement);

    const posibleWinnerPlayer = this._moves[this._moves.length - 1].player;

    // Comprobar ganador y, si existe, asignarlo
    if (this._checkWinner()) this._winner = posibleWinnerPlayer;

    return true;
  }
}
