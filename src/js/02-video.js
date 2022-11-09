import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const localStorageData = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

let currentTime = 0;
player.on('timeupdate', throttle(onCurrentTime, 1000));

function onCurrentTime(currentTime) {
  const stringifyedtime = JSON.stringify(currentTime);
  localStorage.setItem(localStorageData, stringifyedtime);
}
// player.off('timeupdate');
const reloadTime = JSON.parse(localStorage.getItem(localStorageData));
player
  .setCurrentTime(reloadTime.seconds)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
