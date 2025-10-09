const STORAGE_KEY = 'game-of-wealth-state-v1';
const DAILY_QUEST_KEY = 'game-of-wealth-daily-quest';

const canvasData = {
  1: {
    level: 'Level 1: The Employee',
    subtitle: 'The Foundation & Learning Phase',
    archetypes: {
      Entrepreneur: {
        emoji: '💼',
        objective: 'Learn the Business of Business',
        mindset: 'This company is my MBA program. My salary is my scholarship.',
        blueprint: [
          'Get close to the money by shadowing or supporting a sales or marketing initiative.',
          'Map the entire value chain of your company from lead generation to customer support.',
          'Pitch an intrapreneurial idea that improves efficiency or revenue.',
          'Invite a senior leader for coffee to understand their perspective.'
        ],
        kpis: [
          'Revenue projects touched',
          'New skills acquired',
          'High-quality contacts made'
        ]
      },
      Trader: {
        emoji: '📈',
        objective: 'Build Capital & Develop a System',
        mindset: 'My job funds my trading education. My primary goal is survival and consistency, not riches.',
        blueprint: [
          'Segregate capital in a dedicated brokerage account with consistent funding.',
          'Write down a trading plan with strategy, criteria and position sizing.',
          'Define your max risk per trade and stick to it every time.',
          'Log every trade with thesis, emotions and chart screenshots.'
        ],
        kpis: [
          'Trading plan adherence %',
          'Journal consistency (days/week)',
          'Maximum drawdown %'
        ]
      },
      Philomath: {
        emoji: '📚',
        objective: 'Absorb Systems & Deep Knowledge',
        mindset: 'This job is a living case study. I will understand it better than anyone else.',
        blueprint: [
          'Learn why each process exists, not just how.',
          'Practice a force multiplier skill weekly (e.g. Python, storytelling).',
          'Read industry reports, filings or trade journals regularly.',
          'Build a personal knowledge base that documents key systems and players.'
        ],
        kpis: [
          'Systems documented',
          'Courses or certifications completed',
          'Industry research pieces read'
        ]
      }
    }
  },
  2: {
    level: 'Level 2: The Self-Employed',
    subtitle: 'The Proving Ground',
    archetypes: {
      Entrepreneur: {
        emoji: '🧑‍🚀',
        objective: 'Achieve Product-Market Fit & Cash Flow',
        mindset: 'I am not a freelancer; I am the founder of a one-person business.',
        blueprint: [
          'Niche down to be the go-to person for a specific problem.',
          'Productize your service with clear packages and pricing.',
          'Create a daily non-negotiable sales block.',
          'Pay yourself a salary from a separate business bank account.'
        ],
        kpis: [
          'Monthly recurring revenue',
          'Client acquisition cost',
          'Profit margin %'
        ]
      },
      Trader: {
        emoji: '🧠',
        objective: 'Achieve Consistent Profitability',
        mindset: 'I am not a gambler; I am a risk manager who owns a trading business.',
        blueprint: [
          'Set up a legal entity to formalise your trading business.',
          'Build pre- and post-market routines to manage psychology.',
          'Explain your trading edge in one sentence.',
          'Hold 6-12 months of living expenses in cash.'
        ],
        kpis: [
          'Monthly P&L consistency %',
          'Sharpe ratio',
          'Adherence to drawdown rules %'
        ]
      },
      Philomath: {
        emoji: '✨',
        objective: 'Monetise Your Expertise',
        mindset: 'My knowledge is a valuable asset that can be packaged and sold.',
        blueprint: [
          'Launch a platform (newsletter, blog or channel) to share expertise.',
          'Create a paid knowledge product (ebook, workshop or cohort).',
          'Run a consistent content calendar with distribution system.',
          'Collect testimonials from people helped by your knowledge.'
        ],
        kpis: [
          'Email subscribers',
          'Content engagement rate %',
          'Knowledge product revenue'
        ]
      }
    }
  },
  3: {
    level: 'Level 3: The Business Owner',
    subtitle: 'Building the Machine',
    archetypes: {
      Entrepreneur: {
        emoji: '🏢',
        objective: 'Systematise & Scale Through People',
        mindset: 'My job is to build a company that no longer depends on me.',
        blueprint: [
          'Hire for weaknesses and elevate your role to CEO.',
          'Document core processes as living SOPs.',
          'Implement an operating system like EOS or OKRs.',
          'Build a leadership dashboard to review weekly.'
        ],
        kpis: [
          'Team engagement score',
          'SOPs documented',
          'Weekly scorecard metrics hit'
        ]
      },
      Trader: {
        emoji: '🛰️',
        objective: 'Scale Your Edge with Systems',
        mindset: 'I lead a research-driven trading company with rules, not vibes.',
        blueprint: [
          'Automate risk management and journaling workflows.',
          'Develop research sprints with defined hypotheses.',
          'Diversify strategies to reduce correlation.',
          'Form accountability partnerships or a small team.'
        ],
        kpis: [
          'Systems automated',
          'Research sprints completed',
          'Strategy correlation score'
        ]
      },
      Philomath: {
        emoji: '🧭',
        objective: 'Lead a Knowledge Enterprise',
        mindset: 'I build a guild of experts with shared principles and IP.',
        blueprint: [
          'License or franchise your intellectual property.',
          'Build a team of facilitators or contributors.',
          'Create a flagship event or community space.',
          'Invest in brand assets (design, media, partnerships).'
        ],
        kpis: [
          'Team members onboarded',
          'Flagship community engagement',
          'Licensing revenue'
        ]
      }
    }
  }
};

