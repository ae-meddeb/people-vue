<template>
  <div class="home">
    <div class="add-form card">
      <form>
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="button" value="Save" />
      </form>
    </div>
    <div class="people-wrap">
      <div class="people-card card">
        <div class="avatar">A</div>
        <div class="name">Alaa</div>
        <div class="email">alaa@gmail.com</div>
        <div class="dep">Engineering</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      departments: ["Customer Support", "Engineering", "Sales"],
    };
  },
};
</script>

<style scoped>
.add-form input {
  margin-right: 15px;
}

.people-wrap {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.people-card {
  display: flex;
  flex-direction: column;
  align-items: center;
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
