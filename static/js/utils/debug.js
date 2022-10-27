import { PHONE_MODES } from './constants';
import { playMusicFirstTime } from '../scripts/audio';
import { toggleFullScreen, toggleOptionsMenu } from '../scripts/gameplay';
import { answerPhone, beginConversation, notifyOfBackgroundConversation } from '../scripts/gameplay/phone';
import { setInitialOptionsFromLocalStorage } from '../scripts/init';

import {
  conversations as conversationData,
  CONVERSATION_NAMES,
  debugSaveFiles,
  narrativeChoices,
  research,
} from '../data';

/**
 * Listens for debug key commands and performs useful functions for developing the game.
 * @param {object} e - the event object from the keypress
 */
export async function omgHax(e) {
  if (this.state.isFreshReload && !this.state.isTitleScreenActive && !this.state.isTitleScreenVisible) return;

  if (this.state.isFreshReload && this.state.isTitleScreenActive) {
    if (e.keyCode === 78 || e.keyCode === 89 || e.keyCode === 13 || e.keyCode === 32) {
      if (e.keyCode === 78) {
        await playMusicFirstTime.bind(this, {
          target: {
            name: 'audioOff',
          },
        })();
      } else {
        await playMusicFirstTime.bind(this, {
          target: {
            name: 'audioOn',
          },
        })();
      }

      this.setState({
        isFreshReload: false,
      });
    }
  }

  // Reset code attempt if at 5 characters
  if (this.debugCode.length >= 5 || e.keyCode === 27) {
    this.debugCode = '';
  }

  // Tab should always toggle the options menu
  if (
    e.keyCode === 9 &&
    !this.state.isTitleScreenActive &&
    !this.state.phone.isInNewConversation &&
    !this.state.flags.isCutscenePlaying &&
    (this.state.currentPhaseIndex < 3 || (this.state.currentPhaseIndex === 4 && this.state.flags.act5.isShowingCredits))
  ) {
    toggleOptionsMenu.bind(this)();
  } else if (e.keyCode === 70) {
    // Toggle full screen
    toggleFullScreen();
  } else if (this.state.popUp.isActive && !this.state.isTitleScreenActive && (e.keyCode === 13 || e.keyCode === 32)) {
    // If a popup is open, close it with either enter or space
    this.hidePopUp();
  } else if ((e.keyCode === 17 || e.keyCode === 18) && !this.state.isGamePaused) {
    // Show hotkeys
    this.setState({ areHotkeysVisible: true });
  } else if (e.keyCode >= 65 && e.keyCode <= 90) {
    this.debugCode += e.key.toLowerCase();

    // Validate current debug code and reset if it's not on-track
    for (let i = 0; i < this.debugCode.length; i++) {
      if (this.debugCode.charAt(i) !== 'iddqd'.charAt(i)) {
        this.debugCode = '';
      }
    }

    if (this.debugCode === 'iddqd') {
      // Toggle debug mode
      this.setState(
        {
          isDebugMode: !this.state.isDebugMode,
        },
        () => {
          window.localStorage.setItem('debug', JSON.stringify(this.state.isDebugMode));

          if (this.state.isDebugMode) {
            this.postMessage({
              text: [
                'Debug Mode Enabled',
                '',
                'Commands:',
                `• - / +: Add/subtract raccoons`,
                '• PageUp / PageDown: Add/subtract resources',
                `• P: Show/hide an example pop-up message`,
                `• N: Show/hide an example narrative choice`,
                `• V: Toggle phone vibration`,
                `• C: Toggle phone conversation`,
                `• S: Quicksave`,
                `• L: Quickload`,
                `• Option/Alt + 1–5: Jump to a new game at Acts I-V`,
                `• Delete/Backspace: Clear local storage`,
              ],
              isDebug: true,
            });
          } else {
            this.postMessage({ text: `Debug Mode Disabled`, isDebug: true });
          }
        }
      );
    }
  }

  if (this.state.isDebugMode) {
    if (e.keyCode === 173 && this.state.unassignedRaccoons > 0) {
      // Minus - reduce unassigned raccoons
      this.setState({
        unassignedRaccoons: this.state.unassignedRaccoons - 1,
      });
    } else if (e.keyCode === 61) {
      // Plus - increase unassiged raccoons
      this.setState({
        unassignedRaccoons: this.state.unassignedRaccoons + 1,
      });
    } else if (e.keyCode === 33) {
      // PageUp - increase resources by 100
      this.setState({
        resources: {
          ...this.state.resources,
          bones: {
            ...this.state.resources.bones,
            amount: this.state.resources.bones.amount + 100,
          },
          businessBeans: {
            ...this.state.resources.businessBeans,
            amount: this.state.resources.businessBeans.amount + 1,
          },
          cloth: {
            ...this.state.resources.cloth,
            amount: this.state.resources.cloth.amount + 100,
          },
          food: {
            ...this.state.resources.food,
            amount: this.state.resources.food.amount + 100,
          },
          metal: {
            ...this.state.resources.metal,
            amount: this.state.resources.metal.amount + 100,
          },
          paper: {
            ...this.state.resources.paper,
            amount: this.state.resources.paper.amount + 100,
          },
          plastic: {
            ...this.state.resources.plastic,
            amount: this.state.resources.plastic.amount + 100,
          },
          trash: {
            ...this.state.resources.trash,
            amount: this.state.resources.trash.amount + 100,
          },
          wood: {
            ...this.state.resources.wood,
            amount: this.state.resources.wood.amount + 100,
          },
        },
      });
    } else if (e.keyCode === 34) {
      // PageDown - decrease resources by 100
      this.setState({
        resources: {
          ...this.state.resources,
          bones: {
            ...this.state.resources.bones,
            amount: this.state.resources.bones.amount - 100 < 0 ? 0 : this.state.resources.bones.amount - 100,
          },
          businessBeans: {
            ...this.state.resources.businessBeans,
            amount:
              this.state.resources.businessBeans.amount - 1 < 0 ? 0 : this.state.resources.businessBeans.amount - 1,
          },
          cloth: {
            ...this.state.resources.cloth,
            amount: this.state.resources.cloth.amount - 100 < 0 ? 0 : this.state.resources.cloth.amount - 100,
          },
          food: {
            ...this.state.resources.food,
            amount: this.state.resources.food.amount - 100 < 0 ? 0 : this.state.resources.food.amount - 100,
          },
          metal: {
            ...this.state.resources.metal,
            amount: this.state.resources.metal.amount - 100 < 0 ? 0 : this.state.resources.metal.amount - 100,
          },
          paper: {
            ...this.state.resources.paper,
            amount: this.state.resources.paper.amount - 100 < 0 ? 0 : this.state.resources.paper.amount - 100,
          },
          plastic: {
            ...this.state.resources.plastic,
            amount: this.state.resources.plastic.amount - 100 < 0 ? 0 : this.state.resources.plastic.amount - 100,
          },
          trash: {
            ...this.state.resources.trash,
            amount: this.state.resources.trash.amount - 100 < 0 ? 0 : this.state.resources.trash.amount - 100,
          },
          wood: {
            ...this.state.resources.wood,
            amount: this.state.resources.wood.amount - 100 < 0 ? 0 : this.state.resources.wood.amount - 100,
          },
        },
      });
    } else if (e.keyCode === 8 || e.keyCode === 46) {
      // Clear localStorage
      window.localStorage.clear();
      this.postMessage({ text: 'localStorage cleared. Resetting to default values.', isDebug: true });
      this.setState({ isDebugMode: false });

      setInitialOptionsFromLocalStorage.bind(this)();
    } else if (e.keyCode === 80 && !this.state.isTitleScreenActive) {
      if (!this.state.popUp.isActive) {
        const researchKeys = Object.keys(research);
        const keyToUse = Math.floor(Math.random() * researchKeys.length);

        this.showPopUp(research[researchKeys[keyToUse]].popUp);
      } else {
        this.hidePopUp();
      }
    } else if (e.keyCode === 78 && !this.state.isTitleScreenActive) {
      if (!this.state.narrativeChoice.isActive) {
        const narrativeChoiceKeys = Object.keys(narrativeChoices);
        const keyToUse = Math.floor(Math.random() * narrativeChoiceKeys.length);

        this.showNarrativeChoice(narrativeChoiceKeys[keyToUse]);
      } else {
        this.hideNarrativeChoice();
      }
    } else if (e.keyCode === 86 && !this.state.isTitleScreenActive) {
      // Toggle phone vibration
      if (!this.state.phone.isVibrating) {
        this.setState(
          {
            phone: {
              ...this.state.phone,
              isInConversation: false,
              isFocused: false,
              isVibrating: true,
            },
          },
          () => {
            beginConversation.bind(this, conversationData.main1)();
          }
        );
      } else {
        this.setState(
          {
            phone: {
              ...this.state.phone,
              isFocused: false,
              isVibrating: false,
            },
          },
          () => {
            window.clearTimeout(this.incomingConversationTimeout);
          }
        );
      }
    } else if (e.keyCode === 67 && !this.state.isTitleScreenActive) {
      if (!this.state.phone.isFocused) {
        this.setState(
          {
            isGamePaused: true,
            phone: {
              ...this.state.phone,
              currentConversation: conversationData.tutorial,
              isFocused: true,
              isVibrating: false,
            },
          },
          () => {
            answerPhone.bind(this)();
          }
        );
      } else {
        this.setState({
          phone: {
            ...this.state.phone,
            currentMode: PHONE_MODES.CONVERSATIONS,
            isFocused: false,
            isInConversation: false,
          },
        });
      }
    } else if (e.keyCode === 66 && !this.state.isTitleScreenActive) {
      // Trigger background conversation
      notifyOfBackgroundConversation.bind(this, CONVERSATION_NAMES.MONEY_BABY_1)();
    } else if (e.keyCode === 83) {
      this.postMessage({ text: 'Quicksaved the game. Press L to load it.' });
      window.localStorage.setItem('quickSave', JSON.stringify(this.state));
    } else if (e.keyCode === 76 && !this.state.isTitleScreenActive) {
      const savedGameState = window.localStorage.getItem('quickSave');
      window.localStorage.setItem('gameState', savedGameState);
      window.localStorage.setItem('reloadedGameFromOptionsMenu', true);
      window.location.reload();
    } else if (e.keyCode >= 49 && e.keyCode <= 54 && e.altKey) {
      const act = e.keyCode - 48;
      const newGameState = debugSaveFiles[`act${act}`];

      if (!Object.keys(newGameState).length) {
        console.warn(`DEBUG: Act ${act} save state not yet implemented in utils/debugSaveFiles.js.`);
      } else {
        window.localStorage.setItem('gameState', JSON.stringify(newGameState));
        window.location.reload();
      }
    }
  }
}
