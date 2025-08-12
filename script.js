const QUESTIONS = [
  "Bought a memecoin without reading the whitepaper",
  "Bought a coin because of the logo alone",
  "Bought because a Twitter influencer said “ngmi if you miss this”",
  "Bought into a project without checking the liquidity lock",
  "Held a bag down 90%+ because “it’ll bounce”",
  "Bought into a project that rugged within 24 hours",
  "Been rugged more than 5 times",
  "Been rugged more than 10 times",
  "Bought into a project and the dev deleted Twitter",
  "Bought into a project and the dev deleted Telegram/Discord",
  "Bought into a coin where liquidity was pulled mid-pump",
  "Bought a coin because it had “dog” or “cat” in the name",
  "Bought into a blatant derivative (e.g., $BONK copycat)",
  "Bought into a project with a market cap under $5k",
  "Bought into a coin with 0 holders besides the dev at launch",
  "Paid a transaction fee higher than your bag’s value",
  "Lost SOL to a fake Raydium/Phantom link",
  "Bought because you saw it trending on DEX Screener",
  "Bought into a presale and it never launched",
  "Bought into a coin and it went to zero the same day",
  "Held a bag so small you can’t sell because of gas/slippage",
  "Bought a coin because it had “Elon” in the name",
  "Bought a coin with no website",
  "Bought into a “stealth launch” and got wrecked",
  "Bought a coin after seeing a viral meme about it",
  "Bought after missing the first 500% pump thinking “still early”",
  "Bought a coin because the dev said “no rug”",
  "Bought into a coin only to realize it was a honeypot",
  "Bought into a coin because it had a 1-minute-old chart",
  "Bought a coin that went 100x after you sold",
  "Bought a coin that instantly dumped after you bought",
  "Bought into a coin while drunk/high",
  "Bought a coin because it had AI in the name",
  "Bought into a coin that had only 1 tweet",
  "Bought into a coin with 100% of supply in dev wallet",
  "Got sniped by bots on launch",
  "Tried to snipe a launch and failed",
  "Bought into a coin with supply in the quintillions",
  "Bought into a coin with “pump” or “moon” in the name",
  "Bought into a coin with no contract verification",
  "Bought into a coin that had a fake “audit”",
  "Bought a coin after seeing it in a Telegram spam link",
  "Bought into a coin shilled by a scam Twitter giveaway",
  "Bought into a coin just because it was trending #1 on Solscan",
  "Bought into a coin that soft rugged by disabling sells",
  "Bought into a coin where dev promised CEX listing “next week”",
  "Bought into a coin because “community is strong”",
  "Bought into a coin because the dev posted a hype GIF",
  "Bought into a coin just because the name made you laugh",
  "Bought into a coin even though you knew it was a scam"
];
const listEl = document.getElementById('questionList');
QUESTIONS.forEach((q, i) => {
  const li = document.createElement('li');
  const row = document.createElement('label');
  row.className = 'qrow';
  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.name = 'q' + (i+1);
  cb.id = 'q' + (i+1);
  const span = document.createElement('span');
  span.className = 'qtext';
  span.textContent = q;
  row.appendChild(cb);
  row.appendChild(span);
  li.appendChild(row);
  listEl.appendChild(li);
});

const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const results = document.getElementById('results');
const degenPctEl = document.getElementById('degenPct');
const badgeText = document.getElementById('badgeText');
const shareBtn = document.getElementById('shareX');
const copyBtn = document.getElementById('copyLink');
const copyDone = document.getElementById('copyDone');

let lastShareText = '';

function calcScore() {
  const boxes = listEl.querySelectorAll('input[type="checkbox"]');
  const total = boxes.length;
  let checked = 0;
  boxes.forEach(b => { if (b.checked) checked++; });
  const degenPct = Math.round((checked / total) * 100);
  degenPctEl.textContent = degenPct + '%';

  let label = '';
  if (degenPct <= 10) label = '📗 Solana Newbie: touches grass, sometimes.';
  else if (degenPct <= 25) label = '💼 Cautious Trader: knows when to fold.';
  else if (degenPct <= 50) label = '🧪 Semi‑Degen: lives on DEX Screener tabs.';
  else if (degenPct <= 75) label = '🔥 Full Degen: rugs are a personality trait.';
  else label = '☠ Certified Rug Magnet: may the next pump save you.';
  badgeText.textContent = label;

  results.hidden = false;
  results.scrollIntoView({ behavior: 'smooth', block: 'center' });

  lastShareText = `I scored ${degenPct}% degen on the Solana Memecoin Degen Test! Try it: cryptopuritytest.xyz`;
}

submitBtn.addEventListener('click', calcScore);
resetBtn.addEventListener('click', () => results.hidden = true);

if (shareBtn) {
  shareBtn.addEventListener('click', () => {
    if (!lastShareText) calcScore();
    const intent = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(lastShareText) + '&hashtags=Solana,Memecoins,CryptoPurityTest';
    window.open(intent, '_blank', 'noopener');
  });
}

if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    if (!lastShareText) calcScore();
    try {
      await navigator.clipboard.writeText(lastShareText);
      copyDone.style.display = 'inline';
      setTimeout(() => copyDone.style.display = 'none', 2000);
    } catch (e) {
      const temp = document.createElement('input');
      temp.value = lastShareText;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      copyDone.style.display = 'inline';
      setTimeout(() => copyDone.style.display = 'none', 2000);
    }
  });
}