const randomChallenges = [
  'Host a 20-minute office hours call for your audience.',
  'Design a one-page scorecard for the next 7 days.',
  'Reach out to a mentor and ask one burning question.',
  'Ship a tiny product update or create a new freebie.',
  'Turn a recent mistake into a playbook entry.',
  'Record a 2-minute Loom summarising today’s wins.',
  'Automate one repetitive task using a no-code tool.',
  'Teach a friend a concept you mastered this month.'
];

function defaultState() {
  const state = {
    level: '1',
    archetype: 'Entrepreneur',
    coins: 0,
    streak: {
      count: 0,
      lastCompleted: null
    },
    data: {},
    lastShareCode: ''
  };

  for (const level of Object.keys(canvasData)) {
    state.data[level] = {};
    for (const archetype of Object.keys(canvasData[level].archetypes)) {
      state.data[level][archetype] = {
        blueprint: {},
        kpis: {},
        xp: 0
      };
    }
  }
  return state;
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultState();
    const parsed = JSON.parse(saved);
    return { ...defaultState(), ...parsed };
  } catch (error) {
    console.error('Failed to load state', error);
    return defaultState();
  }
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(value) {
  if (value === undefined || value === null) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function encodeToBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function decodeFromBase64(str) {
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

const uiState = {
  inspiration: null,
  loadingInspiration: false,
  lastChallenge: null,
  toast: null
};

let state = loadState();

function ensureArchetypeState(level, archetype) {
  if (!state.data[level]) state.data[level] = {};
  if (!state.data[level][archetype]) {
    state.data[level][archetype] = { blueprint: {}, kpis: {}, xp: 0 };
  }
  return state.data[level][archetype];
}

function calculateCompletion(level, archetype) {
  const current = canvasData[level].archetypes[archetype];
  const saved = ensureArchetypeState(level, archetype);
  const total = current.blueprint.length;
  const completed = current.blueprint.filter((item) => saved.blueprint[item]).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { completed, total, percent };
}

function updateCoins(amount) {
  state.coins = Math.max(0, state.coins + amount);
}

function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);
  if (state.streak.lastCompleted === today) return;
  if (!state.streak.lastCompleted) {
    state.streak.count = 1;
  } else {
    const diff = (new Date(today) - new Date(state.streak.lastCompleted)) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      state.streak.count += 1;
    } else if (diff > 1) {
      state.streak.count = 1;
    }
  }
  state.streak.lastCompleted = today;
}

function handleBlueprintToggle(level, archetype, item) {
  const saved = ensureArchetypeState(level, archetype);
  const wasComplete = !!saved.blueprint[item];
  saved.blueprint[item] = !wasComplete;
  if (!wasComplete) {
    saved.xp += 10;
    updateCoins(15);
    updateStreak();
    showToast('Blueprint step logged! +15 coins');
  } else {
    saved.xp = Math.max(0, saved.xp - 10);
    updateCoins(-15);
  }
  persistState();
  render();
}

function handleKpiChange(level, archetype, kpi, value) {
  const saved = ensureArchetypeState(level, archetype);
  saved.kpis[kpi] = value;
  persistState();
}

