// un archivo .test.js se cooce como suit de pruebas
// es el luegar donde se definen las pruebas unitarias agrupados por tematica

//1. Importar la funcion a probar

import { suma } from "../src/utils/ejemplo.js";

//2. desarrollar las pruebas unitarias con test o it


/* 
    1. Bloque de pruebas unitarias (agrupación por metódo) -> describe
    2. Casos individuales de prueba -> test o it
*/

describe("Pruebas para la función suma...", () => {

    //definir los casos individuales de prueba
    it('caso 1: suma correcta de dos números positivos', () => {
        expect(suma(3, 7)).toBe(10);
    });

    it('caso 2: suma correcta de número positivo y cero', () => {
        expect(suma(5, 0)).toBe(5);
    });

    it('caso 3: suma correcta de dos números negativos', () => {
        expect(suma(-4, -6)).toBe(-10);
    });

});    