<template>
  <form @submit.prevent="saveChanges">
    <div class="people-card card">
      <div class="avatar">{{ avatar }}</div>
      <div v-if="!editMode" class="name">{{ people.name }}</div>
      <input
        v-else
        v-model="newPeople.name"
        type="text"
        placeholder="Name"
        required
      />
      <div v-if="!editMode" class="email">{{ people.email }}</div>
      <input
        v-else
        v-model="newPeople.email"
        type="email"
        placeholder="Email"
        required
      />
      <div v-if="!editMode" class="dep">{{ people.department }}</div>
      <DepartmentSelect v-else v-model="newPeople.department" />
      <div v-if="editMode">
        <button>Save</button>
        <button type="button" @click="editMode = !editMode">Cancel</button>
      </div>
      <div v-else>
        <button type="button" @click="editMode = !editMode">Edit</button>
        <button type="button" @click="handleDelete(people.id)">Delete</button>
      </div>
    </div>
  </form>
</template>

<script>
import DepartmentSelect from "./DepartmentSelect.vue";

export default {
  components: {
    DepartmentSelect,
  },
  props: {
    people: Object,
  },
  data() {
    return {
      editMode: false,
      newPeople: this.people,
    };
  },
  computed: {
    avatar() {
      return this.people?.name.charAt(0);
    },
  },
  methods: {
    handleDelete(id) {
      this.$emit("deleted", id);
    },
    saveChanges() {
      this.editMode = false;
      this.$emit("edited", this.newPeople);
    },
  },
};
</script>

<style scoped>
.people-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.name {
  font-size: 18px;
  font-weight: 700;
}
.email {
  font-size: 14px;
  color: grey;
}
.dep {
  color: rgb(159, 122, 234);
}
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background: lightblue;
  color: white;
  font-size: 24px;
}
button + button {
  margin-left: 5px;
}
</style>
