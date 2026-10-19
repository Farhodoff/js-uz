import { test, expect } from '@playwright/test';
import { quizApp } from '../src/data/lessons/projects/quizApp.js';
import { resolveCorrectIndex } from '../src/utils/quizUtils.js';

const quizzes = quizApp.quizzes;
const storageKey = 'js-academy-progress-store';

async function activateQuizTab(page) {
  const quizTab = page.getByRole('tab', { name: /Testlar/ });
  await quizTab.waitFor();

  for (let attempt = 0; attempt < 10; attempt += 1) {
    if ((await page.locator('.quiz-counter').count()) > 0) return;
    await quizTab.click();
    await page.waitForTimeout(200);
  }
}

async function openQuiz(page) {
  await page.addInitScript(() => window.localStorage.clear());
  await page.goto('/projects/quizApp');

  await activateQuizTab(page);
  await expect(page.locator('.quiz-counter')).toContainText(`Savol 1 / ${quizzes.length}`);
}

test.describe('Quiz App asosiy oqimi', () => {
  test('to\'g\'ri javoblar bilan barcha savollar aylanadi va natija saqlanadi', async ({ page }) => {
    await openQuiz(page);

    for (let index = 0; index < quizzes.length; index += 1) {
      await activateQuizTab(page);
      await expect(page.locator('.quiz-counter')).toContainText(`Savol ${index + 1} / ${quizzes.length}`);

      const correctIndex = resolveCorrectIndex(quizzes[index]);
      const options = page.locator('.quiz-option-btn');

      await options.nth(correctIndex).click();
      await expect(page.locator('.quiz-result-msg.success')).toContainText("To'g'ri topdingiz");
      await expect(options.nth(correctIndex)).toHaveClass(/correct/);
      await expect(options.first()).toBeDisabled();

      const nextButton = page.getByRole('button', { name: /Keyingi/ });

      if (index < quizzes.length - 1) {
        await expect(nextButton).toBeEnabled();
        await nextButton.click();
      } else {
        await expect(nextButton).toBeDisabled();
      }
    }

    await expect.poll(async () => {
      return page.evaluate((key) => {
        const raw = window.localStorage.getItem(key);
        return raw ? JSON.parse(raw).state.completed : null;
      }, storageKey);
    }).toEqual(expect.objectContaining(
      Object.fromEntries(quizzes.map((_, index) => [`quizApp_quiz_${index}`, true]))
    ));

    await expect(page.locator('.quiz-status-badge')).toContainText('Bajarildi');
  });

  test('noto\'g\'ri javob feedback beradi va qayta urinish mumkin', async ({ page }) => {
    await openQuiz(page);

    const correctIndex = resolveCorrectIndex(quizzes[0]);
    const wrongIndex = correctIndex === 0 ? 1 : 0;
    const options = page.locator('.quiz-option-btn');

    await options.nth(wrongIndex).click();

    await expect(page.locator('.quiz-result-msg.error')).toContainText("Noto'g'ri javob");
    await expect(options.nth(wrongIndex)).toHaveClass(/wrong/);
    await expect(options.nth(correctIndex)).toHaveClass(/correct/);
    await expect(options.first()).toBeDisabled();

    await page.getByRole('button', { name: /Qayta urinish/ }).click();
    await expect(options.first()).toBeEnabled();

    await options.nth(correctIndex).click();
    await expect(page.locator('.quiz-result-msg.success')).toBeVisible();
    await expect(page.locator('.quiz-counter')).toContainText('Savol 1 /');
  });
});
