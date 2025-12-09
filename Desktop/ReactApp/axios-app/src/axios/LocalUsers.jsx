//LocalUsers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
export default function LocalUsers() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios
      .get("/src/data/Users.json")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  return (
    <div>
      <h1>Local Users</h1>
      {users &&
        users.map((user) => (
          <div key={user.id}>
            <p>
              {user.name} - {user.email}
            </p>
          </div>
        ))}
    </div>
  );
}
