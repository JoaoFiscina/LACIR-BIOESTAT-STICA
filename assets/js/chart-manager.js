/**
 * chart-manager.js — Shared Chart.js factory for LACIR modules
 * Provides interactive charts (scatter, timeseries, residual) with
 * built-in PNG export and tooltips.
 */
import {
  Chart,
  ScatterController,
  LineController,
  BarController,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  BarElement,
  Legend,
  Tooltip,
  Filler
} from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';

Chart.register(
  ScatterController,
  LineController,
  BarController,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  BarElement,
  Legend,
  Tooltip,
  Filler
);

const FALLBACK_THEME = {
  primary: '#22c55e',
  primarySoft: 'rgba(34,197,94,0.18)',
  blue: '#3b82f6',
  blueSoft: 'rgba(59,130,246,0.15)',
  teal: '#14b8a6',
  tealSoft: 'rgba(20,184,166,0.15)',
  warning: '#f59e0b',
  danger: '#ef4444',
  dangerSoft: 'rgba(239,68,68,0.18)',
  grid: 'rgba(255,255,255,0.07)',
  tick: 'rgba(255,255,255,0.45)',
  label: 'rgba(255,255,255,0.65)',
  border: 'rgba(255,255,255,0.1)',
  tooltipBg: 'rgba(15,17,23,0.95)',
  tooltipBorder: 'rgba(34,197,94,0.35)',
  tooltipBody: '#e5e7eb',
  canvasBg: '#0f1117'
};

function readThemeToken(name, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function getChartTheme() {
  return {
    primary: readThemeToken('--chart-primary', FALLBACK_THEME.primary),
    primarySoft: readThemeToken('--chart-primary-soft', FALLBACK_THEME.primarySoft),
    blue: readThemeToken('--chart-blue', FALLBACK_THEME.blue),
    blueSoft: readThemeToken('--chart-blue-soft', FALLBACK_THEME.blueSoft),
    teal: readThemeToken('--chart-teal', FALLBACK_THEME.teal),
    tealSoft: readThemeToken('--chart-teal-soft', FALLBACK_THEME.tealSoft),
    warning: readThemeToken('--chart-warning', FALLBACK_THEME.warning),
    danger: readThemeToken('--chart-danger', FALLBACK_THEME.danger),
    dangerSoft: readThemeToken('--chart-danger-soft', FALLBACK_THEME.dangerSoft),
    grid: readThemeToken('--chart-grid', FALLBACK_THEME.grid),
    tick: readThemeToken('--chart-tick', FALLBACK_THEME.tick),
    label: readThemeToken('--chart-label', FALLBACK_THEME.label),
    border: readThemeToken('--chart-axis-border', FALLBACK_THEME.border),
    tooltipBg: readThemeToken('--chart-tooltip-bg', FALLBACK_THEME.tooltipBg),
    tooltipBorder: readThemeToken('--chart-tooltip-border', FALLBACK_THEME.tooltipBorder),
    tooltipBody: readThemeToken('--chart-tooltip-body', FALLBACK_THEME.tooltipBody),
    canvasBg: readThemeToken('--chart-canvas-bg', FALLBACK_THEME.canvasBg)
  };
}

function buildBaseOptions(theme) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 600, easing: 'easeOutQuart' },
    plugins: {
      legend: {
        labels: {
          color: theme.label,
          font: { family: "'Inter', sans-serif", size: 12 },
          boxWidth: 14,
          padding: 16
        }
      },
      tooltip: {
        backgroundColor: theme.tooltipBg,
        borderColor: theme.tooltipBorder,
        borderWidth: 1,
        titleColor: theme.primary,
        bodyColor: theme.tooltipBody,
        padding: 12,
        cornerRadius: 8,
        titleFont: { family: "'Inter', sans-serif", weight: '600', size: 12 },
        bodyFont: { family: "'Inter', sans-serif", size: 12 }
      }
    },
    scales: {
      x: {
        ticks: { color: theme.tick, font: { size: 11 } },
        grid: { color: theme.grid },
        border: { color: theme.border }
      },
      y: {
        ticks: { color: theme.tick, font: { size: 11 } },
        grid: { color: theme.grid, drawBorder: false },
        border: { color: theme.border }
      }
    }
  };
}

