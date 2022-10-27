import React from 'react';
import styles from './App.module.scss';

import {
  Banner,
  BusinessBeanBanner,
  Credits,
  Goal,
  JobsPanel,
  Loading,
  MessagesPanel,
  NarrativeChoice,
  Options,
  Overlay,
  Phone,
  PopUp,
  ResourcesPanel,
  RollTheBones,
  TitleScreen,
  Tooltip,
  VideoBackground,
} from './components';

import { HotkeyVisibilityContext } from './contexts';
import { initialState } from './data';
import { getCurrentBGM, playMusicFirstTime, setAudioOptions, toggleMusicPlayPause, tryPlaySFX } from './scripts/audio';
import {
  beginBuild,
  beginResearch,
  buyShare,
  closeBusinessBeanBanner,
  getGlobalBusinessLevel,
  hidePopUp,
  postMessage,
  processJobsBuildAndResearch,
  putOutFire,
  removeFromBuildQueue,
  resumeGame,
  returnToTitleScreen,
  saveGame,
  sellShare,
  sellTrash,
  setDialogueSpeed,
  showPopUp,
  tick,
  toggleHintFlag,
  toggleOptionsMenu,
  updateAllocation,
} from './scripts/gameplay';
import {
  placeDoubleOrSomethingWager,
  setDebtorsVisionMultiplier,
  setRollTheBonesPhase,
  toggleAbilityUpgrade,
  toggleHossStyleTakeoverCheckbox,
  toggleVisibleHandEffect,
  tryActivateAbility,
  tryActivateAbilityViaHotkey,
} from './scripts/gameplay/abilities';
import { toggleBuySellMode } from './scripts/gameplay/investments';
import { addHonorific, hideNarrativeChoice, showNarrativeChoice } from './scripts/gameplay/narrativeChoices';
import {
  advanceToNextChatMessage,
  answerPhone,
  changePhoneMode,
  hangUpPhone,
  makeConversationChoice,
  showConversation,
} from './scripts/gameplay/phone';

import { cacheAssets, setInitialOptionsFromLocalStorage } from './scripts/init';

import { sfxFire } from './sfx';

