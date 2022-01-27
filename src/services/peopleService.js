const url = "http://localhost:3000/people";

export function getPeople() {
  return fetch(url).then((res) => res.json());
}

export function addPeople(people) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(people),
  });
}

export function editPeople(people) {
  return fetch(`${url}/${people.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(people),
  });
}

export function deletePeople(peopleId) {
  return fetch(`${url}/${peopleId}`, {
    method: "DELETE",
  });
}
