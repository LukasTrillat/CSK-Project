const ctx = document.querySelector('.activity-chart');
const ctx2 = document.querySelector('.prog-chart');

// === GRÁFICO DE ACTIVIDAD SEMANAL ===
if (ctx) {
    new Chart(ctx, { 
        type: 'bar',
        data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            datasets : [{
                label: 'Time',
                data: [8, 6, 7, 6, 10, 8, 4],
                backgroundColor: '#1e293b',
                borderWidth: 3,
                borderRadius: 6,
                hoverBackgroundColor: '#60a5fa'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x:{
                    border:{
                        display: true
                    },
                    grid:{
                        display: true,
                        color: '#1e293b'
                    }
                },
                y:{
                    ticks:{
                        display: false
                    }
                }
            },
            plugins:{
                legend:{
                    display: false
                }
            },
            animation:{
                duration: 1000,
                easing: 'easeInOutQuad',
            }
        }
    });
}

// === GRÁFICO DE PROGRESO (DETALLE AVANZADO) ===
if (ctx2) {
    new Chart(ctx2, { 
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets : [{
                label: 'Group score',
                data: [6, 10, 8, 14, 6, 7, 4],
                borderColor: '#0891b2',
                tension: 0.4
            },
            {
                label: 'Child score',
                data: [8, 6, 7, 6, 11, 8, 10],
                borderColor: '#ca8a04',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    grid: {
                        display: false,
                    }
                },
                y: {
                    ticks: {
                        display: false
                    },
                    border: {
                        display: false,
                        dash: [5, 5]
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuad',
            }
        }
    });
}

// === TOGGLE: MOSTRAR / OCULTAR DETALLES AVANZADOS ===
const progStatus = document.querySelector('.prog-status');
const toggleBtn = document.getElementById('toggle-advanced');
const advancedPanel = document.getElementById('advanced-panel');

if (progStatus && toggleBtn && advancedPanel) {
    advancedPanel.style.display = 'none'; // Empieza cerrado

    toggleBtn.addEventListener('click', function () {
        const isOpen = progStatus.classList.toggle('advanced-open');
        advancedPanel.style.display = isOpen ? 'block' : 'none';

        toggleBtn.innerHTML = isOpen
            ? 'Hide advanced details <i class="bx bx-chevron-up"></i>'
            : 'Advanced details <i class="bx bx-chevron-down"></i>';
    });
}

// === RESUMEN SIMPLE + AVANZADO PARA PADRES ===
(function () {
    const currentEl = document.querySelector('[data-role="current-gpa"]');
    const classEl   = document.querySelector('[data-role="class-gpa"]');
    const simpleSummaryEl   = document.getElementById('simple-summary-text');
    const advancedSummaryEl = document.getElementById('gpa-summary-text');
    const statusPill        = document.getElementById('status-pill');
    const overallEl         = document.getElementById('overall-progress');

    if (!currentEl || !classEl || !simpleSummaryEl || !advancedSummaryEl || !statusPill || !overallEl) return;

    const currentScore  = parseFloat(currentEl.dataset.value  || currentEl.textContent);
    const classScore    = parseFloat(classEl.dataset.value    || classEl.textContent);
    const overallProg   = parseFloat(overallEl.dataset.value || overallEl.textContent);

    if (isNaN(currentScore) || isNaN(classScore) || isNaN(overallProg)) {
        simpleSummaryEl.textContent   = 'We could not load the progress summary.';
        advancedSummaryEl.textContent = 'We could not load the detailed summary.';
        return;
    }

    let baseMsg   = '';
    let statusTxt = '';
    let statusCls = 'status-pill-neutral';

    const diff = currentScore - classScore;

    if (diff >= 0.2) {
        baseMsg   = 'Your child is doing better than most of the group.';
        statusTxt = 'Ahead of group';
        statusCls = 'status-pill-good';
    } else if (diff <= -0.2) {
        baseMsg   = 'Your child is a bit below the rest of the group.';
        statusTxt = 'Needs attention';
        statusCls = 'status-pill-warning';
    } else {
        baseMsg   = 'Your child is close to the group average.';
        statusTxt = 'On track';
        statusCls = 'status-pill-neutral';
    }

    // Texto simple para papá/mamá
    simpleSummaryEl.textContent =
        baseMsg + ' Overall progress is ' + overallProg.toFixed(0) + '%.';

    // Texto más detallado en la sección avanzada
    advancedSummaryEl.textContent =
        baseMsg +
        ' Current score is ' + currentScore.toFixed(2) +
        ' versus a group average of ' + classScore.toFixed(2) + '.';

    // Actualizar pill de estado
    statusPill.textContent = statusTxt;
    statusPill.className = 'status-pill ' + statusCls;
})();