const chartCanvasBackgroundPlugin = {
  id: 'lacir-theme-canvas-background',
  beforeDraw(chart) {
    const { ctx, canvas } = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = getChartTheme().canvasBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }
};

Chart.register(chartCanvasBackgroundPlugin);

/** Keeps a registry of Chart instances to destroy before re-creation */
const registry = new Map();

function destroyChart(id) {
  const existing = registry.get(id);
  if (existing) {
    existing.destroy();
    registry.delete(id);
  }
}

function register(id, instance, rerender) {
  instance.$lacirRerender = rerender;
  registry.set(id, instance);
  return instance;
}

export function refreshRegisteredChartsTheme() {
  const rerenderQueue = [...registry.values()]
    .map(chart => chart?.$lacirRerender)
    .filter(rerender => typeof rerender === 'function');

  rerenderQueue.forEach(rerender => rerender());
}

/**
 * Build the chart container HTML and export button.
 * @param {string} canvasId
 * @param {string} title
 * @param {string} subtitle
 * @param {string} exportName
 * @returns {string} HTML string
 */
export function buildChartContainer(canvasId, title, subtitle, exportName) {
  return `
    <article class="chart-card">
      <div class="chart-card-header">
        <div>
          <h4 style="margin:0 0 4px;">${title}</h4>
          ${subtitle ? `<p style="margin:0;opacity:.65;font-size:.85rem;">${subtitle}</p>` : ''}
        </div>
      </div>
      <div class="chart-wrap" style="position:relative;min-height:360px;">
        <canvas id="${canvasId}"></canvas>
      </div>
      <button type="button" class="btn-ghost lacir-export-canvas" data-canvas-id="${canvasId}" data-export="${exportName}" style="position:absolute; bottom:16px; right:16px; display:flex; align-items:center; gap:6px; padding:8px 12px; font-size:0.85rem;">
        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
        Salvar
      </button>
    </article>
  `;
}

/**
 * Export canvas by id to PNG download.
 */
export function exportCanvas(canvasId, filename = 'grafico-lacirstat.png') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png', 1.0);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// ─── Scatter plot (Correlação — Pearson / manual) ──────────────────────────
/**
 * @param {string} canvasId - <canvas> element id
 * @param {{x:number[], y:number[], labels:string[], headers:string[]}} dataset
 * @param {{coef:number, intercept:number, slope:number, p:number}} pearson
 * @param {boolean[]} outlierFlags
 * @param {object} utils
 */
