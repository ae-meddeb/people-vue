<template>
    <div class="people-card card">
        <div class="avatar">{{p.name && p.name.charAt(0)}}</div>
        <div class="name">{{p.name}}</div>
        <div class="email">{{p.email}}</div>
        <div class="dep">{{p.department}}</div>
        <div>
          <button>Edit</button>
          <button @click="handleDelete(p.id)">Delete</button>
        </div>
      </div>
</template>

<script>
export default {
    props: {
        p: Object
    },
    methods: {
        handleDelete(id) {
            this.$emit('deleted', id);
        }
    }
}
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
</style>