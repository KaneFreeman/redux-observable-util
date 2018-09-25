import { mergeMap } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';

import { combineEpics, ofType, Epic } from 'redux-observable';
import { AnyAction } from 'redux';

import { getEpicMetadataEntries } from './epic';

export function generateEpics(...epicSources: any[]) {
  const epicObservables: Epic<AnyAction, AnyAction, void, any>[] = [];

  epicSources.forEach(epicSource => {
    // If class reference was passed, initialize.
    if (typeof epicSource === 'function') {
      epicSource = Object.create(epicSource.prototype);
    }

    const metaData = getEpicMetadataEntries(epicSource);
    metaData.forEach(epic =>
      epicObservables.push((action$, store) => {
        return action$.pipe(
          ofType(epic.type),
          mergeMap(action => {
            return Observable.create((observer: Observer<AnyAction>) => {
              const fn = (epicAction: AnyAction) => {
                observer.next(epicAction);
                observer.complete();
              };

              const response: void | Promise<AnyAction> = epicSource[epic.propertyName](action, store);
              if (response) {
                response.then(fn).catch(fn);
              }
            });
          }));
      }));
  });

  return combineEpics(...epicObservables);
}
