<template>
  <div class="profile-container">
    <header class="profile-header">
      <router-link to="/"><button class="back-button">Regresar</button>
      </router-link>
      <img class="profile-picture" src="../assets/IMG_0015.png" alt="Perfil de usuario" />
    <h1 class="profile-heading">Eduardo Ramirez Bello</h1>
    </header>
    <div class="profile-details">
      <p><strong>Email:</strong> eduardoramirezbello2306@gmail.com</p>
      <p><strong>Celular:</strong> 55-22-76-78-46</p>
      <p><strong>Domicilio:</strong> Catedral Metropolitana 98</p>
      <p><strong>Ciudad:</strong> Ciudad Nezahualcoyotl</p>
      <p><strong>Estado:</strong> Estado de México</p>
      <p><strong>Edad:</strong> 23</p>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.profile-header {
  display: contents;
  align-items: center;
  margin-bottom: 20px;
}

.profile-picture {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin-right: 10px;
}

.profile-heading {
  font-size: 24px;
}

.profile-details {
  margin-top: 20px;
}

.profile-details p {
  margin-bottom: 10px;
}

.back-button {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>
