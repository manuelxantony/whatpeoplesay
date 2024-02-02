"use server";

import { JSDOM } from "jsdom";
import puppeteer from "puppeteer";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

const selectors = {
  allReviews: "#cm-cr-dp-review-list div.review",
  reviewComment: "[data-hook=review-collapsed]",
};

export async function readHTML(url: string) {
  const res = await fetch(url);
  const html = await res.text();
  console.log(html);
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const downloads = document.querySelector("._9ba9a726")?.textContent;
  console.log(downloads);
}
// fetch through comments in the product page
// now for amazon only, limited to top comments shown in the page
export async function fetchReviews(url: string) {
  const browser = await puppeteer.launch({ headless: true }); // make it to true
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForSelector(selectors.allReviews);

  const reviewElements = await page.$$(selectors.allReviews);

  // Create an empty array to store the review comments.
  let reviewComments = "";

  // Iterate over the review elements and extract  each review.
  for (const reviewElement of reviewElements) {
    const comments = await reviewElement.$eval(
      selectors.reviewComment,
      (element) => element.textContent
    );
    let commetsFiltered = comments?.replace(/\n/g, "");
    reviewComments = reviewComments + "######" + commetsFiltered;
  }
  console.log(reviewComments);
  //   await generateSummary(reviewComments);
  return reviewComments;
}

export async function generateSummary(reviewComments: string) {
  const prompt =
    "give me a summary for following comments, where ###### represents a different comment. give me as a paragraph less that 25 words";

  const response = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt + reviewComments }],
    model: "gpt-3.5-turbo",
  });
  console.log(response.choices[0]);
  return response.choices[0];
}
