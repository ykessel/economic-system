import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NavComponent} from './componentes/nav/nav.component';
import {ConceptsComponent} from './componentes/concepts/concepts.component';
import {SearchConceptsComponent} from './componentes/search-concepts/search-concepts.component';
import {LandingComponent} from './componentes/landing/landing.component';

const routes: Routes = [
  {path: '', redirectTo: '/landing', pathMatch: 'full'},
  {path: 'landing', component: LandingComponent},
  {path: 'nav', component: NavComponent, children: [
      {path: 'concepts', component: ConceptsComponent},
      {path: 'search_concepts', component: SearchConceptsComponent},
      {
        path:'economics',
        loadChildren: () => import('./componentes/economics/economics.module').then(m => m.EconomicsModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
