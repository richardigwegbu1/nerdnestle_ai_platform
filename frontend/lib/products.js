// lib/products.js

export const PRODUCTS = [
  // ---------------- CHATBOTS & ASSISTANTS ----------------
  {
    id: "ai-chat-assistant",
    slug: "ai-chat-assistant",
    name: "AI Chat Assistant",
    category: "Chatbots & Assistants",
    categoryKey: "chatbots",
    badge: "Popular",
    tagline: "Embed a smart chatbot on your website in minutes.",
    shortDescription:
      "Answer customer questions 24/7 with an AI chatbot trained on your content.",
    longDescription:
      "The AI Chat Assistant lets you plug in your website content, docs, or FAQs and instantly deploy a chatbot that can answer customer questions, help with onboarding, and handle pre-sales conversations. No coding required — just connect your data and paste a simple embed snippet.",
    priceMonthly: 19,
    priceOnce: null,
    status: "available",
    level: "Beginner friendly",
    idealFor: [
      "Coaches & consultants",
      "Course creators",
      "Small businesses",
      "SaaS founders"
    ],
    features: [
      "Train on your website, PDFs, or knowledge base",
      "Simple embed widget you can paste anywhere",
      "Custom branding and welcome messages",
      "Conversation history and export",
      "Supports multiple languages"
    ],
    useCases: [
      "24/7 pre-sales and support on your landing page",
      "Internal team knowledge assistant",
      "Student Q&A bot for online courses",
      "FAQ automation for service businesses"
    ],
    faqs: [
      {
        q: "Do I need to know how to code?",
        a: "No. You’ll get a simple embed script you can paste into WordPress, Webflow, or any site builder."
      },
      {
        q: "Can I control what the bot says?",
        a: "Yes. You can restrict the bot to your content and configure tone, language, and fallback messages."
      }
    ]
  },

  {
    id: "ai-customer-support-assistant",
    slug: "ai-customer-support-assistant",
    name: "AI Customer Support Assistant",
    category: "Chatbots & Assistants",
    categoryKey: "chatbots",
    badge: "New",
    tagline: "Reduce support tickets by automating answers to common questions.",
    shortDescription:
      "Route tickets, propose replies, and auto-answer repetitive questions with AI.",
    longDescription:
      "This tool plugs into your help desk or shared inbox and drafts responses to customer questions based on your help docs, previous tickets, and policies. Your team can approve or edit replies with one click, saving hours every week.",
    priceMonthly: 29,
    priceOnce: null,
    status: "coming_soon",
    level: "Intermediate",
    idealFor: [
      "Support teams",
      "SaaS products",
      "Membership sites",
      "Agencies"
    ],
    features: [
      "Suggested replies directly in your inbox",
      "Learns from your help center and canned responses",
      "Detects sentiment and urgency",
      "Multi-agent support queues"
    ],
    useCases: [
      "Handle common refund and login requests automatically",
      "Support large student communities with fewer staff",
      "Triage tickets by urgency and topic"
    ],
    faqs: []
  },

  // ---------------- CAREER & HIRING ----------------
  {
    id: "ai-resume-analyzer",
    slug: "ai-resume-analyzer",
    name: "AI Résumé Analyzer",
    category: "Career & Job Tools",
    categoryKey: "career",
    badge: "ATS-Ready",
    tagline: "Get instant ATS-style scoring and improvement tips.",
    shortDescription:
      "Upload your resume and the job description, get an ATS-style score, keyword gap analysis, and rewrite suggestions.",
    longDescription:
      "The AI Résumé Analyzer gives job seekers and career coaches a powerful way to optimize resumes. It simulates how Applicant Tracking Systems (ATS) read your resume, highlights keyword gaps, and suggests bullet-level improvements so candidates can stand out and get more interviews.",
    priceMonthly: 15,
    priceOnce: 49,
    status: "available",
    level: "Beginner friendly",
    idealFor: [
      "Job seekers",
      "Career coaches",
      "HR consultants",
      "University career centers"
    ],
    features: [
      "Upload resume + paste job description",
      "ATS-style compatibility score",
      "Keyword gap analysis and recommendations",
      "Bullet point rewrites and summary improvements",
      "PDF and Word export"
    ],
    useCases: [
      "Optimize resumes for tech, healthcare, and finance roles",
      "Provide paid resume review services to clients",
      "Bundle with interview coaching offers"
    ],
    faqs: []
  },

  {
    id: "ai-job-application-assistant",
    slug: "ai-job-application-assistant",
    name: "AI Job Application Assistant",
    category: "Career & Job Tools",
    categoryKey: "career",
    badge: "High Demand",
    tagline: "Apply to more jobs in less time with tailored applications.",
    shortDescription:
      "Generate tailored cover letters, email pitches, and application answers for each role — based on your resume and the job description.",
    longDescription:
      "The AI Job Application Assistant is your personal job-hunting engine. Paste a job link or description, and the tool will generate a tailored cover letter, a short recruiter outreach message, and answers to common application questions — all aligned with your experience and tone. Coaches and agencies can white-label this for clients.",
    priceMonthly: 29,
    priceOnce: null,
    status: "available",
    level: "Beginner friendly",
    idealFor: [
      "Job seekers",
      "Career & interview coaches",
      "Recruitment agencies",
      "Career bootcamps"
    ],
    features: [
      "Upload or paste your core resume once",
      "Generate tailored cover letters in seconds",
      "Create short LinkedIn or email outreach messages",
      "Suggested answers for typical application form questions",
      "Save and reuse templates for future roles"
    ],
    useCases: [
      "Apply to 5–10 targeted jobs per day with less stress",
      "Boost your coaching program with a branded AI assistant",
      "Offer “done-with-you” job application services at scale"
    ],
    faqs: [
      {
        q: "Will the content sound robotic?",
        a: "No. You can set your preferred tone (professional, friendly, bold, etc.) and the AI will match it."
      },
      {
        q: "Can I store multiple profiles?",
        a: "Yes, you can store different profiles — for example DevOps Engineer, Cloud Architect, or Sysadmin — and switch between them."
      }
    ]
  },

  // ---------------- CONTENT & SOCIAL ----------------
  {
    id: "ai-blog-writer",
    slug: "ai-blog-writer",
    name: "AI Blog Writer",
    category: "Content & SEO",
    categoryKey: "content",
    badge: "SEO Ready",
    tagline: "Long-form SEO articles in minutes, not days.",
    shortDescription:
      "Plan, outline, and generate SEO-friendly blog posts with headings, FAQs, and call-to-actions.",
    longDescription:
      "The AI Blog Writer helps content creators, agencies, and businesses publish consistent, high-quality articles. Start with a keyword or topic, generate an outline, and let the AI draft a long-form article with headings, meta descriptions, and internal linking suggestions.",
    priceMonthly: 25,
    priceOnce: null,
    status: "available",
    level: "Beginner friendly",
    idealFor: ["Bloggers", "Agencies", "Coaches", "Niche site owners"],
    features: [
      "SEO-intent-aware outline generation",
      "Long-form article drafts with headings",
      "Meta titles and descriptions",
      "FAQs and schema-friendly Q&A",
      "Internal and external link suggestions"
    ],
    useCases: [
      "Grow a niche blog or affiliate site",
      "Support clients with consistent monthly content",
      "Launch content for new product or course"
    ],
    faqs: []
  },

  {
    id: "ai-social-media-manager",
    slug: "ai-social-media-manager",
    name: "AI Social Media Manager",
    category: "Content & SEO",
    categoryKey: "content",
    badge: "Multi-Platform",
    tagline: "Plan, write, and schedule posts across multiple platforms.",
    shortDescription:
      "Generate posts for Instagram, TikTok, LinkedIn, X, and Facebook from one content idea.",
    longDescription:
      "Turn one core idea into a full set of social posts. The AI Social Media Manager creates captions, hook ideas, carousels outlines, and CTA suggestions tailored to each platform. Great for creators, course owners, and small businesses.",
    priceMonthly: 27,
    priceOnce: null,
    status: "available",
    level: "Beginner friendly",
    idealFor: [
      "Creators",
      "Coaches",
      "E-commerce brands",
      "Agencies managing multiple clients"
    ],
    features: [
      "Multi-platform post generator (Instagram, TikTok, YouTube, LinkedIn, X)",
      "Hook, body, and CTA suggestions",
      "Content calendar ideas",
      "Hashtag and keyword recommendations"
    ],
    useCases: [
      "Batch-create posts for the month",
      "Support clients as a social media manager",
      "Promote your courses, products, and events"
    ],
    faqs: []
  },

  // ---------------- MEDIA & DESIGN ----------------
  {
    id: "ai-image-generator",
    slug: "ai-image-generator",
    name: "AI Image Generator",
    category: "Media & Design",
    categoryKey: "media",
    badge: "Visual",
    tagline: "Generate thumbnails, social graphics, and ad creatives.",
    shortDescription:
      "Enter a prompt and get branded images for your content, ads, and websites.",
    longDescription:
      "The AI Image Generator helps you create branded, consistent visuals without hiring a designer. Use it for YouTube thumbnails, social posts, website headers, and ad creatives — and export in high quality.",
    priceMonthly: 19,
    priceOnce: null,
    status: "coming_soon",
    level: "Beginner friendly",
    idealFor: ["YouTubers", "Coaches", "Agencies", "Small businesses"],
    features: [
      "Prompt-based image generation",
      "Brand color and logo overlays",
      "Presets for thumbnails, reels covers, and ads",
      "Download in multiple sizes"
    ],
    useCases: [
      "Consistent branding across your channels",
      "Fast production of test creatives for ads",
      "Eye-catching visuals for lead magnets"
    ],
    faqs: []
  },

  // ---------------- LINUX & DEVOPS TOOLS ----------------
  {
    id: "ai-linux-troubleshooting-assistant",
    slug: "ai-linux-troubleshooting-assistant",
    name: "AI Linux Troubleshooting Assistant",
    category: "Developer & DevOps",
    categoryKey: "devops",
    badge: "Dev Tools",
    tagline: "Paste errors, get fixes — for Linux, services, and logs.",
    shortDescription:
      "An AI helper trained to understand Linux errors, logs, and systemctl issues — with step-by-step fixes.",
    longDescription:
      "The AI Linux Troubleshooting Assistant is built for sysadmins, DevOps engineers, and students. Paste your error messages, journalctl output, or configuration snippets, and get clear, safe troubleshooting steps with explanation. Great for learning and for production firefighting.",
    priceMonthly: 24,
    priceOnce: null,
    status: "available",
    level: "Intermediate",
    idealFor: [
      "Linux admins",
      "DevOps engineers",
      "SREs",
      "Students in Linux/Cloud bootcamps"
    ],
    features: [
      "Understands common Linux distros and tooling",
      "Explains commands before you run them",
      "Guided root cause analysis",
      "Systemd, networking, storage, and permission issues"
    ],
    useCases: [
      "Fix production incidents faster",
      "Use as a teaching/learning companion",
      "Help juniors debug issues safely"
    ],
    faqs: []
  },

  {
    id: "ai-bash-script-generator",
    slug: "ai-bash-script-generator",
    name: "AI Bash Script Generator",
    category: "Developer & DevOps",
    categoryKey: "devops",
    badge: "Automation",
    tagline: "Turn plain English into production-ready Bash scripts.",
    shortDescription:
      "Describe the task, get a Bash script with comments, safety checks, and logging.",
    longDescription:
      "The AI Bash Script Generator helps Linux and DevOps engineers move faster. Describe what you want to automate, and the tool generates a clean Bash script with comments, error checking, and optional logging — plus a human explanation of how it works.",
    priceMonthly: 19,
    priceOnce: null,
    status: "available",
    level: "Intermediate",
    idealFor: [
      "Sysadmins",
      "DevOps engineers",
      "Cloud engineers",
      "Linux students"
    ],
    features: [
      "Generates Bash scripts from natural language",
      "Adds comments and error handling",
      "Option to include logging and dry-run mode",
      "Explains each section of the script"
    ],
    useCases: [
      "Daily maintenance and backup scripts",
      "Bulk file operations and user management",
      "Student practice and lab automation"
    ],
    faqs: []
  },

  {
    id: "ai-devops-pipeline-builder",
    slug: "ai-devops-pipeline-builder",
    name: "AI DevOps Pipeline Builder",
    category: "Developer & DevOps",
    categoryKey: "devops",
    badge: "Pro",
    tagline: "Generate CI/CD pipelines for GitHub Actions, GitLab CI, and Jenkins.",
    shortDescription:
      "Describe your app and stack, get a working CI/CD pipeline configuration.",
    longDescription:
      "The AI DevOps Pipeline Builder helps teams and freelancers create CI/CD pipelines without copying random snippets from the internet. Describe your application, test strategy, and deployment target, and get a ready-to-use pipeline for GitHub Actions, GitLab CI, or Jenkins.",
    priceMonthly: 39,
    priceOnce: null,
    status: "available",
    level: "Advanced",
    idealFor: [
      "DevOps engineers",
      "Freelancers",
      "Small SaaS teams",
      "Agencies shipping client projects"
    ],
    features: [
      "Supports GitHub Actions, GitLab CI, and Jenkinsfile",
      "Build, test, and deploy stages",
      "Docker and container image build steps",
      "Environment-based config (dev/stage/prod)"
    ],
    useCases: [
      "Set up CI/CD for new client projects fast",
      "Standardize pipelines across your organization",
      "Teach CI/CD concepts in your training programs"
    ],
    faqs: []
  },

  {
    id: "ai-dockerfile-generator",
    slug: "ai-dockerfile-generator",
    name: "AI Dockerfile Generator",
    category: "Developer & DevOps",
    categoryKey: "devops",
    badge: "Containers",
    tagline: "Generate secure and efficient Dockerfiles.",
    shortDescription:
      "Create Dockerfiles for Node, Python, Go, PHP, and more — with best practices baked in.",
    longDescription:
      "The AI Dockerfile Generator lets you describe your application and target environment and gives you a production-aware Dockerfile, including multi-stage builds, non-root users, and caching optimization.",
    priceMonthly: 15,
    priceOnce: null,
    status: "available",
    level: "Intermediate",
    idealFor: [
      "Backend developers",
      "DevOps engineers",
      "Students learning containers"
    ],
    features: [
      "Language-specific Dockerfile templates",
      "Multi-stage builds for smaller images",
      "Security best practices (non-root, minimal base images)",
      "Optional health checks and entrypoints"
    ],
    useCases: [
      "Containerize legacy applications",
      "Teach Docker best practices",
      "Standardize container builds across services"
    ],
    faqs: []
  },

  {
    id: "ai-kubernetes-manifest-generator",
    slug: "ai-kubernetes-manifest-generator",
    name: "AI Kubernetes Manifest Generator",
    category: "Developer & DevOps",
    categoryKey: "devops",
    badge: "Kubernetes",
    tagline: "Generate clean YAML for deployments, services, and ingress.",
    shortDescription:
      "Describe your app and cluster setup, get Kubernetes manifests ready to apply.",
    longDescription:
      "The AI Kubernetes Manifest Generator helps you avoid YAML headaches. Describe your app, replica count, resource needs, and ingress expectations. The tool outputs well-structured manifests for Deployments, Services, Ingress, ConfigMaps, and more.",
    priceMonthly: 29,
    priceOnce: null,
    status: "coming_soon",
    level: "Advanced",
    idealFor: ["DevOps", "Platform teams", "SREs", "Kubernetes learners"],
    features: [
      "Deployment, Service, Ingress, and ConfigMap generation",
      "Resource requests/limits suggestions",
      "Health checks and probes",
      "Namespace and label strategies"
    ],
    useCases: [
      "Spin up demo environments quickly",
      "Teach Kubernetes in bootcamps",
      "Standardize manifests for internal teams"
    ],
    faqs: []
  },

  {
    id: "ai-terraform-module-generator",
    slug: "ai-terraform-module-generator",
    name: "AI Terraform Module Generator",
    category: "Developer & DevOps",
    categoryKey: "devops",
    badge: "Infrastructure as Code",
    tagline: "Scaffold Terraform modules for AWS, Azure, and GCP.",
    shortDescription:
      "Generate reusable Terraform modules with variables, outputs, and documentation.",
    longDescription:
      "The AI Terraform Module Generator helps cloud engineers scaffold infrastructure faster. Define your requirements (VPC, EC2, S3, RDS, etc.), and get a Terraform module with variables, outputs, and README usage examples.",
    priceMonthly: 39,
    priceOnce: null,
    status: "available",
    level: "Advanced",
    idealFor: [
      "Cloud engineers",
      "DevOps engineers",
      "Consultants",
      "Teams standardizing IaC"
    ],
    features: [
      "Generates Terraform code with proper structure",
      "Variables, outputs, and locals setup",
      "Environment-based configurations",
      "Optional examples and README docs"
    ],
    useCases: [
      "Create internal module libraries",
      "Client project templates",
      "Teaching Terraform to students"
    ],
    faqs: []
  },

  // ---------------- CLOUD (AWS FOCUSED) ----------------
  {
    id: "ai-aws-architect-assistant",
    slug: "ai-aws-architect-assistant",
    name: "AI AWS Architect Assistant",
    category: "Cloud & Infrastructure",
    categoryKey: "cloud",
    badge: "Cloud",
    tagline: "Design secure AWS architectures with expert guidance.",
    shortDescription:
      "Describe your app and constraints, get an AWS reference design plus diagrams and notes.",
    longDescription:
      "The AI AWS Architect Assistant is like a cloud architect on demand. Describe your workload and constraints (budget, scale, security), and get an architecture recommendation with VPC layout, services, security groups, and scaling strategy.",
    priceMonthly: 49,
    priceOnce: null,
    status: "available",
    level: "Advanced",
    idealFor: [
      "Cloud architects",
      "Freelancers",
      "Technical founders",
      "Solution consultants"
    ],
    features: [
      "VPC and subnet design suggestions",
      "Service selection (EC2 vs Fargate vs Lambda, etc.)",
      "Security and IAM considerations",
      "High availability and backup notes"
    ],
    useCases: [
      "Prepare architecture diagrams for stakeholders",
      "Design MVP infrastructure quickly",
      "Support client proposals and consulting work"
    ],
    faqs: []
  },

  {
    id: "ai-iam-policy-generator",
    slug: "ai-iam-policy-generator",
    name: "AI IAM Policy Generator",
    category: "Cloud & Infrastructure",
    categoryKey: "cloud",
    badge: "Security",
    tagline: "Generate least-privilege IAM policies safely.",
    shortDescription:
      "Describe what your app or user should do, and get a tight IAM policy with explanation.",
    longDescription:
      "IAM is hard and easy to get wrong. The AI IAM Policy Generator helps you define least-privilege AWS IAM policies based on your description of actions and resources, and explains each section, so you can review before deploying.",
    priceMonthly: 19,
    priceOnce: null,
    status: "available",
    level: "Intermediate",
    idealFor: [
      "Cloud engineers",
      "Security engineers",
      "DevOps teams",
      "Students preparing for AWS exams"
    ],
    features: [
      "Generates JSON IAM policies",
      "Explains each statement and action",
      "Highlights risky permissions",
      "Supports roles, users, and service roles"
    ],
    useCases: [
      "Tighten permissions for production workloads",
      "Teach IAM best practices",
      "Speed up client engagements"
    ],
    faqs: []
  },

  // ---------------- TRAINING & COACHING ----------------
  {
    id: "ai-linux-tutor",
    slug: "ai-linux-tutor",
    name: "AI Linux Tutor",
    category: "Training & Education",
    categoryKey: "training",
    badge: "Learning",
    tagline: "An on-demand Linux instructor for commands, concepts, and labs.",
    shortDescription:
      "Ask questions, get explanations, and generate practice labs for Linux topics.",
    longDescription:
      "The AI Linux Tutor is built for learners and trainers. It explains commands, generates practice labs, and gives challenge questions. Perfect for UTA-branded training, self-paced portals, and 1:1 coaching support.",
    priceMonthly: 19,
    priceOnce: null,
    status: "coming_soon",
    level: "Beginner friendly",
    idealFor: [
      "Students",
      "Bootcamps",
      "Self-taught engineers",
      "Technical instructors"
    ],
    features: [
      "Explain commands line-by-line",
      "Generate practice labs and scenarios",
      "Offer quiz questions and flashcards",
      "Supports RHEL, Ubuntu, and other distros"
    ],
    useCases: [
      "Enhance a Linux course with an AI helper",
      "Give students 24/7 support outside class",
      "Self-study companion while learning Linux"
    ],
    faqs: []
  },

  {
    id: "ai-devops-interview-coach",
    slug: "ai-devops-interview-coach",
    name: "AI DevOps Interview Coach",
    category: "Training & Education",
    categoryKey: "training",
    badge: "Career",
    tagline: "Practice real DevOps interview questions with instant feedback.",
    shortDescription:
      "Simulate technical and behavioral DevOps interviews, with scoring and improvement tips.",
    longDescription:
      "The AI DevOps Interview Coach lets users practice live-style question and answer sessions. It asks about CI/CD, Docker, Kubernetes, Linux, monitoring, cloud architecture, and more — then gives scoring and improvement suggestions.",
    priceMonthly: 25,
    priceOnce: null,
    status: "available",
    level: "Intermediate",
    idealFor: [
      "Job seekers",
      "DevOps bootcamps",
      "Career coaches",
      "Technical mentors"
    ],
    features: [
      "Scenario-based technical questions",
      "Behavioral and communication questions",
      "Feedback on clarity and depth of answers",
      "Track improvement over time"
    ],
    useCases: [
      "Prep for DevOps/SRE interviews",
      "Offer paid mock interviews at scale",
      "Supplement a DevOps training curriculum"
    ],
    faqs: []
  }
];

// Helper to group by category if needed later
export function getProductsByCategory() {
  const byCategory = {};
  for (const product of PRODUCTS) {
    if (!byCategory[product.category]) {
      byCategory[product.category] = [];
    }
    byCategory[product.category].push(product);
  }
  return byCategory;
}

export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug);
}