export function renderScatterChart(canvasId, dataset, pearson, outlierFlags, utils) {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  const theme = getChartTheme();
  const baseOptions = buildBaseOptions(theme);

  const n = dataset.x.length;
  const minX = Math.min(...dataset.x);
  const maxX = Math.max(...dataset.x);
  const xPad = (maxX - minX || 1) * 0.1;

  // Regression line endpoints
  const rxMin = minX - xPad;
  const rxMax = maxX + xPad;
  const ryMin = pearson.intercept + pearson.slope * rxMin;
  const ryMax = pearson.intercept + pearson.slope * rxMax;

  const points = dataset.x.map((x, i) => ({
    x,
    y: dataset.y[i],
    label: dataset.labels?.[i] || `Ponto ${i + 1}`,
    isOutlier: outlierFlags?.[i] || false
  }));

  const normal = points.filter(p => !p.isOutlier);
  const outliers = points.filter(p => p.isOutlier);

  const chart = new Chart(canvas, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Linha de regressão',
          data: [{ x: rxMin, y: ryMin }, { x: rxMax, y: ryMax }],
          type: 'line',
          borderColor: theme.primary,
          borderWidth: 2.5,
          borderDash: [],
          pointRadius: 0,
          fill: false,
          tension: 0,
          order: 0
        },
        {
          label: dataset.headers?.[0] && dataset.headers?.[1]
            ? `${dataset.headers[0]} × ${dataset.headers[1]}`
            : 'Pontos',
          data: normal.map(p => ({ x: p.x, y: p.y, label: p.label })),
          backgroundColor: theme.blueSoft,
          borderColor: theme.blue,
          borderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 9,
          order: 1
        },
        outliers.length ? {
          label: 'Possíveis outliers',
          data: outliers.map(p => ({ x: p.x, y: p.y, label: p.label })),
          backgroundColor: theme.dangerSoft,
          borderColor: theme.danger,
          borderWidth: 2,
          pointRadius: 7,
          pointHoverRadius: 10,
          order: 2
        } : null
      ].filter(Boolean)
    },
    options: {
      ...baseOptions,
      plugins: {
        ...baseOptions.plugins,
        tooltip: {
          ...baseOptions.plugins.tooltip,
          callbacks: {
            title: items => '',
            label: item => {
              const raw = item.raw;
              if (raw.label) return `${raw.label}  (${utils.fmtNumber(raw.x, 2)}, ${utils.fmtNumber(raw.y, 2)})`;
              return `(${utils.fmtNumber(raw.x, 2)}, ${utils.fmtNumber(raw.y, 2)})`;
            }
          }
        }
      },
      scales: {
        x: {
          ...baseOptions.scales.x,
          title: {
            display: true,
            text: dataset.headers?.[0] || 'X',
            color: theme.label,
            font: { size: 12 }
          }
        },
        y: {
          ...baseOptions.scales.y,
          title: {
            display: true,
            text: dataset.headers?.[1] || 'Y',
            color: theme.label,
            font: { size: 12 }
          }
        }
      }
    }
  });

  return register(canvasId, chart, () => renderScatterChart(canvasId, dataset, pearson, outlierFlags, utils));
}

// ─── Rank scatter (Spearman) ────────────────────────────────────────────────
export function renderRankScatterChart(canvasId, dataset, spearman, diagnostics, utils) {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  const theme = getChartTheme();
  const baseOptions = buildBaseOptions(theme);

  const n = dataset.x.length;
  const highlighted = new Set(
    (diagnostics.topRankRows || []).slice(0, 4).map(r => r.index)
  );

  const rankX = [...dataset.x].map((_, i) => i + 1);
  const sortedByX = [...dataset.x.map((v, i) => ({ x: v, y: dataset.y[i], rx: 0, ry: 0, label: dataset.labels?.[i] || `${i + 1}`, idx: i }))]
    .sort((a, b) => a.x - b.x);
  sortedByX.forEach((p, ri) => { p.rx = ri + 1; });
  const sortedByY = [...sortedByX].sort((a, b) => a.y - b.y);
  sortedByY.forEach((p, ri) => { p.ry = ri + 1; });
  const points = sortedByX;

  const normal = points.filter(p => !highlighted.has(p.idx));
  const high = points.filter(p => highlighted.has(p.idx));

  const chart = new Chart(canvas, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Ranks (X → Y)',
          data: normal.map(p => ({ x: p.rx, y: p.ry, label: p.label })),
          backgroundColor: theme.tealSoft,
          borderColor: theme.teal,
          borderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 9
        },
        high.length ? {
          label: 'Maior diferença de ranks',
          data: high.map(p => ({ x: p.rx, y: p.ry, label: p.label })),
          backgroundColor: theme.dangerSoft,
          borderColor: theme.danger,
          borderWidth: 2,
          pointRadius: 8,
          pointHoverRadius: 11
        } : null
      ].filter(Boolean)
    },
    options: {
      ...baseOptions,
      plugins: {
        ...baseOptions.plugins,
        tooltip: {
          ...baseOptions.plugins.tooltip,
          callbacks: {
            title: () => '',
            label: item => {
              const r = item.raw;
              return `${r.label || ''}  posto X: ${r.x}, posto Y: ${r.y}`;
            }
          }
        }
      },
      scales: {
        x: { ...baseOptions.scales.x, title: { display: true, text: `Posto de ${dataset.headers?.[0] || 'X'}`, color: theme.label, font: { size: 12 } } },
        y: { ...baseOptions.scales.y, title: { display: true, text: `Posto de ${dataset.headers?.[1] || 'Y'}`, color: theme.label, font: { size: 12 } } }
      }
    }
  });

  return register(canvasId, chart, () => renderRankScatterChart(canvasId, dataset, spearman, diagnostics, utils));
}

