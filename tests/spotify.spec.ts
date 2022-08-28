import { test, expect, Locator, Page } from '@playwright/test';
import { PlaylistPage } from '../pages/playlistPage'
import { LoginPage } from '../pages/loginPage'
import { MainPage } from '../pages/mainPage'


test.beforeEach(async ({ page }) => {
  // Runs before each test and signs in each page.
  const main = new MainPage(page);
  const login = new LoginPage(page);
  
  await main.goToMainPage();
  await main.acceptCookies();
  await login.login('creitor96@gmail.com', 'K3aiX_tGvNY7qCQ');
  
  await page.waitForNavigation();
  await expect(page).toHaveURL('https://open.spotify.com/');
  await expect(page).toHaveTitle(/Spotify – Web Player/);
});
 
test.afterEach(async ({ page }) => {
  const playlist = new PlaylistPage(page);
  var re = new RegExp('^https://open.spotify.com/playlist/.*');
  if (re.test(page.url.toString())) {
    await playlist.removePlaylist();
  }
});


test('Create new playlist', async ({ page }) => {
  const playlist = new PlaylistPage(page);
  await playlist.createPlaylist();
});

test('Remove playlist', async ({ page }) => {
  const playlist = new PlaylistPage(page);
  await playlist.createPlaylist();
  await playlist.removePlaylist();
});

test('Change playlist details', async ({ page }) => {
  const playlist = new PlaylistPage(page);
  await playlist.createPlaylist();
  await playlist.editPlaylist('test playlist', 'test description');
});

// test('Add song to playlist', async ({ page }) => {});

// test('Remove song from playlist', async ({ page }) => {});
