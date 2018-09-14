# redux-observable-util
[![npm version](https://badge.fury.io/js/redux-observable-util.svg)](https://badge.fury.io/js/redux-observable-util) [![CircleCI](https://circleci.com/gh/KaneFreeman/redux-observable-util.svg?style=shield)](https://circleci.com/gh/KaneFreeman/redux-observable-util)

Redux Observable Util is a helper library for using [Redux](https://redux.js.org/) and [Redux Observable](https://redux-observable.js.org/) in [TypeScript](https://www.typescriptlang.org/). It contains some helper functions and a simplified Epic setup.

## Table of Contents

  * [Known Issues](#known-issues)
  * [Requirements](#requirements)
  * [Defining Redux Observable Epics](#defining-redux-observable-epics)
    * [Before](#before)
    * [After](#after)
  * [Configuring Epics in Store](#configuring-epics-in-store)
    * [Before](#before-1)
    * [After](#after-1)

## Peer Dependencies

|Module|Version|
|---|---|
|redux|^4.0.0"|
|redux-observable|^1.0.0"|
|rxjs|^6.0.0"|

## Defining Redux Observable Epics

Redux Observable Util simplifies the setup for defining an epic, cleaning up the code for readability.

### Before
```typescript
somethingEpic = (action$, state$) =>
  action$.pipe(
    ofType('SOMETHING'),
    switchMap(() =>
      // Add logic

      return { type: 'SUCCESS', something: 'something' };
    )
  );
```

### After

```typescript
@NgEpic('SOMETHING')
somethingEpic(action: AnyAction, state$: any) {
  // Add logic

  return { type: 'SUCCESS', something: 'something' };
}
```

### Configuring Epics in Store

Configuration of the epics is also simplified compared to the standard setup of Redux Observable. You call the generateEpics instead of combineEpics, and pass the services that contain @NgEpic decorators.

### Before

```typescript
const epicMiddleware = createEpicMiddleware();
export const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(combineEpics(Service.epic1, Service.epic2));
```

### After

```typescript
const epicMiddleware = createEpicMiddleware();
export const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(generateEpics(Service));
```
