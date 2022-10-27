import React from 'react';

import {
  FRAME_RATE_JOBS,
  JOB_TO_FLAG_NAME,
  LARGE_NUMBERS,
  MAX_SHARE_LEVEL,
  MAX_SHARES_PER_LEVEL,
  MIN_SHARES_PER_LEVEL,
} from './constants';
import { emojiNamesToCodes, emojiRegex, newlineRegex } from '../data';

import { Emoji } from '../components';

/* ================================ HELPERS ================================ */
// 1. Math and conversions
// 2. Text formatting
// 3. Object and array methods
// 4. React helpers
// 5. Game utilities
/* ========================================================================= */

/* ======================== 1. MATH AND CONVERSIONS ======================== */

export const convertSecondsToMinutes = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / (60 * FRAME_RATE_JOBS));
  const seconds = Math.floor((timeInSeconds / FRAME_RATE_JOBS) % 60);

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const getVW = (percent) =>
  Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) * (percent / 100);
export const getVH = (percent) =>
  Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) * (percent / 100);

/**
 * Takes an integer and returns the sum of all digits from that integer to zero, subtracting 1 each time
 * e.g.:
 *  nthTriangle(3) => 6; // 3 + 2 + 1
 *  nthTriangle(5) => 15; // 5 + 4 + 3 + 2 + 1
 *
 * Adapted from: http://theflyingkeyboard.net/algorithms/javascript-triangle-number/
 * @param {number} integer
 * @returns {number} the nth triangle of the given integer
 */
export function nthTriangle(integer) {
  return (integer * (integer + 1)) / 2;
}

/* ========================== 2. TEXT FORMATTING =========================== */

