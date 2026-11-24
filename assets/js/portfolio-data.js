/* =====================================================================
   PORTFOLIO DATA — client projects shown in the "Portfolio" section.
   ---------------------------------------------------------------------
   HOW TO ADD A PROJECT
   1. Put the file in the right folder, for example:
        assets/posters/my-poster.webp      (poster / ad creative)
        assets/videos/my-video.mp4         (video)
        assets/websites/my-site.webp       (website screenshot)
        assets/projects/my-software.webp   (software screenshot)
        assets/thumbnails/my-video.webp    (small preview picture for videos)
   2. Copy one block below, paste it, and change the text.
   3. Save the file and refresh the website.

   FIELDS
   title       Brand / client name (required)
   category    One or more of these EXACT names:
                 "Meta Ads", "Website", "E-Commerce", "Software",
                 "AI Videos", "AI Posters", "Video Editing", "Google Ads",
                 "LinkedIn Ads", "Social Media", "Digital Marketing",
                 "Logo / Creative", "Advertising", "PPT"
   description Short description (a few words)
   file        Poster, video, screenshot, PDF or PPT/PPTX file
   thumbnail   Preview picture for videos/PDF/PPT
   link        Real website / demo URL only (optional)
   pin         1, 2, 3 ... = show first in this order (optional)
   last        1, 2, 3 ... = show at the end in this order (optional)

   ONLY projects that have a "file" are shown on the website, so there are
   never empty cards. A category button appears automatically as soon as it
   has at least one project.
   ===================================================================== */
window.PX_PORTFOLIO = [

  /* ---------- META ADS ---------- */
  { last: 1, title: "Divyaz Makeover", category: ["Meta Ads", "Digital Marketing"],
    description: "Bridal makeover packages",
    file: "assets/videos/divyaz-makeover-bridal.mp4",
    thumbnail: "assets/thumbnails/divyaz-makeover-bridal.webp" },
  { last: 2, title: "Secure Plus", category: ["Meta Ads"],
    description: "Dealer registration open: AI cameras",
    file: "assets/posters/secure-plus-dealer-registration.webp",
    thumbnail: "assets/thumbnails/secure-plus-dealer-registration.webp" },
  { last: 3, title: "Green Graft UPVC Doors & Windows", category: ["Meta Ads"],
    description: "Factory pricing for architects, engineers & builders",
    file: "assets/posters/green-graft-upvc.webp",
    thumbnail: "assets/thumbnails/green-graft-upvc.webp" },
  { last: 4, title: "AJ Packers & Movers", category: ["Meta Ads"],
    description: "House shifting ad (Tamil)",
    file: "assets/posters/aj-packers-movers.webp",
    thumbnail: "assets/thumbnails/aj-packers-movers.webp" },
  { title: "Eco-Sphere", category: ["Meta Ads"],
    description: "Eco-friendly stationery distribution",
    file: "assets/posters/ecosphere-distribution.webp",
    thumbnail: "assets/thumbnails/ecosphere-distribution.webp" },

  /* ---------- ADVERTISING ---------- */
  { title: "Secure Plus", category: ["Advertising"],
    description: "Exclusive for CCTV dealers",
    file: "assets/posters/secure-plus-exclusive-dealers.webp",
    thumbnail: "assets/thumbnails/secure-plus-exclusive-dealers.webp" },
  { title: "Secure Plus", category: ["Advertising"],
    description: "Attention CCTV dealers: AI series cameras",
    file: "assets/posters/secure-plus-attention-dealers.webp",
    thumbnail: "assets/thumbnails/secure-plus-attention-dealers.webp" },
  { title: "Veer Infosys", category: ["Advertising"],
    description: "Galaxy Health Insurance ad",
    file: "assets/posters/veer-infosys-galaxy-health.webp",
    thumbnail: "assets/thumbnails/veer-infosys-galaxy-health.webp" },

  /* ---------- VIDEO EDITING ---------- */
  { pin: 1, title: "AMP Real Estate", category: ["Video Editing", "Advertising"],
    description: "Kudimangalam land sale",
    file: "assets/videos/amp-real-estate-kudimangalam.mp4",
    thumbnail: "assets/thumbnails/amp-real-estate-kudimangalam.webp" },
  { pin: 2, title: "Manju Groups", category: ["Video Editing", "Advertising"],
    description: "Residential plots promotion",
    file: "assets/videos/manju-groups-plots-promo.mp4",
    thumbnail: "assets/thumbnails/manju-groups-plots-promo.webp" },
  { pin: 3, title: "Crazy Chango — Vasantham Associate", category: ["Video Editing"],
    description: "Venue promotional video",
    file: "assets/videos/crazy-chango-vasantham-associate.mp4",
    thumbnail: "assets/thumbnails/crazy-chango-vasantham-associate.webp" },

  /* ---------- WAITING FOR MEDIA (hidden until you add a "file") ----------
     Add the poster / video / screenshot path to show these projects. */
  { title: "Jagan Photographic", category: ["Meta Ads"] },
  { title: "ITIPS", category: ["Meta Ads"] },
  { title: "Providence College", category: ["Meta Ads"] },
  { title: "Maharaja Institute", category: ["Meta Ads"] },
  { title: "Winway Security System", category: ["Meta Ads"] },
  /* Websites: save a screenshot in assets/websites/ and add  file: "assets/websites/name.webp"  */
  { title: "Retro Fashion", category: ["E-Commerce"], description: "E-commerce website",
    link: "https://retrofashion.co.in/" },
  /* NOTE: this link currently shows "404 – no content has been added yet" */
  { title: "Nellai Suganyaa Mobiles", category: ["Website"], description: "Business website",
    link: "https://login.prexaldigiai.com/site/suganyamobile" },
  { title: "Organica", category: ["Website"] },
  { title: "Angoryan", category: ["Website"] },
  { title: "Poddy", category: ["Video Editing"] },
  { title: "Granga Builder", category: ["Logo / Creative", "Advertising"] }

  /* India Holiday Tours & Travels, Nellai Suganyaa Mobiles, MR Decors & Events,
     Source by Jannath and the other videos/posters are in creative-data.js —
     they also appear here under AI Videos / AI Posters / PPT / Advertising. */
];
