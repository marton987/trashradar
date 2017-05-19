import { NgModule } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';
import { StoreModule, combineReducers, ActionReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../../../environments/environment';
import { StoreRegistry } from './store.registry';
import { moduleReducers, moduleEffects, AppState } from './reducers';
import { AuthActions } from '../auth';

const storeAssets = StoreRegistry.registerReducers(moduleReducers);
const productionReducer = combineReducers(storeAssets.reducers);
// Required for AOT to work.
export function appReducer(state: any,  action: any) {
  return productionReducer(state, action);
};

const devTools = [];
if (environment.enableStoreDevtools) {
    devTools.push(StoreDevtoolsModule.instrumentOnlyWithExtension());
}

@NgModule({
  imports: [
    StoreModule.provideStore(appReducer),
    moduleEffects,
    ...devTools,
  ],
  providers: [
    ...StoreRegistry.actions,
    ActionCreatorFactory,
  ]
})
export class TrStoreModule {}
