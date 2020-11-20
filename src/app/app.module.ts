import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

// Servicios
import {ConceptService} from './servicios/concept.service';
import {CuentasService} from './servicios/cuentas.service';
import {TransaccionesService} from './servicios/transacciones.service';

// Core
import {MessagesComponent} from './core/messages/messages.component';

// Shared
// import {SharedModule} from './shared/shared.module';

// Componentes
import {AppComponent} from './app.component';
import {NavComponent} from './componentes/nav/nav.component';
import {ConceptsComponent} from './componentes/concepts/concepts.component';
import {SearchConceptsComponent} from './componentes/search-concepts/search-concepts.component';
import {LandingComponent} from './componentes/landing/landing.component';
import {CuentasComponent} from './componentes/economics/cuentas/cuentas.component';
import {TransaccionesComponent} from './componentes/economics/transacciones/transacciones.component';
import {LibroDiarioComponent} from './componentes/economics/libro-diario/libro-diario.component';
import {LibroMayorComponent} from './componentes/economics/libro-mayor/libro-mayor.component';
import {EstadosFinancierosComponent} from './componentes/economics/estados-financieros/estados-financieros.component';
import {BalanzaComponent} from './componentes/economics/balanza/balanza.component';



// Modules
import {EconomicsModule} from './componentes/economics/economics.module';


// Material Modules
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {MatOptionModule, MatRippleModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';


// the second parameter 'fr' is optional
registerLocaleData(localeEs, 'es');

// noinspection AngularInvalidImportedOrDeclaredSymbol
@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    ConceptsComponent,
    SearchConceptsComponent,
    NavComponent,
    LandingComponent,
    CuentasComponent,
    TransaccionesComponent,
    LibroDiarioComponent,
    LibroMayorComponent,
    EstadosFinancierosComponent,
    BalanzaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EconomicsModule,
    // Material Modules
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDividerModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSliderModule,
    MatRippleModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatGridListModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatStepperModule,
    MatSliderModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatOptionModule,
    MatSelectModule,
    MatChipsModule,
    MatDialogModule,
    MatRadioModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [ConceptService, CuentasService, TransaccionesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
