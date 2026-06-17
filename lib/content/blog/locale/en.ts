import type { BlogBlock } from "@/lib/content/blog/types";
import type { BlogLocaleOverlayMap } from "@/lib/content/blog/locale/types";

export function getEnglishBlogOverlay(): Record<
  string,
  {
    title: string;
    description: string;
    keywords: string[];
    blocks: BlogBlock[];
  }
> {
  return EN_OVERLAY;
}

const EN_OVERLAY: BlogLocaleOverlayMap = {
  "rabota-modelyu-onlyfans": {
    title: "Become an OnlyFans Model: Agency Job (Remote)",
    description:
      "Become an OnlyFans model with OFM agency: remote, no experience needed, fully anonymous. Page turnover $3,000–$30,000/mo, we fund promotion. How to apply.",
    keywords: [
      "become an onlyfans model",
      "how to become an onlyfans model",
      "onlyfans modeling jobs",
      "onlyfans model job remote",
      "onlyfans model no experience",
    ],
    blocks: [
      {
        type: "p",
        text: "Want to turn your creativity into steady income — from home, at your own pace, and anonymously? OFM's Model Agency is hiring women 18+ for remote work as OnlyFans models. You create the content; we handle the promotion, the chatting, the advertising, and the sales — all at our own expense. You don't need a big following or years of experience: we're looking for new stars, and we help every one of them unlock her potential.",
      },
      {
        type: "h2",
        text: "What this job actually is",
      },
      {
        type: "p",
        text: "OnlyFans is a platform where creators earn from paid content and from talking with their subscribers. Most of the income lives inside private chats — and that's exactly what our team runs for you. All we need from you is quality photo and video content for your page; the traffic, the 24/7 chatting, the marketing, and the promotion are our job.",
      },
      {
        type: "h2",
        text: "What we take care of",
      },
      {
        type: "ul",
        items: [
          "Promotion and advertising of your profile — fully funded by the agency, you don't put in a single dollar",
          "A 24/7 chat team (2–3 shifts of chatters) — we run the conversations and the sales, so your profile earns around the clock",
          "Social-media traffic from a high-spending Tier-1 audience: the US, Canada, Australia",
          "Content strategy, analytics, and testing — so your income keeps growing",
          "A team with 3+ years of experience: managers, marketers, and a content manager",
        ],
      },
      {
        type: "h2",
        text: "How much you can earn",
      },
      {
        type: "p",
        text: "The model pages we manage do between $3,000 and $30,000 a month — that's the total page balance turnover (gross, before the agency's percentage). How much exactly depends on your niche, the volume and quality of your content, how consistent you are, and how engaged your audience becomes. There's no ceiling: the more seriously you approach it, the bigger the result.",
      },
      {
        type: "p",
        text: "For comparison: on her own, with no team and no advertising budget, the average model rarely clears even $300–700 a month. With an agency that invests in promotion and runs sales in the chats 24/7, the numbers are on a completely different level.",
      },
      {
        type: "p",
        text: "And here's the key part — from your very first month, the agency fully funds your launch: the advertising and the promotion, all the way up to your first earnings. You don't invest a single dollar and you risk nothing — the team only starts earning once you do.",
      },
      {
        type: "p",
        text: 'Your share and the exact terms we go over individually in Telegram — every model has her own plan and her own numbers. No "entry fee," no hidden charges.',
      },
      {
        type: "h2",
        text: "The terms and what we need from you",
      },
      {
        type: "ul",
        items: [
          "You're 18+ — we work with adults only",
          "Remote, from anywhere in the world — all you need is a phone or camera and internet",
          "No experience required — we train you from scratch in 10–14 days",
          "A serious approach to your content and content plan, and good organization",
          "A willingness to communicate and follow the team's guidance",
        ],
      },
      {
        type: "h2",
        text: "Privacy and anonymity",
      },
      {
        type: "p",
        text: "Privacy is the foundation of how we work. We bring in high-spending subscribers from social media and promote you to a Tier-1 audience — the US, Canada, Australia. That's where the top-paying fans are, the ones who buy content, customs, video calls, and subscriptions — which means people from your own country simply won't run into you there.",
      },
      {
        type: "p",
        text: "On top of that, you can block absolutely any country you choose on the platform — your home country, neighboring ones, or anywhere else. We have a dedicated traffic department that carefully makes sure a model's personal data never leaks. Your face stays your personal brand and your main asset — your anonymity rests on geo-blocking, not on hiding your face. And we'll help you handle the tax and legal side too, with full consultation and a lawyer's support.",
      },
      {
        type: "tip",
        text: "We'll show you every proof of reliability and the agency's real results in a chat or on a call — calmly and with zero pressure.",
      },
      {
        type: "h2",
        text: "Who it's for",
      },
      {
        type: "p",
        text: "Women 18+ who want to earn remotely and are ready to work seriously on their content — regardless of looks or experience. Beginners, anyone who has tried going solo, students, moms on maternity leave. If you're ready to shine on the platform, we'll help you unlock your potential.",
      },
      {
        type: "h2",
        text: "A model's review",
      },
      {
        type: "quote",
        text: "I want to leave a review about working with OFM Model Agency. The girls are so kind — they listen and find the option that works best for you; the main thing is not to be shy and to be open about all your limits and preferences. They built my team fast — within a few days we'd already launched, and the account already has good balances! My advice: double-check every detail so you don't end up in an awkward spot later. Getting into the swing of things was tough at first, but it all comes with experience 🥺 Long story short, I don't regret it one bit.",
        author: "a real review from an agency model",
      },
      {
        type: "h2",
        text: "How to apply",
      },
      {
        type: "p",
        text: "Submit an application on the site — it's anonymous and commits you to nothing — or message us on Telegram @Azalia_agency. A specialist will get in touch, answer all your questions, and walk you through the income and the terms. If you like, start by estimating your income with the calculator on the homepage.",
      },
      {
        type: "nav",
        intro: "Before you apply, read the details:",
        links: [
          {
            href: "/blog/onlyfans-skolko-zarabatyvayut-modeli",
            label: "How much OnlyFans models earn",
          },
          {
            href: "/blog/onlyfans-anonimnost-i-bezopasnost",
            label: "Anonymity and safety",
          },
          {
            href: "/blog/onlyfans-rabota-bez-lica",
            label: "Your face & anonymity",
          },
          {
            href: "/blog/onlyfans-agentstvo-ukraina",
            label: "OnlyFans agency in Ukraine",
          },
        ],
      },
      {
        type: "cta",
        title: "Ready to shine on OnlyFans?",
        body: "Submit an application — anonymous and with no obligation — or message us on Telegram @Azalia_agency. We'll walk you through the income, the terms, and your privacy.",
        buttonHref: "/#contact",
        buttonLabel: "Apply",
        note: "Income depends on your niche, content volume, and engagement — this is a guideline, not a guarantee. Figures are page balance turnover (gross), not a guaranteed payout.",
      },
    ],
  },
  "kak-vybrat-onlyfans-agentstvo": {
    title: "How to Choose an OnlyFans Agency: 2026 Checklist (No Scams)",
    description:
      "A practical guide to OnlyFans management: contracts, commission, chat ops, marketing, red flags, and questions to ask on your first call.",
    keywords: ["how to choose onlyfans agency", "onlyfans management"],
    blocks: [
      {
        type: "p",
        text: "The OnlyFans management market now includes hundreds of teams worldwide—from full agencies with dedicated chat departments to “managers” with no case studies. If you are a creator looking for an OnlyFans agency, the goal is not to find the loudest landing page, but to understand who will control your revenue, data, and reputation.",
      },
      {
        type: "h2",
        text: "What “full” management should include",
      },
      {
        type: "p",
        text: "In 2026, strong teams typically cover five areas: marketing (traffic), 24/7 chats (DM sales), content strategy, analytics, and account protection. An “SMM-only” agency without chats rarely pushes a model past $5–8k/month—most platform revenue lives in messaging, not subscription price.",
      },
      {
        type: "ul",
        items: [
          "Marketing: Reddit, X/Twitter, Instagram, TikTok, collabs—depending on niche",
          "Chats: response speed, PPV, customs, whale retention",
          "Content: calendar, teasers, feed + exclusive alignment",
          "Finance: reporting, LTV, churn, price tests",
          "Legal & privacy: access controls, NDAs, leak response",
        ],
      },
      {
        type: "h2",
        text: "Commission: what counts as fair",
      },
      {
        type: "p",
        text: "The industry benchmark for full-service is roughly 25–40% of gross revenue. Below 20% often means cut corners; above 45% should come with exceptional production and PR. Any upfront fee to “join” or “set up” is a classic red flag.",
      },
      {
        type: "tip",
        text: "Tip: ask for a written list of what the percentage covers. If the line item is vague on the call, it will stay vague in operations.",
      },
      {
        type: "h2",
        text: "Contract: 6 clauses you should not sign without",
      },
      {
        type: "ul",
        items: [
          "The OnlyFans account stays yours; access is role-based",
          "Term: month-to-month or short period + 30-day exit",
          "Percentage, reporting, and payout frequency to the agency",
          "Who owns content and what happens on termination",
          "Confidentiality and no publishing without consent",
          "KPIs or at least a weekly reporting format",
        ],
      },
      {
        type: "h2",
        text: "How to vet an agency before signing",
      },
      {
        type: "p",
        text: "Submit an application and evaluate response time. Ask for 2–3 references (even anonymized growth numbers). Review their FAQ and blog—mature teams explain processes publicly. Compare at least two companies.",
      },
      {
        type: "p",
        text: "At OFM's Model Agency, a manager replies on Telegram within 24 hours after you apply on the site; terms are discussed individually, with no “entry” fee. Use this article as a base for interviewing any team.",
      },
    ],
  },
  "chto-delaet-onlyfans-agentstvo": {
    title: "What an OnlyFans Agency Does: 12 Management Services",
    description:
      "OnlyFans management explained: from discovery chats to Reddit marketing, analytics, and anti-piracy—what actually drives growth.",
    keywords: ["onlyfans management", "what does onlyfans agency do"],
    blocks: [
      {
        type: "p",
        text: "“OnlyFans agency” sounds broad. In practice, some teams sell chat outsourcing only; others run a full cycle like talent agencies in music. Below are 12 services strong management includes in 2026—and why each affects revenue.",
      },
      {
        type: "h2",
        text: "1–4: Traffic and visibility",
      },
      {
        type: "ul",
        items: [
          "Niche and positioning strategy (feet, GFE, fitness, cosplay, etc.)",
          "X/Twitter management—often the main channel for adult-creator traffic",
          "Reddit: native posts, not link spam",
          "Instagram / TikTok: SFW funnel, Reels, Stories without bans",
        ],
      },
      {
        type: "h2",
        text: "5–8: On-platform conversion",
      },
      {
        type: "ul",
        items: [
          "Profile setup: bio, pinned post, welcome message",
          "Discovery chatting—first 48–72 hours with a new subscriber",
          "PPV and custom sales in DMs",
          "Pricing: subscription as the “door,” not the main revenue",
        ],
      },
      {
        type: "tip",
        text: "At large agencies, up to ~90% of revenue for many accounts comes from chats and PPV, not the monthly sub.",
      },
      {
        type: "h2",
        text: "9–12: Systems and protection",
      },
      {
        type: "ul",
        items: [
          "Content calendar and shoot days",
          "Weekly analytics: churn, ARPPU, funnel",
          "Collabs with other creators",
          "Leak monitoring, DMCA, anonymity recommendations",
        ],
      },
      {
        type: "h2",
        text: "Chat-only vs full-service",
      },
      {
        type: "p",
        text: "Chat-only is cheaper on percentage but does not replace marketing: without subscriber inflow, chat managers “sell into a void.” Full-service costs more but covers the full cycle—logical when you want to grow past $10k/month and not live in DMs.",
      },
      {
        type: "p",
        text: "OFM's Model Agency works full-service: manager, marketing, chats, and content strategy. Apply on the homepage.",
      },
    ],
  },
  "kogda-nuzhno-onlyfans-agentstvo": {
    title: "When It Is Time to Hire an OnlyFans Agency",
    description:
      "Signs it is time to delegate: DM burnout, income plateau, no time for marketing—and when an agency is still too early.",
    keywords: ["do i need onlyfans agency", "onlyfans management when"],
    blocks: [
      {
        type: "p",
        text: "Not every creator needs an agency on day one. But there are clear signals that solo mode is slowing growth—and delegation pays back the team’s commission.",
      },
      {
        type: "h2",
        text: "5 signs it is time to delegate",
      },
      {
        type: "ul",
        items: [
          "You reply in DMs 6+ hours a day and still lose sales to delays",
          "Income has plateaued for 2–3 months despite steady content",
          "You do not run Reddit/X systematically—“posted a few times”",
          "No content calendar; shoots are chaotic",
          "Afraid to scale because of leaks or doxxing",
        ],
      },
      {
        type: "h2",
        text: "When an agency is still too early",
      },
      {
        type: "p",
        text: "If you are still passing verification, have not defined your niche, and are not ready for 10–14 content pieces per month—clarify positioning first. An agency accelerates but does not replace your concept and discipline.",
      },
      {
        type: "h2",
        text: "How to estimate ROI",
      },
      {
        type: "p",
        text: "Simply: if the team lifts gross revenue by 30–50%+, a 30% commission still leaves you more net than solo. Ask the agency for a case range in your niche—not a blended “average across everyone.”",
      },
      {
        type: "p",
        text: "OFM works with creators at different stages—from launch to $20k+. Apply if you recognized yourself above; we will outline a plan with no obligation.",
      },
    ],
  },
  "onlyfans-agentstvo-moshennichestvo": {
    title: "OnlyFans Agency Scams: 10 Red Flags to Spot in 2026",
    description:
      "How to tell professional management from scams: upfront fees, account theft, fake income promises.",
    keywords: ["onlyfans agency scam", "onlyfans management fraud"],
    blocks: [
      {
        type: "p",
        text: "As OnlyFans grew, so did “agencies” that disappear overnight. Victims lose money, account access, and content. Below are signs to stop the conversation immediately.",
      },
      {
        type: "h2",
        text: "Red flags",
      },
      {
        type: "ul",
        items: [
          "They ask for “promotion” payment before launch ($500–2000+)",
          "They promise fixed $20k/month without analyzing your niche",
          "They demand a single OnlyFans password “for convenience”",
          "No contract—or they refuse to show a template before payment",
          "Pressure: “sign today or we give your slot away”",
          "They post your photos in a portfolio without written consent",
          "Communication only from a personal account, no company brand",
          "Reviews are screenshots only, with no way to verify",
          "Commission “up to 60%” with no transparent service list",
          "Threats when you try to terminate the agreement",
        ],
      },
      {
        type: "h2",
        text: "How to protect yourself",
      },
      {
        type: "p",
        text: "Enable 2FA on OnlyFans; use roles, not your password. Keep content masters on your side. Read the exit clause. Do not send crypto for “ads” to unknown intermediaries.",
      },
      {
        type: "tip",
        text: "A legitimate agency earns from your growth, not from your onboarding fee.",
      },
      {
        type: "p",
        text: "OFM does not charge an upfront “launch” fee. The application is free—a manager explains terms in chat before any commitment.",
      },
    ],
  },
  "onlyfans-agentstvo-ukraina": {
    title: "OnlyFans Agency Ukraine 2026 — How to Choose Without Scams",
    description:
      "Guide for creators in Ukraine and the diaspora: remote work, 24/7 chats, marketing, red flags, case studies, and applying to OFM.",
    keywords: [
      "onlyfans agency ukraine",
      "onlyfans agency kyiv",
      "onlyfans management ukraine",
    ],
    blocks: [
      {
        type: "p",
        text: "Ukraine is one of the most active OnlyFans markets in Eastern Europe—strong English, remote-work culture, and many creators looking for agencies with clear terms. A Google search for “OnlyFans agency Ukraine” leads to Layboard listings and forums where professional management and scams look identical. This guide covers what full-service should include, how to verify a team, and how OFM works with UA-based creators.",
      },
      {
        type: "h2",
        text: "Why UA creators choose agencies over solo",
      },
      {
        type: "p",
        text: "Up to 85% of OnlyFans net revenue often comes from DMs. Solo creators lose sales overnight (US/EU prime time) while spending ~60% of time on chats and marketing. An agency covers 24/7 chats, traffic, and analytics while you focus on content.",
      },
      {
        type: "ul",
        items: [
          "Kyiv, Odesa, Lviv, Kharkiv—fully remote; no studio required",
          "Diaspora creators (Poland, Germany, Czechia) often target UA/EN audiences",
          "Anonymity, payouts, and transparent commission matter more than headline “$30k” promises",
        ],
      },
      {
        type: "h2",
        text: "Red flags when choosing an agency in Ukraine",
      },
      {
        type: "ul",
        items: [
          "Upfront “promotion” or “onboarding” fees before launch",
          "Single OnlyFans password instead of role-based access",
          "Fixed income promises without niche analysis",
          "No contract, NDA, or written service list",
          "Pressure to “sign today” with no 30-day exit",
        ],
      },
      {
        type: "h2",
        text: "How OFM works with Ukraine-based creators",
      },
      {
        type: "p",
        text: "OFM partners with creators in Ukraine, Europe, and beyond—fully remote. Apply at ofmmodels.com; a manager replies on Telegram within 24 hours. No entry fee. Real case studies with platform statistics screenshots are published on the site (with creators’ consent).",
      },
      {
        type: "p",
        text: "Compare at least two agencies using our checklist articles, read the FAQ, and review case studies. If you want an OnlyFans agency in Ukraine with 24/7 chats and transparent terms—apply on the homepage. No obligation until you agree on terms.",
      },
    ],
  },
  "onlyfans-marketing-strategiya-2026": {
    title: "OnlyFans Marketing 2026: Full Growth Strategy",
    description:
      "2026 funnel: niche, multi-platform presence, teasers, retention, and metrics—a OnlyFans marketing guide from management practice.",
    keywords: ["onlyfans marketing", "onlyfans promotion 2026"],
    blocks: [
      {
        type: "p",
        text: "In 2026, OnlyFans is a crowded storefront: millions of creators, stricter social algorithms on adult links, and fans who value authenticity over generic AI content. Marketing is no longer “put a link in bio”—it is a funnel across platforms, content, and DMs.",
      },
      { type: "h2", text: "Step 1: Niche and brand" },
      {
        type: "p",
        text: "Before traffic, define your ideal subscriber, tone (GFE, dominatrix, girl-next-door, fitness, cosplay), and hard limits. A niche narrows audience but raises conversion and LTV.",
      },
      { type: "h2", text: "Step 2: Multi-platform funnel" },
      {
        type: "ul",
        items: [
          "X (Twitter): often the main source for adult creators—3–5 posts/day, mix personality and teasers",
          "Reddit: native posts in 10–15 relevant subreddits, no direct spam",
          "TikTok / Reels: SFW content, humor, curiosity—without platform-rule violations",
          "Instagram: daily Stories, lifestyle, pinned “link in bio”",
        ],
      },
      {
        type: "tip",
        text: "In 2026, top creators rarely rely on one network: traffic is diversified to survive shadowbans or algorithm shifts.",
      },
      { type: "h2", text: "Step 3: Content that converts" },
      {
        type: "p",
        text: "The OnlyFans feed is the storefront; DMs are the register. Teasers should promise emotion, not “another photo.” Test welcome message, pinned post, and PPV bundles.",
      },
      { type: "h2", text: "Step 4: Retention and LTV" },
      {
        type: "p",
        text: "A cheap $3 sub without a DM system brings many “dead” fans. In 2026, models with $12–25 entry and strong chat often beat the race for sub count.",
      },
      { type: "h2", text: "Metrics worth tracking" },
      {
        type: "ul",
        items: [
          "Monthly churn",
          "ARPPU—average revenue per paying fan",
          "DM response time",
          "Welcome → first PPV purchase conversion",
          "Traffic source via UTM/links",
        ],
      },
      {
        type: "p",
        text: "If marketing takes more time than shooting, that is a signal to delegate. OFM builds the funnel end-to-end: apply on the site, manager reply within 24 hours.",
      },
    ],
  },
  "onlyfans-prodvizhenie-reddit-twitter": {
    title: "Promoting OnlyFans on Reddit and X (Twitter)",
    description:
      "2026 practice: subreddits, posting schedule, X without bans, profile conversion—OnlyFans promotion without spam.",
    keywords: ["onlyfans reddit", "onlyfans twitter promotion"],
    blocks: [
      {
        type: "p",
        text: "Reddit and X remain workable channels for OnlyFans promotion if you do not act like a spammer. Both punish bare links and duplicate posts—they reward native content and a recognizable profile.",
      },
      { type: "h2", text: "Reddit: rules of the game" },
      {
        type: "ul",
        items: [
          "Read each subreddit’s rules—karma, account age, flairs",
          "Post content, not “subscribe to my OF” headlines",
          "Reddit profile = storefront: bio, pin, link",
          "5–15 targeted subs beat 50 random ones",
          "Mix formats: photo, gif, story-style captions",
        ],
      },
      { type: "h2", text: "X (Twitter): volume + personality" },
      {
        type: "p",
        text: "Blend ~60% personality (takes, BTS, humor), ~20% teasers, ~20% promo. Reply in quote-tweets to niche accounts. Shadowbans happen—keep a backup account and do not put a link in every post.",
      },
      { type: "h2", text: "Reddit/X → OnlyFans bridge" },
      {
        type: "p",
        text: "Optimize your OnlyFans profile for cold traffic: clear bio, pin with best content, welcome message with a soft CTA. The first 48 hours in DMs are critical—see our article on chat sales.",
      },
      {
        type: "tip",
        text: "Traffic without chats is water in a leaky bucket: subscribers arrive and leave without buying.",
      },
    ],
  },
  "onlyfans-instagram-tiktok-bez-bana": {
    title: "Instagram and TikTok for OnlyFans: Growth Without Bans",
    description:
      "SFW funnel, Reels, Meta and TikTok rules, link in bio—how to drive subscribers to OnlyFans safely.",
    keywords: ["onlyfans instagram", "onlyfans tiktok"],
    blocks: [
      {
        type: "p",
        text: "Instagram and TikTok dislike explicit adult marketing. They remain powerful discovery platforms if you build an SFW image and route traffic through a link hub (Beacons, Linktree on your domain, etc.).",
      },
      { type: "h2", text: "What to publish" },
      {
        type: "ul",
        items: [
          "Lifestyle, fitness, fashion, humor—within your niche",
          "Reels with a hook in the first 2 seconds",
          "Stories: polls, BTS, “ask me anything”",
          "No nudity that violates guidelines",
        ],
      },
      { type: "h2", text: "What to avoid" },
      {
        type: "p",
        text: "The word “OnlyFans” in captions often triggers moderation. Do not buy bots. Do not pivot the account theme overnight. Warm up new accounts gradually.",
      },
      { type: "h2", text: "The funnel" },
      {
        type: "p",
        text: "Reels → profile → link → landing/message → OnlyFans. Test CTAs in bio (“exclusive content”, “VIP club”). Track which network brings paying fans, not just clicks.",
      },
    ],
  },
  "onlyfans-uderzhanie-podpischikov": {
    title: "OnlyFans Subscriber Retention: Churn and LTV",
    description:
      "Why fans unsubscribe, how to lower churn and raise LTV through chats, content, and pricing.",
    keywords: ["onlyfans subscriber retention", "onlyfans churn"],
    blocks: [
      {
        type: "p",
        text: "Acquiring a subscriber is expensive. Losing them in 30 days burns your marketing spend. Retention matters more in 2026 than racing to $3 subscriptions.",
      },
      { type: "h2", text: "Why they leave" },
      {
        type: "ul",
        items: [
          "No new feed content",
          "Slow or templated DM replies",
          "Feeling “misled” after promo",
          "Aggressive PPV without warm-up",
          "No personalization for active fans",
        ],
      },
      { type: "h2", text: "Retention system" },
      {
        type: "p",
        text: "Minimum 2–3 feed posts per week, a weekly “reason to stay” (exclusive, series, stream teaser). Segment fans: new, active, whale—different DM scripts. Reactivate before renewal.",
      },
      { type: "h2", text: "Churn metric" },
      {
        type: "p",
        text: "Track unsubscribe % vs active base. If churn is >15–20%/month without new whales, the issue is product (content + chat), not ads alone.",
      },
    ],
  },
  "onlyfans-chaty-dm-prodazhi": {
    title: "OnlyFans Chats and DMs: Where Most Revenue Hides",
    description:
      "Discovery chatting, PPV, customs, response speed, and KPIs—a guide to OnlyFans DM sales.",
    keywords: [
      "onlyfans chatting",
      "onlyfans dm sales",
      "onlyfans chat manager",
    ],
    blocks: [
      {
        type: "p",
        text: "Many beginners focus on subscription price while experienced creators and agencies know: gross revenue is often 70–90% built in DMs—tips, PPV, customs, renewals. This is not “polite replies”; it is a sales funnel with stages.",
      },
      { type: "h2", text: "4 phases of discovery chatting" },
      { type: "h3", text: "1. Welcome (first minutes)" },
      {
        type: "p",
        text: "Personalized greeting, not copy-paste. Goal: open dialogue and learn where the fan came from.",
      },
      { type: "h3", text: "2. Discovery (up to 24 hours)" },
      {
        type: "p",
        text: "Questions on preferences, soft “whale” qualification. Industry estimates: much spending happens in the first 48–72 hours—you cannot miss that window.",
      },
      { type: "h3", text: "3. Connection (1–2 days)" },
      {
        type: "p",
        text: "Emotional bond, inside jokes, exclusivity—without manipulation, but with intent.",
      },
      { type: "h3", text: "4. Offer (PPV / custom)" },
      {
        type: "p",
        text: "A specific offer matched to the fan’s interest—not a blast “buy this everyone.”",
      },
      { type: "h2", text: "Response speed = money" },
      {
        type: "p",
        text: "Strong teams aim to reply within minutes in active hours. An hour’s delay is a cold lead. Nights are covered by chat shifts.",
      },
      {
        type: "tip",
        text: "If you sleep while paid subs arrive from ads—you are literally burning ad spend.",
      },
      { type: "h2", text: "AI + human" },
      {
        type: "p",
        text: "Some agencies use AI on early phases and hand whales to humans. Ask who writes in your voice and how tone is controlled.",
      },
      {
        type: "p",
        text: "OFM runs chats 24/7 as part of management—process details are discussed on onboarding.",
      },
    ],
  },
  "onlyfans-tseny-podpiska-ppv": {
    title: "OnlyFans Pricing: Subscription, PPV, and Customs",
    description:
      "How to price subscriptions in 2026, PPV bundles, free trials, and why the race to $3 subs loses.",
    keywords: [
      "onlyfans pricing",
      "onlyfans ppv",
      "onlyfans subscription price",
    ],
    blocks: [
      {
        type: "p",
        text: "OnlyFans pricing is psychology and math. Subscription is funnel entry; PPV and tips are margin. In 2026, the “race to the bottom” on $3 subs loses to $12–25 entry with strong DMs.",
      },
      { type: "h2", text: "Subscription: three models" },
      {
        type: "ul",
        items: [
          "Paid sub—stable MRR, needs steady feed content",
          "Free page + PPV—more traffic, higher chat load",
          "Paid + free trial / promo—conversion tests",
        ],
      },
      { type: "h2", text: "PPV and customs" },
      {
        type: "p",
        text: "PPV works with narrative (“continuation of yesterday’s series”). Customs are premium for personalization; cap slots to avoid burnout. Chat managers should share one price list.",
      },
      { type: "h2", text: "Pricing mistakes" },
      {
        type: "ul",
        items: [
          "Too cheap → many non-payers in DMs",
          "Too expensive at launch without brand",
          "Weekly discounts—fans learn to wait for sales",
          "Same PPV price for a newbie and a whale",
        ],
      },
      {
        type: "tip",
        text: "Test price every 6–8 weeks on new traffic; do not change everything at once.",
      },
    ],
  },
  "onlyfans-skolko-zarabatyvayut-modeli": {
    title: "How Much OnlyFans Models Earn: Realistic Numbers",
    description:
      "How much OnlyFans models really earn in 2026: beginner and top-model income ranges, gross vs net explained, and how an OFM agency moves the numbers.",
    keywords: [
      "how much onlyfans models make",
      "onlyfans model income",
      "onlyfans earnings 2026",
      "become an onlyfans model",
      "onlyfans income for beginners",
    ],
    blocks: [
      {
        type: "p",
        text: '"$100k a month" headlines sell courses, but the real market median is far more modest. An honest breakdown keeps you from burning out on disappointment and helps you build a plan that actually holds.',
      },
      {
        type: "h2",
        text: "Benchmarks by stage (gross turnover)",
      },
      {
        type: "ul",
        items: [
          "First 1–3 months: $500–3,000 with consistent, systematic work",
          "$3,000–10,000: steady content plus at least 1–2 traffic channels",
          "$10,000–30,000+: strong chats, real marketing, a defined niche",
          "$30,000+: top niche, a team, a brand — usually 2+ years of systems behind it",
        ],
      },
      {
        type: "p",
        text: "Some of our models at OFM sit in the $12,000–35,000+/month range — but that's neither a guarantee nor the median for every application we receive.",
      },
      {
        type: "h2",
        text: "What actually drives your income",
      },
      {
        type: "ul",
        items: [
          "Your niche and how crowded it is",
          "The hours you put into content, and your discipline",
          "The quality of your marketing and your chats",
          "Boundaries and staying power (burnout means a drop in earnings)",
        ],
      },
      {
        type: "h2",
        text: "Net vs gross",
      },
      {
        type: "p",
        text: "OnlyFans takes its platform cut. An agency takes its own percentage. Taxes depend on your jurisdiction. Count your real take-home, not the gross number you see on a landing page.",
      },
      {
        type: "nav",
        intro: "Realistic expectations work best alongside these reads:",
        links: [
          {
            href: "/faq",
            label: "FAQ: what OFM is",
          },
          {
            href: "/blog/onlyfans-agentstvo-dlya-nachinayushchih",
            label: "Starting out: an agency for beginners",
          },
          {
            href: "/blog/onlyfans-tseny-podpiska-ppv",
            label: "Pricing: subscription and PPV",
          },
          {
            href: "/blog/kak-vybrat-onlyfans-agentstvo",
            label: "How to choose an agency",
          },
        ],
      },
      {
        type: "cta",
        title: "Want to know your real potential in your niche?",
        body: "At ofmmodels.com you'll find case studies with screenshots (gross turnover) and an income calculator. Apply and a manager reaches out on Telegram (@Azalia_agency) within 24 hours.",
        buttonHref: "/#contact",
        buttonLabel: "Apply",
        note: "Case studies and the calculator are reference points (page balance turnover, gross) — not guaranteed earnings.",
      },
    ],
  },
  "onlyfans-agentstvo-dlya-nachinayushchih": {
    title: "OnlyFans for Beginners: Agency or Solo in 2026",
    description:
      "How to start OnlyFans step by step in 2026: verification, niche, first content, marketing, and when to bring in agency management. A beginner roadmap.",
    keywords: [
      "how to start onlyfans",
      "onlyfans for beginners",
      "start onlyfans 2026",
      "onlyfans agency for beginners",
      "onlyfans solo vs agency",
    ],
    blocks: [
      {
        type: "p",
        text: "Starting on OnlyFans in 2026 is easier technically than it was five years ago, and harder competitively. The platform is mature and subscribers are spoiled for choice. Below is a sequence of steps that cuts the chaos, whether you go solo or partner with an OnlyFans agency.",
      },
      {
        type: "h2",
        text: "Stage 0: Rules and boundaries",
      },
      {
        type: "p",
        text: "18+ only, with identity verification per the platform's rules. Decide upfront which formats you'll shoot and what's off-limits. Showing your face is your main asset — your individuality is what fans pay for — and your anonymity is protected by geo-blocking, not by hiding it. Your boundaries are the foundation of your brand.",
      },
      {
        type: "h2",
        text: "Stage 1: Niche and packaging",
      },
      {
        type: "p",
        text: 'Your name, visual style, tone of voice. Write your OnlyFans bio for a cold subscriber coming from Reddit, not a casual "hi, I\'m new here."',
      },
      {
        type: "h2",
        text: "Stage 2: Starter content pack",
      },
      {
        type: "ul",
        items: [
          "10-20 feed posts ready before you start active promo",
          "A pinned post plus a welcome message",
          "2-3 PPV templates for chats",
          'One "hero" set for your avatar and banners',
        ],
      },
      {
        type: "h2",
        text: "Stage 3: First traffic",
      },
      {
        type: "p",
        text: "Pick 1-2 channels (often X plus Reddit). Don't spread yourself across five networks in your first week. Your first subscribers are there to test the funnel, not to sentence you to a low income.",
      },
      {
        type: "h2",
        text: "When to bring in an agency at the start",
      },
      {
        type: "p",
        text: "It makes sense if you want to cover the whole path in 7-14 days with a team, instead of learning by trial and error in your DMs at night. OFM takes on beginners: apply on the site and a manager reaches out on Telegram (@Azalia_agency) within 24 hours.",
      },
      {
        type: "nav",
        intro: "Start without the chaos - keep reading:",
        links: [
          {
            href: "/blog/onlyfans-kontent-plan-i-syomki",
            label: "Content plan and shoots",
          },
          {
            href: "/blog/onlyfans-oshibki-novichkov",
            label: "15 beginner mistakes",
          },
          {
            href: "/blog/kak-vybrat-onlyfans-agentstvo",
            label: "How to choose an agency",
          },
          {
            href: "/blog/onlyfans-skolko-zarabatyvayut-modeli",
            label: "How much models earn",
          },
        ],
      },
      {
        type: "cta",
        title: "Ready to launch with a team?",
        body: 'OFM walks beginners through it in 7-14 days: profile, content, chats, first traffic. No "entry" fee to apply, and a manager replies on Telegram within 24 hours.',
        buttonHref: "/#contact",
        buttonLabel: "Apply",
        note: "Earnings depend on your niche, content volume, and engagement; figures are page balance turnover (gross), a guideline and not a guarantee.",
      },
    ],
  },
  "onlyfans-kontent-plan-i-syomki": {
    title: "OnlyFans Content Plan: Shoots, Feed & PPV",
    description:
      "OnlyFans content plan for 2026: how to batch your shoots, how much feed content you need per month, and how to link posts to PPV in DMs.",
    keywords: [
      "onlyfans content plan",
      "onlyfans content strategy",
      "onlyfans shoot ideas",
      "how much content for onlyfans",
      "onlyfans ppv strategy",
    ],
    blocks: [
      {
        type: "p",
        text: "Content is the fuel of your funnel. Without a calendar you live in permanent \"I need to shoot something right now\" mode — and your chat team can't sell PPV that simply doesn't exist.",
      },
      {
        type: "h2",
        text: "The minimum volume",
      },
      {
        type: "p",
        text: "Strong agencies aim for at least 10–14 pieces of feed content a month as a baseline, plus exclusives held back for PPV. More is better — as long as the quality holds up.",
      },
      {
        type: "h2",
        text: "Shoot day",
      },
      {
        type: "ul",
        items: [
          "Plan your sets in advance (3–5 looks per session)",
          "Lighting, backdrop, props — repeatable setups save real time",
          "Sort on the spot: feed / PPV / promo for social",
          "Batch it: one shoot = two weeks of content",
        ],
      },
      {
        type: "h2",
        text: "Linking your feed to DMs",
      },
      {
        type: "p",
        text: 'A feed post teases the storyline; the DM delivers "the rest is only here for $X." Series keep fans hooked far better than random one-off photos.',
      },
      {
        type: "tip",
        text: "Keep your master files locally and in the cloud — never hand your only copy to an agency.",
      },
      {
        type: "nav",
        intro: "How content fits into the OFM system:",
        links: [
          {
            href: "/blog/onlyfans-agentstvo-dlya-nachinayushchih",
            label: "Getting started for beginners",
          },
          {
            href: "/blog/onlyfans-chaty-dm-prodazhi",
            label: "Chats and DM sales",
          },
          {
            href: "/blog/onlyfans-tseny-podpiska-ppv",
            label: "Pricing: subscription and PPV",
          },
          {
            href: "/blog/onlyfans-marketing-strategiya-2026",
            label: "Marketing strategy 2026",
          },
        ],
      },
      {
        type: "cta",
        title: "Need a month-long shoot calendar?",
        body: "Content strategy is built into OFM management — we'll map it out together when you apply. Or message us on Telegram @Azalia_agency.",
        buttonHref: "/#contact",
        buttonLabel: "Apply",
        note: "Income figures refer to gross page balance turnover, not a guaranteed payout — results depend on your niche, content volume and engagement.",
      },
    ],
  },
  "onlyfans-oshibki-novichkov": {
    title: "15 Beginner OnlyFans Mistakes (And How to Fix Them)",
    description:
      "15 beginner OnlyFans mistakes in 2026: pricing, DMs, marketing, burnout. A model's checklist that saves you months — plus quick fixes from the OFM team.",
    keywords: [
      "onlyfans mistakes",
      "onlyfans tips for beginners",
      "onlyfans beginner guide",
      "how to start onlyfans",
      "onlyfans pricing mistakes",
    ],
    blocks: [
      {
        type: "p",
        text: "Most accounts stuck at $500–1k make the exact same mistakes. It's not \"bad content\" — it's the lack of a system.",
      },
      {
        type: "ul",
        items: [
          "A $3 subscription with no DM strategy",
          "No welcome message",
          "Replying to DMs 2–3 hours late",
          "Promo only in Stories, nothing on Reddit/X",
          "Spamming your link in every single post",
          "No pinned best content",
          "Shooting with no plan → burnout",
          "Giving away PPV-level content free in your feed",
          "Ignoring your whales in chat",
          "No churn tracking",
          "Buying bots and fake engagement",
          "Mixing your personal and work social accounts",
          "Weak protection of your source files",
          "Signing with your first agency without a contract",
          "Comparing yourself to the top 1% in month one",
        ],
      },
      {
        type: "h2",
        text: "Where to start fixing things",
      },
      {
        type: "p",
        text: "Week 1: profile + welcome message. Week 2: one traffic channel. Week 3: DM speed or a chat manager. Week 4: test your PPV pricing. Or apply to OFM and walk the whole path with a manager by your side.",
      },
      {
        type: "nav",
        intro: "Fix these mistakes with our guides:",
        links: [
          {
            href: "/blog/onlyfans-agentstvo-dlya-nachinayushchih",
            label: "Getting started for beginners",
          },
          {
            href: "/blog/onlyfans-marketing-strategiya-2026",
            label: "Marketing & traffic strategy",
          },
          {
            href: "/blog/onlyfans-chaty-dm-prodazhi",
            label: "Chats & DM sales",
          },
          {
            href: "/blog/onlyfans-anonimnost-i-bezopasnost",
            label: "Anonymity & safety",
          },
        ],
      },
      {
        type: "cta",
        title: "Tired of repeating the same mistakes?",
        body: "OFM builds your system from scratch: profile, traffic, chats. A manager reaches out on Telegram (@Azalia_agency) within 24 hours.",
        buttonLabel: "Apply",
        buttonHref: "/#contact",
        note: "Income depends on your niche, content volume and engagement. Figures refer to page balance turnover (gross) — a guideline, not a guaranteed payout.",
      },
    ],
  },
  "onlyfans-anonimnost-i-bezopasnost": {
    title: "OnlyFans Anonymity & Safety: A Creator's Guide",
    description:
      "OnlyFans anonymity in 2026: protect yourself from doxxing, leaks, geo-blocks and DMCA. A practical creator safety guide from the OFM management team.",
    keywords: [
      "onlyfans anonymity",
      "onlyfans creator safety",
      "onlyfans doxxing protection",
      "onlyfans privacy",
      "onlyfans dmca leaks",
    ],
    blocks: [
      {
        type: "p",
        text: "OnlyFans is a business with heightened privacy risks. Total anonymity doesn't exist, but the right process makes doxxing and leaks far less likely.",
      },
      {
        type: "h2",
        text: "Technical Hygiene",
      },
      {
        type: "ul",
        items: [
          "2FA on both your OnlyFans account and your email",
          "A separate SIM and email used only for work",
          "Never use your personal Instagram for promotion",
          "VPN when needed — helpful, but not a silver bullet",
          "Watermarks on every preview",
        ],
      },
      {
        type: "h2",
        text: "Working With an Agency",
      },
      {
        type: "p",
        text: "Ask the right questions up front: who can see your password, are there shared OnlyFans roles or a VPS, what happens to access when an agency staffer leaves, is there an NDA, and what's the leak-response policy. Never let an agency publish your content in its portfolio without your explicit consent.",
      },
      {
        type: "h2",
        text: "Leaks & DMCA",
      },
      {
        type: "p",
        text: "Monitor piracy sites, file DMCA takedowns, and react fast. Agencies at OFM's level build protection guidance straight into their management.",
      },
      {
        type: "h2",
        text: "Psychological Safety",
      },
      {
        type: "p",
        text: 'Set boundaries with fans, keep block lists, and don\'t mistake "real" relationships for sales. Burnout is a safety risk every bit as real as getting hacked.',
      },
      {
        type: "nav",
        intro: "Safety and choosing the right team:",
        links: [
          {
            href: "/blog/kak-vybrat-onlyfans-agentstvo",
            label: "How to choose an agency",
          },
          {
            href: "/blog/onlyfans-rabota-bez-lica",
            label: "Your face & anonymity",
          },
          {
            href: "/blog/onlyfans-oshibki-novichkov",
            label: "15 beginner mistakes",
          },
          {
            href: "/faq",
            label: "FAQ: what is OFM",
          },
        ],
      },
      {
        type: "cta",
        title: "Is anonymity and an NDA a priority for you?",
        body: "At OFM, access is granted on a need-to-know basis, with an NDA and a clear leak-response plan baked into your management. Apply and a manager replies on Telegram @Azalia_agency within 24 hours.",
        buttonHref: "/#contact",
        buttonLabel: "Apply",
        note: "Figures in our case studies are gross page balance turnover, not a model's guaranteed payout. Income depends on niche, content volume and engagement — a benchmark, not a guarantee.",
      },
    ],
  },
  "onlyfans-rabota-bez-lica": {
    title: "Your Face on OnlyFans: Your Main Asset & a Model's Anonymity",
    description:
      "Should you show your face on OnlyFans? Your face is your individuality and your main asset. How to earn with your face shown and stay anonymous through geo-blocking and data protection — a guide from OFM management.",
    keywords: [
      "should you show your face on onlyfans",
      "onlyfans model anonymity",
      "onlyfans geo-block",
      "onlyfans personal brand",
      "stay anonymous on onlyfans",
    ],
    blocks: [
      {
        type: "p",
        text: "Your face is your individuality and your main asset. Subscribers don't pay only for the content — they pay for YOU: for the connection, the emotion, the conversation. Many fans fall in love and want romantic chatting, and it's your face that creates that bond and keeps them around for the long run.",
      },
      {
        type: "h2",
        text: "Why your face is what wins",
      },
      {
        type: "ul",
        items: [
          "Recognition and a personal brand — fans come back for you",
          "Emotional connection and romance → higher retention and a higher average spend",
          "Fans trust you more when they see a real person",
          "Personality sells harder than anonymous content",
        ],
      },
      {
        type: "h2",
        text: "But what about anonymity?",
      },
      {
        type: "p",
        text: "Showing your face to a paying audience and staying invisible to the people around you are two different things. Your privacy doesn't rest on hiding your face — it rests on geo-blocking: we block your country, neighboring ones, and any others you choose, so people you know and your local community simply won't find you. We bring the audience in from the US, Canada, and Australia.",
      },
      {
        type: "h2",
        text: "How we protect your data",
      },
      {
        type: "p",
        text: "A dedicated traffic department makes sure your personal data never leaks, and every preview carries a watermark. We help with taxes and legality, with a lawyer's consultation. Some of our models run a page balance of $10,000–20,000+ a month, and protecting their anonymity is critical to us — so data protection is always a priority.",
      },
      {
        type: "nav",
        intro: "More on staying private and growing faster:",
        links: [
          {
            href: "/blog/onlyfans-anonimnost-i-bezopasnost",
            label: "Anonymity and safety",
          },
          {
            href: "/blog/onlyfans-marketing-strategiya-2026",
            label: "Marketing strategy 2026",
          },
          {
            href: "/blog/onlyfans-kontent-plan-i-syomki",
            label: "Content plan and shoots",
          },
          {
            href: "/faq",
            label: "FAQ: what is OFM",
          },
        ],
      },
      {
        type: "cta",
        title: "Your face is your main asset",
        body: "OFM brings out your individuality and protects your privacy: geo-blocking, data protection, and a lawyer. Apply now and we'll reply on Telegram (@Azalia_agency) within 24 hours.",
        buttonHref: "/#contact",
        buttonLabel: "Apply",
        note: "Figures in the case studies on this site are the gross balance turnover of the OnlyFans page, not the model's guaranteed payout.",
      },
    ],
  },
  "onlyfans-agentstvo-moldova": {
    title: "OnlyFans Agency Moldova 2026 — How to Choose Without Scams",
    description:
      "Guide for creators in Moldova and the diaspora: Chișinău, remote work, 24/7 chats, marketing, red flags, and applying to OFM.",
    keywords: [
      "onlyfans agency moldova",
      "onlyfans agenție moldova",
      "onlyfans agency chisinau",
    ],
    blocks: [
      {
        type: "p",
        text: "Moldova is a growing OnlyFans market—strong Russian and Romanian, remote-work culture, and creators looking for agencies with clear terms. A search for “OnlyFans agency Moldova” leads to Telegram channels and job boards where professional management and scams look identical. This guide covers full-service expectations and how OFM works with MD-based creators and EU diaspora.",
      },
      { type: "h2", text: "Why Moldova creators choose agencies" },
      {
        type: "p",
        text: "Up to 85% of net revenue often comes from DMs. An agency covers 24/7 chats, traffic, and analytics while you focus on content—from Chișinău or remotely from Romania, Italy, or Germany.",
      },
      { type: "h2", text: "Red flags" },
      {
        type: "ul",
        items: [
          "Upfront payments before launch",
          "Single OnlyFans password instead of roles",
          "Fixed income promises without niche analysis",
          "No contract or NDA",
        ],
      },
      {
        type: "p",
        text: "OFM works with creators in Moldova, Ukraine, Europe, and Latin America—fully remote. Apply at ofmmodels.com; Telegram reply within 24 h, no entry fee.",
      },
    ],
  },
  "onlyfans-agentstvo-latinskaya-amerika": {
    title:
      "OnlyFans Agency Latin America 2026 — Mexico, Colombia, Brazil & More",
    description:
      "Guide for Mexico, Colombia, Argentina, Chile, Peru, Ecuador, Uruguay, Paraguay, Bolivia, Central America, and Brazil: 24/7 chats, marketing, red flags, and applying to OFM.",
    keywords: [
      "onlyfans agency latin america",
      "onlyfans agency mexico",
      "onlyfans agency colombia",
      "onlyfans agency brazil",
      "onlyfans agency argentina",
      "agencia onlyfans latinoamerica",
    ],
    blocks: [
      {
        type: "p",
        text: "Latin America is one of the fastest-growing OnlyFans regions: Mexico, Colombia, Argentina, Chile, Peru, Ecuador, Uruguay, Paraguay, Bolivia, Venezuela, Central America (Costa Rica, Panama, Guatemala), and Brazil. Searches for “OnlyFans agency Latin America,” “OnlyFans agency Mexico,” or “OnlyFans agency Brazil” surface hundreds of listings—from professional studios to scams. This guide covers the whole Spanish-speaking region plus Brazil—not one country.",
      },
      { type: "h2", text: "Why LatAm and Brazil creators choose agencies" },
      {
        type: "p",
        text: "Up to 85% of net revenue often comes from DMs. A solo creator in São Paulo, Bogotá, or Mexico City loses overnight sales when US and EU fans are online. Agencies cover 24/7 chats, traffic, and analytics.",
      },
      {
        type: "ul",
        items: [
          "Mexico, Colombia, Argentina, Chile, Peru—fully remote; no studio required",
          "Brazil: huge Portuguese market; OFM supports PT/ES/EN for Rio, SP, BH creators",
          "US/EU Hispanic diaspora often runs bilingual EN + ES accounts",
          "LatAm time zones overlap US East—good for American prime-time chats",
        ],
      },
      { type: "h2", text: "Regional overview" },
      {
        type: "ul",
        items: [
          "Mexico & Colombia—largest Spanish-language adult traffic flows",
          "Argentina & Chile—strong EN/ES, often targeting US/EU fans",
          "Peru, Ecuador, Uruguay, Paraguay, Bolivia—growing sub-niches",
          "Brazil—separate scale: PT content, local TikTok/Reels trends",
          "Central America—Costa Rica, Panama: often bilingual ES/EN",
        ],
      },
      { type: "h2", text: "Red flags when choosing an agency" },
      {
        type: "ul",
        items: [
          "Upfront “advertising” payments before launch",
          "Single OnlyFans password",
          "Fixed income promises without niche review",
          "No contract, NDA, or written service list",
          "“Sign today” pressure without 30-day exit",
        ],
      },
      { type: "h2", text: "Brazil: note for Portuguese-speaking creators" },
      {
        type: "p",
        text: "Brazil is South America’s largest market and a separate language pool. OFM works with Brazilian creators remotely: managers in PT/ES/EN, marketing on X and TikTok BR, chats in Portuguese. Site available at /es and /en; apply at ofmmodels.com—Telegram reply within 24 h.",
      },
      {
        type: "p",
        text: "If you need an OnlyFans agency in Latin America—Mexico, Colombia, Argentina, Chile, Peru, Brazil, or any Spanish-speaking country—apply at ofmmodels.com. OFM replies on Telegram with no obligation.",
      },
    ],
  },
};
