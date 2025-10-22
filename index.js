/*
  index.js
  - Punto de entrada principal de la aplicación en el navegador.
  - Importa los módulos Game y Move, inicializa la instancia del juego,
    y gestiona los eventos de click en las casillas.
  - Variables principales expuestas en DOM:
      * .game -> tablero principal (contiene 9 divs para las casillas)
      * #playerToPlayWrapper / #playerToPlay -> indicador de turno
      * #x_wins / #o_wins -> contador de victorias
  - Modo de uso: se carga como module (`type="module"` en index.html).
*/
import { Move } from "/assets/modules/Move.js";
import { Game } from "/assets/modules/Game.js";

const board = document.querySelector(".game");
const boxesList = board.querySelectorAll("div");
const playerToPlayWrapper = document.getElementById("playerToPlayWrapper");
const playerToPlay = document.getElementById("playerToPlay");
const x_winsElement = document.getElementById("x_wins");
const o_winsElement = document.getElementById("o_wins");
const mainGame = new Game(board);

let turn = "X";
let isAWinner = false;

// Utilidad: pausa asincrónica usada para animaciones/retardos visuales
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * handleClick
 * - Manejador del evento 'click' sobre cada casilla del tablero.
 * - Crea una instancia Move con el turno actual y las coordenadas (id de la casilla).
 * - Intenta aplicar el movimiento usando mainGame.setMove(move).
 * - Si el movimiento es válido: cambia el turno visualmente y maneja
 *   el caso de victoria (animación de líneas, swal y reinicio parcial).
 * - También maneja el caso de empate cuando _moves alcanza 9 movimientos.
 */
const handleClick = async (e) => {
  // Si ya hay un ganador, ignorar nuevos clicks
  if (isAWinner) return;

  const box = e.target;
  let boxCords = box.id; // ejemplo: "2-1"
  const move = new Move(turn, boxCords);

  // setMove realiza la validación y render del movimiento.
  const isValid = mainGame.setMove(move);
  if (isValid) {
    // Alternar turno
    turn = turn == "X" ? "O" : "X";

    // Si aún no hay un ganador, actualizar indicador de turno
    if (!mainGame._winner) {
      playerToPlayWrapper.style.color = turn == "X" ? "red" : "blue";
      playerToPlay.textContent = turn;
    } else {
      // Se detectó un ganador: bloquear interacciones y animar líneas
      isAWinner = true;
      const traceLinesElements = mainGame._winLines.map((line) =>
        document.getElementById(line)
      );

      // Pintar y animar cada línea de victoria encontrada
      for (let element of traceLinesElements) {
        // nota: el 'turn' ya cambió, por eso la verificación inversa
        element.style.backgroundColor = turn == "O" ? "red" : "blue";
        element.classList.add("apper");

        await delay(800); // pausa para mostrar cada línea secuencialmente
      }
      await delay(100);

      // Mostrar modal con SweetAlert2 y, al confirmar, actualizar contadores y reiniciar
      swal
        .fire({
          title: "GANO EL JUGADOR:",
          html: `<span class="swalDesc" style="color:${
            mainGame._winner == "X" ? "red" : "blue"
          }">${mainGame._winner}</span>`,
          target: ".alertContainer",
          confirmButtonText: "Reiniciar",
          customClass: {
            popup: "swalPopup",
          },
        })
        .then(() => {
          if (mainGame._winner == "X")
            x_winsElement.textContent = parseInt(x_winsElement.textContent) + 1;
          if (mainGame._winner == "O")
            o_winsElement.textContent = parseInt(o_winsElement.textContent) + 1;

          mainGame._reset();
          // permitir nuevos clicks
          isAWinner = !isAWinner;
        });

      // Actualizar indicador de turno (queda el turno alternado)
      playerToPlayWrapper.style.color = turn == "X" ? "red" : "blue";
      playerToPlay.textContent = turn;
    }
  }

  // Empate: 9 movimientos y sin ganador
  if (mainGame._moves.length === 9 && !mainGame._winner) {
    swal
      .fire({
        title: "EMPATE",
        target: ".alertContainer",
        confirmButtonText: "Reiniciar",
        customClass: {
          popup: "swalPopup",
        },
      })
      .then(() => {
        mainGame._reset();
      });
  }
};

boxesList.forEach((e) => e.addEventListener("click", handleClick));
