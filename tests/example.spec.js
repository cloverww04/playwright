// @ts-check

import { test, expect } from '@playwright/test';
require('dotenv').config();


const baseURL = process.env.BASE_URL;

/**
 * @type {import("playwright-core").APIRequestContext}
 */
let api;

test.beforeAll(async ({ playwright }) => {
  api = await playwright.request.newContext({
    baseURL: baseURL || "http://localhost:3000",
  });
});

test.afterAll(async () => {
  await api.dispose();
});

test('UI loads and API returns videos', async ({ page }) => {
  // UI validation
  await page.goto(`${baseURL}`);
  await expect(page).toHaveTitle(/Welcome/);

  // API validation (postcondition pattern)
  const response = await api.get(`${baseURL}/videos`);
  await expect(response).toBeOK();

  const data = await response.json();
  expect(data).toHaveProperty('videos');
  expect(data.videos.length).toBeGreaterThan(0);

  const first = data.videos[0];
  expect(first).toHaveProperty('id');
  expect(first.video_files).toBeInstanceOf(Array);
  expect(first.video_files.length).toBeGreaterThan(0);
  expect(first.video_files[0]).toHaveProperty('link');
});
