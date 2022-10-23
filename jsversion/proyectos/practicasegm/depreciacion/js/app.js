const delay = ms => new Promise(res => setTimeout(res, ms));

async function calcularDepreciacion() {

    let error = false;
    if (document.getElementById('monto').value == '') {
        mostrarToast('Introduce el monto', 'error');
        error = true;
    }
    if (error && document.getElementById('anios').value == '') {
        await delay(2000);
        mostrarToast('Introduce los años', 'error');
        error = true;
    }
    if (error) {
        return;
    }
    let monto = parseFloat(document.getElementById('monto').value);
    let n = parseInt(document.getElementById('anios').value);

    const f = n * (n + 1) / 2;

    var html = '<h3>Resultados</h3>\n<table class="depreciacion">\n<th>Año</th>\n<th>Monto</th>';

    for (var i = 0; i < n; i++) {
        var dep = (n - i) / f * monto;
        html += `<tr>\n<td> ${i + 1} </td>\n<td> ${dep.toFixed(2)} </td>\n</tr>\n`;
    }

    html += '</table>\n';

    document.getElementById('resultados').innerHTML = html;

    mostrarToast('Calculo completado con éxito', 'success');
}

function limpiar() {
    document.getElementById('anios').value = '';
    document.getElementById('monto').value = '';
    document.getElementById('resultados').innerHTML = '';
    mostrarToast('Limpieza completada', 'success');
}


async function mostrarToast(mensaje, tipo) {
    let toast_html = `<div class="toast" id="toast">${mensaje}</div>`;
    if (tipo != 'success') {
        document.getElementById('resultados').innerHTML = toast_html;
    } else {
        document.getElementById('resultados').insertAdjacentHTML('beforeend', toast_html);
    }
    let toast = document.getElementById(`toast`);
    toast.classList.add(tipo);
    toast.classList.add('show');
    await delay(3000);
    toast.classList.remove('show');
    if (tipo != success) {
        document.getElementById('resultados').innerHTML = '';
    }
}