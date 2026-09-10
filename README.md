# Pokedex-Retro
Pokedex Retro es un proyecto basado en la actividad de consumo de Api de Pokemon. Pero agregando dos juegos  uno de combate y uno de adivina el Pokémon 

[README.md](https://github.com/user-attachments/files/32080015/README.md)
# 🎮 Pokédex Rojo Fuego · GBA Edition (8-Bits Retro)

[![Licencia](https://img.shields.io/badge/Licencia-MIT-brightgreen.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![PokéAPI](https://img.shields.io/badge/API-PokéAPI%20v2-EF5350)](https://pokeapi.co/)

**Pokédex Rojo Fuego · GBA Edition** es una aplicación web interactiva inspirada visual y sonoramente en las consolas **Game Boy Advance (GBA)** y en los clásicos videojuegos de Pokémon (*FireRed / LeafGreen*). Construida con **Vanilla JavaScript (ES6+)**, **HTML5 semántico** y **CSS3 avanzado**, consume la [PokéAPI](https://pokeapi.co/) para brindar una experiencia retro completa sin dependencias externas.

---

## 📸 Vista Previa e Interfaz Retro

La interfaz simula la pantalla y controles de un marco de consola portátil GBA, incorporando:
* 📺 **Efecto CRT Scanlines**: Líneas de exploración analógicas retro sobre la pantalla.
* 🎨 **Paleta de Colores Oficial GBA**: Tonos `#cc2020` (Rojo Fuego) con acabados biselados de 8-bits.
* 🔤 **Tipografía Chiptune**: Integración de la fuente `'Press Start 2P'` vía Google Fonts.
* ⚡ **Efectos de Transición e Inmersión**: Animaciones en CSS para encuentros de batalla (`battleEncounterFlash`), Pokéballs giratorias, animaciones de daño y movimiento física de sprites.

---

## ✨ Características Principales

### 1. 📖 Pokédex Interactiva (151 Pokémon de Kanto)
* **Filtrado por Categorías Temáticas**: Clasificación rápida mediante botones (Iniciales, Fuego, Agua, Planta, Eléctrico, Psíquico, Lucha, Roca/Tierra, Fantasma/Veneno, Bicho, Dragón, Normal, Legendarios o Ver Todos).
* **Buscador Dinámico**: Filtrado en tiempo real por nombre o número de Pokedex (`#001`, `25`, `Pikachu`).
* **Información Detallada**:
  * Sprites oficiales animados y renderizados en formato pixelado (`image-rendering: pixelated`).
  * Tipos elementales con sus insignias de colores originales.
  * Habilidades traducidas al español (ej. *Overgrow* ➔ *Espesura*, *Blaze* ➔ *Mar Llamas*).
  * Descripciones oficiales extraídas dinámicamente desde `pokemon-species` en español.
  * Reproducción en tiempo real del grito oficial (*Cry*) del Pokémon.
* **Navegación Paginada**: Navegación amigable de 12 elementos por página para evitar sobrecarga del DOM.

### 2. ⚖️ Comparador de Estadísticas Base (Modal)
* Comparación frente a frente entre dos Pokémon elegidos.
* Barras horizontales comparativas de estadísticas base: HP, Ataque, Defensa, Ataque Especial, Defensa Especial y Velocidad.
* Resaltado automático en verde (`#28a745`) del ganador en cada atributo.
* Vista comparativa de altura, peso y habilidades.

### 3. ⚔️ Modo Batalla GBA 3 vs 3
* **Simulador de Combate Retro por Turnos**:
  * Configuración de alineación de 3 Pokémon para el jugador y 3 para el rival (modo aleatorio o selección manual).
  * Escenario de combate GBA con plataformas para el jugador y el rival.
  * Barras de HP dinámicas (verde, amarillo, rojo) con cálculo numérico de vida.
  * Marcadores de status de Pokéballs restantes por equipo.
  * Animaciones de ataque físico (`attack-dash`), popups flotantes de daño (`-25 HP`), parpadeos de daño (`shake`) y animación de debilitado (`faint`).
* **Sub-acciones de Combate**:
  * Ejecución de movimientos temáticos traducidos.
  * Relevo/Cambio de Pokémon activo a través de un modal de equipo.
  * Opción de huida de batalla.

### 4. ❓ Minijuego "¿Quién es ese Pokémon?"
* Desafío de adivinanza mediante la silueta en sombras del Pokémon (`filter: brightness(0)`).
* Efectos de audio retro configurados para el aviso del minijuego.
* Sistema de puntuación con contador de **Racha Actual** y **Récord Máximo**.
* Animación de revelado con resplandor dorado (`revealed-glow`).

### 5. 🧬 Línea Evolutiva
* Al hacer clic en la imagen/sprite de cualquier tarjeta de la Pokédex, se despliega un modal interactivo con la cadena completa de evoluciones del Pokémon seleccionado.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5**: Estructura semántica de la consola, vistas contenedoras y modales.
* **CSS3**: Variables CSS (`:root`), Grid, Flexbox, animaciones `@keyframes`, sombras de estilo retro 8-bits y diseño responsive adaptado a dispositivos móviles.
* **JavaScript (Vanilla - ES6+)**: Manipulación del DOM, programación asíncrona (`async/await`, `fetch`), manejo de estados globales de batalla/minijuego y audio HTML5.
* **PokéAPI (v2)**: API REST pública proveedora de los datos, sprites, audios de grito y descripciones oficiales de Pokémon.
* **Google Fonts**: Fuente retro *Press Start 2P*.

---

## 📁 Estructura del Proyecto

```text
pokedex-rojo-fuego/
├── index.html      # Estructura principal, marcadores HTML y modales
├── styles.css      # Estilos retro GBA, paleta de colores y animaciones CSS
├── script.js      # Lógica de consumo de la PokéAPI, batallas, minijuego y DOM
└── README.md       # Documentación oficial del proyecto
```

---

## 🚀 Instalación y Ejecución

Al ser un proyecto desarrollado 100% en tecnologías web estándar sin compiladores ni empaquetadores (Zero-Dependencies):

1. **Clonar o descargar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/pokedex-rojo-fuego.git
   cd pokedex-rojo-fuego
   ```

2. **Ejecutar el proyecto**:
   * Abre directamente el archivo `index.html` en cualquier navegador web moderno (Chrome, Firefox, Edge, Safari).
   * O puedes servirlo a través de una extensión de servidor local como **Live Server** en Visual Studio Code.

---

## 🎮 Controles e Interacción

| Acción | Control / Ubicación |
| :--- | :--- |
| **Cambiar de vista** | Botones de la barra superior: `📖 POKÉDEX`, `⚔️ COMBATE 3v3`, `❓ ¿QUIÉN ES?` |
| **Ver evoluciones** | Haz clic sobre la caja del sprite de un Pokémon en la Pokédex |
| **Escuchar grito** | Botón `🔊 GRITO` en la tarjeta del Pokémon |
| **Comparar stats** | Botón `⚖️ COMPARAR` en la tarjeta del Pokémon |
| **Cambiar Pokémon (Batalla)** | Botón `🔄 CAMBIAR` dentro del panel de comandos de combate |

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo `LICENSE` para obtener más información.

*Nota: Pokémon y los nombres de los Pokémon son marcas registradas de Nintendo, Game Freak y Creatures Inc. Este proyecto ha sido desarrollado únicamente con fines educativos y de demostración técnica.*