// ─── Timeseries + Trend line (Prais-Winsten) ────────────────────────────────
export function renderTimeseriesChart(canvasId, time, observed, fitted, pointLabels, axisLabels, utils) {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  const theme = getChartTheme();
  const baseOptions = buildBaseOptions(theme);

  const chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: pointLabels,
      datasets: [
        {
          label: axisLabels.y || 'Observado',
          data: observed,
          borderColor: theme.blue,
          backgroundColor: theme.blueSoft,
          borderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 9,
          fill: true,
          tension: 0.2,
          order: 1
        },
        {
          label: 'Tendência ajustada (Prais-Winsten)',
          data: fitted,
          borderColor: theme.primary,
          backgroundColor: 'transparent',
          borderWidth: 2.5,
          borderDash: [8, 5],
          pointRadius: 0,
          fill: false,
          tension: 0,
          order: 0
        }
      ]
    },
    options: {
      ...baseOptions,
      plugins: {
        ...baseOptions.plugins,
        tooltip: {
          ...baseOptions.plugins.tooltip,
          mode: 'index',
          intersect: false,
          callbacks: {
            label: item => `${item.dataset.label}: ${utils.fmtNumber(item.parsed.y, 2)}`
          }
        }
      },
      scales: {
        x: {
          ...baseOptions.scales.x,
          title: { display: true, text: axisLabels.x || 'Período', color: theme.label, font: { size: 12 } }
        },
        y: {
          ...baseOptions.scales.y,
          title: { display: true, text: axisLabels.y || 'Valor', color: theme.label, font: { size: 12 } }
        }
      }
    }
  });

  return register(canvasId, chart, () => renderTimeseriesChart(canvasId, time, observed, fitted, pointLabels, axisLabels, utils));
}

// ─── Residual chart (Prais-Winsten) ─────────────────────────────────────────
export function renderResidualChart(canvasId, time, residuals, pointLabels, axisLabels, utils) {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  const theme = getChartTheme();
  const baseOptions = buildBaseOptions(theme);

  const colors = residuals.map(r =>
    r > 0 ? theme.primary : theme.danger
  );

  const chart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: pointLabels,
      datasets: [
        {
          label: 'Resíduo (log10)',
          data: residuals,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1,
          borderRadius: 4
        }
      ]
    },
    options: {
      ...baseOptions,
      plugins: {
        ...baseOptions.plugins,
        tooltip: {
          ...baseOptions.plugins.tooltip,
          callbacks: {
            label: item => `Resíduo: ${utils.fmtNumber(item.parsed.y, 4)}`
          }
        }
      },
      scales: {
        x: { ...baseOptions.scales.x, title: { display: true, text: axisLabels.x || 'Período', color: theme.label, font: { size: 12 } } },
        y: {
          ...baseOptions.scales.y,
          title: { display: true, text: 'Resíduo (escala log10)', color: theme.label, font: { size: 12 } }
        }
      }
    }
  });

  return register(canvasId, chart, () => renderResidualChart(canvasId, time, residuals, pointLabels, axisLabels, utils));
}