function switchLevel(level) {
  state.level = level;
  const archetypes = Object.keys(canvasData[level].archetypes);
  if (!archetypes.includes(state.archetype)) {
    state.archetype = archetypes[0];
  }
  persistState();
  render();
}

function switchArchetype(archetype) {
  state.archetype = archetype;
  persistState();
  render();
}

function resetProgress() {
  if (!confirm('Reset all progress? This cannot be undone.')) return;
  state = defaultState();
  uiState.inspiration = null;
  uiState.lastChallenge = null;
  persistState();
  render();
}

function encodeProgress() {
  const payload = {
    coins: state.coins,
    streak: state.streak,
    data: state.data
  };
  return encodeToBase64(JSON.stringify(payload));
}

function decodeProgress(code) {
  const json = decodeFromBase64(code.trim());
  const parsed = JSON.parse(json);
  return parsed;
}

function copyProgress() {
  const code = encodeProgress();
  state.lastShareCode = code;
  persistState();
  navigator.clipboard
    .writeText(code)
    .then(() => showToast('Progress code copied! Share it to sync on another device.'))
    .catch(() => showToast('Copy failed. You can manually copy the code below.'));
  render();
}

function importProgress(code) {
  try {
    const parsed = decodeProgress(code);
    state = {
      ...defaultState(),
      level: state.level,
      archetype: state.archetype,
      coins: parsed.coins ?? 0,
      streak: parsed.streak ?? { count: 0, lastCompleted: null },
      data: { ...defaultState().data, ...(parsed.data || {}) },
      lastShareCode: code
    };
    persistState();
    showToast('Progress imported successfully!');
    render();
  } catch (error) {
    console.error('Import failed', error);
    showToast('Unable to import progress. Check the code and try again.');
  }
}

function showToast(message) {
  uiState.toast = message;
  renderToast();
  setTimeout(() => {
    if (uiState.toast === message) {
      uiState.toast = null;
      renderToast();
    }
  }, 3200);
}

function renderToast() {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.style.position = 'fixed';
    container.style.bottom = '32px';
    container.style.right = '32px';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
  }
  container.innerHTML = uiState.toast
    ? `<div class="toast">${uiState.toast}</div>`
    : '';
}

