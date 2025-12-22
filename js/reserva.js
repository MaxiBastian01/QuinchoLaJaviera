
import { fetchOccupiedDatesSet } from "./api.js";
const nombreCliente = document.getElementById("nombreCliente");
let occupiedSet = new Set();

(() => {



    
    const grid = document.getElementById("calGrid");
    const monthLabel = document.getElementById("monthLabel");
    const fechaOut = document.getElementById("fechaSeleccionada");
    const prevBtn = document.getElementById("prevMonth");
    const nextBtn = document.getElementById("nextMonth");


    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    let view = new Date(); // mes que se muestra
    view.setDate(1);

    let selectedKey = null; // "YYYY-MM-DD"

    function pad2(n) {
        return String(n).padStart(2, "0");
    }

    function keyFromDate(d) {
        return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
    }

    function formatAR(d) {
        return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;
    }

    // convierte domingo(0) a 7 para que la semana arranque lunes
    function dowMondayFirst(date) {
        const d = date.getDay(); // 0 dom, 1 lun...
        return d === 0 ? 7 : d;
    }

    (async () => {
  occupiedSet = await fetchOccupiedDatesSet();
  console.log("OCUPADAS:", [...occupiedSet]);
  render(); // 👈 MUY IMPORTANTE
})();
    function render() {
        grid.innerHTML = "";

        const year = view.getFullYear();
        const month = view.getMonth();

        monthLabel.textContent = `${meses[month]} ${year}`;

        const first = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startOffset = (first.getDay() === 0 ? 7 : first.getDay()) - 1;

        // Vacíos
        for (let i = 0; i < startOffset; i++) {
            const empty = document.createElement("div");
            empty.className = "cal-cell empty";
            grid.appendChild(empty);
        }

        // Días
        for (let day = 1; day <= daysInMonth; day++) {
            const d = new Date(year, month, day);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

            const cell = document.createElement("button");
            cell.type = "button";
            cell.className = "cal-cell day";
            cell.textContent = day;

            //  BLOQUEAR FECHAS OCUPADAS
            if (occupiedSet.has(key)) {
                cell.classList.add("disabled");
                cell.disabled = true;
                cell.title = "Fecha ocupada";
            }

            if (key === selectedKey) cell.classList.add("selected");

            cell.addEventListener("click", () => {
                if (cell.disabled) return;

                selectedKey = key;
                grid.querySelectorAll(".cal-cell.day.selected")
                    .forEach(el => el.classList.remove("selected"));

                cell.classList.add("selected");
                fechaOut.textContent = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
            });

            grid.appendChild(cell);
        }
    }


    prevBtn.addEventListener("click", () => {
        view.setMonth(view.getMonth() - 1);
        view.setDate(1);
        render();
    });

    nextBtn.addEventListener("click", () => {
        view.setMonth(view.getMonth() + 1);
        view.setDate(1);
        render();
    });
})();


// ====== Horario + Resumen ======
const horaDesde = document.getElementById("horaDesde");
const horaHasta = document.getElementById("horaHasta");

const fechaSeleccionada2 = document.getElementById("fechaSeleccionada2");
const horarioSeleccionado = document.getElementById("horarioSeleccionado");

// copia la fecha cuando el calendario la setea (usa el mismo texto)
function syncFechaResumen() {
    const fechaTexto = document.getElementById("fechaSeleccionada")?.textContent || "—";
    if (fechaSeleccionada2) fechaSeleccionada2.textContent = fechaTexto;
}

function syncHorarioResumen() {
    const d = horaDesde?.value || "";
    const h = horaHasta?.value || "";

    if (!d || !h) {
        horarioSeleccionado.textContent = "—";
        return;
    }

    // Validación simple: hasta debe ser mayor que desde
    if (h <= d) {
        horarioSeleccionado.textContent = "Horario inválido";
        return;
    }

    horarioSeleccionado.textContent = `${d} - ${h}`;
}

horaDesde?.addEventListener("input", syncHorarioResumen);
horaHasta?.addEventListener("input", syncHorarioResumen);

// 👉 IMPORTANTE: llamá a syncFechaResumen() cuando el usuario elige un día.
// Para no tocar demasiado tu código, lo hacemos cada 300ms (simple y funciona):
setInterval(syncFechaResumen, 300);


// ====== BOTÓN WHATSAPP ======
const btnWhatsapp = document.getElementById("btnWhatsapp");

//  número real
const WHATSAPP_NUMBER = "5493442486540";

function actualizarBotonWhatsapp() {
    const nombreOk = nombreCliente?.value.trim().length > 2;

    const fecha = fechaSeleccionada2?.textContent;
    const horario = horarioSeleccionado?.textContent;

    const fechaOk = fecha && fecha !== "—";
    const horarioOk = horario && horario !== "—" && horario !== "Horario inválido";

    btnWhatsapp.disabled = !(nombreOk && fechaOk && horarioOk);
}


btnWhatsapp.addEventListener("click", () => {
    const fecha = fechaSeleccionada2.textContent;
    const horario = horarioSeleccionado.textContent;
    const consultaInput = document.getElementById("consultaTexto");

    //  Tomar consulta (opcional)
    let consulta = consultaInput.value.trim();
    if (!consulta) {
        consulta = "Ninguna.";
    }

    const mensaje =
        `Hola 
Soy ${nombreCliente.value.trim()}.

Quiero reservar el quincho con estos datos:

 Fecha: ${fecha}
 Horario: ${horario}
 Consultas: ${consulta}

¡Gracias!`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
});


// Revisamos cambios
setInterval(actualizarBotonWhatsapp, 300);


// ====== BOTÓN VOLVER ======
const btnVolver = document.getElementById("btnVolver");

btnVolver.addEventListener("click", () => {
    window.location.href = "index.html"; // o la página que quieras
});

// ====== BOTÓN VOLVER TOPBAR======
const btnTopVolver = document.getElementById("topVolver");

btnTopVolver.addEventListener("click", () => {
    window.history.back();
});