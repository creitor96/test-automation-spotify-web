import {test, expect, Locator, Page } from '@playwright/test';

export class PlaylistPage {
    readonly page: Page;
    readonly createPlaylistLink: Locator;
    readonly playlistNameLink: Locator;
    readonly playlistDescriptionLink: Locator;
    readonly openPlaylistMenuLink: Locator;
    readonly playlistMenuList: Locator;
    readonly playlistMenuRemoveLink: Locator;
    readonly playlistMenuEditLink: Locator;
    readonly removeDialogTitleLink: Locator;
    readonly removeDialogCancelLink: Locator;
    readonly removeDialogRemoveLink: Locator;
    readonly editDialogTitleLink: Locator;
    readonly editDialogNameLink: Locator;
    readonly editDialogDescriptionLink: Locator;
    readonly editDialogSaveLink: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.createPlaylistLink = page.locator('[data-testid="create-playlist-button"]');
        this.playlistNameLink = page.locator('button > span > h1');
        this.playlistDescriptionLink = page.locator('h2 > button > div');
        this.openPlaylistMenuLink = page.locator('[data-testid="more-button"]');
        this.playlistMenuList = page.locator('[role="menu"]');
        this.playlistMenuRemoveLink = page.locator('button[role="menuitem"]:has-text("Delete")');
        this.playlistMenuEditLink = page.locator('button[role="menuitem"]:has-text("Edit details")');
        this.removeDialogTitleLink = page.locator('[role="dialog"]');
        this.removeDialogCancelLink = page.locator('text=CANCEL');
        this.removeDialogRemoveLink = page.locator('button:has-text("DELETE")');

        this.editDialogTitleLink = page.locator('text=Edit details');
        this.editDialogNameLink = page.locator('[data-testid="playlist-edit-details-name-input"]');
        this.editDialogDescriptionLink = page.locator('[data-testid="playlist-edit-details-description-input"]');
        this.editDialogSaveLink = page.locator('[data-testid="playlist-edit-details-save-button"]');
    }

    // not ready function
    async goToPlaylist(){
        await this.page.goto('https://open.spotify.com/collection/playlists')
    }

    async createPlaylist(){
        await this.createPlaylistLink.click();
        await expect(this.page).toHaveURL(new RegExp('^https://open.spotify.com/playlist/.*'));
    }

    async removePlaylist(){
        await this.openPlaylistMenu();

        await this.playlistMenuRemoveLink.click();
        await expect(this.removeDialogTitleLink).toBeVisible();

        await this.removeDialogRemoveLink.click();
        await expect(this.page).toHaveURL('https://open.spotify.com/collection/playlists');
    }
    
    async openPlaylistMenu(){
        await this.openPlaylistMenuLink.click();
        await expect(this.playlistMenuList).toBeVisible();
    }

    async editPlaylist(newPlaylistName?: string, newPlaylistDescription?: string){
        let playlistName:string = await this.playlistNameLink.innerText();
        let playlistDescription:string;
        if ((await this.playlistDescriptionLink.count()) > 0) {
            playlistDescription = await this.playlistDescriptionLink.innerText();
        }

        if (newPlaylistName !== undefined) {
            playlistName = newPlaylistName;
        }
        if (newPlaylistDescription !== undefined) {
            playlistDescription = newPlaylistDescription;
        }

        await this.openPlaylistMenu();

        await this.playlistMenuEditLink.click();
        await expect(this.editDialogTitleLink).toBeVisible();
    
        await this.editDialogNameLink.fill(playlistName);
        await this.editDialogDescriptionLink.fill(playlistDescription);
        await this.editDialogSaveLink.click();

        await expect(this.playlistNameLink).toHaveText(playlistName);
        await expect(this.playlistDescriptionLink).toHaveText(playlistDescription);
    }
}
