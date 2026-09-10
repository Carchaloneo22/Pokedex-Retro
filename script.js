/**
 * ==========================================================================
 * POKÉDEX ROJO FUEGO · LÓGICA PRINCIPAL (VANILLA JAVASCRIPT)
 * Categorías, Comparador de Estadísticas, Combates 3vs3 y Animaciones GBA
 * ==========================================================================
 */

(function() {
  'use strict';

  // --- CONFIGURACIÓN Y CONSTANTES ---
  const API_BASE = 'https://pokeapi.co/api/v2';
  const TOTAL_POKEMON = 151;
  const ITEMS_PER_PAGE = 12;

  // Diccionario de Traducción de Habilidades Pokémon
  const ABILITY_TRANSLATIONS = {
    'overgrow': 'Espesura',
    'blaze': 'Mar Llamas',
    'torrent': 'Torrente',
    'shield-dust': 'Polvo Escudo',
    'shed-skin': 'Mudar',
    'compound-eyes': 'Ojo Compuesto',
    'swarm': 'Enjambre',
    'keen-eye': 'Vista Lince',
    'run-away': 'Fuga',
    'guts': 'Agallas',
    'intimidate': 'Intimidación',
    'static': 'Elec. Estática',
    'sand-veil': 'Velo Arena',
    'poison-point': 'Punto Tóxico',
    'cute-charm': 'Gran Encanto',
    'flash-fire': 'Absorbe Fuego',
    'inner-focus': 'Foco Interno',
    'chlorophyll': 'Clorofila',
    'effect-spore': 'Efecto Espora',
    'compoundeyes': 'Ojo Compuesto',
    'clear-body': 'Cuerpo Puro',
    'damp': 'Humedad',
    'water-absorb': 'Absorbe Agua',
    'synchronize': 'Sincronía',
    'levitate': 'Levitación',
    'pressure': 'Presión',
    'rock-head': 'Cabeza Roca',
    'sturdy': 'Robustez',
    'magnet-pull': 'Imán',
    'speed-boost': 'Impulso',
    'battle-armor': 'Armadura Batalla',
    'limber': 'Flexibilidad',
    'oblivious': 'Despiste',
    'natural-cure': 'Cura Natural',
    'serene-grace': 'Dicha',
    'swift-swim': 'Nado Rápido',
    'insomnia': 'Insomnio',
    'immunity': 'Inmunidad',
    'flame-body': 'Cuerpo Llama',
    'vital-spirit': 'Espíritu Vital',
    'pickup': 'Recogida',
    'trace': 'Rastro',
    'huge-power': 'Potencia'
  };

  // Diccionario de Traducción de Ataques
  const MOVE_TRANSLATIONS = {
    'tackle': 'Placaje',
    'scratch': 'Arañazo',
    'pound': 'Destructor',
    'cut': 'Corte',
    'fly': 'Vuelo',
    'surf': 'Surf',
    'strength': 'Fuerza',
    'flash': 'Destello',
    'flamethrower': 'Lanzallamas',
    'fire-blast': 'Llamarada',
    'ember': 'Ascuas',
    'hydro-pump': 'Hidrobomba',
    'water-gun': 'Pistola Agua',
    'bubble': 'Burbuja',
    'vine-whip': 'Látigo Cepa',
    'razor-leaf': 'Hoja Afilada',
    'solar-beam': 'Rayo Solar',
    'thunderbolt': 'Rayo',
    'thunder': 'Trueno',
    'thunder-shock': 'Impactrueno',
    'ice-beam': 'Rayo Hielo',
    'blizzard': 'Ventisca',
    'psychic': 'Psíquico',
    'confusion': 'Confusión',
    'hyper-beam': 'Híper Rayo',
    'quick-attack': 'Ataque Rápido',
    'bite': 'Mordisco',
    'mega-punch': 'Megapuño',
    'mega-kick': 'Megapatada',
    'headbutt': 'Golpe Cabeza',
    'body-slam': 'Golpe Cuerpo',
    'earthquake': 'Terremoto',
    'dig': 'Excavar',
    'rock-slide': 'Avalancha',
    'sludge-bomb': 'Bomba Lodo',
    'shadow-ball': 'Bola Sombra',
    'iron-tail': 'Cola Férrea',
    'wing-attack': 'Ataque Ala'
  };

  // Etiquetas de Estadísticas en Español
  const STAT_LABELS = {
    'hp': 'PS / HP',
    'attack': 'ATAQUE',
    'defense': 'DEFENSA',
    'special-attack': 'ATQ. ESP',
    'special-defense': 'DEF. ESP',
    'speed': 'VELOCIDAD'
  };

  // Definición de Categorías Temáticas
  const CATEGORIES = [
    { id: 'starters', name: '⭐ INICIALES' },
    { id: 'fire', name: '🔥 FUEGO' },
    { id: 'water', name: '💧 AGUA' },
    { id: 'grass', name: '🌿 PLANTA' },
    { id: 'electric', name: '⚡ ELÉCTRICO' },
    { id: 'psychic', name: '👁️ PSÍQUICO' },
    { id: 'fighting', name: '🥊 LUCHA' },
    { id: 'rock_ground', name: '🪨 ROCA/TIERRA' },
    { id: 'poison_ghost', name: '👻 FANTASMA/VEN' },
    { id: 'bug', name: '🐛 BICHO' },
    { id: 'dragon', name: '🐉 DRAGÓN' },
    { id: 'normal', name: '⚪ NORMAL' },
    { id: 'legendary', name: '👑 LEGENDARIOS' },
    { id: 'all', name: '✨ TODOS' }
  ];

  // --- ELEMENTOS DEL DOM ---
  // Navegación
  const navPokedexBtn = document.getElementById('navPokedexBtn');
  const navCustomBattleBtn = document.getElementById('navCustomBattleBtn');
  const navMinigameBtn = document.getElementById('navMinigameBtn');
  const pokedexControlsSection = document.getElementById('pokedexControlsSection');
  const pokedexView = document.getElementById('pokedexView');
  const minigameView = document.getElementById('minigameView');
  const battleView = document.getElementById('battleView');
  const battleTransitionOverlay = document.getElementById('battleTransitionOverlay');

  // Buscador y Categorías
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const categoriesContainer = document.getElementById('categoriesContainer');
  const currentCategoryLabel = document.getElementById('currentCategoryLabel');
  const categoryCountLabel = document.getElementById('categoryCountLabel');
  const paginationBar = document.getElementById('paginationBar');
  const prevPageBtn = document.getElementById('prevPageBtn');
  const nextPageBtn = document.getElementById('nextPageBtn');
  const pageIndicator = document.getElementById('pageIndicator');
  const pokedexGrid = document.getElementById('pokedexGrid');
  const statusBox = document.getElementById('statusBox');
  const loaderBox = document.getElementById('loaderBox');

  // Minijuego
  const whosThatPokemonAudio = document.getElementById('whosThatPokemonAudio');
  const minigameStreak = document.getElementById('minigameStreak');
  const minigameBest = document.getElementById('minigameBest');
  const minigameSprite = document.getElementById('minigameSprite');
  const minigameMessage = document.getElementById('minigameMessage');
  const minigameOptions = document.getElementById('minigameOptions');
  const minigameNextBtn = document.getElementById('minigameNextBtn');
  const minigameExitBtn = document.getElementById('minigameExitBtn');

  // Modo Batalla 3vs3
  const rivalName = document.getElementById('rivalName');
  const rivalLevel = document.getElementById('rivalLevel');
  const rivalPokeballs = document.getElementById('rivalPokeballs');
  const rivalHpFill = document.getElementById('rivalHpFill');
  const rivalSprite = document.getElementById('rivalSprite');
  const rivalDamagePopup = document.getElementById('rivalDamagePopup');

  const playerName = document.getElementById('playerName');
  const playerLevel = document.getElementById('playerLevel');
  const playerPokeballs = document.getElementById('playerPokeballs');
  const playerHpFill = document.getElementById('playerHpFill');
  const playerHpCurrent = document.getElementById('playerHpCurrent');
  const playerHpMax = document.getElementById('playerHpMax');
  const playerSprite = document.getElementById('playerSprite');
  const playerDamagePopup = document.getElementById('playerDamagePopup');

  const battleMessage = document.getElementById('battleMessage');
  const battleMovesGrid = document.getElementById('battleMovesGrid');
  const battleSwitchBtn = document.getElementById('battleSwitchBtn');
  const battleRunBtn = document.getElementById('battleRunBtn');

  // Modal 1: Comparador de Estadísticas
  const compareModal = document.getElementById('compareModal');
  const closeCompareBtn = document.getElementById('closeCompareBtn');
  const compareCloseOkBtn = document.getElementById('compareCloseOkBtn');
  const compareSelectA = document.getElementById('compareSelectA');
  const compareSpriteA = document.getElementById('compareSpriteA');
  const compareNameA = document.getElementById('compareNameA');
  const compareTypesA = document.getElementById('compareTypesA');

  const compareSelectB = document.getElementById('compareSelectB');
  const compareSpriteB = document.getElementById('compareSpriteB');
  const compareNameB = document.getElementById('compareNameB');
  const compareTypesB = document.getElementById('compareTypesB');

  const statsComparisonRows = document.getElementById('statsComparisonRows');
  const compareDimensions = document.getElementById('compareDimensions');
  const compareAbilities = document.getElementById('compareAbilities');

  // Modal 2: Configuración Batalla 3vs3
  const battleSetupModal = document.getElementById('battleSetupModal');
  const closeBattleSetupBtn = document.getElementById('closeBattleSetupBtn');
  const teamSelect1 = document.getElementById('teamSelect1');
  const teamSelect2 = document.getElementById('teamSelect2');
  const teamSelect3 = document.getElementById('teamSelect3');
  const teamSprite1 = document.getElementById('teamSprite1');
  const teamSprite2 = document.getElementById('teamSprite2');
  const teamSprite3 = document.getElementById('teamSprite3');

  const rivalModeRandomBtn = document.getElementById('rivalModeRandomBtn');
  const rivalModeManualBtn = document.getElementById('rivalModeManualBtn');
  const rivalSelect1 = document.getElementById('rivalSelect1');
  const rivalSelect2 = document.getElementById('rivalSelect2');
  const rivalSelect3 = document.getElementById('rivalSelect3');
  const rivalSprite1 = document.getElementById('rivalSprite1');
  const rivalSprite2 = document.getElementById('rivalSprite2');
  const rivalSprite3 = document.getElementById('rivalSprite3');
  const start3v3FightBtn = document.getElementById('start3v3FightBtn');

  // Modal 3: Cambiar Pokémon en plena batalla
  const switchPokemonModal = document.getElementById('switchPokemonModal');
  const closeSwitchBtn = document.getElementById('closeSwitchBtn');
  const switchTeamList = document.getElementById('switchTeamList');

  // Modal 4: Evoluciones
  const evolutionModal = document.getElementById('evolutionModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalOkBtn = document.getElementById('modalOkBtn');
  const evolutionChainContent = document.getElementById('evolutionChainContent');

  // --- ESTADO GLOBAL ---
  let allPokemon = [];
  let activeCategory = 'starters';
  let filteredList = [];
  let currentPage = 1;

  // Estado Minijuego
  let minigameCurrentPokemon = null;
  let streakScore = 0;
  let bestScore = 0;
  let isMinigameLocked = false;

  // Estado Configuración Batalla 3vs3
  let isRivalTeamRandom = true;

  // Estado del Combate 3vs3
  let battle3v3State = {
    playerTeam: [], // [ { data, currentHp, maxHp, fainted, moves } ]
    rivalTeam: [],  // [ { data, currentHp, maxHp, fainted, moves } ]
    activePlayerIndex: 0,
    activeRivalIndex: 0,
    isTurnLocked: false
  };

  // ==========================================================================
  // AUDIO Y UTILIDADES RETRO
  // ==========================================================================

  function playPokemonCry(pokemon) {
    if (!pokemon) return;
    const cryUrl = pokemon.cries?.latest || pokemon.cries?.legacy;
    if (cryUrl) {
      const audio = new Audio(cryUrl);
      audio.volume = 0.6;
      audio.play().catch(err => console.warn('Audio bloqueado:', err));
      return audio;
    }
  }

  function showStatus(text, isError = false) {
    statusBox.textContent = text;
    statusBox.className = `retro-status-box ${isError ? 'error' : ''}`;
    statusBox.style.display = 'block';
  }

  function hideStatus() {
    statusBox.style.display = 'none';
  }

  function showLoader() {
    loaderBox.style.display = 'flex';
    pokedexGrid.innerHTML = '';
    hideStatus();
  }

  function hideLoader() {
    loaderBox.style.display = 'none';
  }

  function formatPokemonId(id) {
    return '#' + id.toString().padStart(3, '0');
  }

  function formatMoveName(rawName) {
    if (MOVE_TRANSLATIONS[rawName]) {
      return MOVE_TRANSLATIONS[rawName].toUpperCase();
    }
    return rawName.replace(/-/g, ' ').toUpperCase();
  }

  function formatAbilityName(rawName) {
    if (ABILITY_TRANSLATIONS[rawName]) {
      return ABILITY_TRANSLATIONS[rawName];
    }
    return rawName.replace(/-/g, ' ').toUpperCase();
  }

  function triggerShake(element) {
    if (!element) return;
    element.classList.remove('shake');
    void element.offsetWidth;
    element.classList.add('shake');
  }

  function showDamageNumber(popupElement, damage) {
    if (!popupElement) return;
    popupElement.textContent = `-${damage} HP`;
    popupElement.style.display = 'block';
    popupElement.style.animation = 'none';
    void popupElement.offsetWidth;
    popupElement.style.animation = 'damagePopupFloat 0.8s ease-out forwards';
    setTimeout(() => {
      popupElement.style.display = 'none';
    }, 850);
  }

  // ==========================================================================
  // CARGA DE DATOS DE LA POKÉAPI (151 POKÉMON KANTO)
  // ==========================================================================

  async function loadAllPokemon() {
    showLoader();
    try {
      const response = await fetch(`${API_BASE}/pokemon?limit=${TOTAL_POKEMON}`);
      if (!response.ok) throw new Error('Error al conectar con la PokéAPI');
      
      const listData = await response.json();

      const detailPromises = listData.results.map(async (item, index) => {
        try {
          const detailRes = await fetch(item.url);
          if (!detailRes.ok) throw new Error(`Error en ${item.name}`);
          const pData = await detailRes.json();
          pData.description = null;
          return pData;
        } catch (err) {
          console.warn(`Fallback para ${item.name}:`, err);
          return {
            id: index + 1,
            name: item.name,
            height: 7,
            weight: 69,
            sprites: {
              front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
              back_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${index + 1}.png`
            },
            types: [{ type: { name: 'normal' } }],
            abilities: [{ ability: { name: 'run-away' } }],
            stats: [
              { base_stat: 45, stat: { name: 'hp' } },
              { base_stat: 49, stat: { name: 'attack' } },
              { base_stat: 49, stat: { name: 'defense' } },
              { base_stat: 65, stat: { name: 'special-attack' } },
              { base_stat: 65, stat: { name: 'special-defense' } },
              { base_stat: 45, stat: { name: 'speed' } }
            ],
            moves: [{ move: { name: 'tackle' } }],
            cries: {
              latest: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${index + 1}.ogg`
            },
            description: 'Pokémon registrado en la región de Kanto.'
          };
        }
      });

      allPokemon = await Promise.all(detailPromises);
      allPokemon.sort((a, b) => a.id - b.id);

      hideLoader();
      
      renderCategoryButtons();
      selectCategory('starters');

    } catch (error) {
      console.error('Error cargando Pokédex:', error);
      hideLoader();
      showStatus('ERROR AL CARGAR DATOS DE LA POKÉAPI. VERIFICA TU CONEXIÓN.', true);
    }
  }

  // ==========================================================================
  // OBTENCIÓN DE DESCRIPCIONES OFICIALES (POKEMON-SPECIES)
  // ==========================================================================

  async function fetchPokemonDescription(pokemon) {
    if (pokemon.description) return pokemon.description;

    try {
      const res = await fetch(`${API_BASE}/pokemon-species/${pokemon.id}/`);
      if (!res.ok) throw new Error('Error en especie');
      const data = await res.json();

      const entry = data.flavor_text_entries.find(e => e.language.name === 'es') ||
                    data.flavor_text_entries.find(e => e.language.name === 'en');

      if (entry) {
        pokemon.description = entry.flavor_text.replace(/[\n\f]/g, ' ');
      } else {
        pokemon.description = 'No se encontró descripción oficial en los registros de la Pokédex.';
      }
    } catch (err) {
      console.warn(`No se pudo obtener descripción de ${pokemon.name}:`, err);
      pokemon.description = 'Datos de Pokédex no disponibles en este momento.';
    }

    return pokemon.description;
  }

  // ==========================================================================
  // SISTEMA DE CATEGORÍAS (NO MOSTRAR TODOS DE GOLPE)
  // ==========================================================================

  function renderCategoryButtons() {
    categoriesContainer.innerHTML = '';
    CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `cat-btn ${cat.id === activeCategory ? 'active' : ''}`;
      btn.textContent = cat.name;
      btn.addEventListener('click', () => selectCategory(cat.id));
      categoriesContainer.appendChild(btn);
    });
  }

  function selectCategory(categoryId) {
    activeCategory = categoryId;
    currentPage = 1;
    searchInput.value = '';

    const buttons = categoriesContainer.querySelectorAll('.cat-btn');
    buttons.forEach((btn, idx) => {
      if (CATEGORIES[idx].id === categoryId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const catObj = CATEGORIES.find(c => c.id === categoryId);
    currentCategoryLabel.textContent = catObj ? catObj.name : 'CATEGORÍA';

    switch (categoryId) {
      case 'starters':
        const starterIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 25, 26, 133, 134, 135, 136];
        filteredList = allPokemon.filter(p => starterIds.includes(p.id));
        break;

      case 'legendary':
        const legIds = [144, 145, 146, 150, 151];
        filteredList = allPokemon.filter(p => legIds.includes(p.id));
        break;

      case 'rock_ground':
        filteredList = allPokemon.filter(p => p.types.some(t => ['rock', 'ground'].includes(t.type.name)));
        break;

      case 'poison_ghost':
        filteredList = allPokemon.filter(p => p.types.some(t => ['poison', 'ghost'].includes(t.type.name)));
        break;

      case 'all':
        filteredList = allPokemon;
        break;

      default:
        filteredList = allPokemon.filter(p => p.types.some(t => t.type.name === categoryId));
        break;
    }

    categoryCountLabel.textContent = `${filteredList.length} Pokémon encontrados`;
    renderCurrentPage();
  }

  // ==========================================================================
  // RENDERIZADO DEL GRID DE POKÉMON CON BOTÓN 'COMPARAR'
  // ==========================================================================

  function renderCurrentPage() {
    pokedexGrid.innerHTML = '';

    if (!filteredList || filteredList.length === 0) {
      showStatus('NO HAY POKÉMON EN ESTA CATEGORÍA O BÚSQUEDA.', true);
      paginationBar.style.display = 'none';
      return;
    }
    hideStatus();

    const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
    if (totalPages > 1) {
      paginationBar.style.display = 'flex';
      pageIndicator.textContent = `PÁGINA ${currentPage} / ${totalPages}`;
      prevPageBtn.disabled = currentPage === 1;
      nextPageBtn.disabled = currentPage === totalPages;
    } else {
      paginationBar.style.display = 'none';
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const pageItems = filteredList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    pageItems.forEach((pokemon, index) => {
      const card = document.createElement('article');
      card.className = 'pokemon-card';
      card.style.animationDelay = `${index * 0.04}s`;

      const spriteUrl = pokemon.sprites?.front_default ||
                        pokemon.sprites?.other?.['official-artwork']?.front_default ||
                        '';

      const typesHtml = pokemon.types.map(t => {
        const typeName = t.type.name;
        return `<span class="type-badge type-${typeName}">${typeName}</span>`;
      }).join('');

      const abilitiesHtml = pokemon.abilities.map(a => {
        const abName = formatAbilityName(a.ability.name);
        return a.is_hidden ? `${abName} (Oculta)` : abName;
      }).join(', ');

      card.innerHTML = `
        <div class="card-top-info">
          <span class="pokemon-id">${formatPokemonId(pokemon.id)}</span>
          <span class="pokeball-pixel-icon" style="width: 14px; height: 14px; border-width: 2px;"></span>
        </div>

        <div class="pokemon-sprite-box" data-id="${pokemon.id}" title="Haz clic para ver su línea evolutiva">
          <img class="pokemon-sprite" src="${spriteUrl}" alt="${pokemon.name}" loading="lazy">
        </div>

        <h3 class="pokemon-name">${pokemon.name}</h3>
        <div class="pokemon-types">${typesHtml}</div>

        <!-- Habilidades -->
        <div class="pokemon-abilities-box">
          <span class="section-tag">HABILIDAD(ES):</span>
          <p class="abilities-list">${abilitiesHtml}</p>
        </div>

        <!-- Descripción Oficial -->
        <div class="pokemon-desc-box">
          <span class="section-tag">POKÉDEX ROJO FUEGO:</span>
          <p class="desc-text" id="desc-${pokemon.id}">Cargando descripción...</p>
        </div>

        <!-- Acciones: Grito y Comparar -->
        <div class="card-actions">
          <button class="retro-btn btn-sm btn-sound cry-btn" data-id="${pokemon.id}">🔊 GRITO</button>
          <button class="retro-btn btn-sm btn-compare compare-btn" data-id="${pokemon.id}">⚖️ COMPARAR</button>
        </div>
      `;

      fetchPokemonDescription(pokemon).then(desc => {
        const descEl = card.querySelector(`#desc-${pokemon.id}`);
        if (descEl) descEl.textContent = desc;
      });

      card.querySelector('.pokemon-sprite-box').addEventListener('click', () => openEvolutionModal(pokemon.id));
      card.querySelector('.cry-btn').addEventListener('click', () => playPokemonCry(pokemon));
      card.querySelector('.compare-btn').addEventListener('click', () => openCompareModal(pokemon.id));

      pokedexGrid.appendChild(card);
    });
  }

  // ==========================================================================
  // BÚSQUEDA Y FILTRADO POR TEXTO O ID
  // ==========================================================================

  function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      selectCategory(activeCategory);
      return;
    }

    currentPage = 1;
    currentCategoryLabel.textContent = `🔍 BÚSQUEDA: "${query.toUpperCase()}"`;

    filteredList = allPokemon.filter(p => {
      const matchName = p.name.toLowerCase().includes(query);
      const matchId = p.id.toString() === query || formatPokemonId(p.id).toLowerCase() === query;
      return matchName || matchId;
    });

    categoryCountLabel.textContent = `${filteredList.length} Pokémon encontrados`;
    renderCurrentPage();
  }

  // ==========================================================================
  // MODAL 1: COMPARADOR DE ESTADÍSTICAS
  // ==========================================================================

  function populateSelectOptions(selectEl, selectedId) {
    selectEl.innerHTML = '';
    allPokemon.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = `${formatPokemonId(p.id)} ${p.name.toUpperCase()}`;
      if (p.id === selectedId) opt.selected = true;
      selectEl.appendChild(opt);
    });
  }

  function openCompareModal(initialPokemonId) {
    compareModal.style.display = 'flex';

    // Elegir un rival por defecto interesante para comparar (por ejemplo Charizard o el siguiente)
    let defaultOpponentId = (initialPokemonId === 1) ? 4 : (initialPokemonId === 4) ? 7 : (initialPokemonId === 7) ? 1 : 25;
    if (initialPokemonId === defaultOpponentId) defaultOpponentId = 150;

    populateSelectOptions(compareSelectA, initialPokemonId);
    populateSelectOptions(compareSelectB, defaultOpponentId);

    updateComparison();
  }

  function updateComparison() {
    const idA = parseInt(compareSelectA.value, 10);
    const idB = parseInt(compareSelectB.value, 10);

    const pokeA = allPokemon.find(p => p.id === idA);
    const pokeB = allPokemon.find(p => p.id === idB);

    if (!pokeA || !pokeB) return;

    // Actualizar Encabezado A
    compareSpriteA.src = pokeA.sprites?.front_default || '';
    compareNameA.textContent = `${pokeA.name.toUpperCase()} (${formatPokemonId(pokeA.id)})`;
    compareTypesA.innerHTML = pokeA.types.map(t => `<span class="type-badge type-${t.type.name}">${t.type.name}</span>`).join('');

    // Actualizar Encabezado B
    compareSpriteB.src = pokeB.sprites?.front_default || '';
    compareNameB.textContent = `${pokeB.name.toUpperCase()} (${formatPokemonId(pokeB.id)})`;
    compareTypesB.innerHTML = pokeB.types.map(t => `<span class="type-badge type-${t.type.name}">${t.type.name}</span>`).join('');

    // Estadísticas
    const statsOrder = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
    let totalA = 0;
    let totalB = 0;

    statsComparisonRows.innerHTML = '';

    statsOrder.forEach(statKey => {
      const statObjA = pokeA.stats?.find(s => s.stat.name === statKey) || { base_stat: 50 };
      const statObjB = pokeB.stats?.find(s => s.stat.name === statKey) || { base_stat: 50 };

      const valA = statObjA.base_stat;
      const valB = statObjB.base_stat;

      totalA += valA;
      totalB += valB;

      // Calcular % relativo a 180 (stat estándar máx en Kanto)
      const pctA = Math.min(100, Math.round((valA / 180) * 100));
      const pctB = Math.min(100, Math.round((valB / 180) * 100));

      const isAWin = valA > valB;
      const isBWin = valB > valA;

      const row = document.createElement('div');
      row.className = 'stat-row';
      row.innerHTML = `
        <span class="stat-val-a ${isAWin ? 'winner' : ''}">${valA}${isAWin ? ' ▲' : ''}</span>
        <div class="stat-bar-container stat-bar-a">
          <div class="stat-bar-fill-a" style="width: ${pctA}%;"></div>
        </div>
        <span class="stat-name-label">${STAT_LABELS[statKey]}</span>
        <div class="stat-bar-container stat-bar-b">
          <div class="stat-bar-fill-b" style="width: ${pctB}%;"></div>
        </div>
        <span class="stat-val-b ${isBWin ? 'winner' : ''}">${valB}${isBWin ? ' ▲' : ''}</span>
      `;
      statsComparisonRows.appendChild(row);
    });

    // Fila de Total Base Stats (BST)
    const totalRow = document.createElement('div');
    totalRow.className = 'stat-row total-row';
    const isTotalAWin = totalA > totalB;
    const isTotalBWin = totalB > totalA;
    totalRow.innerHTML = `
      <span class="stat-val-a ${isTotalAWin ? 'winner' : ''}">${totalA}${isTotalAWin ? ' ★' : ''}</span>
      <div class="stat-bar-container stat-bar-a">
        <div class="stat-bar-fill-a" style="width: ${Math.min(100, (totalA / 700) * 100)}%; background-color: #28a745;"></div>
      </div>
      <span class="stat-name-label" style="font-weight: bold; color: var(--color-firered-dark);">TOTAL</span>
      <div class="stat-bar-container stat-bar-b">
        <div class="stat-bar-fill-b" style="width: ${Math.min(100, (totalB / 700) * 100)}%; background-color: #28a745;"></div>
      </div>
      <span class="stat-val-b ${isTotalBWin ? 'winner' : ''}">${totalB}${isTotalBWin ? ' ★' : ''}</span>
    `;
    statsComparisonRows.appendChild(totalRow);

    // Comparativa de Altura, Peso y Habilidades
    const heightA = (pokeA.height / 10).toFixed(1) + ' m';
    const weightA = (pokeA.weight / 10).toFixed(1) + ' kg';
    const heightB = (pokeB.height / 10).toFixed(1) + ' m';
    const weightB = (pokeB.weight / 10).toFixed(1) + ' kg';

    compareDimensions.innerHTML = `
      <b>${pokeA.name.toUpperCase()}:</b> ${heightA} / ${weightA}<br>
      <b>${pokeB.name.toUpperCase()}:</b> ${heightB} / ${weightB}
    `;

    const absA = pokeA.abilities.map(a => formatAbilityName(a.ability.name)).join(', ');
    const absB = pokeB.abilities.map(a => formatAbilityName(a.ability.name)).join(', ');
    compareAbilities.innerHTML = `
      <b>${pokeA.name.toUpperCase()}:</b> ${absA}<br>
      <b>${pokeB.name.toUpperCase()}:</b> ${absB}
    `;
  }

  // ==========================================================================
  // MODAL 2: CONFIGURACIÓN DE COMBATE 3 VS 3
  // ==========================================================================

  function openBattleSetup3v3Modal() {
    battleSetupModal.style.display = 'flex';

    // Rellenar selectores del jugador (por defecto: iniciales)
    populateSelectOptions(teamSelect1, 1);
    populateSelectOptions(teamSelect2, 4);
    populateSelectOptions(teamSelect3, 7);

    // Rellenar selectores del rival
    populateSelectOptions(rivalSelect1, 25);
    populateSelectOptions(rivalSelect2, 133);
    populateSelectOptions(rivalSelect3, 150);

    set3v3RivalMode(true);
    update3v3TeamPreviews();
  }

  function set3v3RivalMode(isRandom) {
    isRivalTeamRandom = isRandom;
    if (isRandom) {
      rivalModeRandomBtn.classList.add('active');
      rivalModeManualBtn.classList.remove('active');
      rivalSelect1.style.display = 'none';
      rivalSelect2.style.display = 'none';
      rivalSelect3.style.display = 'none';

      const mysterySvg = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="45" fill="%23b0c098"/%3E%3Ctext x="50" y="65" font-size="50" text-anchor="middle" fill="%23202020"%3E?%3C/text%3E%3C/svg%3E';
      rivalSprite1.src = mysterySvg;
      rivalSprite2.src = mysterySvg;
      rivalSprite3.src = mysterySvg;
    } else {
      rivalModeManualBtn.classList.add('active');
      rivalModeRandomBtn.classList.remove('active');
      rivalSelect1.style.display = 'block';
      rivalSelect2.style.display = 'block';
      rivalSelect3.style.display = 'block';
      update3v3RivalPreviews();
    }
  }

  function update3v3TeamPreviews() {
    const p1 = allPokemon.find(p => p.id === parseInt(teamSelect1.value, 10));
    const p2 = allPokemon.find(p => p.id === parseInt(teamSelect2.value, 10));
    const p3 = allPokemon.find(p => p.id === parseInt(teamSelect3.value, 10));

    if (p1) teamSprite1.src = p1.sprites?.front_default || '';
    if (p2) teamSprite2.src = p2.sprites?.front_default || '';
    if (p3) teamSprite3.src = p3.sprites?.front_default || '';
  }

  function update3v3RivalPreviews() {
    if (isRivalTeamRandom) return;
    const r1 = allPokemon.find(p => p.id === parseInt(rivalSelect1.value, 10));
    const r2 = allPokemon.find(p => p.id === parseInt(rivalSelect2.value, 10));
    const r3 = allPokemon.find(p => p.id === parseInt(rivalSelect3.value, 10));

    if (r1) rivalSprite1.src = r1.sprites?.front_default || '';
    if (r2) rivalSprite2.src = r2.sprites?.front_default || '';
    if (r3) rivalSprite3.src = r3.sprites?.front_default || '';
  }

  function start3v3Battle() {
    // 1. Obtener los 3 del jugador
    const id1 = parseInt(teamSelect1.value, 10);
    const id2 = parseInt(teamSelect2.value, 10);
    const id3 = parseInt(teamSelect3.value, 10);

    const playerPokes = [
      allPokemon.find(p => p.id === id1),
      allPokemon.find(p => p.id === id2),
      allPokemon.find(p => p.id === id3)
    ].filter(Boolean);

    // 2. Obtener los 3 del rival
    let rivalPokes = [];
    if (isRivalTeamRandom) {
      const pool = allPokemon.filter(p => !playerPokes.some(pl => pl.id === p.id));
      const shuffled = pool.sort(() => Math.random() - 0.5);
      rivalPokes = shuffled.slice(0, 3);
    } else {
      rivalPokes = [
        allPokemon.find(p => p.id === parseInt(rivalSelect1.value, 10)),
        allPokemon.find(p => p.id === parseInt(rivalSelect2.value, 10)),
        allPokemon.find(p => p.id === parseInt(rivalSelect3.value, 10))
      ].filter(Boolean);
    }

    battleSetupModal.style.display = 'none';

    triggerBattleTransition(() => {
      launch3v3Arena(playerPokes, rivalPokes);
    });
  }

  function triggerBattleTransition(callback) {
    battleTransitionOverlay.style.display = 'block';
    setTimeout(() => {
      if (callback) callback();
    }, 350);
    setTimeout(() => {
      battleTransitionOverlay.style.display = 'none';
    }, 750);
  }

  // ==========================================================================
  // ESCENARIO Y LÓGICA DE BATALLA 3 VS 3
  // ==========================================================================

  function launch3v3Arena(playerPokes, rivalPokes) {
    pokedexView.style.display = 'none';
    minigameView.style.display = 'none';
    pokedexControlsSection.style.display = 'none';
    battleView.style.display = 'block';

    navPokedexBtn.classList.remove('active');
    navMinigameBtn.classList.remove('active');

    // Inicializar estado del combate 3vs3
    battle3v3State.playerTeam = playerPokes.map(p => ({
      data: p,
      currentHp: 100,
      maxHp: 100,
      fainted: false
    }));

    battle3v3State.rivalTeam = rivalPokes.map(p => ({
      data: p,
      currentHp: 100,
      maxHp: 100,
      fainted: false
    }));

    battle3v3State.activePlayerIndex = 0;
    battle3v3State.activeRivalIndex = 0;
    battle3v3State.isTurnLocked = false;

    updateTeamPokeballIcons();
    setActiveFighters();

    const activeRival = battle3v3State.rivalTeam[0].data;
    const activePlayer = battle3v3State.playerTeam[0].data;
    battleMessage.textContent = `¡EL RIVAL ENVIÓ A ${activeRival.name.toUpperCase()}! ¡ADELANTE ${activePlayer.name.toUpperCase()}!`;
    playPokemonCry(activePlayer);
  }

  function updateTeamPokeballIcons() {
    // Pokéballs Jugador
    const pBalls = playerPokeballs.querySelectorAll('.team-ball');
    battle3v3State.playerTeam.forEach((member, i) => {
      if (pBalls[i]) {
        pBalls[i].className = `team-ball ${member.fainted ? 'fainted' : 'active'}`;
      }
    });

    // Pokéballs Rival
    const rBalls = rivalPokeballs.querySelectorAll('.team-ball');
    battle3v3State.rivalTeam.forEach((member, i) => {
      if (rBalls[i]) {
        rBalls[i].className = `team-ball ${member.fainted ? 'fainted' : 'active'}`;
      }
    });
  }

  async function setActiveFighters() {
    const activePlayerObj = battle3v3State.playerTeam[battle3v3State.activePlayerIndex];
    const activeRivalObj = battle3v3State.rivalTeam[battle3v3State.activeRivalIndex];

    // HUD Rival
    rivalName.textContent = activeRivalObj.data.name.toUpperCase();
    rivalLevel.textContent = `Nv. 50`;
    rivalSprite.src = activeRivalObj.data.sprites?.front_default || '';
    rivalSprite.className = 'battle-sprite float-idle';

    // HUD Jugador
    playerName.textContent = activePlayerObj.data.name.toUpperCase();
    playerLevel.textContent = 'Nv. 50';
    playerSprite.src = activePlayerObj.data.sprites?.back_default || activePlayerObj.data.sprites?.front_default || '';
    playerSprite.className = 'battle-sprite back-sprite float-idle-slow';

    updateHpBars();
    await loadMovesForActivePlayer();
  }

  async function loadMovesForActivePlayer() {
    battleMovesGrid.innerHTML = '<p class="dialog-text blink" style="font-size: 0.58rem;">CARGANDO ATAQUES...</p>';

    const activePlayerObj = battle3v3State.playerTeam[battle3v3State.activePlayerIndex];
    const pokemon = activePlayerObj.data;

    let movesList = [];
    try {
      const res = await fetch(`${API_BASE}/pokemon/${pokemon.id}/`);
      if (res.ok) {
        const data = await res.json();
        if (data.moves && data.moves.length > 0) {
          movesList = data.moves.slice(0, 4).map(m => m.move.name);
        }
      }
    } catch (e) {
      if (pokemon.moves && pokemon.moves.length > 0) {
        movesList = pokemon.moves.slice(0, 4).map(m => m.move.name);
      }
    }

    const fallbackMoves = ['tackle', 'quick-attack', 'headbutt', 'slam'];
    while (movesList.length < 4) {
      movesList.push(fallbackMoves[movesList.length] || 'tackle');
    }

    battleMovesGrid.innerHTML = '';
    movesList.forEach(moveName => {
      const btn = document.createElement('button');
      btn.className = 'move-btn';
      btn.textContent = formatMoveName(moveName);
      btn.addEventListener('click', () => executePlayerAttack(moveName));
      battleMovesGrid.appendChild(btn);
    });
  }

  function updateHpBars() {
    const activePlayerObj = battle3v3State.playerTeam[battle3v3State.activePlayerIndex];
    const activeRivalObj = battle3v3State.rivalTeam[battle3v3State.activeRivalIndex];

    // Barra Rival
    const rivalPercent = Math.max(0, Math.min(100, (activeRivalObj.currentHp / activeRivalObj.maxHp) * 100));
    rivalHpFill.style.width = `${rivalPercent}%`;
    rivalHpFill.style.backgroundColor = rivalPercent > 50 ? 'var(--hp-green)' : rivalPercent > 20 ? 'var(--hp-yellow)' : 'var(--hp-red)';

    // Barra Jugador
    const playerPercent = Math.max(0, Math.min(100, (activePlayerObj.currentHp / activePlayerObj.maxHp) * 100));
    playerHpFill.style.width = `${playerPercent}%`;
    playerHpCurrent.textContent = Math.round(activePlayerObj.currentHp);
    playerHpMax.textContent = activePlayerObj.maxHp;
    playerHpFill.style.backgroundColor = playerPercent > 50 ? 'var(--hp-green)' : playerPercent > 20 ? 'var(--hp-yellow)' : 'var(--hp-red)';
  }

  function executePlayerAttack(moveName) {
    if (battle3v3State.isTurnLocked) return;
    battle3v3State.isTurnLocked = true;

    const activePlayerObj = battle3v3State.playerTeam[battle3v3State.activePlayerIndex];
    const activeRivalObj = battle3v3State.rivalTeam[battle3v3State.activeRivalIndex];

    const formattedMove = formatMoveName(moveName);
    battleMessage.textContent = `¡${activePlayerObj.data.name.toUpperCase()} usó ${formattedMove}!`;
    playPokemonCry(activePlayerObj.data);

    // Embestida
    playerSprite.classList.add('attack-dash-player');
    setTimeout(() => {
      playerSprite.classList.remove('attack-dash-player');
    }, 450);

    setTimeout(() => {
      triggerShake(rivalSprite);

      const damage = Math.floor(Math.random() * 18) + 26;
      showDamageNumber(rivalDamagePopup, damage);
      activeRivalObj.currentHp = Math.max(0, activeRivalObj.currentHp - damage);
      updateHpBars();

      if (activeRivalObj.currentHp <= 0) {
        handleRivalFaint();
        return;
      }

      setTimeout(executeRivalTurn, 1300);

    }, 550);
  }

  function executeRivalTurn() {
    const activePlayerObj = battle3v3State.playerTeam[battle3v3State.activePlayerIndex];
    const activeRivalObj = battle3v3State.rivalTeam[battle3v3State.activeRivalIndex];

    if (activeRivalObj.fainted || activePlayerObj.fainted) return;

    let rivalMoveName = 'tackle';
    if (activeRivalObj.data.moves && activeRivalObj.data.moves.length > 0) {
      const randM = activeRivalObj.data.moves[Math.floor(Math.random() * Math.min(5, activeRivalObj.data.moves.length))];
      rivalMoveName = randM.move.name;
    }
    const formattedRivalMove = formatMoveName(rivalMoveName);

    battleMessage.textContent = `¡El ${activeRivalObj.data.name.toUpperCase()} rival usó ${formattedRivalMove}!`;
    playPokemonCry(activeRivalObj.data);

    rivalSprite.classList.add('attack-dash-rival');
    setTimeout(() => {
      rivalSprite.classList.remove('attack-dash-rival');
    }, 450);

    setTimeout(() => {
      triggerShake(playerSprite);

      const rivalDamage = Math.floor(Math.random() * 16) + 20;
      showDamageNumber(playerDamagePopup, rivalDamage);
      activePlayerObj.currentHp = Math.max(0, activePlayerObj.currentHp - rivalDamage);
      updateHpBars();

      if (activePlayerObj.currentHp <= 0) {
        handlePlayerFaint();
        return;
      }

      setTimeout(() => {
        battleMessage.textContent = `¿Qué debería hacer ${activePlayerObj.data.name.toUpperCase()}?`;
        battle3v3State.isTurnLocked = false;
      }, 700);

    }, 550);
  }

  function handleRivalFaint() {
    const activeRivalObj = battle3v3State.rivalTeam[battle3v3State.activeRivalIndex];
    activeRivalObj.fainted = true;
    updateTeamPokeballIcons();

    setTimeout(() => {
      battleMessage.textContent = `¡El ${activeRivalObj.data.name.toUpperCase()} rival se desmayó!`;
      rivalSprite.classList.remove('float-idle');
      rivalSprite.classList.add('faint');

      // Comprobar si al rival le quedan Pokémon
      const nextRivalIndex = battle3v3State.rivalTeam.findIndex(r => !r.fainted);
      if (nextRivalIndex !== -1) {
        setTimeout(() => {
          battle3v3State.activeRivalIndex = nextRivalIndex;
          const nextRival = battle3v3State.rivalTeam[nextRivalIndex].data;
          battleMessage.textContent = `¡El rival envía a ${nextRival.name.toUpperCase()}!`;
          setActiveFighters();
          playPokemonCry(nextRival);
          battle3v3State.isTurnLocked = false;
        }, 1500);
      } else {
        setTimeout(() => {
          battleMessage.textContent = `¡Derrotaste a los 3 Pokémon del rival! ¡Victoria total en el duelo 3vs3! 🏆`;
          disableMoveButtons(true);
          battleSwitchBtn.disabled = true;
        }, 1000);
      }
    }, 500);
  }

  function handlePlayerFaint() {
    const activePlayerObj = battle3v3State.playerTeam[battle3v3State.activePlayerIndex];
    activePlayerObj.fainted = true;
    updateTeamPokeballIcons();

    setTimeout(() => {
      battleMessage.textContent = `¡${activePlayerObj.data.name.toUpperCase()} cayó debilitado!`;
      playerSprite.classList.remove('float-idle-slow');
      playerSprite.classList.add('faint');

      // Comprobar si al jugador le quedan Pokémon
      const hasAlivePokes = battle3v3State.playerTeam.some(p => !p.fainted);
      if (hasAlivePokes) {
        setTimeout(() => {
          battleMessage.textContent = `¡Elige a tu siguiente luchador!`;
          openSwitchPokemonModal(true); // Obligatorio cambiar
        }, 1200);
      } else {
        setTimeout(() => {
          battleMessage.textContent = `¡Todos tus Pokémon cayeron debilitados! Perdiste el combate 3vs3...`;
          disableMoveButtons(true);
          battleSwitchBtn.disabled = true;
        }, 1000);
      }
    }, 500);
  }

  // ==========================================================================
  // MODAL 3: CAMBIAR DE POKÉMON EN BATALLA
  // ==========================================================================

  function openSwitchPokemonModal(isForced = false) {
    switchPokemonModal.style.display = 'flex';
    switchTeamList.innerHTML = '';

    // Si es forzado (por desmayo), no se puede cerrar con la X
    closeSwitchBtn.style.display = isForced ? 'none' : 'block';

    battle3v3State.playerTeam.forEach((member, index) => {
      const isCurrentActive = index === battle3v3State.activePlayerIndex && !member.fainted;
      const card = document.createElement('div');
      card.className = `switch-poke-card ${isCurrentActive ? 'active-in-battle' : ''} ${member.fainted ? 'fainted' : ''}`;

      const hpPercent = Math.max(0, (member.currentHp / member.maxHp) * 100);

      card.innerHTML = `
        <div class="switch-left">
          <img class="switch-sprite" src="${member.data.sprites?.front_default || ''}" alt="${member.data.name}">
          <div class="switch-info">
            <span class="switch-name">${member.data.name}</span>
            <div class="switch-hp-bar">
              <div class="switch-hp-fill" style="width: ${hpPercent}%;"></div>
            </div>
          </div>
        </div>
        <span class="switch-status-tag">
          ${member.fainted ? 'DEBILITADO' : isCurrentActive ? 'EN BATALLA' : 'CAMBIAR ▶'}
        </span>
      `;

      if (!isCurrentActive && !member.fainted) {
        card.addEventListener('click', () => {
          switchPokemonTo(index, isForced);
        });
      }

      switchTeamList.appendChild(card);
    });
  }

  function switchPokemonTo(newIndex, wasForced = false) {
    switchPokemonModal.style.display = 'none';

    const prevActive = battle3v3State.playerTeam[battle3v3State.activePlayerIndex].data;
    battle3v3State.activePlayerIndex = newIndex;
    const newActive = battle3v3State.playerTeam[newIndex].data;

    if (!wasForced) {
      battleMessage.textContent = `¡Vuelve ${prevActive.name.toUpperCase()}! ¡Adelante ${newActive.name.toUpperCase()}!`;
    } else {
      battleMessage.textContent = `¡Adelante ${newActive.name.toUpperCase()}!`;
    }

    setActiveFighters();
    playPokemonCry(newActive);

    // Si el cambio fue voluntario, el rival ataca en el turno
    if (!wasForced) {
      battle3v3State.isTurnLocked = true;
      setTimeout(executeRivalTurn, 1400);
    } else {
      battle3v3State.isTurnLocked = false;
    }
  }

  function disableMoveButtons(disabled) {
    const moveButtons = battleMovesGrid.querySelectorAll('.move-btn');
    moveButtons.forEach(btn => btn.disabled = disabled);
  }

  function exitBattleMode() {
    battleView.style.display = 'none';
    minigameView.style.display = 'none';
    pokedexView.style.display = 'block';
    pokedexControlsSection.style.display = 'flex';

    navPokedexBtn.classList.add('active');
    navMinigameBtn.classList.remove('active');
  }

  // ==========================================================================
  // MINIJUEGO: "¿QUIÉN ES ESE POKÉMON?"
  // ==========================================================================

  function startMinigame() {
    if (allPokemon.length === 0) return;

    pokedexView.style.display = 'none';
    battleView.style.display = 'none';
    pokedexControlsSection.style.display = 'none';
    minigameView.style.display = 'block';

    navPokedexBtn.classList.remove('active');
    navMinigameBtn.classList.add('active');

    loadMinigameRound();
  }

  function loadMinigameRound() {
    isMinigameLocked = false;
    minigameNextBtn.style.display = 'none';
    minigameMessage.textContent = '¿QUIÉN ES ESE POKÉMON?';
    minigameMessage.style.color = '#181818';

    const correctIndex = Math.floor(Math.random() * allPokemon.length);
    minigameCurrentPokemon = allPokemon[correctIndex];

    minigameSprite.className = 'minigame-sprite silhouette';
    minigameSprite.src = minigameCurrentPokemon.sprites?.front_default || '';

    try {
      whosThatPokemonAudio.currentTime = 0;
      whosThatPokemonAudio.play().catch(err => console.log('Autoplay:', err));
    } catch (e) {
      console.warn('Audio:', e);
    }

    const optionsSet = new Set();
    optionsSet.add(minigameCurrentPokemon.name);

    while (optionsSet.size < 4) {
      const randPoke = allPokemon[Math.floor(Math.random() * allPokemon.length)];
      optionsSet.add(randPoke.name);
    }

    const optionsArray = Array.from(optionsSet).sort(() => Math.random() - 0.5);

    minigameOptions.innerHTML = '';
    optionsArray.forEach(pokeName => {
      const btn = document.createElement('button');
      btn.className = 'minigame-opt-btn';
      btn.textContent = pokeName.toUpperCase();
      btn.addEventListener('click', () => handleMinigameAnswer(pokeName, btn));
      minigameOptions.appendChild(btn);
    });
  }

  function handleMinigameAnswer(selectedName, selectedBtn) {
    if (isMinigameLocked) return;
    isMinigameLocked = true;

    const allButtons = minigameOptions.querySelectorAll('.minigame-opt-btn');
    allButtons.forEach(b => b.disabled = true);

    const isCorrect = selectedName.toLowerCase() === minigameCurrentPokemon.name.toLowerCase();

    minigameSprite.classList.remove('silhouette');
    minigameSprite.classList.add('revealed-glow');
    playPokemonCry(minigameCurrentPokemon);

    if (isCorrect) {
      selectedBtn.classList.add('correct-choice');
      streakScore++;
      if (streakScore > bestScore) {
        bestScore = streakScore;
        minigameBest.textContent = bestScore;
      }
      minigameStreak.textContent = streakScore;
      
      minigameStreak.classList.remove('pop');
      void minigameStreak.offsetWidth;
      minigameStreak.classList.add('pop');

      minigameMessage.textContent = `¡CORRECTO! ¡ES ${minigameCurrentPokemon.name.toUpperCase()}!`;
      minigameMessage.style.color = '#188028';
    } else {
      selectedBtn.classList.add('wrong-choice');
      triggerShake(selectedBtn);
      streakScore = 0;
      minigameStreak.textContent = streakScore;
      minigameMessage.textContent = `¡INCORRECTO! ERA ${minigameCurrentPokemon.name.toUpperCase()}.`;
      minigameMessage.style.color = '#c01818';

      allButtons.forEach(b => {
        if (b.textContent.toLowerCase() === minigameCurrentPokemon.name.toLowerCase()) {
          b.classList.add('correct-choice');
        }
      });
    }

    minigameNextBtn.style.display = 'inline-block';
  }

  // ==========================================================================
  // MODAL 4: CADENAS DE EVOLUCIÓN
  // ==========================================================================

  async function openEvolutionModal(pokemonId) {
    evolutionModal.style.display = 'flex';
    evolutionChainContent.innerHTML = `
      <div class="retro-loader" style="padding: 1rem;">
        <div class="pixel-spinner"></div>
        <p class="loading-text blink" style="font-size: 0.62rem;">CONSULTANDO CADENA EVOLUTIVA...</p>
      </div>
    `;

    try {
      const speciesRes = await fetch(`${API_BASE}/pokemon-species/${pokemonId}/`);
      if (!speciesRes.ok) throw new Error('Error en especies');
      const speciesData = await speciesRes.json();

      const evolutionChainUrl = speciesData.evolution_chain?.url;
      if (!evolutionChainUrl) {
        evolutionChainContent.innerHTML = '<p class="dialog-text">ESTE POKÉMON NO TIENE EVOLUCIONES CONOCIDAS.</p>';
        return;
      }

      const chainRes = await fetch(evolutionChainUrl);
      if (!chainRes.ok) throw new Error('Error en evolución');
      const chainData = await chainRes.json();

      const stages = [];
      function traverse(node) {
        if (!node || !node.species) return;
        const parts = node.species.url.split('/').filter(Boolean);
        const id = parseInt(parts[parts.length - 1], 10);
        stages.push({
          id,
          name: node.species.name,
          spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        });
        if (node.evolves_to && node.evolves_to.length > 0) {
          node.evolves_to.forEach(c => traverse(c));
        }
      }

      traverse(chainData.chain);
      renderEvolutionChain(stages);

    } catch (err) {
      console.error(err);
      evolutionChainContent.innerHTML = '<p class="dialog-text" style="color: #c01818;">ERROR AL CARGAR EVOLUCIONES.</p>';
    }
  }

  function renderEvolutionChain(stages) {
    if (!stages || stages.length === 0) {
      evolutionChainContent.innerHTML = '<p class="dialog-text">NO HAY DATOS DISPONIBLES.</p>';
      return;
    }

    evolutionChainContent.innerHTML = '';
    stages.forEach((stage, index) => {
      if (index > 0) {
        const arrow = document.createElement('span');
        arrow.className = 'evolution-arrow blink';
        arrow.textContent = '➔';
        evolutionChainContent.appendChild(arrow);
      }

      const nodeDiv = document.createElement('div');
      nodeDiv.className = 'evolution-node';
      nodeDiv.innerHTML = `
        <div class="evolution-sprite-frame">
          <img class="evolution-sprite" src="${stage.spriteUrl}" alt="${stage.name}">
        </div>
        <span class="evolution-name">${stage.name}</span>
        <span class="evolution-id">${formatPokemonId(stage.id)}</span>
      `;
      evolutionChainContent.appendChild(nodeDiv);
    });
  }

  function closeEvolutionModal() {
    evolutionModal.style.display = 'none';
    evolutionChainContent.innerHTML = '';
  }

  // ==========================================================================
  // INICIALIZACIÓN DE EVENTOS
  // ==========================================================================

  function initApp() {
    loadAllPokemon();

    // Búsqueda
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('input', performSearch);
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      selectCategory(activeCategory);
    });

    // Paginación
    prevPageBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderCurrentPage();
      }
    });

    nextPageBtn.addEventListener('click', () => {
      const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
      if (currentPage < totalPages) {
        currentPage++;
        renderCurrentPage();
      }
    });

    // Menú Superior
    navPokedexBtn.addEventListener('click', () => {
      battleView.style.display = 'none';
      minigameView.style.display = 'none';
      pokedexView.style.display = 'block';
      pokedexControlsSection.style.display = 'flex';

      navPokedexBtn.classList.add('active');
      navMinigameBtn.classList.remove('active');
    });

    navCustomBattleBtn.addEventListener('click', () => {
      openBattleSetup3v3Modal();
    });

    navMinigameBtn.addEventListener('click', startMinigame);
    minigameNextBtn.addEventListener('click', loadMinigameRound);
    minigameExitBtn.addEventListener('click', () => navPokedexBtn.click());

    // Eventos Modal Comparador
    closeCompareBtn.addEventListener('click', () => { compareModal.style.display = 'none'; });
    compareCloseOkBtn.addEventListener('click', () => { compareModal.style.display = 'none'; });
    compareSelectA.addEventListener('change', updateComparison);
    compareSelectB.addEventListener('change', updateComparison);

    // Eventos Modal Configuración 3vs3
    closeBattleSetupBtn.addEventListener('click', () => {
      battleSetupModal.style.display = 'none';
    });

    teamSelect1.addEventListener('change', update3v3TeamPreviews);
    teamSelect2.addEventListener('change', update3v3TeamPreviews);
    teamSelect3.addEventListener('change', update3v3TeamPreviews);

    rivalSelect1.addEventListener('change', update3v3RivalPreviews);
    rivalSelect2.addEventListener('change', update3v3RivalPreviews);
    rivalSelect3.addEventListener('change', update3v3RivalPreviews);

    rivalModeRandomBtn.addEventListener('click', () => set3v3RivalMode(true));
    rivalModeManualBtn.addEventListener('click', () => set3v3RivalMode(false));

    start3v3FightBtn.addEventListener('click', start3v3Battle);

    // Eventos Modal Cambiar Pokémon en Batalla
    battleSwitchBtn.addEventListener('click', () => openSwitchPokemonModal(false));
    closeSwitchBtn.addEventListener('click', () => { switchPokemonModal.style.display = 'none'; });

    // Evento Huir de Batalla
    battleRunBtn.addEventListener('click', () => {
      battleMessage.textContent = '¡Escapaste sin problemas!';
      setTimeout(exitBattleMode, 650);
    });

    // Eventos Modal Evolución
    closeModalBtn.addEventListener('click', closeEvolutionModal);
    modalOkBtn.addEventListener('click', closeEvolutionModal);

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeEvolutionModal();
        compareModal.style.display = 'none';
        battleSetupModal.style.display = 'none';
        if (closeSwitchBtn.style.display !== 'none') {
          switchPokemonModal.style.display = 'none';
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
