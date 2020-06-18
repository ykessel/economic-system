import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './model/hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];

    const concepts = [
      { title: 'Acciones autorizadas', content: 'Número de acciones comunes que el acta constitutiva de una empresa le permite emitir.' },
      { title: 'acciones comunes', content: 'La forma más sencilla y básica de participación corporativa. (Capítulo 1)' },
      { title: 'acciones comunes sin derecho a voto', content: 'Acciones comunes que no tienen ningún derecho a voto; se emiten cuando la empresa desea conseguir capital a través de la venta de acciones comunes, pero no quiere renunciar al control de sus votos. (Capítulo 7)' },
      { title: 'acciones de participación amplia', content: ' Acciones comunes de una compañía en propiedad de muchos inversionistas individuales o institucionales no relacionados. (Capítulo 7)' },
      { title: 'acciones de voto plural', content: ' Acciones que conllevan múltiples votos por acción en lugar del voto único por acción al que generalmente tienen derecho las acciones comunes regulares. (Capítulo 7)' },
      { title: 'acciones emitidas', content: ' Acciones comunes que se han puesto en circulación; es la suma de las acciones en circulación y las acciones en tesorería. (Capítulo 7) ' },
      { title: 'acciones en circulación', content: ' Acciones comunes emitidas que están en manos de los inversionistas, incluyendo inversionistas públicos y privados. (Capítulo 7) ' },
      { title: 'acciones en tesorería', content: ' Acciones comunes emitidas que permanecen en manos de la empresa; estas acciones con frecuencia fueron readquiridas por la compañía. (Capítulo 7) ' },
      { title: 'acciones infravaloradas', content: ' Acciones vendidas a un precio menor que su precio actual de mercado, P0. (Capítulo 9) ' },
      { title: 'acciones por desempeño', content: 'Acciones que se otorgan a la administración por cumplir con las metas de desempeño establecidas. (Capítulo 1) ' },
      { title: 'acciones preferentes', content: ' Forma especial de participación que tiene un dividendo periódico fijo, cuyo pago debe realizarse antes de pagar cualquier dividendo a los accionistas comunes. (Capítulo 2) ' },
      { title: 'acciones preferentes acumulativas', content: ' Acciones preferentes a las que se deben pagar todos los dividendos atrasados(adeudados), junto con el dividendo actual, antes de pagar dividendos a los accionistas comunes. (Capítulo 7) ' },
      { title: 'acciones preferentes con valor a la par', content: ' Acciones preferentes con un valor nominal establecido que se usa con el porcentaje de dividendos específico para determinar el dividendo anual en dólares. (Capítulo 7) ' },
      { title: 'acciones preferentes no acumulativas', content: ' Acciones preferentes que no acumulan dividendos no pagados(adeudados). (Capítulo 7) ' },
      { title: 'acciones preferentes rescatables', content: ' Una acción preferente rescatable permite al emisor retirarla dentro de cierto periodo y a un precio especificado. (Capítulo 7)' },
      { title: 'acciones preferentes sin valor a la par', content: ' Acciones preferentes sin un valor nominal establecido, pero que tienen un dividendo anual expresado en dólares. (Capítulo 7) ' },
      { title: 'acciones privadas', content: ' Las acciones comunes de una firma que son propiedad de inversionistas privados; estas acciones no se negocian en la bolsa. (Capítulo 7) ' },
      { title: 'acciones públicas', content: ' Las acciones comunes de una compañía que son propiedad de inversionistas públicos; estas acciones se negocian en la bolsa. (Capítulo 7) ' },
      { title: 'accionistas', content: ' Los dueños de una corporación cuya propiedad o patrimonio se demuestra con acciones comunes o preferentes. (Capítulo 1) ' },
      { title: 'activos corrientes', content: 'Activos a corto plazo que se espera que se conviertan en efectivo en un periodo de un año o menos. (Capítulo 3)' },
      { title: 'administración de las cuentas por pagar', content: ' Administración por parte de la compañía del tiempo que transcurre entre la compra de materias primas y el envío de su pago por correo al proveedor. (Capítulo 15) ' },
      { title: 'administración del capital de trabajo (o administración financiera a corto plazo)', content: ' Administración de los activos y pasivos corrientes. (Capítulo 14)' },
      { title: 'administración financiera', content: ' Este concepto se refiere a las tareas del gerente financiero de la empresa. (Capítulo 1) ' },
      { title: 'amortización del préstamo', content: ' Determinación de los pagos iguales y periódicos del préstamo que son necesarios para brindar a un prestamista un rendimiento de interés específico y para reembolsar el principal del préstamo en un periodo determinado. (Capítulo 5) ' },
      { title: 'análisis de costos y beneficios marginales', content: ' Principio económico que establece que deben tomarse decisiones financieras y llevarse a cabo acciones solo cuando los beneficios adicionales excedan los costos adicionales. (Capítulo 1) ' },
    ];
    return { heroes, concepts };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}