function generarTriangulo() {
    let n = parseInt(document.getElementById('n').value);
    let html = '<table>\n';
    for (let i = 0; i <= n; i++) {
        let fila = celdas('', n * 2 - i);
        for (let j = 0; j <= i; j++) {
            fila += celdas(nCk(i, j)) + celdas();
        }
        fila += celdas('', n * 2 - i);
        html += filas(fila);
    }
    html += '</table>\n';
    console.log(html);
    document.getElementById('triangulo').innerHTML = html;
}

function limpiar() {
    document.getElementById('n').value = '';
    document.getElementById('triangulo').innerHTML = '';
}

function celdas(contenido = '', veces = 1) {
    let html = '';
    for (let i = 0; i < veces; i++) {
        html += `<td>\n\t${contenido}\n</td>\n`;
    }
    return html;
}

function filas(contenido) {
    let html = `<tr>\n\t${contenido}</tr>\n`;
    return html;
}

function factorial(n) {
    let fact = 1;
    let i = n;
    while (i > 0) {
        fact *= i;
        i--;
    }
    return fact;
}

function nCk(n, k) {
    return factorial(n) / (factorial(k) * factorial(n - k));
}