// ─── T-Student distribution chart (boxplot-style via bar + line) ────────────
export function renderTStudentDistChart(canvasId, groupA, groupB, labelA, labelB, utils) {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  const theme = getChartTheme();
  const baseOptions = buildBaseOptions(theme);

  // Build summary stats
  function stats(arr) {
    const sorted = [...arr].sort((a, b) => a - b);
    const n = sorted.length;
    const mean = arr.reduce((s, v) => s + v, 0) / n;
    const std = Math.sqrt(arr.reduce((s, v) => s + (v - mean) ** 2, 0) / Math.max(n - 1, 1));
    const q1 = sorted[Math.floor(n * 0.25)];
    const median = sorted[Math.floor(n * 0.5)];
    const q3 = sorted[Math.floor(n * 0.75)];
    const min = sorted[0];
    const max = sorted[n - 1];
    return { mean, std, q1, median, q3, min, max, n };
  }

  const sA = stats(groupA);
  const sB = stats(groupB);

  // Show mean ± 1SD as bars with error bars simulated via dataset
  const chart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: [labelA || 'Grupo A', labelB || 'Grupo B'],
      datasets: [
        {
          label: 'Média',
          data: [sA.mean, sB.mean],
          backgroundColor: [theme.blueSoft, theme.primarySoft],
          borderColor: [theme.blue, theme.primary],
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false
        }
      ]
    },
    options: {
      ...baseOptions,
      plugins: {
        ...baseOptions.plugins,
        tooltip: {
          ...baseOptions.plugins.tooltip,
          callbacks: {
            label: item => {
              const s = item.dataIndex === 0 ? sA : sB;
              return [
                `Média: ${utils.fmtNumber(s.mean, 3)}`,
                `DP: ${utils.fmtNumber(s.std, 3)}`,
                `Mediana: ${utils.fmtNumber(s.median, 3)}`,
                `Q1: ${utils.fmtNumber(s.q1, 3)}  Q3: ${utils.fmtNumber(s.q3, 3)}`,
                `n = ${s.n}`
              ];
            }
          }
        }
      },
      scales: {
        x: { ...baseOptions.scales.x },
        y: {
          ...baseOptions.scales.y,
          title: { display: true, text: 'Valor médio', color: theme.label, font: { size: 12 } }
        }
      }
    }
  });

  return register(canvasId, chart, () => renderTStudentDistChart(canvasId, groupA, groupB, labelA, labelB, utils));
}

// ─── T-Student difference chart (Mean Difference + IC95%) ──────────────────
export function renderTStudentDiffChart(canvasId, result, labels, utils) {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  const theme = getChartTheme();
  const baseOptions = buildBaseOptions(theme);

  const diff = result.diff;
  const low = result.ci[0];
  const high = result.ci[1];

  const chart = new Chart(canvas, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Diferença entre médias (IC95%)',
          data: [{ x: diff, y: 0 }],
          backgroundColor: theme.primary,
          borderColor: theme.primary,
          pointRadius: 8,
          pointHoverRadius: 10,
          showLine: false
        },
        {
          label: 'Intervalo de Confiança',
          data: [{ x: low, y: 0 }, { x: high, y: 0 }],
          borderColor: theme.primary,
          borderWidth: 2,
          pointRadius: 4,
          showLine: true,
          fill: false
        }
      ]
    },
    options: {
      ...baseOptions,
      indexAxis: 'y',
      plugins: {
        ...baseOptions.plugins,
        tooltip: {
          ...baseOptions.plugins.tooltip,
          callbacks: {
            title: () => 'Estimativa de Efeito',
            label: item => {
              if (item.datasetIndex === 0) return `Diferença: ${utils.fmtSigned(diff, 3)}`;
              return `IC95%: [${utils.fmtNumber(low, 3)}, ${utils.fmtNumber(high, 3)}]`;
            }
          }
        }
      },
      scales: {
        x: {
          ...baseOptions.scales.x,
          title: { display: true, text: 'Diferença das Médias', color: theme.label }
        },
        y: {
          display: false,
          min: -1,
          max: 1
        }
      }
    }
  });

  return register(canvasId, chart, () => renderTStudentDiffChart(canvasId, result, labels, utils));
}

// ─── Global export handler ──────────────────────────────────────────────────
/**
 * Attach a global click delegate for .lacir-export-canvas buttons.
 * Call once during app bootstrap.
 */
export function initCanvasExportDelegate() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.lacir-export-canvas');
    if (!btn) return;
    const canvasId = btn.dataset.canvasId;
    const filename = btn.dataset.export || 'grafico-lacirstat.png';
    exportCanvas(canvasId, filename);
  });
}
