<template>
  <div class="container">
    <h3 class="text-center">Catálogo de Pokémon</h3>
    <div class="search-bar">
      <q-input v-model="searchTerm" filled class="q-mt-md" label="Buscar por nombre o número" />
    </div>
    
    <div class="pokemon-list">
      <q-card v-for="pokemon in filteredPokemon" :key="pokemon.id" class="q-mt-md">
        <div class="q-pa-md">
          <div class="row items-center">
            <div class="col-12 col-md-4">
              <div class="pokemon-image-wrapper">
                <img :src="pokemon.spriteUrl" alt="Pokemon Sprite" class="pokemon-image" />
                <img src="../assets/poke.png" alt="Esquina Imagen" class="corner-image" />
                <div class="detail-button-wrapper">
                  <q-btn color="primary" flat @click="goToDetail(pokemon.id)">Ver tarjeta del pokemon</q-btn>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-8">
              <h3>{{ pokemon.name }}</h3>
              <div class="d-flex">
                <div v-for="(type, index) in pokemon.types" :key="index" class="pokemon-type-badge q-mr-sm">
                  <q-badge :label="type" :color="typeColor(type)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </div>

    <div class="pagination-buttons">
      <div class="pagination-button">
        <q-icon name="keyboard_arrow_left" size="24px" class="pagination-icon" :disabled="currentPage === 1" @click="changePage(currentPage - 1)" />
      </div>
      
      <div class="pagination-button">
        <q-icon name="keyboard_arrow_right" size="24px" class="pagination-icon" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchTerm: '',
      pokemonList: [],
      currentPage: 1,
      itemsPerPage: 20,
      filteredPokemonIds: [],
    }
  },
  computed: {
    filteredPokemon() {
      return this.pokemonList
        .filter(pokemon => {
          return this.filteredPokemonIds.includes(pokemon.id) &&
                 (pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                 pokemon.id.toString().includes(this.searchTerm.toLowerCase()));
        })
        .slice(0, this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.pokemonList.length / this.itemsPerPage);
    }
  },
  created() {
    axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151')
      .then(response => {
        this.pokemonList = response.data.results.map(pokemon => ({
          id: pokemon.url.split('/')[6],
          name: pokemon.name,
          spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`,
          types: [],
        }));
        
        this.getPokemonTypes();

        this.filteredPokemonIds = this.pokemonList.map(pokemon => pokemon.id);
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    getPokemonTypes() {
      this.pokemonList.forEach(pokemon => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
          .then(response => {
            const types = response.data.types.map(type => type.type.name);
            pokemon.types = types;
          })
          .catch(error => {
            console.error(error);
          });
      });
    },
    goToDetail(id) {
  this.$router.push({ name: 'detail', params: { id: id.toString() } });
},

    typeColor(type) { 
      switch (type) { 
        case 'grass': 
          return 'green'; 
        case 'fire': 
          return 'red'; 
        case 'water': 
          return 'blue'; 
        case 'electric': 
          return 'yellow'; 
        case 'bug': 
          return 'lime'; 
        case 'normal': 
          return 'brown'; 
        case 'poison': 
          return 'purple'; 
        case 'flying': 
          return 'cyan'; 
        case 'ground': 
          return 'orange'; 
        case 'fighting': 
          return 'pink'; 
        case 'psychic': 
          return 'deep-purple'; 
        case 'rock': 
          return 'amber'; 
        case 'ghost': 
          return 'deep-grey'; 
        case 'ice': 
          return 'light-blue'; 
        case 'dragon': 
          return 'deep-orange'; 
        case 'steel': 
          return 'grey'; 
        case 'fairy': 
          return 'light-pink'; 
        default: 
          return 'gray'; 
      } 
    },
    changePage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;

        this.filteredPokemonIds = this.pokemonList
          .map(pokemon => pokemon.id)
          .filter(id => id >= startIndex + 1 && id <= endIndex);
      }
    },
  },
}
</script>

<style>
.q-card {
  max-width: 400px;
  margin: 0 auto;
}
.q-btn {
  margin-right: 8px;
}

.pokemon-type-badge {
  border-radius: 16px;
  padding: 4px 8px;
  margin-top: 4px;
  margin-right: 4px;
}

.corner-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
}

@media (min-width: 600px) {
  .row {
    flex-wrap: wrap;
  }
}

.search-bar {
  max-width: 400px;
  margin: 0 auto;
}

.pagination-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination-button {
  margin-right: 8px;
}

.pagination-icon {
  cursor: pointer;
  font-size: 200px;
}
.pagination-icon[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
