import leoProfanity from 'leo-profanity';

 const customAbuses = [
    "ZnVjaw==",
    "ZnVja2Vy",
    "ZnVja2luZw==",
    "ZnVja2Vk",
    "ZmNr",
    "Zipjaw==",
    "ZnUqaw==",
    "ZnVr",
    "ZnV4aw==",
    "c2hpdA==",
    "c2hpdHR5",
    "c2ghdA==",
    "c2h0",
    "Yml0Y2g=",
    "Yml0Y2hlcw==",
    "YiF0Y2g=",
    "YmlhdGNo",
    "YnRjaA==",
    "YiFjaA==",
    "YXNzaG9sZQ==",
    "YXNz",
    "YSQk",
    "YSoq",
    "ZHVtYmFzcw==",
    "amFja2Fzcw==",
    "c2x1dA==",
    "c2wqdA==",
    "YmFzdGFyZA==",
    "ZGljaw==",
    "ZGlja3M=",
    "ZDFjaw==",
    "ZGkqaw==",
    "Y29jaw==",
    "YzBjaw==",
    "cHVzc3k=",
    "cCpzc3k=",
    "Y3VudA==",
    "YypudA==",
    "Y250",
    "d2hvcmU=",
    "d2gwcmU=",
    "aG9l",
    "aDBl",
    "amVyaw==",
    "cmV0YXJk",
    "bW9yb24=",
    "c3Vja2Vy",
    "dHdhdA==",
    "Ym9sbG9ja3M=",
    "YnVnZ2Vy",
    "ZG91Y2hl",
    "ZG91Y2hlYmFn",
    "bmlnZ2E=",
    "bmlnZ2Vy",
    "ZmFn",
    "ZmFnZ290",
    "ZHlrZQ==",
    "d2Fuaw==",
    "cHJpY2s=",
    "dG9zc2Vy",
    "YXJzZWhvbGU=",
    "Ym9sbG9ja3M=",
    "a25vYg==",
    "bm9i",
    "cGlzcw==",
    "c2hpdGhlYWQ=",
    "bW90aGVyZnVja2Vy",
    "bWY=",
    "bWbigJllcg==",
    "bW9mbw==",
    "cy5vLmI=",
    "c29uIG9mIGEgYml0Y2g=",
    "Y2h1dGl5YQ==",
    "Y2h1dGl5ZQ==",
    "Y2hvb3RpeWE=",
    "Y2hvb3RpeWU=",
    "Y2h1dA==",
    "Ymhvc2Rp",
    "Ymhvc2Rpa2U=",
    "Ymhvc2FkaWtl",
    "YnNkaw==",
    "YmhlbmNob2Q=",
    "YmVoZW5jaG9k",
    "YmM=",
    "bWFkYXJjaG9k",
    "bWM=",
    "Z2FhbmQ=",
    "Z2FuZA==",
    "cmFuZGk=",
    "bG9kZQ==",
    "a3V0dGk=",
    "a3V0aXlh",
    "a2FtaW5h",
    "bG9kdQ==",
    "aGFyYWFtaQ==",
    "aGFyYW1p",
    "c2FhbGE=",
    "c2FsYQ==",
    "amhhbnQ=",
    "amhhbnR1",
    "bG9kYQ==",
    "bGF1ZGE=",
    "bG9kYQ==",
    "bDBkYQ==",
    "bG5k",
    "bHVuZA==",
    "Z2FuZHU=",
    "Y2hha2th",
    "a3V0dGE=",
    "bmFsYXlhaw==",
    "YmFrY2hvZA==",
    "dGVyYSBiYWFw",
    "dGVyaSBtYWE=",
    "bWFhIGNob2Q=",
    "YmVoZW4ga2UgbGF1ZGU=",
    "bGF1ZGE=",
    "Y2hvZA==",
    "bWFkYXI=",
    "YmVuY2hvZA==",
    "bWFkYXJjaG9kIGtl",
    "Z2FhbmQgbWFyYQ==",
    "Z2FhbmRmYXQ=",
    "Z2hhdGl5YQ==",
    "Ymhhbmdp",
    "Y2hpbmFs",
    "bGF1bmRpeWE=",
    "cmFraGFpbA==",
    "Ymhvc2FkaXdhbGU=",
    "Ymhvc2Rhd2FsYQ==",
    "Ymhvc2Fkd2FsYQ==",
    "Ymhvc2Rhd2FsZQ==",
    "Ymhvc2Rpa2U=",
    "Ymhvc2Rpa2E=",
    "Ymhvc2Rpa2k="
]

function safeAtob(str) {
  return decodeURIComponent(escape(atob(str)));
}

// Decode base64 encoded custom abuses
const decodedCustomAbuses = customAbuses.map(abuse => safeAtob(abuse));

// Add them once during app init
// leoProfanity.clearList(); // (Optional) Clears default English to avoid redundancy
leoProfanity.add(decodedCustomAbuses);



// Leetspeak/obfuscation decoder
const normalizeLeetspeak = (text) => {
  return text
    .toLowerCase()
    .replace(/[@]/g, 'a')
    .replace(/[!1|i]/g, 'i')
    .replace(/[3]/g, 'e')
    .replace(/[0]/g, 'o')
    .replace(/[5\$]/g, 's')
    .replace(/[7]/g, 't')
    .replace(/[^a-z\u0900-\u097F ]/gi, ''); // keep Hindi + English letters only
};

// Abuse checker
export const isAbusive = (text) => {
  const normalized = normalizeLeetspeak(text);
  return leoProfanity.check(normalized);
};
