import { NgModule } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';
import { StoreModule, combineReducers } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../../../environments/environment';
import { StoreRegistry } from './store.registry';
import { moduleReducers, moduleEffects } from './reducers';

const storeAssets = StoreRegistry.registerReducers(moduleReducers);
const productionReducer = combineReducers(storeAssets.reducers);

const devTools = [];

if (environment.enableStoreDevtools) {
    devTools.push(StoreDevtoolsModule.instrumentOnlyWithExtension());
}

@NgModule({
  imports: [
    StoreModule.provideStore(productionReducer),
    moduleEffects,
    ...devTools,
  ],
  providers: [
    ...storeAssets.actions,
    ActionCreatorFactory,
  ]
})
export class TrStoreModule {}
