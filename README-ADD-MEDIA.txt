PREXAL DIGIAI WEBSITE: HOW TO ADD NEW WORK
=========================================

Keep the files and folders together. index.html needs the assets folder next to it.

FOLDERS
  assets/videos/         videos (.mp4)
  assets/posters/        posters and ad creatives (.webp, .jpg, .png)
  assets/websites/       website screenshots
  assets/projects/       software or project screenshots
  assets/presentations/  PPT, PPTX or PDF files
  assets/thumbnails/     small preview pictures for videos and presentations
  assets/logos/          logo files
  assets/images/         founder photo and other images

WHICH FILE TO EDIT (open it with Notepad or VS Code)
  assets/js/portfolio-data.js   client projects (Meta Ads, Website, E-Commerce, Software ...)
  assets/js/creative-data.js    AI videos, AI posters, PPT, promotional creatives
  assets/js/reviews-data.js     customer review videos
  assets/js/company-data.js     founder message

STEPS
  1. Copy your file into the right folder (use simple names: no spaces, e.g. my-client-ad.mp4).
  2. Open the matching data file, copy one { ... } block, paste it, and change the text.
     Put a comma between blocks.
  3. Save the file and refresh the website.

A category button (for example "Google Ads") appears automatically
when it has at least one project.

TIP: videos are large. Before you upload the site to hosting, compress
them (for example with HandBrake, "Fast 1080p30" preset) so the pages load faster.
