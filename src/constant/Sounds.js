/* eslint-disable global-require */

export default {
  referee: {
    REF_BLACK_START: require('../assets/sound/referee/black_start.mp3'),
    REF_BLACK_LOST: require('../assets/sound/referee/black_lost.mp3'),
    REF_BLACK_COUNTDOWN_START: require('../assets/sound/referee/black_countdown_start.mp3'),
    REF_BLACK_COUNTDOWN_DEC: require('../assets/sound/referee/black_countdown_dec.mp3'),
    REF_BLACK_COUNTDOWN_TURN: require('../assets/sound/referee/black_countdown_turn.mp3'),
    REF_BLACK_COUNTDOWN_LAST: require('../assets/sound/referee/black_countdown_last.mp3'),
    REF_WHITE_START: require('../assets/sound/referee/white_start.mp3'),
    REF_WHITE_LOST: require('../assets/sound/referee/white_lost.mp3'),
    REF_WHITE_COUNTDOWN_START: require('../assets/sound/referee/white_countdown_start.mp3'),
    REF_WHITE_COUNTDOWN_DEC: require('../assets/sound/referee/white_countdown_dec.mp3'),
    REF_WHITE_COUNTDOWN_TURN: require('../assets/sound/referee/white_countdown_turn.mp3'),
    REF_WHITE_COUNTDOWN_LAST: require('../assets/sound/referee/white_countdown_last.mp3'),
  },
  countdown: {
    SOUND_NUMBER_1: require('../assets/sound/number/number_1.mp3'),
    SOUND_NUMBER_2: require('../assets/sound/number/number_2.mp3'),
    SOUND_NUMBER_3: require('../assets/sound/number/number_3.mp3'),
    SOUND_NUMBER_4: require('../assets/sound/number/number_4.mp3'),
    SOUND_NUMBER_5: require('../assets/sound/number/number_5.mp3'),
    SOUND_NUMBER_6: require('../assets/sound/number/number_6.mp3'),
    SOUND_NUMBER_7: require('../assets/sound/number/number_7.mp3'),
    SOUND_NUMBER_8: require('../assets/sound/number/number_8.mp3'),
  },
  taunt: {
    TAUNT_HINT_THREE: require('../assets/sound/taunt/taunt_hint_three.mp3'),
    TAUNT_HINT_ZERO: require('../assets/sound/taunt/taunt_hint_zero.mp3'),
    TAUNT_HINT_STOP: require('../assets/sound/taunt/taunt_hint_stop.mp3'),
    random: [
      require('../assets/sound/taunt/taunt_blood.mp3'), // 10, [我要讓你的屁屁血濺五步]
      require('../assets/sound/taunt/taunt_quick.mp3'), // 9, [快點吧，我等到花兒都謝了]
      require('../assets/sound/taunt/taunt_badHand.mp3'), // ?, [惡手、臭棋]
      require('../assets/sound/taunt/taunt_moral.mp3'), // ?, [我是以德服人]
      require('../assets/sound/taunt/taunt_overMyDeadBody.mp3'), // ?, [想吃這條龍]
      require('../assets/sound/taunt/taunt_work.mp3'), // ?, [把工作當休閒]
      // 奧義，火滋・焚骨，燒光你的屁屁毛
      // 我會讓你殼裂龜死
    ],
  },
  click: {
    CLICK_TIMER_MP3: require('../assets/sound/click/click.mp3'),
    MINECRAFT_PIG_MP3: require('../assets/sound/click/minecraft-pig.mp3'),
  },
};
