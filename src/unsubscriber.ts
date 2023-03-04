export interface SubscribableInterface {
  unsubscribe(): void;
}

export type Nullable<T> = T | null | undefined;

/**
 * Unsubscriber that holds Observable subscriptions
 * until you call unsubscribe on it in ngOnDestroy.
 */
export class Unsubscriber {
  private _subscriptions: Nullable<SubscribableInterface>[] = [];

  /**
   * Unsubscriber that holds Observable subscriptions
   * until you call unsubscribe on it in ngOnDestroy.
   *
   * @example
   * In Angular:
   * ```
   *   private bus = new Unsubscriber();
   *   ...
   *   this.bus.queue = observable$.subscribe(...)
   *   this.bus.add(observable$.subscribe(...));
   *   ...
   *   ngOnDestroy() {
   *     this.bus.unsubscribe();
   *   }
   * ```
   */
  constructor() {}

  /**
   * Add subscriptions to the tracked queue
   * @example
   *  this.bus.add(observable$.subscribe(...));
   */
  add(...subs: Nullable<SubscribableInterface>[]): void {
    this._subscriptions = this._subscriptions.concat(subs);
  }

  /**
   * Assign subscription to this queue to add it to the tracked subscriptions
   * @example
   *  this.bus.queue = observable$.subscribe(...);
   */
  set queue(sub: Nullable<SubscribableInterface>) {
    this._subscriptions.push(sub);
  }

  /**
   * Unsubscribe to all subscriptions in ngOnDestroy()
   * @example
   *   ngOnDestroy() {
   *     this.bus.unsubscribe();
   *   }
   */
  unsubscribe() {
    this._subscriptions.forEach(
      (sub) => sub && typeof sub.unsubscribe === "function" && sub.unsubscribe()
    );

    this._subscriptions = [];
  }
}
