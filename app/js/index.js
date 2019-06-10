import { SettingsModal } from './components/settings-modal.js';
import { StravaFeed } from './components/strava.js';
import { TubeStatus } from './components/tube.js';
import { WeatherStatus } from './components/weather.js';

new StravaFeed(document.getElementById('strava'));
const tubeStatusInstance = new TubeStatus(document.getElementById('status'));
new WeatherStatus(document.getElementById('weather'));

new SettingsModal(document.getElementById('settings-modal'), tubeStatusInstance);