import { getCurrentAct, getFoodPenaltyFactor, getTotalRaccoons } from './utils/helpers';
import { TICK_RATE, TICK_RATE_10FPS, TICK_RATE_SAVE_GAME } from './utils/constants';
import { omgHax } from './utils/debug';
import { hideTooltip, initializeTooltipSystem, showTooltip } from './utils/tooltip';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.musicPlayer = null;
    this.sfxPlayer = null;
    this.fireSfxPlayer = null;
    this.tooltip = null;

    this.incomingConversationTimeout = null;
    this.nextChatMessageTimeout = null;

    // Bind some useful imported methods to App's `this` context.
    this.updateAllocation = updateAllocation.bind(this);
    this.addHonorific = addHonorific.bind(this);
    this.beginBuild = beginBuild.bind(this);
    this.removeFromBuildQueue = removeFromBuildQueue.bind(this);
    this.beginResearch = beginResearch.bind(this);
    this.hideNarrativeChoice = hideNarrativeChoice.bind(this);
    this.showNarrativeChoice = showNarrativeChoice.bind(this);
    this.hidePopUp = hidePopUp.bind(this);
    this.showPopUp = showPopUp.bind(this);
    this.buyShare = buyShare.bind(this);
    this.sellShare = sellShare.bind(this);
    this.postMessage = postMessage.bind(this);
    this.getGlobalBusinessLevel = getGlobalBusinessLevel.bind(this);
    this.toggleBuySellMode = toggleBuySellMode.bind(this);
    this.toggleHintFlag = toggleHintFlag.bind(this);
    this.tryActivateAbility = tryActivateAbility.bind(this);
    this.getCurrentBGM = getCurrentBGM.bind(this);
    this.toggleMusicPlayPause = toggleMusicPlayPause.bind(this);

    this.debugCode = '';

    this.saveGameInterval = null;
  }

  componentDidMount() {
    cacheAssets(this);
    setInitialOptionsFromLocalStorage.bind(this)();

    // Start intervals
    this.saveGameInterval = window.setInterval(saveGame.bind(this), TICK_RATE_SAVE_GAME);
    window.setInterval(tick.bind(this), TICK_RATE);
    window.setInterval(processJobsBuildAndResearch.bind(this), TICK_RATE_10FPS);

    // Find the music player and SFX player
    this.musicPlayer = document.querySelector('audio#bgm');
    this.sfxPlayer = document.querySelector('audio#sfx');
    this.fireSfxPlayer = document.querySelector('audio#fireSfx');

    // Also find the tooltip
    this.tooltip = document.querySelector(`.${styles.tooltipWrapper}`);

    window.addEventListener('blur', () => {
      this.setState({
        isGamePaused: true,
      });
    });
    window.addEventListener('focus', () => {
      const shouldGameRemainPaused =
        this.state.isOptionsMenuActive ||
        this.state.narrativeChoice.isActive ||
        this.state.popUp.isActive ||
        this.state.phone.isInNewConversation ||
        this.state.isFreshReload;

      if (!shouldGameRemainPaused) {
        this.setState({
          isGamePaused: false,
        });
      }
    });

    window.addEventListener('mousedown', playMusicFirstTime.bind(this));
    window.addEventListener('keyup', tryActivateAbilityViaHotkey.bind(this));
    window.addEventListener('keydown', omgHax.bind(this));

    initializeTooltipSystem.bind(this)();
  }

  /**
   * Simple state check to ensure SFX should be played based on user settings and game state.
   * @returns {boolean} Whether SFX can be played at this time
   */
  canPlaySFX() {
    return this.state.options.audio.sfxOn && !this.state.isFreshReload;
  }

  /**
   * Convenience method for handling attempting to play sound effects in the game.
   * This allows us to move the main SFX logic into a separate script without having to bind to `this`.
   * @param {string} sfx - A pointer to the sound effect audio file
   * @param {boolean} _isLooping - Tells the audio element whether to loop (e.g., for a ringtone)
   */
  handleTryPlaySFX(sfx, _isLooping) {
    if (this.canPlaySFX()) {
      tryPlaySFX(sfx, _isLooping);
    }
  }

  /**
   * In Act IV, we should play a burning sound effect on loop until the UI has been completely incinerated.
   * It's simpler to keep this method in App rather than abstract it away.
   */
  async tryPlayFireSFX() {
    if (this.canPlaySFX()) {
      const audioOptions = JSON.parse(window.localStorage.getItem('audio'));

      this.fireSfxPlayer.src = sfxFire;
      this.fireSfxPlayer.volume = Number(audioOptions.sfxVolume);

      try {
        this.fireSfxPlayer.play();
      } catch (err) {
        console.log(err);
      }
    }
  }

  render() {
    const {
      areHotkeysVisible,
      buildQueue,
      build: buildState,
      businessBeanBanner,
      businessBotany: businessBotanyState,
      countdowns,
      currentPhaseIndex,
      currentResearch,
      fires,
      flags,
      honorifics,
      investments,
      investmentsMode,
      isAct1Ending,
      isFreshReload,
      isGamePaused,
      isLoading,
      isLoadingPercentage,
      isTitleScreenActive,
      isTitleScreenVisible,
      jobs: jobsState,
      money,
      narrativeChoice,
      options: { dialogueSpeed },
      overlay,
      phone,
      popUp,
      research: researchState,
      resources,
      saveTimestamp,
      statistics,
      time,
      tooltip,
      trashPrice,
      tutorialHighlights,
      unassignedRaccoons,
    } = this.state;

    const { minibarEatFoodUnlocked, minibarNewRaccoonsArriveUnlocked } = flags;

    const currentAct = getCurrentAct(currentPhaseIndex);
    const globalBusinessLevel = this.getGlobalBusinessLevel();
    const totalRaccoons = getTotalRaccoons(unassignedRaccoons, jobsState);
    const foodPenaltyFactor = getFoodPenaltyFactor(totalRaccoons, resources.food.amount);
    const currentBGM = this.getCurrentBGM();

    // Check to see if the game is paused and thus should stop showing hotkeys
    if (isGamePaused && areHotkeysVisible) {
      this.setState({
        areHotkeysVisible: false,
      });
    }

    return (
      <div
        className={`${styles.App} ${currentPhaseIndex === 0 ? styles.actOne : ''} ${
          styles['background' + String(this.state.currentPhaseIndex + 1)]
        }`}
      >
        <HotkeyVisibilityContext.Provider value={areHotkeysVisible}>
          {!isTitleScreenVisible && (
            <>
              {currentAct === 4 && <VideoBackground />}
              {currentAct === 5 && (
                <div
                  className={`${styles.act5InitialBackground} ${flags.act5.isHidingPanels ? styles.hidden : ''} ${
                    flags.act5.isHidingPanels ? styles.zooming : ''
                  }`}
                ></div>
              )}
              <JobsPanel
                act={currentAct}
                beginBuild={this.beginBuild.bind(this)}
                beginResearch={this.beginResearch.bind(this)}
                buildQueue={buildQueue}
                buildState={buildState}
                businessBotanyState={businessBotanyState}
                buyShare={this.buyShare.bind(this)}
                countdowns={countdowns}
                currentResearch={currentResearch}
                eatFoodCountdown={countdowns.eatFood}
                fires={fires}
                foodPenaltyFactor={foodPenaltyFactor}
                globalBusinessLevel={globalBusinessLevel}
                hideTooltip={hideTooltip.bind(this)}
                hintFlags={flags.hints}
                isLeftPanelShown={flags.act5.leftPanelShown}
                investments={investments}
                investmentsMode={investmentsMode}
                isAct1Ending={isAct1Ending}
                isAct5Ending={flags.act5.isHidingPanels}
                isBuildUnlocked={this.state.isBuildUnlocked}
                isFoodPenaltyActive={foodPenaltyFactor < 1}
                isResearchUnlocked={this.state.isResearchUnlocked}
                jobsState={jobsState}
                maximumRaccoons={this.state.maximumRaccoons}
                minibarEatFoodUnlocked={minibarEatFoodUnlocked}
                minibarNewRaccoonsArriveUnlocked={minibarNewRaccoonsArriveUnlocked}
                money={money}
                putOutFire={putOutFire.bind(this)}
                newRaccoonsArriveCountdown={countdowns.newRaccoonsArrive}
                removeFromBuildQueue={this.removeFromBuildQueue.bind(this)}
                researchState={researchState}
                sellShare={this.sellShare.bind(this)}
                sellTrash={sellTrash.bind(this)}
                setDebtorsVisionMultiplier={setDebtorsVisionMultiplier.bind(this)}
                showTooltip={showTooltip.bind(this)}
                resources={resources}
                time={this.state.time}
                toggleAbilityUpgrade={toggleAbilityUpgrade.bind(this)}
                toggleBuySellMode={this.toggleBuySellMode.bind(this)}
                toggleHintFlag={this.toggleHintFlag.bind(this)}
                toggleHossStyleTakeoverCheckbox={toggleHossStyleTakeoverCheckbox.bind(this)}
                toggleVisibleHandEffect={toggleVisibleHandEffect.bind(this)}
                totalRaccoons={totalRaccoons}
                trashAmount={resources.trash.amount}
                trashPrice={trashPrice}
                tryActivateAbility={this.tryActivateAbility.bind(this)}
                handleTryPlaySFX={this.handleTryPlaySFX.bind(this)}
                tutorialHighlights={tutorialHighlights}
                unassignedRaccoons={this.state.unassignedRaccoons}
                updateJobAllocation={this.updateAllocation}
              />
              {currentPhaseIndex <= 1 || currentPhaseIndex >= 4 ? (
                <MessagesPanel
                  messages={this.state.messages}
                  act={currentAct}
                  isAct5Ending={flags.act5.isHidingPanels}
                  isVisible={currentAct === 5 ? flags.act5.messagesPanelShown : flags.isTelephonePoleVisible}
                />
              ) : (
                <Phone
                  {...phone}
                  advanceToNextChatMessage={advanceToNextChatMessage.bind(this)}
                  answerPhone={answerPhone.bind(this)}
                  changePhoneMode={changePhoneMode.bind(this)}
                  hangUpPhone={hangUpPhone.bind(this)}
                  honorifics={honorifics}
                  investments={investments}
                  makeConversationChoice={makeConversationChoice.bind(this)}
                  showConversation={showConversation.bind(this)}
                  statistics={statistics}
                  time={time}
                  trashPrice={trashPrice}
                  handleTryPlaySFX={this.handleTryPlaySFX.bind(this)}
                  tutorialHighlights={tutorialHighlights}
                />
              )}
              <ResourcesPanel
                currentAct={currentAct}
                fires={fires}
                isInteractible={!flags.isCutscenePlaying}
                putOutFire={putOutFire.bind(this)}
                resources={this.state.resources}
                toggleOptionsMenu={toggleOptionsMenu.bind(this)}
                hideTooltip={hideTooltip.bind(this)}
                showTooltip={showTooltip.bind(this)}
                tutorialHighlights={tutorialHighlights}
              />
              {this.state.isOptionsMenuActive && (
                <Options
                  act={currentAct}
                  dialogueSpeed={dialogueSpeed}
                  isDebugMode={this.state.isDebugMode}
                  isVisible={this.state.isOptionsMenuVisible}
                  saveGame={saveGame.bind(this)}
                  saveTimestamp={saveTimestamp}
                  setAudioOptions={setAudioOptions.bind(this)}
                  setDialogueSpeed={setDialogueSpeed.bind(this)}
                  toggleOptionsMenu={toggleOptionsMenu.bind(this)}
                  handleTryPlaySFX={this.handleTryPlaySFX.bind(this)}
                  returnToTitleScreen={returnToTitleScreen.bind(this)}
                />
              )}
              <Banner {...this.state.banner} act={currentAct} />
              <BusinessBeanBanner
                closeBanner={closeBusinessBeanBanner.bind(this)}
                globalBusinessLevel={globalBusinessLevel}
                isAnimatingIn={businessBeanBanner.isAnimatingIn}
                lastIndustryLeveledUp={businessBotanyState.lastIndustryLeveledUp}
                level={
                  businessBotanyState.lastIndustryLeveledUp
                    ? businessBotanyState[businessBotanyState.lastIndustryLeveledUp].currentLevel
                    : null
                }
              />
              <PopUp {...popUp} hidePopUp={this.hidePopUp.bind(this)} />
              <NarrativeChoice
                {...narrativeChoice}
                addHonorific={this.addHonorific.bind(this)}
                hideNarrativeChoice={this.hideNarrativeChoice.bind(this)}
              />
              <Overlay {...overlay} />
              <RollTheBones
                didWinWager={businessBotanyState.death.ability.didWinWager}
                isBoneClonesActive={businessBotanyState.death.upgrade2 === 'boneClones'}
                isDoubleOrSomethingActive={businessBotanyState.death.upgrade3 === 'doubleOrSomething'}
                placeDoubleOrSomethingWager={placeDoubleOrSomethingWager.bind(this)}
                rollResults={businessBotanyState.death.ability.rollResults}
                rollTheBonesPhase={businessBotanyState.death.ability.phase}
                setRollTheBonesPhase={setRollTheBonesPhase.bind(this)}
              />
              <Goal act={currentAct} isAct5Ending={flags.act5.isHidingPanels} />
              {flags.act5.isShowingCredits && <Credits returnToTitleScreen={returnToTitleScreen.bind(this)} />}
            </>
          )}
          <Loading isLoading={isLoading} percent={isLoadingPercentage} />
          <TitleScreen
            isActive={isTitleScreenActive}
            isFreshReload={isFreshReload}
            isVisible={isTitleScreenVisible}
            playerHasWon={flags.won}
            resumeGame={resumeGame.bind(this)}
          />
          {isFreshReload && !isTitleScreenActive && !isTitleScreenVisible && (
            <div
              className={styles.ClickToResume}
              onClick={() =>
                this.setState({ isFreshReload: false, isGamePaused: false }, () =>
                  this.state.options.audio.musicOn ? this.toggleMusicPlayPause() : null
                )
              }
            >
              Click to resume
            </div>
          )}
          <div className={styles.audioWrapper} id="audioWrapper">
            <div className={styles.audio}>
              <audio id="bgm" src={currentBGM} controls loop />
              <audio id="sfx" />
              <audio id="fireSfx" loop />
            </div>
          </div>
          <div className={styles.tooltipWrapper}>
            <Tooltip money={money} resources={resources} tooltip={tooltip} />
          </div>
        </HotkeyVisibilityContext.Provider>
      </div>
    );
  }
}

export default App;
