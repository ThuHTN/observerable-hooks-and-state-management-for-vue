import {
  BehaviorSubject,
  combineLatest,
  map,
  mergeMap,
  Observable,
  Subject,
  Subscription,
} from "rxjs";
import { Ref, ref, onMounted, onUnmounted } from "vue";

export function useObserverable<T>(value: T): [Ref, BehaviorSubject<T>] {
  const soruce$ = new BehaviorSubject(value);

  const returnValue = ref<T>();

  subscribe(soruce$, returnValue);

  return [returnValue, soruce$];
}

export function useSubscription<T>(
  source$: BehaviorSubject<T>,
  fn: (e: T) => void
) {
  const firstValue = source$.value;
  const subSource$ = new BehaviorSubject(firstValue).pipe(
    mergeMap(() => source$),
    map((value) => {
      if (firstValue !== value) {
        fn(value);
      }
    })
  );

  subscribe(subSource$);
}

interface Reducers<T> {
  [key: string]: (state: any, payload?: any) => void | any;
}

export function atom<T>(state: {
  default: T;
  reducers?: Reducers<T>;
}): BehaviorSubject<T> {
  const source$ = new BehaviorSubject(state.default);

  return source$;
}

export function useRecoilState<T>(
  soruce$: BehaviorSubject<T>
): [Ref, BehaviorSubject<T> | Subject<T>] {
  const state = ref(null);

  subscribe(soruce$, state);

  return [state, soruce$];
}

export function selector<T>({
  get,
  set,
}: {
  /**
   * @type Array of atoms
   */
  get: Array<BehaviorSubject<any>>;
  /**
   * @template set will reaturn as state
   */
  set: (value: any) => T;
}): BehaviorSubject<T | null> {
  const observables = get;
  const soruce$ = new BehaviorSubject<T | null>(null);

  const combine$ = combineLatest(...observables).pipe(
    map((value) => set([...value]))
  );

  combine$.subscribe(soruce$);

  return soruce$;
}

function subscribe<T>(source$: BehaviorSubject<T> | Observable<T>, ref?: Ref) {
  let subscribe: Subscription;

  onMounted(() => {
    subscribe = source$.subscribe((val) => {
      ref && (ref.value = val);
    });
  });

  onUnmounted(() => {
    subscribe?.unsubscribe();
  });
}
