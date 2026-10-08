/**
 * Google Apps Script receiver for quiz submissions. It is not part of the Vite build.
 *
 * Setup:
 *   1. Create a Google Sheet → Extensions → Apps Script, paste this file.
 *   2. Project Settings → Script Properties → add SUBMIT_TOKEN (same value as VITE_SUBMIT_TOKEN).
 *   3. Deploy → New deployment → Web app; Execute as: Me; Who has access: Anyone.
 *   4. Put the /exec URL into VITE_SUBMIT_URL (GitHub repo secret for production).
 * After editing, redeploy (Manage deployments → edit → New version) or the URL keeps serving old code.
 */

var SHEET_NAME = 'Submissions';
var HEADERS = ['Час', 'Імʼя та прізвище', 'Телефон', 'Компанія', 'Результат', 'id'];
var ID_COLUMN = 6;

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var token = PropertiesService.getScriptProperties().getProperty('SUBMIT_TOKEN');
    if (!token || body.token !== token) return json({ ok: false, error: 'unauthorized' });

    var s = body.submission;
    if (!s || !s.id) return json({ ok: false, error: 'missing submission' });

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var sheet = getSheet();
      // Clients retry until they get ok:true, so the same id can arrive twice.
      var dup = sheet.getRange(1, ID_COLUMN, sheet.getMaxRows(), 1)
        .createTextFinder(s.id).matchEntireCell(true).findNext();
      if (!dup) {
        sheet.appendRow([
          Utilities.formatDate(new Date(s.createdAt), 'Europe/Kyiv', 'yyyy-MM-dd HH:mm'),
          safe(s.name), safe(s.phone), safe(s.company),
          s.correct + ' з ' + s.total,
          s.id,
        ]);
      }
    } finally {
      lock.releaseLock();
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.hideColumns(ID_COLUMN);
  }
  return sheet;
}

// Values starting with = + - @ would be evaluated as formulas in the sheet
// (this also keeps "+380…" phones as text).
function safe(v) {
  v = String(v || '');
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