function render() {
  const { level, archetype } = state;
  const current = canvasData[level];
  const currentArchetype = current.archetypes[archetype];
  const saved = ensureArchetypeState(level, archetype);
  const completion = calculateCompletion(level, archetype);
  const dailyQuest = getDailyQuest();

  const root = document.getElementById('app');
  root.innerHTML = `
    <header class="hero">
      <h1>Game of Wealth</h1>
      <p>Your interactive wealth career simulator. Unlock archetypes, log your moves, earn coins and keep a streak as you grow from employee to empire builder.</p>
      <div class="status-bar">
        <span class="status-chip"><span class="dot"></span>Level ${level}</span>
        <span class="status-chip">${currentArchetype.emoji} ${archetype}</span>
        <span class="status-chip">💰 ${state.coins} coins</span>
        <span class="status-chip">🔥 Streak: ${state.streak.count} days</span>
      </div>
    </header>

    <section class="glass-panel">
      <div class="section-heading">
        <h2>Choose Your Stage</h2>
        <p>Every stage unlocks new wealth mechanics.</p>
      </div>
      <div class="level-selector">
        ${Object.keys(canvasData)
          .map(
            (lvl) => `
              <button class="${lvl === level ? 'active' : ''}" data-level="${lvl}">
                Level ${lvl}
              </button>
            `
          )
          .join('')}
      </div>
      <div class="section-heading" style="margin-top:1.75rem;">
        <h2>Pick Your Archetype</h2>
        <p>Switch any time to explore different play styles.</p>
      </div>
      <div class="archetype-tabs">
        ${Object.keys(current.archetypes)
          .map(
            (arch) => `
              <button class="${arch === archetype ? 'active' : ''}" data-archetype="${arch}">
                ${current.archetypes[arch].emoji} ${arch}
              </button>
            `
          )
          .join('')}
      </div>
    </section>

    <section class="grid two-column">
      <article class="card">
        <h3><span class="emoji">🎯</span> Core Objective</h3>
        <p>${currentArchetype.objective}</p>
      </article>
      <article class="card">
        <h3><span class="emoji">🧠</span> Mindset Shift</h3>
        <p><em>"${currentArchetype.mindset}"</em></p>
      </article>
      <article class="card">
        <h3><span class="emoji">🛠️</span> Action Blueprint</h3>
        <div class="progress-bar" aria-hidden="true">
          <span style="transform: scaleX(${completion.percent / 100});"></span>
        </div>
        <small>${completion.completed}/${completion.total} complete (${completion.percent}% mastery)</small>
        <ul>
          ${currentArchetype.blueprint
            .map((item) => {
              const checked = saved.blueprint[item] ? 'checked' : '';
              const completedClass = saved.blueprint[item] ? 'style="text-decoration:line-through;color:var(--text-dim);"' : '';
              return `
                <li>
                  <input type="checkbox" class="blueprint-toggle" data-item="${encodeURIComponent(item)}" ${checked} />
                  <span ${completedClass}>${item}</span>
                </li>
              `;
            })
            .join('')}
        </ul>
      </article>
      <article class="card">
        <h3><span class="emoji">📊</span> Key Metrics</h3>
        <div class="grid">
          ${currentArchetype.kpis
            .map((kpi) => {
              const value = saved.kpis[kpi] || '';
              return `
                <label>
                  <small>${kpi}</small>
                  <input type="text" data-kpi="${encodeURIComponent(kpi)}" value="${escapeHtml(value)}" placeholder="Track your progress" />
                </label>
              `;
            })
            .join('')}
        </div>
      </article>
    </section>

    <section class="grid">
      <article class="card reward-banner">
        <div class="badge">🏆</div>
        <div>
          <h3>XP Earned: ${saved.xp}</h3>
          <p>Every blueprint action gives 10 XP and 15 coins. Keep stacking wins to grow your streak bonus.</p>
        </div>
      </article>

      <article class="card daily-quest">
        <h3>Daily Quest</h3>
        <p>${escapeHtml(dailyQuest)}</p>
        <div class="actions">
          <button id="new-quest">Shuffle Quest</button>
          <button class="secondary" id="log-quest">Quest Complete</button>
        </div>
      </article>

      <article class="card">
        <h3><span class="emoji">🎲</span> Random Challenge Generator</h3>
        <p>${escapeHtml(uiState.lastChallenge || 'Press the button for an instant experiment to spice up your momentum.')}</p>
        <button id="random-challenge">Roll a Challenge</button>
      </article>

      <article class="card api-card">
        <h3><span class="emoji">✨</span> Inspiration API Boost</h3>
        <p>${escapeHtml(uiState.inspiration || 'Tap into the free Advice Slip API for a fresh nudge.')}</p>
        <button id="fetch-inspiration" ${uiState.loadingInspiration ? 'disabled' : ''}>
          ${uiState.loadingInspiration ? 'Summoning...' : 'Summon Inspiration'}
        </button>
      </article>

      <article class="card">
        <h3><span class="emoji">🔄</span> Sync & Share</h3>
        <div class="sync-row">
          <button id="copy-progress">Copy Progress Code</button>
          <textarea id="sync-code" placeholder="Paste a shared code here to import">${state.lastShareCode || ''}</textarea>
          <div class="actions">
            <button class="secondary" id="import-progress">Import Code</button>
            <button class="danger" id="reset-progress">Reset Everything</button>
          </div>
          <small>No accounts needed! Copy the code, paste it on another device and import to stay synced.</small>
        </div>
      </article>

      <article class="card">
        <h3><span class="emoji">📛</span> Achievement Radar</h3>
        <div class="badge-grid">
          ${renderBadges(level, archetype, completion)}
        </div>
      </article>

      <details>
        <summary>What is this?</summary>
        <p>Game of Wealth is a free interactive planning tool. It runs entirely in your browser, keeps your data locally, and lets you share progress via encoded sync codes. Daily quests and inspiration are fetched from open APIs so you always have a fresh challenge.</p>
      </details>
    </section>

    <footer>
      Built with love for ambitious builders. Keep compounding.<br />
      <small>Tip: Add this page to your homescreen for a native-app feel.</small>
    </footer>
  `;

  attachEventHandlers();
}