export function capitalizeFirstLetter(string) {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

/**
 * Cleanly formats numbers with super-tiny decimals so they don't mess up the layout or anything.
 * @param {number} number
 * @returns {string|number}
 */
export const formatInfinitesimalDecimal = (number) => (number < 1 / LARGE_NUMBERS.ONE_MILLION ? 'basically 0' : number);

export function formatLargeCurrency(dollars, hideDecimal, forceShowDecimal, hideDecimalIfZero) {
  // Account for when you have too much money for JavaScript to even process it
  if (dollars >= Number.MAX_SAFE_INTEGER) {
    return 'lol';
  }

  let unit = '';

  let dollarsString = forceShowDecimal ? String(dollars) : String(Math.floor(dollars));
  const numDigits = forceShowDecimal ? dollarsString.length - 3 : dollarsString.length;

  if (numDigits >= 16) {
    // quadrillions
    unit = 'Q';
  } else if (numDigits >= 13) {
    // trillions
    unit = 'T';
  } else if (numDigits >= 10) {
    // billions
    unit = 'B';
  } else if (numDigits >= 7) {
    // millions
    unit = 'M';
  } else if (numDigits >= 4) {
    // thousands
    unit = 'K';
  }

  const shouldShowDecimal = numDigits > 3;

  // Trim the string as needed
  let decimalPlaces = 1;
  if (numDigits % 3 === 1 || forceShowDecimal) {
    // decimal is one digit
    decimalPlaces = 2;
  }

  // Add decimal to string
  if (decimalPlaces && shouldShowDecimal && !forceShowDecimal) {
    const totalDigitsToShow = numDigits % 3 === 0 ? 4 : 3;
    const decimalPosition = totalDigitsToShow - decimalPlaces;

    dollarsString = hideDecimal
      ? dollarsString.slice(0, decimalPosition)
      : [dollarsString.slice(0, decimalPosition), '.', dollarsString.slice(decimalPosition, totalDigitsToShow)].join(
          ''
        );
  } else if (!forceShowDecimal) {
    dollarsString = dollarsString.slice(0, 3);
  }

  if (hideDecimalIfZero) {
    const decimalIndex = dollarsString.indexOf('.');
    const decimalString = dollarsString.substr(decimalIndex + 1);

    let nonZeroDecimal = false;
    for (let i = 0; i < decimalString.length; i++) {
      if (decimalString[i] !== '0') nonZeroDecimal = true;
    }

    if (!nonZeroDecimal) {
      dollarsString = dollarsString.substr(0, decimalIndex);
    }
  }

  return `${dollarsString}${unit}`;
}

/**
 * This function takes a string of message text and returns an array of JSX components.
 * For regular text, a <span> will be returned.
 * For emoji, an <Emoji> component with the correct `emoji` prop will be returned.
 * @param {string} text
 * @returns {array} - JSX components
 */
export const formatTextWithEmoji = (text) => {
  const splitText = text.split(emojiRegex);

  let textComponentArray = [];

  splitText.forEach((segment, i) => {
    if (segment.match(emojiRegex)) {
      const isNewline = segment.match(newlineRegex);

      if (isNewline) {
        textComponentArray.push(
          <div key={i}>
            <br />
          </div>
        );
      } else {
        textComponentArray.push(<Emoji key={i} name={getKeyByValue(emojiNamesToCodes, segment)} />);
      }
    } else {
      textComponentArray.push(<span key={i}>{segment}</span>);
    }
  });

  return textComponentArray;
};

/* ====================== 3. OBJECT AND ARRAY METHODS ====================== */

export const getKeyByValue = (object, value) => Object.keys(object).find((key) => object[key] === value);

/**
 * Shuffles an array based on the Fisher-Yates shuffle algorithm:
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
 * @param {array} array
 * @returns {array}
 */
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/* =========================== 4. REACT HELPERS ============================ */

/**
 * Asynchronously updates a React component's state by wrapping the request in a promise.
 * @param {object} state
 * @param {*} context - usually `this`
 * @returns a function call to React's `setState` method in the provided context
 */
export const setStateAsync = (state, context) => new Promise((resolve) => context.setState(state, resolve));

/**
 * Asynchronously sets a timer in milliseconds using `setTimeout`.
 * When the timer hits 0, the promise resolves.
 * @param {number} timeInMilliseconds
 * @returns a promise that resolves after `timeInMilliseconds` seconds
 */
export const sleep = (timeInMilliseconds) => new Promise((resolve) => setTimeout(resolve, timeInMilliseconds));

/* =========================== 5. GAME UTILITIES ============================ */

export const charactersToFullNames = {
  coolTeacher: 'Cool Teacher',
  dirt: 'Dirt',
  doc: 'Dr. Raccoon',
  moneyBaby: 'Money Baby',
  tk: 'TK',
  vanilla: 'Vanilla',
};

const beanCostPerUpgradeLevel = [1, 3, 6];
export const getBeansToSpendOnUpgrade = (level) => beanCostPerUpgradeLevel[level - 1];

export function getCurrentAct(currentPhaseIndex) {
  return currentPhaseIndex + 1;
}

export const getDelayModifier = (dialogueSpeed) => {
  return dialogueSpeed === 1 ? 1.25 : dialogueSpeed === 3 ? 0.5 : 1;
};

export function getFoodPenaltyFactor(totalRaccoons, foodAmount) {
  return totalRaccoons > foodAmount ? 0.5 : 1;
}

export const getHintFlag = (name) => {
  return JOB_TO_FLAG_NAME[name] && JOB_TO_FLAG_NAME[name].length ? JOB_TO_FLAG_NAME[name] : '';
};

/**
 * Finds the corresponding investment level based on number of shares you own in that industry.
 * @param {number} shareCount
 * @returns {number}
 */
export const getInvestmentLevelFromShareCount = (shareCount) => {
  let level = 0;

  if (shareCount > MAX_SHARES_PER_LEVEL[MAX_SHARES_PER_LEVEL.length - 1]) {
    level = MAX_SHARE_LEVEL;
  } else {
    for (let i = 0; i < MIN_SHARES_PER_LEVEL.length; i++) {
      if (shareCount >= MIN_SHARES_PER_LEVEL[i] && shareCount < MIN_SHARES_PER_LEVEL[i + 1]) {
        level = i;
        break;
      }
    }
  }

  return level;
};

export function getTotalRaccoons(unassignedRaccoons, jobsState) {
  const assignedRaccoons = jobsState.reduce((accumulator, job) => {
    return accumulator + job.raccoonsAssigned;
  }, 0);

  return unassignedRaccoons + assignedRaccoons;
}
