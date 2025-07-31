import { create } from "zustand";

type OrderBy = "desc" | "asc";

interface IUseFilterResume {
    search: string | null;
    onSearch: (s: string | null) => void;
    orderBy: OrderBy;
    setOrderBy: (o: OrderBy) => void;
}

export const useFilterResume = create<IUseFilterResume>((set) => ({
    search: null,
    onSearch: (search) => set({ search }),
    orderBy: "desc",
    setOrderBy: (o) => set({ orderBy: o }),
}));
