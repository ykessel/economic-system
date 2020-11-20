# AngularCrud

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

<table mat-table  [dataSource]="dataSource" class="full-width-table" matSort aria-label="Elements">
      <!-- Fecha Column -->
      <ng-container matColumnDef="fecha">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Fecha</th>
        <td mat-cell *matCellDef="let row">{{row.fecha | date}}</td>
        <!-- <td cdk-footer-cell *cdkFooterCellDef> User name </td> -->
      </ng-container>

      <!-- Cuentas Column -->
      <ng-container matColumnDef="cuentas">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Cuentas</th>
        <td mat-cell *matCellDef="let row">{{row.cuentas}}</td>
      </ng-container>

      <!-- Descripcion Column -->
      <ng-container matColumnDef="descripcion">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Descripcion</th>
        <td mat-cell *matCellDef="let row">{{row.descripcion}}</td>
      </ng-container>

      <!-- Debe Column -->
      <ng-container matColumnDef="debe">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Debe(cargo)</th>
        <td mat-cell *matCellDef="let row">{{ row.debe == 0 ? "" : row.debe | currency}}</td>
        <!-- <td cdk-footer-cell *cdkFooterCellDef> {{getTotalDebe() | currency}} </td> -->
      </ng-container>

      <!-- Haber Column -->
      <ng-container matColumnDef="haber">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Haber(abono)</th>
        <td mat-cell *matCellDef="let row">{{row.haber == 0 ? "" : row.haber | currency}}</td>
        <!-- <td cdk-footer-cell *cdkFooterCellDef> {{getTotalHaber() | currency}} </td> -->
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      <!-- <tr mat-footer-row *matFooterRowDef="displayedColumns"></tr> -->
</table>
