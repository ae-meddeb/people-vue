<template>
  <div class="home">
    <div class="add-form card">
      <form @submit.prevent="handleSubmit">
        <input
          v-model="newPeople.name"
          type="text"
          placeholder="Name"
          required
        />
        <input
          v-model="newPeople.email"
          type="email"
          placeholder="Email"
          required
        />
        <DepartmentSelect v-model="newPeople.department" />
        <input type="submit" value="Save" />
      </form>
    </div>
    <div class="card filter">
      <label>Filter by name:</label>
      <input v-model="filterText" type="text" required />
    </div>
    <div class="people-wrap">
      <People
        v-for="people in filtredPeople"
        :key="people.id"
        :people="people"
        @deleted="handleDelete"
        @edited="handleEdit"
      />
    </div>
  </div>
</template>

<script>
import People from "./People.vue";
import DepartmentSelect from "./DepartmentSelect.vue";
import {
  getPeople,
  addPeople,
  deletePeople,
  editPeople,
} from "../services/peopleService";

export default {
  name: "Home",
  components: {
    People,
    DepartmentSelect,
  },
  data() {
    return {
      peoples: [],
      filtredPeople: [],
      newPeople: {},
      filterText: "",
    };
  },
  watch: {
    filterText: function (newValue) {
      this.filtredPeople = this.peoples.filter((p) =>
        p.name.toUpperCase().includes(newValue.toUpperCase())
      );
    },
  },
  created() {
    getPeople().then((data) => {
      this.peoples = data;
      this.filtredPeople = data;
    });
  },
  methods: {
    handleSubmit() {
      const id = Math.max(...this.peoples.map((p) => p.id)) + 1;
      const people = { ...this.newPeople, id };

      addPeople(people).then(() => {
        this.peoples.unshift(people);
        this.newPeople = {};
      });
    },

    handleDelete(id) {
      deletePeople(id).then(() => {
        this.peoples = this.peoples.filter((people) => people.id !== id);
      });
    },

    handleEdit(data) {
      editPeople(data).then(() => {
        this.peoples = this.peoples.map((people) =>
          people.id === data.id ? data : people
        );
      });
    },
  },
};
</script>

<style scoped>
.add-form input,
.add-form select {
  margin-right: 15px;
}

.people-wrap {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.filter {
  margin-top: 20px;
}
.filter label {
  display: inline-block;
  margin-right: 5px;
}
</style>
