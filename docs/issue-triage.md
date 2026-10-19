# Ochiq issuelar triaji — 2026-10-19

## Ko'lam

`Farhodoff/js-uz` repozitoriyasida `gh issue list --state open` bo'sh natija berdi.
GitHub Issues API bo'yicha ochiq 3 ta element mavjud bo'lib, ularning barchasi
pull request:

| Item | Tur | Muhimlik | Label'lar | Qaror |
| --- | --- | --- | --- | --- |
| #20 `fix(editor): resolve anonymous define collision...` | Bug fix PR | Yuqori | `bug`, `duplicate`, `priority: high`, `area: editor` | #22 tarkibida borligi uchun yopildi |
| #21 `feat(lessons): rework and standardize 01-basics...` | Feature PR | Yuqori | `enhancement`, `duplicate`, `priority: high`, `area: lessons` | #22 tarkibida borligi uchun yopildi |
| #22 `feat(ui): enhance editor experience...` | Feature PR | Yuqori | `enhancement`, `priority: high`, `area: editor`, `area: pwa` | Ochiq qoldirildi, acceptance criteria qo'shildi |

## Sabab

#20 va #21 ning commitlari #22 branch tarkibiga kirgan. #21 CI'da yiqilgan,
lekin bir xil commitlar #22 da yashil tekshiruvdan o'tgan. Shu sababli #20 va #21
takroriy (superseded) deb yopildi, barcha ish #22 orqali bitta PR sifatida
yakunlanadi.

## #22 uchun qabul mezonlari

- `useUzbekMonaco` hook PracticeTab va Playground da hover, autocomplete va
  diagnostika bilan ishlaydi.
- Monaco AMD `anonymous define` konflikti takrorlanmaydi.
- 01-basics darslari `rule.txt` talablariga mos; lessonQuality va
  lessonStructure testlari o'tadi.
- Responsive layout 768px va undan kichik ekranlarda sinalgan.
- PWA manifest/ikonkalar yangilangan va oflayn rejim regressiyasiz.
- `npm run lint`, `npm test`, `npm run build` 0 xato bilan o'tadi.

## Label me'yorlari

- `priority: high` — release-blocking yoki yuqori muhimlikdagi ish.
- `priority: medium` — o'rta muhimlikdagi ish.
- `priority: low` — past muhimlikdagi ish.
- `area: editor` — Monaco editor va kod ijro muhiti.
- `area: lessons` — dars kontenti va curriculum.
- `area: pwa` — PWA, service worker va oflayn rejim.

## Tekshiruv

- `gh pr list --state open` — faqat #22 ochiq.
- #20 va #21 holati `CLOSED`, label'lari saqlangan.
- #22 label'lari va acceptance criteria GitHub'da yangilangan.
