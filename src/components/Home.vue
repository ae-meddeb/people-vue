<template>
  <div class="home">
    <div class="add-form card">
      <form @submit.prevent="handleSubmit">
        <input v-model="newPeople.name" type="text" placeholder="Name" required />
        <input v-model="newPeople.email" type="email" placeholder="Email" required />
        <select v-model="newPeople.department" required>
          <option v-for="dep in departments" :value="dep" :key="dep">
            {{ dep }}
          </option>
        </select>
        <input type="submit" value="Save" />
      </form>
    </div>
    <div class="people-wrap">
      <People v-for="people in peoples" :key="people.id" :p="people" @deleted="handleDelete"/>
    </div>
  </div>
</template>

<script>
import People from './People.vue';
const url = "http://localhost:3000/people";
function getPeople() {
  return fetch(url)
    .then(res => res.json());
}
function addPeople(people) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(people)
  });
}
function deletePeople(peopleId) {
  return fetch(`${url}/${peopleId}`, {
    method: 'DELETE'
  });
}
export default {
  name: "Home",
  components: {
    People
  },
  data() {
    return {
      departments: ["Customer Support", "Engineering", "Sales"],
      peoples: [],
      newPeople: {}
    };
  },
  created() {
    getPeople()
    .then(data => {
      this.peoples = data;
    })
  },
  methods: {
    handleSubmit() {
      const id = Math.max(...this.peoples.map(p => p.id)) + 1;
      const people = {...this.newPeople, id};

      addPeople(people)
        .then(() => {
          this.peoples.unshift(people);
          this.newPeople = {};
        })
      
    },

    handleDelete(id) {
      deletePeople(id)
      .then(() =>{
        this.peoples = this.peoples.filter(people => people.id !== id);
      })
    }
  }
};
</script>

<style scoped>
.add-form input, .add-form select {
  margin-right: 15px;
}

.people-wrap {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap:20px;
}


</style>
