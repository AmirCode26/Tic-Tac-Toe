//Clase move

/*
  Move.js
  - Clase simple que representa un movimiento realizado por un jugador.
  - Encapsula: jugador ("X" o "O") y coordenadas en formato "col-row" (ej: "2-3").
  - Método principal: render(parentElement) -> se encarga de dibujar el símbolo
    en la casilla correspondiente dentro del DOM.
*/
export class Move {
  constructor(player, cords) {
    this.player = player;
    this.cords = cords;
  }
  render(parentElement) {
    // Obtener las 9 casillas del tablero (dominio del juego)
    const boxes =
      parentElement.querySelectorAll("div") ||
      document.querySelectorAll(".game div");
    // Convertir NodeList a una matriz 3x3 para indexado [fila][col]
    const boxesMatrix = [
      [...boxes].slice(0, 3),
      [...boxes].slice(3, 6),
      [...boxes].slice(6, 9),
    ];

    let [box_x, box_y] = this.cords.split("-");
    box_x = parseInt(box_x);
    box_y = parseInt(box_y);

    const boxElement = boxesMatrix[box_y - 1][box_x - 1];
    // Si la casilla ya tiene contenido, no renderizar (seguridad adicional)
    if (boxElement.innerHTML != "") return;

    const moveContainerElement = document.createElement("span");

    moveContainerElement.innerHTML = this.player;
    moveContainerElement.style.color = this.player === "X" ? "red" : "blue";

    boxElement.appendChild(moveContainerElement);
  }
}
