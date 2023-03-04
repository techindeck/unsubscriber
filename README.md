# Unsubscriber

**Unsubscriber for RxJS subscription to unsubscribe.**

Unsubscriber is a simple class to absorb RxJS subscriptions in an array.

Call `unsubscribe()` to unsubscribe all of them, as you would do
in your component library's `unmount`/`onDestroy` lifecycle event.

## Installation

```bash
npm install unsubscriber --save
```

## Angular examples

There are 2 main ways to use the Unsubscriber: the "easy" way and the "add/array" way.

> RxJS supports adding subscriptions to an array of subscriptions. You can then unsubscribe directly from that array. If you prefer this technique with Unsubscriber using the setter syntax below, then use that.

### Technique Setter - Syntax

Example using the `queue` property to collect the subscriptions using a setter.

```ts
export class ExampleComponent implements OnDestroy {
  private bus = new Unsubscriber();

  ...
  this.bus.queue = observable$.subscribe(...);
  this.bus.queue = observable$.subscribe(...);
  this.bus.queue = observable$.subscribe(...);
  ...

  // Unsubscribe all subscription when the component dies/destroyed
  ngOnDestroy() {
    this.bus.unsubscribe();
  }
}
```

### Technique Array/Add - Syntax  

Example using the `.add` technique. This is similar to what RxJS supports out of the box.

```ts
export class ExampleComponent implements OnDestroy {
  private bus = new Unsubscriber();

  ...

  this.bus.add(observable$.subscribe(...)); 

  this.bus.add(observable$.subscribe(...)); 

  // Add multiple subscriptions at the same time
  this.bus.add( 
    observable1$.subscribe(...),
    observable2$.subscribe(...),
    anotherObservable$.subscribe(...)
  ); 

  ...

  // Unsubscribe all subscription when the component dies/destroyed
  ngOnDestroy() {
    this.bus.unsubscribe();
  }
}
```
