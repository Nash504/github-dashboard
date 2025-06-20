import * as cheerio from 'cheerio';

export async function GET(req) {
  const user = new URL(req.url).searchParams.get('user') || 'octocat';

  const res = await fetch(`https://github.com/users/${user}/contributions`, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });

  const html = await res.text();
  const $ = cheerio.load(html);
  const contributions = [];

  $('h2').each((index, element) => {
    contributions.push($(element).text().trim());
  });

  return new Response(JSON.stringify({ contributions }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
