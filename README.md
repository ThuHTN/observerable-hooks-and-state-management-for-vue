# Vue-Observed: Effortless State Management and Observable Hooks

Introducing Vue-Observed, your go-to solution for seamless state management in Vue.js. With Vue-Observed, leverage the power of Observable Hooks to effortlessly observe and manage your application's state. Simplify complex data handling and keep your components in sync with ease. Experience the modern, intuitive approach to state management with Vue-Observed. Empower your Vue.js projects with the flexibility and efficiency they deserve.

## useObserverable
The useObserverable hook allows you to create an observable state with an initial value of a specified type. It returns the current value and a BehaviorSubject, which is used to observe and update the state.

```ts
const [value, source$] = useObserverable<number>(1);

// Update the state when the handleClick function is called
function handleClick(): void {
  source$.next(source$.value + 1);
}

```

## useSubscription
The useSubscription hook enables you to subscribe to changes in a BehaviorSubject and execute a function whenever the value changes.

```ts
const [value, source$] = useObserverable<number>(1);

const count = ref(0);

useSubscription(source$, (e) => {
  console.log(e);
  count.value += 1;
});

```


# Atom Store
The atom function allows you to create an independent BehaviorSubject, which can be used as an atomic state container. It takes an object parameter with a default property representing the initial value of the state.

```ts
import { atom } from "../../hooks";

// Create a store with an initial value of 1
export const fakeStore$ = atom<number>({
  default: 1,
});
```

### Important Note:
- The fakeStore$ is now your store, initialized with the initial value of 1.
- You can use this fakeStore$ throughout your application to manage and observe the state.
Now you have a basic store set up using atom. You can start building your application's state and use the store to manage and synchronize data across components.

## useRecoilState
The useRecoilState hook allows you to access and update the value of a BehaviorSubject (atom). It returns a Vue ref that synchronizes with the BehaviorSubject's value, ensuring the view reflects the state.

```ts
import { useRecoilState, fakeStore$ } from "../../hooks";

const [atomValue, atomSource$] = useRecoilState(fakeStore$);
```

## selector
The selector function allows you to create a derived state by combining multiple BehaviorSubjects (atoms). It takes an object parameter with get and set properties.

```ts
import { selector } from "../../hooks";

// Create a selector that doubles the value of fakeStore$
export const fakeSelector = selector({
  get: [fakeStore$],
  set: ([source$]) => {
    return source$ * 2;
  },
});

const [selectorValue, selectorSource$] = useRecoilState(fakeSelector);
```

### Important Note:
- The fakeSelector is a derived state created by combining the value of fakeStore$ and doubling it.
- The get property of the selector object accepts an array of atoms (in this case, [fakeStore$]).
- The set property is a function that takes the values of the atoms specified in get and computes the derived state.
Now you have a fakeSelector that derives its value from the fakeStore$ atom and doubles it. You can use this derived state throughout your application to observe and manage the state changes.


