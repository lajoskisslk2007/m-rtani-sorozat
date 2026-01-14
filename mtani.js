const N = 10; // hány tagot jelenítünk meg
const app = document.getElementById('app');

function render(q = 0.5) {
    // Sorozat tagjai
    let tags = [];
    let osszeg = 0;
    for (let i = 0; i < N; i++) {
        let tag = Math.pow(q, i);
        tags.push(tag);
        osszeg += tag;
    }
    // Végtelen összeg
    let vegtelenOsszeg = Math.abs(q) < 1 ? (1 / (1 - q)) : null;

    app.innerHTML = `
        <h1>Végtelen mértani sorozat</h1>
        <div class="slider-row">
            <label for="qval"><b>q értéke:</b> ${q.toFixed(2)}</label>
            <input type="range" id="qval" min="-0.99" max="0.99" step="0.01" value="${q}">
        </div>
        <div class="sorozat-lista">
            <b>Sorozat:</b> 1${tags.slice(1).map((t,i) => ` + ${q}<sup>${i+1}</sup>`).join('')}
        </div>
        <div class="diagram">
            ${tags.map((t,i) => `
                <div class="bar" style="height:${90*t/Math.max(...tags)}px" title="q^${i} = ${t.toFixed(3)}">
                    ${t.toFixed(2)}
                </div>
            `).join('')}
        </div>
        <div class="osszeg">
            <b>Első ${N} tag összege:</b> ${osszeg.toFixed(4)}
        </div>
        ${
            vegtelenOsszeg !== null
            ? `<div class="osszeg"><b>Végtelen összeg:</b> ${vegtelenOsszeg.toFixed(4)}</div>`
            : `<div class="warning">A végtelen összeg nem létezik (|q| ≥ 1).</div>`
        }
    `;
    document.getElementById('qval').oninput = e => render(Number(e.target.value));
}

render();