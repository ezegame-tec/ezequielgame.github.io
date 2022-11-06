const centenas = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];
const decenas = ['', 'dieci', 'veinti', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
const unidades = ['', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez']

function convertir() {
    let moneda = document.getElementById('n').value;
    moneda = moneda.replace(/[^0-9.-]+/g, "");
    let numero = Number(moneda);
    let partes = moneda.split('.');
    // alert(partes);
    let parte_int_str = partes[0];
    let parte_dec = '00';
    if(partes.length == 2){
        parte_dec = partes[1];
    }
    let ternas_rev = parte_int_str.split('').reverse().join('').match(/.{1,3}/g);
    let ternas = [];
    ternas_rev.forEach(terna => {
        ternas.push(parseInt(terna.split('').reverse().join('')));
    })
    ternas = ternas.reverse();
    let html = '<h2>Resultado</h2>\n';
    let resDiv = document.getElementById('resultados');
    let res = '';
    if(numero > Math.pow(10,9) - 1){
        html += '<p>Error</p>';
        resDiv.innerHTML = html;
        return;
    }
    // alert(ternas);
    ternas.forEach(function (n, t) {
        if (n < 0) {
            res += 'Menos ';
        }
        let restante = n;
        let i = 3; // maximo 1 millon
        let especial = false;
        while (i >= 0 && restante != 0) {
            let factor = Math.pow(10, i);
            let cantidad = restante - (restante % factor);
            restante -= cantidad;
            switch (i) {
                case 3:
                    let uni3 = toUnidades(cantidad, factor, especial);
                    if (cantidad / factor != 1) {
                        res += uni3;
                    }
                    break;
                case 2:
                    res += toCentenas(cantidad, factor, restante);
                    break;
                case 1:
                    let dec1 = toDecenas(cantidad, factor, restante);
                    if (dec1 === 'especial') {
                        especial = true;
                    } else {
                        res += dec1;
                    }
                    break;
                case 0:
                    if (incluyeY(res)) {
                        res += ' y ';
                    }
                    // alert(`'${toUnidades(cantidad, factor, especial)}'`);
                    if(toUnidades(cantidad, factor, especial) === 'un ' && t === ternas.length - 1){
                        res += 'uno';
                    } else {
                        res += toUnidades(cantidad, factor, especial);
                    }
                    break;
                default:
                    break;
            }
            i--;
        }
        // alert(`La cantidad fue ${n}, el res fue '${res}'`);
        if (ternas.length == 3 && n != 0) {
            if (t == 0) {
                res += res === '  un ' ? 'millón' : 'millones';
            } else if (t == 1) {
                res += 'mil';
            }
        } else if (ternas.length == 2 && t == 0) {
            res += 'mil';
        }
    })
    res = res.trim();
    factor = Math.pow(10,parte_dec.length > 1 ? parte_dec.length : parte_dec.length + 1);
    if(parte_dec.length == 1){
        parte_dec += '0';
    }
    res += ` (${parte_dec}/${factor})` + '.';
    html += `<p>${res}</p>\n`;
    resDiv.innerHTML = html;
}

function incluyeY(res) {
    var valido = true;
    valido &= res.trim() !== '';
    valido &= res !== 'Menos ';
    valido &= res.slice(-6) !== 'veinti';
    valido &= res.slice(-7) !== 'ciento';
    valido &= res.slice(-7) !== 'ciento ';
    valido &= res.slice(-5) !== 'dieci';
    valido &= res.slice(-5) !== 'mil  ';
    valido &= res.slice(-6) !== 'mil   ';
    valido &= res.slice(-8) !== 'millón  ';
    valido &= res.slice(-10) !== 'millones  ';
    centenas.forEach(centena => {
        if (res.includes(centena) && centena != '') {
            valido &= res.slice(-(centena.length + 1)) != centena + ' ';
        }
    });
    return valido;
}

function toUnidades(cantidad, factor, especial = false) {
    let res = '';
    let casos = ['', 'once', 'doce', 'trece', 'catorce', 'quince'];
    if (especial) {
        res = casos[cantidad];
    } else {
        res = unidades[cantidad / factor] + ' ';
    }
    return res;
}

function toDecenas(cantidad, factor, restante) {
    let res = '';
    // Veinte y diez, no veinti ni dieci
    if (restante === 0) {
        if (cantidad === 10) {
            res += 'diez ';
        } else if (cantidad === 20) {
            res += 'veinte ';
        } else {
            res += decenas[cantidad / factor];
        }
    } else {
        res += decenas[cantidad / factor];
    }
    if (cantidad / factor >= 3) {
        res += ' ';
    }
    if (cantidad === 10 && 1 <= restante && restante <= 5) {
        res = 'especial';
    }
    return res;
}

function toCentenas(cantidad, factor, restante) {
    let res = '';
    if (cantidad / factor == 1 && restante == 0) {
        res += 'cien ';
    } else {
        res += centenas[cantidad / factor] + ' ';
    }
    return res;
}

function limpiar() {
    document.getElementById('n').value = '';
    document.getElementById('resultados').innerHTML = '';
}