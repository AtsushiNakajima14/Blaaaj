const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const pokemonInfo = document.getElementById('pokemon-info');
const toggle = document.getElementById('theme-toggle');

toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLightMode = document.body.classList.contains('light-mode');
    toggle.innerHTML = isLightMode ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    localStorage.setItem('lightMode', isLightMode);
});

// local storage
const savedTheme = localStorage.getItem('lightMode');
if (savedTheme === 'true') {
    document.body.classList.add('light-mode');
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
}

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const pokemonName = searchInput.value.toLowerCase();
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const data = await response.json();
        display(data);
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
            confirmButtonColor: getComputedStyle(document.body).getPropertyValue('--primary-color'),
            timer: 3000,
            timerProgressBar: true,
            background: getComputedStyle(document.body).getPropertyValue('--card-bg'),
            color: getComputedStyle(document.body).getPropertyValue('--text-color')
        });
        pokemonInfo.classList.add('hidden');
    }
});

function display(pokemon) {
    const types = pokemon.types.map(type => `<span class="type ${type.type.name}">${type.type.name}</span>`).join(' ');
    const abilities = pokemon.abilities.map(ability => ability.ability.name).join(', ');
    const moves = pokemon.moves.slice(0, 5).map(move => move.move.name).join(', ');
    const pika = document.querySelector('.pikachu-container');
    pika.style.animation = 'none';
    pika.offsetHeight;
    pika.style.animation = 'bounce 2s infinite, glow 2s infinite alternate';

    pokemonInfo.innerHTML = `
        <h2 class="pokemon-name">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" class="pokemon-image">
        <div class="info-row"><i class="fas fa-hashtag"></i><strong>ID:</strong> #${pokemon.id.toString().padStart(3, '0')}</div>
        <div class="info-row"><i class="fas fa-dna"></i><strong>Types:</strong> ${types}</div>
        <div class="info-row"><i class="fas fa-ruler-vertical"></i><strong>Height:</strong> ${pokemon.height / 10} m</div>
        <div class="info-row"><i class="fas fa-weight"></i><strong>Weight:</strong> ${pokemon.weight / 10} kg</div>
        <div class="info-row"><i class="fas fa-magic"></i><strong>Abilities:</strong> ${abilities}</div>
        <div class="info-row"><i class="fas fa-fist-raised"></i><strong>Moves (first 5):</strong> ${moves}</div>
    `;

    const infoRows = pokemonInfo.querySelectorAll('.info-row');
    infoRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            row.style.transition = 'all 0.5s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, index * 150);
    });

    pokemonInfo.classList.remove('hidden');

    const pokemonName = pokemonInfo.querySelector('.pokemon-name');
    pokemonName.style.opacity = '0';
    pokemonName.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        pokemonName.style.transition = 'all 0.5s ease';
        pokemonName.style.opacity = '1';
        pokemonName.style.transform = 'translateY(0)';
    }, 100);

    const pokemonImage = pokemonInfo.querySelector('.pokemon-image');
    pokemonImage.style.opacity = '0';
    pokemonImage.style.transform = 'scale(0.8)';
    setTimeout(() => {
        pokemonImage.style.transition = 'all 0.8s ease';
        pokemonImage.style.opacity = '1';
        pokemonImage.style.transform = 'scale(1)';
    }, 300);
}

const pika = document.querySelector('.pikachu-container');
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const windowWidth = window.innerWidth;
    if (mouseX > windowWidth * 0.7) {
        pika.style.transform = 'translateX(-20px) rotate(-10deg)';
    } else {
        pika.style.transform = 'translateX(0) rotate(0deg)';
    }
});

// responsive 
function adjust() {
    const width = window.innerWidth;
    if (width < 400) {
        document.body.style.fontSize = '14px';
    } else if (width < 600) {
        document.body.style.fontSize = '16px';
    } else {
        document.body.style.fontSize = '18px';
    }
}

window.addEventListener('resize', adjust);
adjust();

// colors
const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
};

Object.entries(typeColors).forEach(([type, color]) => {
    const style = document.createElement('style');
    style.textContent = `
        .type.${type} {
            background-color: ${color};
            color: white;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
        }
    `;
    document.head.appendChild(style);
});

// parallax fx
window.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    document.body.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
});

const seachC = document.getElementById('search-form');
searchInput.style.transform = 'translate(0, 0)';
const searchButton = document.getElementById('search-button');
seachC.addEventListener('mousemove', (e) => {
    const boundingRect = seachC.getBoundingClientRect();
    const x = e.clientX - boundingRect.left;
    const y = e.clientY - boundingRect.top;
    const centerX = boundingRect.width / 2;
    const centerY = boundingRect.height / 2;
    const moveX = (x - centerX) / 10;
    const moveY = (y - centerY) / 10;

    searchInput.style.transform = `translate(${moveX}px, ${moveY}px)`;
    searchButton.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

seachC.addEventListener('mouseleave', () => {
    searchInput.style.transform = 'translate(0, 0)';
    searchButton.style.transform = 'translate(0, 0)';
});

const container = document.querySelector('.container');
setInterval(() => {
    container.style.boxShadow = '0 0 30px rgba(var(--accent-color), 0.5)';
    setTimeout(() => {
        container.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.3)';
    }, 500);
}, 3000);

function silhouettes() {
    const silhouettes = [
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png', // pikachu
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png', // charmander
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png', // squirtle
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png', // bulbasaur
    ];

    const positions = [
        { top: '5%', left: '5%' },
        { top: '5%', right: '5%' },
        { bottom: '5%', left: '5%' },
        { bottom: '5%', right: '5%' },
    ];

    silhouettes.forEach((silhouette, index) => {
        const img = document.createElement('img');
        img.src = silhouette;
        img.classList.add('pokemon-silhouette');
        img.style.width = '150px';
        img.style.height = '150px';
        img.style.position = 'fixed';
        Object.assign(img.style, positions[index]);
        img.style.animationDelay = `${index * 1.5}s`;
        document.body.appendChild(img);
    });
}

silhouettes();

