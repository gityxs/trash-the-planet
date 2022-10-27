export const TICK_RATE = 1000;
export const TICK_RATE_10FPS = 100;
export const TICK_RATE_SAVE_GAME = 10000;

export const FRAME_RATE_JOBS = 10;

// On some browsers, the progress bar doesn't appear to hit 100% before resetting.
// This constant should account for that and give the impression of jobs completing.
export const PROGRESS_BAR_WIDTH_EXTENSION_FACTOR = 1.05;

export const PANEL_CROSSFADE_DELAY = 100;

export const CHAT_FIRST_MESSAGE_KEY_NAME = 'start';
export const INCOMING_CHAT_AUTOMATIC_ANSWER_DELAY = 5000;
export const CHAT_DELAY = 2000;

export const LARGE_NUMBERS = {
  ONE_MILLION: 1000000,
  ONE_BILLION: 1000000000,
  ONE_TRILLION: 1000000000000,
  ONE_QUADRILLION: 1000000000000000,
};

export const ABILITY_STATES = {
  READY: 'ready',
  ACTIVE: 'active',
  COOLDOWN: 'cooldown',
};

export const ABILITY_KEY_CODES = {
  culture: 81, // Q
  death: 87, // W
  finance: 69, // E
  naturalResources: 82, // R
};

// Investments

export const INDUSTRY_NAMES = {
  CULTURE: 'culture',
  DEATH: 'death',
  FINANCE: 'finance',
  NATURAL_RESOURCES: 'naturalResources',
};

export const INVESTMENT_MODES = {
  BUY: 'buy',
  SELL: 'sell',
};

export const INVESTMENT_NAMES_BY_KEYCODE = {
  49: INDUSTRY_NAMES.CULTURE,
  50: INDUSTRY_NAMES.DEATH,
  51: INDUSTRY_NAMES.FINANCE,
  52: INDUSTRY_NAMES.NATURAL_RESOURCES,
};

export const MAX_SHARE_LEVEL = 10;
export const TRASH_PER_INVESTMENT = 1;
export const MAX_GLOBAL_BUSINESS_LEVEL = 40;

export const MAX_SHARES_PER_LEVEL = [9, 99, 999, 9999, 99999, 999999, 9999999, 99999999, 999999999, 9999999999];
export const MIN_SHARES_PER_LEVEL = [
  0, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000,
];
export const SHARES_TO_BUY_PER_LEVEL = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000];

// Abilities

export const ROLL_THE_BONES_PHASES = {
  OPEN: 'open',
  WAGER: 'wager',
  ROLLING: 'rolling',
  RESULT: 'result',
  CLOSED: 'closed',
};

export const ROLL_THE_BONES_OUTCOMES = {
  WIN: 'win',
  LOSE: 'lose',
  DRAW: 'draw',
};

// Charts and trash data
export const TRASH_PRICES_TO_REMEMBER = 100;
export const CHART_HEIGHT = 200; // pixels
export const CHART_X_MULTIPLIER = 5; // pixels

export const COLOR_PHONE_SCREEN_OFF = '#141f18';

export const JOB_TO_FLAG_NAME = {
  gatherFood: 'glowJobGatherFood',
  gatherTrash: 'glowJobGatherTrash',
  sortTrash: 'glowJobSortTrash',
};

export const PANE_NAMES = {
  BUILD: 'Build',
  BUSINESS_BOTANY: 'Business Botany',
  RESEARCH: 'Research',
};

export const PHONE_MODES = {
  CONVERSATION: 'Conversation',
  CONVERSATIONS: 'Conversations',
  STATUS: 'Status',
  STONKS: 'Stonks',
};

export const GAME_VERSION = '2.1.0';
export const TGIH_URL = 'https://thisgameishaunted.itch.io/';
