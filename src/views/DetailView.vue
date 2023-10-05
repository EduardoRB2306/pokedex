<template>
    <div class="q-pa-md">
      <q-card class="pokemon-card">
        <q-card-section class="row justify-center items-center">
          <q-img :src="pokemon.spriteUrl" alt="Pokemon Sprite" class="avatar q-mr-sm" />
          <div>
            <h3 class="pokemon-name text-center">{{ pokemon.name }}</h3>
            <div class="pokemon-types-container text-center">
              <div v-for="type in pokemon.types" :key="type" :class="['pokemon-type', 'pokemon-type-' + type]">
                <p class="pokemon-type-name">{{ type }}</p>
              </div>
            </div>
          </div>
        </q-card-section>
  
        <q-separator dark />
  
        <q-card-section class="row items-center">
          <div class="pokemon-stats-container" v-for="stat in pokemon.stats" :key="stat.name">
            <p class="pokemon-stat-name">{{ stat.name }}:</p>
            <div class="pokemon-progress-container q-pr-sm">
              <div class="progress-bar">
                <div class="progress" :style="{width: stat.value + '%'}"></div>
              </div>
            </div>
            <p class="pokemon-stat-value">{{ stat.value }}</p>
          </div>
        </q-card-section>
      </q-card>
  
      <div class="q-mt-md">
        <q-btn @click="goBack" label="Regresar" color="primary" />
      </div>
    </div>
  </template>
  
  <style>
  .pokemon-card {
    background-color: #dfdfdf;
    color: black;
  }
  
  .pokemon-name {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
  }
  
  .pokemon-types-container {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
  
  .pokemon-type {
    background-color: #f0f0f0;
    border-radius: 4px;
    padding: 4px 8px;
    margin-right: 5px;
  }
  
  .pokemon-type-name {
    font-weight: bold !important;
  }
  
  .pokemon-type.normal {
    background-color: #a8a878;
  }
  
  .pokemon-stats-container {
    flex: 1;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .pokemon-stat-name {
    font-weight: bold;
    margin-right: 10px;
  }
  
  .pokemon-progress-container {
    flex: 1;
    margin-right: 10px;
  }
  
  .pokemon-stat-value {
    font-weight: bold;
  }
  
  .progress-bar {
    width: 200px;
    height: 8px;
    background-color: #ccc;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .progress {
    height: 100%;
    background-color: #00cc00;
  }
  
  @media (max-width: 576px) {
    .pokemon-card {
      padding: 16px;
    }
  
    .pokemon-name {
      font-size: 1rem;
    }
  
    .pokemon-types-container {
      margin-bottom: 8px;
    }
  
    .pokemon-type {
      padding: 2px 4px;
      margin-right: 3px;
    }
  
    .pokemon-stat-name {
      font-size: 0.8rem;
      margin-right: 5px;
    }
  
    .pokemon-stat-value {
      font-size: 0.8rem;
    }
  
    .progress-bar {
      width: 100px;
      height: 6px;
    }
  }
  </style>
  
  <script>
  import axios from 'axios';
  import { QCard, QCardSection, QImg, QLinearProgress, QSeparator } from 'quasar';
  
  export default {
    components: {
      QCard,
      QCardSection,
      QImg,
      QLinearProgress,
      QSeparator,
    },
    data() {
      return {
        pokemon: {},
      };
    },
    created() {
      const pokemonId = this.$route.params.id;
  
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => {
          this.pokemon = {
            id: pokemonId,
            name: response.data.name,
            spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
            types: response.data.types.map(type => type.type.name),
            stats: response.data.stats.map(stat => ({
              name: stat.stat.name,
              value: stat.base_stat,
            })),
          };
        })
        .catch(error => {
          console.error(error);
        });
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
    },
  };
  </script>
  