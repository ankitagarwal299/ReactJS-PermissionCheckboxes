import React, { useState } from "react";

import "./styles.css";

/***
 *
 * A practical react example using maps for permission checkboxes (good interview practice problem)
 * https://www.youtube.com/watch?v=t7Vfu5pTm7Y
 */

class Node {
  read;
  write;
  delete;
  constructor(permission) {
    this.read = permission.read;
    this.write = permission.write;
    this.delete = permission.delete;
  }
}

export default function App() {
  const [permissions, setPermission] = useState([
    {
      label: "t1",
      read: false,
      write: false,
      delete: false
    },
    {
      label: "t2",
      read: false,
      write: false,
      delete: false
    },
    {
      label: "t3",
      read: false,
      write: false,
      delete: false
    },
    {
      label: "t4",
      read: false,
      write: false,
      delete: false
    }
  ]);

  function handlePermission(p, index) {
    console.log(p);
    let modifyPermission = permissions.map((item) => {
      if (item.label === p.label) {
        return { ...item, ...p };
      }

      return item;
    });

    setPermission(modifyPermission);
  }

  function handleSubmit(e) {
    e.preventDefault();

    let modified = permissions.map((p) => new Node(p));
    console.log(modified);
  }

  return (
    <div className="App">
      <h1>Permission Checkbox</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          justifyItems: "center"
        }}
      >
        <span></span>
        <span>Read</span>
        <span>Write</span>
        <span>Delete</span>
        {permissions.map((row, index) => {
          return (
            <CheckboxRow
              label={row.label}
              permission={row}
              key={index}
              setPermission={(p) => handlePermission(p, index)}
            />
          );
        })}
      </div>
      <button type="click" onClick={(e) => handleSubmit(e)}>
        Submit
      </button>
    </div>
  );
}

// CheckboxRow component
function CheckboxRow({ label, permission, setPermission }) {
  function handleDeleteChange(e) {
    if (e.target.name === "delete" && e.target.checked) {
      setPermission({ ...permission, read: true, write: true, delete: true });
    } else {
      setPermission({ ...permission, [e.target.name]: e.target.checked });
    }
  }

  function handleNonDeleteChange(e) {
    if (e.target.checked) {
      setPermission({
        ...permission,
        [e.target.name]: e.target.checked
      });
    } else {
      setPermission({
        ...permission,
        [e.target.name]: e.target.checked,
        delete: false
      });
    }
  }

  return (
    <>
      {label}
      <input
        type="checkbox"
        name="read"
        checked={permission.read}
        onChange={(e) => handleNonDeleteChange(e)}
      />
      <input
        type="checkbox"
        name="write"
        checked={permission.write}
        onChange={(e) => handleNonDeleteChange(e)}
      />
      <input
        type="checkbox"
        name="delete"
        checked={permission.delete}
        onChange={(e) => handleDeleteChange(e)}
      />
    </>
  );
}
