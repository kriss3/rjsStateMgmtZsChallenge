import { create } from "zustand";


const items = [
    { id: 1, task: "pay bills", done: false },
    { id: 2, task: "buy groceries", done: false },
    { id: 3, task: "learn Redux", done: false },
    { id: 4, task: "learn C#", done: false },
  ];

const useStore = create((set, get) => ({
    list: items,
    all: items,
    filter: 'all',
    
    submit: (item) => {
        set(() => ({
            list: [...get().list, item],
            all: [...get().all, item]
        }));
    },
    
    check: (id) => {
        const all = get().all;
        const updated = all.map((item) => {
            return item.id === id ? { ...item, done: !item.done } : item;
          });
        set(() => ({
            list: updated,
            all: updated
        }));
    },
    
    archive: () => {
        const all  = get().all;
        const list = get().list;

        const all_filtered = all.filter((item) => !item.done);
        const filtered = list.filter((item) => !item.done);

        set(() => ({
            list: filtered,
            all: all_filtered
        }));

    },
    
    setFilter: (option) => {
        set(() => ({
            filter: option
        }));
    }

})); 

export default useStore;