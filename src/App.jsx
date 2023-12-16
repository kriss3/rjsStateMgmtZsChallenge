import { useRef, useMemo } from "react";

import useStore from "./store";
import "./App.css";

const styles = {
  container: {
    width: "40%",
    margin: "0 auto",
    background: "#ecf0f1",
    borderRadius: "4px",
  },
  item_done: {
    textDecoration: "line-through",
    color: "gray",
    fontStyle: "italic",
  },
};

const Header = () => {

  const { all } = useStore();
  const count = useMemo(() => {
    if (!all.length) {
      return false;
    }
    return all.length > 1 ? `${all.length} items` : `${all.length} item`;
  }, [all]);

  return (
    <div className="p-4">
      <h1>Todos</h1>
      <p>{count}</p>
    </div>
  );
};

const Footer = () => {

  const { all, setFilter, archive } = useStore();

  const isVisible = useMemo(() => {
    return all.some((item) => item.done);
  }, [all]);

  return (
    <div className="d-flex justify-content-between p-2" style={{ background: "#bdc3c7" }}>
      <form
        className="d-flex justify-content-start align-self-center"
        style={{ height: "auto" }}
        onChange={(e) => setFilter(e.target.value)}
      >
        <input
          className="form-check-input"
          value="all"
          type="radio"
          name="radioFilter"
          id="flexRadioDefault1"
        />
        <label className="form-check-label">
          &nbsp; all &nbsp;
        </label>

        <input
          className="form-check-input"
          value="active"
          type="radio"
          name="radioFilter"
          id="flexRadioDefault2"
        />
        <label className="form-check-label">
          &nbsp; active &nbsp;
        </label>

        <input
          className="form-check-input"
          value="completed"
          type="radio"
          name="radioFilter"
          id="flexRadioDefault3"
        />
        <label className="form-check-label">
          &nbsp; completed &nbsp;
        </label>
      </form>
      
      <button
        onClick= {archive}
        className = "btn btn-sm btn-danger"
        style={{ visibility: isVisible ? "visible" : "hidden" }}
      >
        clear completed
      </button>
    </div>
  );
};

const Form = () => {

  const ref = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      return false;
    }
    const newItem = {
      id: new Date().getMilliseconds(),
      task: input,
      done: false,
    };
    setAll([...all, newItem]);
    setList([...items, newItem]);
    setInput("");
    ref.current.value = null;
  };

  const archive = () => {
    const all_filtered = all.filter((item) => !item.done);
    const filtered = list.filter((item) => !item.done);
    setList(filtered);
    setAll(all_filtered);
  };

  return(
    <form onSubmit={onSubmit} className="mb-4 px-4">
        <input
          ref={ref}
          className="form-control mb-4"
          type="text"
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
  );
};

const List = () => {

  const { check, all, filter } = useStore();

  const allItems = useMemo(() => {
    if (filter === "completed") {
      return all.filter((item) => item.done);
    }
    if (filter === "active") {
      return all.filter((item) => !item.done);
    }
    return all;
  }, [filter, all]);

  return(
    <ul className="px-5">
      {allItems.map((item) => (
        <li key="id"
          style={item.done ? styles.item_done : {}}
          onClick={() => check(item.id)}
        >
          {item.task}
        </li>
      ))}
    </ul>
  );
};

function App() {

  return (
    <div className="mt-5" style={styles.container}>
      <Header />
      
      <Form />
      
      <List />

      <Footer />
    </div>
  );
}

export default App
