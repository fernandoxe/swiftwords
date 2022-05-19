const event = (
  eventName: string,
  event_label: string,
  non_interaction: boolean = false,
) => {
  const event_category = process.env.REACT_APP_TITLE;
  gtag('event', eventName, {
    event_category,
    event_label,
    non_interaction,
  });
};

const startGame = (random: boolean) => {
  event(`Start${random ? ' random' : ''} game`,
    `Start${random ? ' random' : ''} game`,
    true
  );
};

const startPlay = (random: boolean) => {
  event(`Start play${random ? ' random' : ''} game`,
    `Start play${random ? ' random' : ''} game`,
  );
};

const startAppLastGame = (word: string, winner: boolean) => {
  event('Start app last game',
    `${word} | ${winner}`,
    true
  );
};

const endGame = (random: boolean, date: string, word: string, winner: boolean, tries: number) => {
  event(`End${random ? ' random' : ''} game`,
    `${random ? '' : `${date} | `}${word} | ${winner} | ${tries}`,
    true
  );
};

const sendRow = (rowNumber: number) => {
  event('Send row',
    `${rowNumber}`
  );
};

const showResult = (winner: boolean) => {
  event('Show result',
    `${winner}`,
    true
  );
};

const clickResult = (random: boolean) => {
  event(`Click${random ? ' random' : ''} result`,
    'Click result'
  );
};

const clickChart = () => {
  event('Click chart',
    'Click chart'
  );
};

const clickHelp = () => {
  event('Click help',
    'Click help'
  );
};

const closeModal = (x: boolean) => {
  event('Click Close',
    `Click ${x ? 'X' : 'outside'}`
  );
};

const canShareError = () => {
  event('Can share error',
    'Can share error',
    true
  );
};

const canCopyError = () => {
  event('Can copy error',
    'Can copy error',
    true
  );
};

const share = (title: string, random: boolean, winner: boolean) => {
  event(`Share ${title}${random ? ' random' : ''} game`,
    `${winner}`
  );
};

const copy = (title: string, random: boolean, winner: boolean) => {
  event(`Copy ${title}${random ? ' random' : ''} game`,
    `${winner}`
  );
};

const shareError = (title: string, error: string) => {
  event(`Share ${title} error`,
    `${error}`,
    true
  );
};

const copyError = (error: string) => {
  event('Copy error',
    `${error}`,
    true
  );
};

const playRandom = (winner: boolean) => {
  event('Click play random',
    `${winner}`
  );
};

const getTodayWordError = (error: string) => {
  event('Get Today error',
    `${error}`,
    true
  );
};

const getRandomWordError = (error: string) => {
  event('Get Random error',
    `${error}`,
    true
  );
};

const openTwitter = (from: string) => {
  event(`Open Twitter`,
    `${from}`
  );
};

export const gtm = {
  startGame,
  startPlay,
  startAppLastGame,
  endGame,
  sendRow,
  showResult,
  clickResult,
  clickChart,
  clickHelp,
  closeModal,
  canShareError,
  canCopyError,
  share,
  copy,
  shareError,
  copyError,
  playRandom,
  getTodayWordError,
  getRandomWordError,
  openTwitter
};
