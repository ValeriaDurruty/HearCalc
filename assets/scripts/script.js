function validarValor(dB) {
    return dB <= 100;
}

// Función para verificar si hay campos vacíos
function hayCamposVacios() {
    const campos = [
        'dB500_OD', 'dB1000_OD', 'dB2000_OD', 'dB4000_OD',
        'dB500_OI', 'dB1000_OI', 'dB2000_OI', 'dB4000_OI'
    ];
    return campos.some(id => document.getElementById(id).value.trim() === '');
}

function dBToPerdidaAuditiva(dB, frecuencia) {
    const tabla = {
        500: { 0: 0.2, 5: 0.2, 10: 0.2, 15: 0.5, 20: 1.1, 25: 1.8, 30: 2.6, 35: 3.7, 40: 4.9, 45: 6.3, 50: 7.9, 55: 9.6, 60: 11.3, 65: 12.8, 70: 13.8, 75: 14.6, 80: 14.8, 85: 14.9, 90: 15, 95: 15, 100: 15 },
        1000: { 0: 0.3, 5: 0.3, 10: 0.3, 15: 0.9, 20: 2.1, 25: 3.6, 30: 5.4, 35: 7.7, 40: 10.2, 45: 13.0, 50: 15.7, 55: 19.0, 60: 21.5, 65: 23.5, 70: 25.5, 75: 27.2, 80: 28.8, 85: 29.8, 90: 29.9, 95: 30, 100: 30 },
        2000: { 0: 0.4, 5: 0.4, 10: 0.4, 15: 1.3, 20: 2.9, 25: 4.9, 30: 7.3, 35: 9.8, 40: 12.9, 45: 17.3, 50: 22.4, 55: 25.7, 60: 28.0, 65: 30.2, 70: 32.2, 75: 34.0, 80: 35.8, 85: 37.5, 90: 39.2, 95: 40, 100: 40 },
        4000: { 0: 0.1, 5: 0.1, 10: 0.1, 15: 0.3, 20: 0.9, 25: 1.7, 30: 2.7, 35: 3.8, 40: 5.0, 45: 6.4, 50: 8.0, 55: 9.7, 60: 11.2, 65: 12.5, 70: 13.5, 75: 14.2, 80: 14.6, 85: 14.8, 90: 14.9, 95: 15, 100: 15 }
    };

    // Verifica que el valor de dB esté dentro del rango permitido.
    if (dB < 10) {
        return tabla[frecuencia][0];
    } else if (dB > 100) {
        return tabla[frecuencia][100];
    } else {
        // Busca el valor correspondiente en la tabla.
        return tabla[frecuencia][dB] || 0;
    }
}

function calcularPPerdidaAuditiva(dB500, dB1000, dB2000, dB4000) {
    const perdida500 = dBToPerdidaAuditiva(dB500, 500);
    const perdida1000 = dBToPerdidaAuditiva(dB1000, 1000);
    const perdida2000 = dBToPerdidaAuditiva(dB2000, 2000);
    const perdida4000 = dBToPerdidaAuditiva(dB4000, 4000);

    const sum = perdida500 + perdida1000 + perdida2000 + perdida4000;
    return sum;
}

function calcularPerdidaAuditivaBilateral(sumOD, sumOI) {
    const menor = Math.min(sumOD, sumOI);
    const mayor = Math.max(sumOD, sumOI);

    const resultado = (mayor + 7 * menor) / 8;
    return resultado;
}

function calcularPerdidaAuditiva() {
	
	    if (hayCamposVacios()) {
        alert("Por favor, complete todos los campos.");
        return;
    }
	
    // Datos para el oído derecho
    const dB500_OD = parseFloat(document.getElementById('dB500_OD').value);
    const dB1000_OD = parseFloat(document.getElementById('dB1000_OD').value);
    const dB2000_OD = parseFloat(document.getElementById('dB2000_OD').value);
    const dB4000_OD = parseFloat(document.getElementById('dB4000_OD').value);

    if (!validarValor(dB500_OD) || !validarValor(dB1000_OD) || !validarValor(dB2000_OD) || !validarValor(dB4000_OD)) {
        alert("Por favor, ingresa valores entre 10 y 100 dB para el oído derecho.");
        return;
    }

    const sumOD = calcularPPerdidaAuditiva(dB500_OD, dB1000_OD, dB2000_OD, dB4000_OD);
    const porcentajeOD = (sumOD).toFixed(1);

    // Datos para el oído izquierdo
    const dB500_OI = parseFloat(document.getElementById('dB500_OI').value);
    const dB1000_OI = parseFloat(document.getElementById('dB1000_OI').value);
    const dB2000_OI = parseFloat(document.getElementById('dB2000_OI').value);
    const dB4000_OI = parseFloat(document.getElementById('dB4000_OI').value);

    if (!validarValor(dB500_OI) || !validarValor(dB1000_OI) || !validarValor(dB2000_OI) || !validarValor(dB4000_OI)) {
        alert("Por favor, ingresa valores entre 10 y 100 dB para el oído izquierdo.");
        return;
    }

    const sumOI = calcularPPerdidaAuditiva(dB500_OI, dB1000_OI, dB2000_OI, dB4000_OI);
    const porcentajeOI = (sumOI).toFixed(1);

    // Calcular pérdida auditiva bilateral
    const perdidaAuditivaBilateral = calcularPerdidaAuditivaBilateral(sumOD, sumOI);
    const porcentajeBilateral = (perdidaAuditivaBilateral).toFixed(1);

    // Mostrar resultados
    document.getElementById('resultadoOD').textContent = `El porcentaje de pérdida auditiva del oído derecho es: ${porcentajeOD}%`;
    document.getElementById('resultadoOI').textContent = `El porcentaje de pérdida auditiva del oído izquierdo es: ${porcentajeOI}%`;
    document.getElementById('resultado').textContent = `El porcentaje de pérdida auditiva bilateral es: ${porcentajeBilateral}%`;
}
