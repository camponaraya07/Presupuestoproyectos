# Gestión de obras

App de una sola página para gestionar obras: proyectos, catálogo, presupuestos (con versiones), listado de materiales, albaranes de compra, facturas (con rectificativas y cobros), contabilidad y control de margen. Incluye datos del emisor y del cliente, logotipo, códigos de barras (generar y leer desde foto) y dictado por voz y descarga en PDF de presupuestos, facturas y albaranes (jsPDF desde cdnjs, requiere conexión).

## Uso
Abre `index.html` en un navegador. Sin servidor ni dependencias de instalación.
Los datos se guardan en el `localStorage` del navegador mediante `shim.js` (un solo dispositivo).

## Estructura
- `index.html`: toda la app (HTML, CSS y JS).
- `shim.js`: sustituye las capacidades de Claude (`db`, `downloads`) cuando la app corre fuera de Claude.

## Notas
- En Claude la app guarda los datos en su base de datos compartida; aquí, en el navegador.
- Códigos de barras: usa JsBarcode (cdnjs) y ZXing (unpkg), cargados bajo demanda; requieren conexión.
- Dictado por voz: solo existe dentro de Claude (navegador Chromium); fuera, el botón no aparece.
- Siguiente paso para un uso real multidispositivo: sustituir `shim.js` por un backend (Supabase, Firebase, etc.) con la misma interfaz `collection/doc/set/delete/onSnapshot`.
