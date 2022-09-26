import { atom, selector } from "../../hooks";

export const fakeStore$ = atom<number>({
  default: 1,
});

export const fakeSelector = selector({
  get: [fakeStore$],
  set: ([source$]) => {
    return source$ * 2;
  },
});
