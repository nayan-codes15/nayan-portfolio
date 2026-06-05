# 🚀 Deployment Guide

## Quick Start: Vercel Deployment (Recommended)

### Prerequisites

- Vercel account (free at vercel.com)
- Git repository (GitHub, GitLab, Bitbucket)
- Environment variables configured

### Step 1: Connect Repository to Vercel

```bash
# If you don't have git initialized
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/potfilolie.git
git push -u origin main
```

Visit https://vercel.com/new and select your repository.

### Step 2: Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```
GROQ_API_KEY=your_groq_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### Step 3: Deploy

Click "Deploy" button. Vercel will automatically:

- Build your Next.js app
- Run TypeScript checks
- Generate static pages
- Deploy to CDN
- Provide live URL

**Deployment Time:** ~2-3 minutes

### Step 4: Add Custom Domain (Optional)

```
1. Go to Vercel Dashboard → Your Project → Domains
2. Click "Add" and enter your domain
3. Follow DNS configuration instructions
4. SSL certificate auto-generated
```

---

## Deployment to Netlify

### Prerequisites

- Netlify account (free at netlify.com)
- Repository on GitHub/GitLab/Bitbucket

### Step 1: Connect Git Repository

Visit https://app.netlify.com/start and select your repository.

### Step 2: Configure Build Settings

```
Build command:    npm run build
Publish directory: .next
Node version:     20.x
```

### Step 3: Set Environment Variables

Settings → Build & Deploy → Environment:

```
GROQ_API_KEY=your_groq_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### Step 4: Deploy

Click "Deploy site". Netlify will build and deploy automatically.

**Note:** Netlify may have issues with Next.js edge runtime. Vercel is recommended.

---

## Local Development & Testing

### Development Server

```bash
npm run dev
# Runs on http://localhost:3000
```

### Build Locally

```bash
npm run build
npm run start
```

### Lint Check

```bash
npm run lint
# Should show: ✔ 0 warnings, 0 errors
```

---

## Environment Variables Setup

### EmailJS Configuration

1. Create account at emailjs.com
2. Add email service (Gmail, Outlook, etc.)
3. Create email template
4. Copy credentials:

```
Service ID:  service_xxxxx
Template ID: template_xxxxx
Public Key:  your_public_key
```

### AI Chatbot Configuration

#### Groq API

```bash
1. Visit console.groq.com/login
2. Create API key
3. Set GROQ_API_KEY in environment
```

#### Anthropic API

```bash
1. Visit console.anthropic.com
2. Create API key
3. Set ANTHROPIC_API_KEY in environment
```

---

## Post-Deployment Steps

### 1. Verify Deployment

```bash
# Test live site
curl https://your-domain.com

# Check status
curl https://your-domain.com/api/chat
```

### 2. Submit to Search Engines

**Google Search Console:**

```
1. Visit search.google.com/search-console
2. Add property
3. Upload sitemap: https://your-domain.com/sitemap.xml
4. Request indexing for home page
```

**Bing Webmaster:**

```
1. Visit bing.com/webmasters
2. Add site
3. Upload sitemap
4. Request crawl
```

### 3. Set Up Analytics

**Google Analytics:**

```bash
1. Create property at analytics.google.com
2. Add measurement ID to your app
3. Configure goals for contact form submissions
```

**Vercel Analytics:**

```bash
# Already integrated if using Vercel
# Visit dashboard to view metrics
```

### 4. Test Contact Form

```bash
1. Navigate to Contact section
2. Fill form with test data
3. Submit
4. Check email inbox for confirmation
5. Verify response in browser
```

### 5. Verify Mobile Responsiveness

```bash
# Test on mobile devices
# Or use Chrome DevTools:
# F12 → Toggle Device Toolbar (Ctrl+Shift+M)
```

### 6. Run Lighthouse Audit

```bash
Chrome → DevTools → Lighthouse
- Performance
- Accessibility
- Best Practices
- SEO
```

Expected scores:

- Performance: 85+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 90+

---

## Monitoring & Maintenance

### Weekly Tasks

- Check error logs
- Verify form submissions
- Monitor Lighthouse scores

### Monthly Tasks

- Update dependencies: `npm update`
- Check for security vulnerabilities: `npm audit`
- Review analytics
- Update content if needed

### Pre-Deployment Validation

```bash
# Run full validation
npm run lint && npm run build

# Expected output:
# ✔ Lint: 0 errors, 0 warnings
# ✔ Build successful
# ✔ No TypeScript errors
```

---

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working

```bash
# Verify format in .env.local (dev only)
# Production: Use platform's environment settings
# Never commit .env files to git
```

### Contact Form Not Sending

```bash
1. Verify EmailJS credentials
2. Check API keys are correct
3. Test in browser console:
   emailjs.send(SERVICE_ID, TEMPLATE_ID, {...})
4. Check email spam folder
```

### Images Not Loading

```bash
# Verify remote patterns in next.config.ts
# Check image URLs are public
# Test image URL in browser directly
```

---

## Rollback Procedure

### Vercel

```bash
# Previous deployments auto-saved
Vercel Dashboard → Deployments → Select version → Promote to Production
```

### Netlify

```bash
# Previous builds auto-saved
Netlify Dashboard → Deploys → Select version → Publish deploy
```

---

## Performance Optimization Tips

### After Deployment

1. **Enable Compression**
   - Automatic with Vercel/Netlify
   - Verify with: `curl -I https://your-domain.com` (check gzip)

2. **Optimize Images**
   - Already using next/image
   - Monitor with Lighthouse

3. **Enable Caching**
   - Cache headers configured
   - Verify in DevTools → Network tab

4. **Monitor Core Web Vitals**
   - https://web.dev/vitals/
   - Check Google Search Console → Core Web Vitals

---

## Security Checklist

- [x] HTTPS enabled (automatic with Vercel/Netlify)
- [x] CSP headers configured
- [x] No sensitive data in environment
- [x] API keys in environment variables
- [x] Dependencies up-to-date
- [x] No console logs with sensitive data
- [x] Email validation on form
- [x] CORS configured for APIs

---

## Custom Domain Setup

### Using Vercel with Custom Domain

```bash
1. Vercel Dashboard → Your Project → Domains
2. Click "Add"
3. Enter domain (e.g., nayan-kumar.dev)
4. Choose DNS setup method:
   - Nameservers (recommended)
   - CNAME (if primary domain elsewhere)
5. Update domain registrar DNS settings
6. Wait for propagation (24-48 hours)
```

### DNS Records to Add (Nameserver Method)

Vercel will provide nameservers:

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

Update your registrar to use these nameservers.

---

## Continuous Integration/Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  Deploy-Production:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Getting Help

- **Vercel Docs:** vercel.com/docs
- **Next.js Docs:** nextjs.org/docs
- **Tailwind CSS:** tailwindcss.com/docs
- **Framer Motion:** framer.com/motion

---

**Last Updated:** June 5, 2026  
**Status:** Production Ready
