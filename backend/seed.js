// Run once to populate the database: node seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Opportunity = require("./models/Opportunity");

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://dushime:rrgEw0zWMtS9iWiA@cluster0.gbi3qsl.mongodb.net/";

const opportunities = [
  {
    category: "Education",
    title: "African Leadership University Scholarship 2026",
    description:
      "Full scholarship for women pursuing degrees in technology and business at ALU Rwanda. Covers tuition, accommodation, and living expenses for the full programme duration.",
    date: new Date("2026-03-31"),
    link: "https://alueducation.com/admissions/",
  },
  {
    category: "Education",
    title: "Carnegie Mellon University Africa Fellowship",
    description:
      "Fellowship for women pursuing a Masters in Engineering and Technology at the CMU Africa campus in Kigali. Includes a monthly stipend and research funding.",
    date: new Date("2026-05-15"),
    link: "https://africa.cmu.edu",
  },
  {
    category: "Education",
    title: "MASTERCARD Foundation Scholars Program",
    description:
      "Scholarship supporting academically talented yet economically disadvantaged young women from Africa to study at leading universities worldwide.",
    date: new Date("2026-04-01"),
    link: "https://mastercardfdn.org/all/scholars/",
  },
  {
    category: "Career",
    title: "Google Africa Developer Scholarship — Internship",
    description:
      "Paid 12-week internship at Google Nairobi for women in software engineering. Includes mentorship from senior engineers and a return offer pathway.",
    date: new Date("2026-02-28"),
    link: "https://developers.google.com/africa",
  },
  {
    category: "Career",
    title: "MTN Rwanda Graduate Trainee Program",
    description:
      "12-month structured graduate programme at MTN Rwanda for recent female graduates in engineering, finance, and marketing. Rotational placement across departments.",
    date: new Date("2026-02-14"),
    link: "https://mtn.co.rw/careers",
  },
  {
    category: "Career",
    title: "African Development Bank Young Professionals Program",
    description:
      "Prestigious 3-year professional development programme at the African Development Bank for women under 32 with outstanding academic records.",
    date: new Date("2026-04-30"),
    link: "https://www.afdb.org/en/about/careers/young-professionals-program",
  },
  {
    category: "Skills",
    title: "Rwanda Coding Academy Tech Bootcamp",
    description:
      "3-month intensive coding bootcamp covering web development, mobile apps, and cloud computing. Sponsored seats available specifically for women from underserved communities.",
    date: new Date("2026-04-15"),
    link: "https://rca.ac.rw",
  },
  {
    category: "Skills",
    title: "GIZ Digital Transformation Skills Training",
    description:
      "Free digital skills training covering data analysis, digital marketing, and project management for young women across Rwanda. Certificates provided on completion.",
    date: new Date("2026-03-20"),
    link: "https://www.giz.de/en/worldwide/392.html",
  },
  {
    category: "Skills",
    title: "UN Women — Financial Literacy for Entrepreneurs",
    description:
      "6-week online workshop series on financial planning, business modelling, and access to credit for women-led small businesses in Rwanda.",
    date: new Date("2026-03-10"),
    link: "https://www.unwomen.org/en/digital-library/publications",
  },
  {
    category: "Mentorship",
    title: "Women in Tech Rwanda Mentorship Program",
    description:
      "6-month mentorship programme connecting aspiring women technologists with senior industry leaders across East Africa. Monthly sessions, goal tracking, and networking events.",
    date: new Date("2026-03-01"),
    link: "https://witirwanda.org",
  },
  {
    category: "Mentorship",
    title: "Cherie Blair Foundation Women in Business Mentoring",
    description:
      "12-month online mentoring programme pairing women entrepreneurs in developing countries with experienced business mentors from around the world.",
    date: new Date("2026-02-20"),
    link: "https://cherieblairfoundation.org/programmes/mentoring/",
  },
  {
    category: "Mentorship",
    title: "She Leads Africa Accelerator",
    description:
      "Competitive 6-month accelerator programme for African women building scalable businesses. Includes mentorship, funding access, and a demo day pitch event.",
    date: new Date("2026-05-01"),
    link: "https://sheleadsafrica.org",
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const existing = await Opportunity.countDocuments();
    if (existing > 0) {
      console.log(
        `ℹ️  Database already has ${existing} opportunities. Clearing and re-seeding...`
      );
      await Opportunity.deleteMany({});
    }

    await Opportunity.insertMany(opportunities);
    console.log(`✅ Seeded ${opportunities.length} opportunities successfully`);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Connection closed");
  }
}

seed();