function renderBadges(level, archetype, completion) {
  const badges = [];
  if (completion.percent >= 25) badges.push({ title: 'Momentum Starter', description: '25% of blueprint complete' });
  if (completion.percent >= 50) badges.push({ title: 'Strategist', description: 'Halfway to mastery' });
  if (completion.percent >= 75) badges.push({ title: 'Closer', description: 'Three quarters done' });
  if (completion.percent === 100) badges.push({ title: 'Blueprint Master', description: 'All actions executed' });
  if (state.streak.count >= 3) badges.push({ title: 'Streak Runner', description: '3 day streak maintained' });
  if (state.coins >= 100) badges.push({ title: 'Capital Builder', description: '100+ coins earned' });

  if (badges.length === 0) {
    badges.push({ title: 'Explorer', description: 'Start logging actions to unlock badges.' });
  }

  return badges
    .map(
      (badge) => `
        <div class="badge">
          <div class="title">${badge.title}</div>
          <div class="subtitle">${badge.description}</div>
        </div>
      `
    )
    .join('');
}

function attachEventHandlers() {
  document.querySelectorAll('[data-level]').forEach((button) => {
    button.addEventListener('click', () => switchLevel(button.dataset.level));
  });

  document.querySelectorAll('[data-archetype]').forEach((button) => {
    button.addEventListener('click', () => switchArchetype(button.dataset.archetype));
  });

  document.querySelectorAll('.blueprint-toggle').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const item = decodeURIComponent(checkbox.dataset.item);
      handleBlueprintToggle(state.level, state.archetype, item);
    });
  });

  document.querySelectorAll('input[data-kpi]').forEach((input) => {
    input.addEventListener('input', (event) => {
      const kpi = decodeURIComponent(event.target.dataset.kpi);
      handleKpiChange(state.level, state.archetype, kpi, event.target.value);
    });
  });

  const inspirationButton = document.getElementById('fetch-inspiration');
  if (inspirationButton) {
    inspirationButton.addEventListener('click', fetchInspiration);
  }

  const challengeButton = document.getElementById('random-challenge');
  if (challengeButton) {
    challengeButton.addEventListener('click', rollChallenge);
  }

  const copyButton = document.getElementById('copy-progress');
  if (copyButton) {
    copyButton.addEventListener('click', copyProgress);
  }

  const importButton = document.getElementById('import-progress');
  if (importButton) {
    importButton.addEventListener('click', () => {
      const textarea = document.getElementById('sync-code');
      if (textarea.value.trim().length === 0) {
        showToast('Paste a sync code first.');
        return;
      }
      importProgress(textarea.value);
    });
  }

  const resetButton = document.getElementById('reset-progress');
  if (resetButton) {
    resetButton.addEventListener('click', resetProgress);
  }

  const questButton = document.getElementById('new-quest');
  if (questButton) {
    questButton.addEventListener('click', () => {
      refreshDailyQuest(true);
      render();
    });
  }

  const questComplete = document.getElementById('log-quest');
  if (questComplete) {
    questComplete.addEventListener('click', () => {
      updateCoins(25);
      updateStreak();
      persistState();
      showToast('Quest complete! +25 coins');
      render();
    });
  }
}

async function fetchInspiration() {
  try {
    uiState.loadingInspiration = true;
    render();
    const response = await fetch(`https://api.adviceslip.com/advice?timestamp=${Date.now()}`);
    if (!response.ok) throw new Error('Network response not ok');
    const data = await response.json();
    uiState.inspiration = `“${data.slip.advice}”`;
  } catch (error) {
    console.error('Failed to fetch advice', error);
    uiState.inspiration = 'Could not fetch advice. Try again later!';
  } finally {
    uiState.loadingInspiration = false;
    render();
  }
}

function rollChallenge() {
  const randomIndex = Math.floor(Math.random() * randomChallenges.length);
  uiState.lastChallenge = randomChallenges[randomIndex];
  render();
}

function getDailyQuest() {
  const today = new Date().toISOString().slice(0, 10);
  let stored = localStorage.getItem(DAILY_QUEST_KEY);
  if (stored) {
    try {
      stored = JSON.parse(stored);
      if (stored.date === today && stored.quest) {
        return stored.quest;
      }
    } catch (error) {
      console.error('Failed to parse quest', error);
    }
  }
  return refreshDailyQuest(false);
}

function refreshDailyQuest(force) {
  const quest = randomChallenges[Math.floor(Math.random() * randomChallenges.length)];
  const today = new Date().toISOString().slice(0, 10);
  const payload = { date: today, quest };
  localStorage.setItem(DAILY_QUEST_KEY, JSON.stringify(payload));
  if (force) showToast('New quest unlocked!');
  return quest;
}

render();
renderToast();
