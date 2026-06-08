import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRACKER_PATH = path.join(__dirname, '..', 'docs', 'seo-plan-tracker.json');

const OWNER_LABEL = {
  user: '👤 Вы',
  dev: '🛠 Код / агент',
};

function parseDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function daysBetween(a, b) {
  const ms = 24 * 60 * 60 * 1000;
  return Math.round((b.getTime() - a.getTime()) / ms);
}

export function loadSeoPlan() {
  const raw = fs.readFileSync(TRACKER_PATH, 'utf8');
  return JSON.parse(raw);
}

function getActivePhase(plan, today) {
  for (const phase of plan.phases) {
    const pending = phase.tasks.some((t) => t.status === 'pending');
    const hasOpenDue = phase.tasks.some((t) => {
      if (t.status !== 'pending') return false;
      return parseDate(t.due) >= today || daysBetween(parseDate(t.due), today) <= 14;
    });
    if (pending && hasOpenDue) return phase;
  }
  const last = plan.phases[plan.phases.length - 1];
  return last;
}

export function buildPlanActions(plan, options = {}) {
  const today = options.today ?? new Date();
  const kyivToday = new Date(
    today.toLocaleString('en-US', { timeZone: 'Europe/Kyiv' }),
  );
  const isMonday = kyivToday.getDay() === 1;

  const activePhase = getActivePhase(plan, kyivToday);

  const pendingTasks = plan.phases.flatMap((phase) =>
    phase.tasks
      .filter((t) => t.status === 'pending')
      .map((t) => ({ ...t, phaseName: phase.name, phaseId: phase.id })),
  );

  const sorted = [...pendingTasks].sort(
    (a, b) => parseDate(a.due).getTime() - parseDate(b.due).getTime(),
  );

  const overdue = sorted.filter((t) => parseDate(t.due) < kyivToday);
  const dueSoon = sorted.filter((t) => {
    const due = parseDate(t.due);
    const diff = daysBetween(kyivToday, due);
    return due >= kyivToday && diff <= 7;
  });
  const nextUp = sorted.filter((t) => !overdue.includes(t) && !dueSoon.includes(t)).slice(0, 3);

  const progress = plan.phases.map((phase) => {
    const total = phase.tasks.length;
    const done = phase.tasks.filter((t) => t.status === 'done').length;
    return { id: phase.id, name: phase.name, done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  });

  return {
    isMonday,
    activePhase,
    progress,
    overdue: overdue.slice(0, 3),
    dueSoon: dueSoon.slice(0, 4),
    nextUp,
    weeklyRitual: plan.weeklyRitual ?? [],
  };
}

export function formatPlanTelegramSection(planContext, escapeHtml) {
  const { isMonday, activePhase, progress, overdue, dueSoon, nextUp, weeklyRitual } =
    planContext;

  const lines = [];

  const phaseProgress = progress.find((p) => p.id === activePhase.id);
  lines.push(
    `<b>📋 SEO-план — ${escapeHtml(activePhase.name)}</b>`,
    `Цель: ${escapeHtml(activePhase.goal)}`,
    `Прогресс фазы: ${phaseProgress?.done ?? 0}/${phaseProgress?.total ?? 0} (${phaseProgress?.pct ?? 0}%)`,
    `KPI: ${escapeHtml(activePhase.kpi)}`,
    '',
  );

  if (overdue.length) {
    lines.push('<b>⚠️ Просрочено</b>');
    for (const t of overdue) {
      lines.push(
        `• [${t.id}] ${escapeHtml(t.title)} — ${OWNER_LABEL[t.owner] ?? t.owner}, до ${t.due}`,
      );
    }
    lines.push('');
  }

  if (dueSoon.length) {
    lines.push('<b>📅 На этой неделе</b>');
    for (const t of dueSoon) {
      lines.push(
        `• [${t.id}] ${escapeHtml(t.title)} — ${OWNER_LABEL[t.owner] ?? t.owner}, до ${t.due}`,
      );
    }
    lines.push('');
  }

  if (!overdue.length && !dueSoon.length && nextUp.length) {
    lines.push('<b>⏭ Дальше по плану</b>');
    for (const t of nextUp) {
      lines.push(
        `• [${t.id}] ${escapeHtml(t.title)} — ${OWNER_LABEL[t.owner] ?? t.owner}, до ${t.due}`,
      );
    }
    lines.push('');
  }

  if (isMonday && weeklyRitual.length) {
    lines.push('<b>🔄 Понедельник — чек-лист (15 мин)</b>');
    for (const item of weeklyRitual) {
      lines.push(`• ${escapeHtml(item)}`);
    }
    lines.push('');
  }

  lines.push(`<i>Полный план: docs/SEO-MASTER-PLAN.md</i>`);

  return lines.join('\n');
}
