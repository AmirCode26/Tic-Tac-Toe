    //Mejorado por google gemini (https://gemini.google.com)
// --- CONSTANTES DE LÍNEAS DE VICTORIA ---
export const WINNING_LINES = {
    // HORIZONTALES
    TOP_HORIZONTAL: "th",     // Top Horizontal (Fila 0)
    MIDDLE_HORIZONTAL: "mh",  // Middle Horizontal (Fila 1)
    BOTTOM_HORIZONTAL: "bh",  // Bottom Horizontal (Fila 2)
    // VERTICALES
    LEFT_VERTICAL: "lv",      // Left Vertical (Columna 0)
    MIDDLE_VERTICAL: "mv",    // Middle Vertical (Columna 1)
    RIGHT_VERTICAL: "rv",     // Right Vertical (Columna 2)
    // DIAGONALES
    LEFT_DIAGONAL: "ld",      // Left Diagonal (\)
    RIGHT_DIAGONAL: "rd",     // Right Diagonal (/)
};

// --- CASOS DE VICTORIA REFACTORIZADOS Y REORDENADOS ---
// ¡Importante! Los casos complejos (combinaciones) van primero para un chequeo correcto.
export const winCases = [
    // --- COMBINACIONES (2 LÍNEAS) ---
    
    // 6. Dos Diagonales (Victoria central total) - El más complejo
    {
        matrix: [
            [1, 0, 1],
            [0, 1, 0],
            [1, 0, 1],
        ],
        traceLines: [WINNING_LINES.LEFT_DIAGONAL, WINNING_LINES.RIGHT_DIAGONAL],
    },

    // 4. Horizontal + Vertical
    {
        matrix: [
            [1, 1, 1],
            [0, 1, 0],
            [0, 1, 0],
        ],
        traceLines: [WINNING_LINES.TOP_HORIZONTAL, WINNING_LINES.MIDDLE_VERTICAL],
    },
    {
        matrix: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 1, 0],
        ],
        traceLines: [WINNING_LINES.MIDDLE_HORIZONTAL, WINNING_LINES.MIDDLE_VERTICAL],
    },
    {
        matrix: [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 1],
        ],
        traceLines: [WINNING_LINES.BOTTOM_HORIZONTAL, WINNING_LINES.MIDDLE_VERTICAL],
    },
    {
        matrix: [
            [1, 0, 0],
            [1, 1, 1],
            [1, 0, 0],
        ],
        traceLines: [WINNING_LINES.LEFT_VERTICAL, WINNING_LINES.MIDDLE_HORIZONTAL],
    },
    {
        matrix: [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 1],
        ],
        traceLines: [WINNING_LINES.RIGHT_VERTICAL, WINNING_LINES.MIDDLE_HORIZONTAL],
    },
    
    // 5. Diagonal + Vertical/Horizontal
    {
        matrix: [
            [1, 1, 0],
            [0, 1, 0],
            [0, 1, 1],
        ],
        traceLines: [WINNING_LINES.LEFT_DIAGONAL, WINNING_LINES.MIDDLE_VERTICAL],
    },
    {
        matrix: [
            [0, 1, 1],
            [0, 1, 0],
            [1, 1, 0],
        ],
        traceLines: [WINNING_LINES.RIGHT_DIAGONAL, WINNING_LINES.MIDDLE_VERTICAL],
    },
    {
        matrix: [
            [0, 0, 1],
            [1, 1, 1],
            [1, 0, 0],
        ],
        traceLines: [WINNING_LINES.RIGHT_DIAGONAL, WINNING_LINES.MIDDLE_HORIZONTAL],
    },
    {
        matrix: [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 1],
        ],
        traceLines: [WINNING_LINES.LEFT_DIAGONAL, WINNING_LINES.MIDDLE_HORIZONTAL],
    },
    //6. lineas horizontales de izquierda, derecha + lineas verticales izquierda, derecha
    {
        matrix: [
            [1,1,1],
            [1,0,0],
            [1,0,0]
        ],
        traceLines: [WINNING_LINES.LEFT_VERTICAL, WINNING_LINES.TOP_HORIZONTAL]
    },
    {
         matrix: [
            [1,0,0],
            [1,0,0],
            [1,1,1]
        ],
        traceLines: [WINNING_LINES.LEFT_VERTICAL, WINNING_LINES.BOTTOM_HORIZONTAL]
    },
    {
         matrix: [
            [0,0,1],
            [0,0,1],
            [1,1,1]
        ],
        traceLines: [WINNING_LINES.RIGHT_VERTICAL, WINNING_LINES.BOTTOM_HORIZONTAL]
    },
    {
         matrix: [
            [1,1,1],
            [0,0,1],
            [0,0,1]
        ],
        traceLines: [WINNING_LINES.RIGHT_VERTICAL, WINNING_LINES.TOP_HORIZONTAL]
    },
    // --- CASOS SIMPLES (1 LÍNEA) ---

    // 1. HORIZONTALES SIMPLES
    {
        matrix: [
            [1, 1, 1],
            [0, 0, 0],
            [0, 0, 0],
        ],
        traceLines: [WINNING_LINES.TOP_HORIZONTAL],
    },
    {
        matrix: [
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 0],
        ],
        traceLines: [WINNING_LINES.MIDDLE_HORIZONTAL],
    },
    {
        matrix: [
            [0, 0, 0],
            [0, 0, 0],
            [1, 1, 1],
        ],
        traceLines: [WINNING_LINES.BOTTOM_HORIZONTAL],
    },
    
    // 2. VERTICALES SIMPLES
    {
        matrix: [
            [1, 0, 0],
            [1, 0, 0],
            [1, 0, 0],
        ],
        traceLines: [WINNING_LINES.LEFT_VERTICAL],
    },
    {
        matrix: [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
        ],
        traceLines: [WINNING_LINES.MIDDLE_VERTICAL],
    },
    {
        matrix: [
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1],
        ],
        traceLines: [WINNING_LINES.RIGHT_VERTICAL],
    },
    
    // 3. DIAGONALES SIMPLES
    {
        matrix: [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
        ],
        traceLines: [WINNING_LINES.LEFT_DIAGONAL],
    },
    {
        matrix: [
            [0, 0, 1],
            [0, 1, 0],
            [1, 0, 0],
        ],
        traceLines: [WINNING_LINES.RIGHT_DIAGONAL],
    },
];