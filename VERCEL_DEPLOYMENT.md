# Vercel Deployment Guide for Student Voice Secure

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare all required configuration values

## Step-by-Step Deployment

### Step 1: Connect Repository to Vercel

1. **Login to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**:
   - Click "New Project" on the dashboard
   - Select "Import Git Repository"
   - Choose `federicorossi144/student-voice-secure`
   - Click "Import"

### Step 2: Configure Project Settings

1. **Project Name**: 
   - Keep default: `student-voice-secure`
   - Or customize: `student-voice-secure-fhe`

2. **Framework Preset**: 
   - Select "Vite" from the dropdown

3. **Root Directory**: 
   - Leave as default (`.`)

4. **Build and Output Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Step 3: Environment Variables Configuration

**Critical**: Add these environment variables in Vercel dashboard:

#### Required Variables

```bash
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration  
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia

# Contract Configuration (Update after deployment)
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
```

#### How to Add Environment Variables:

1. **In Vercel Dashboard**:
   - Go to your project settings
   - Navigate to "Environment Variables" tab
   - Click "Add New"

2. **For Each Variable**:
   - Name: `NEXT_PUBLIC_CHAIN_ID`
   - Value: `11155111`
   - Environment: Select "Production", "Preview", and "Development"
   - Click "Save"

3. **Repeat for All Variables**:
   - Add each variable from the list above
   - Ensure all are set for all environments

### Step 4: Deploy

1. **Initial Deployment**:
   - Click "Deploy" button
   - Wait for build process to complete (2-3 minutes)
   - Note the deployment URL

2. **Verify Deployment**:
   - Visit the provided URL
   - Test wallet connection
   - Verify all features work correctly

### Step 5: Post-Deployment Configuration

#### Update Contract Address (After Smart Contract Deployment)

1. **Deploy Smart Contract**:
   ```bash
   # In your local project directory
   npx hardhat run scripts/deploy.ts --network sepolia
   ```

2. **Update Environment Variable**:
   - Go to Vercel dashboard
   - Navigate to Environment Variables
   - Update `NEXT_PUBLIC_CONTRACT_ADDRESS` with deployed address
   - Redeploy the application

#### Custom Domain (Optional)

1. **Add Domain**:
   - Go to project settings
   - Navigate to "Domains" tab
   - Click "Add Domain"
   - Enter your custom domain

2. **Configure DNS**:
   - Follow Vercel's DNS configuration instructions
   - Update your domain's DNS records

### Step 6: Continuous Deployment Setup

1. **Automatic Deployments**:
   - Vercel automatically deploys on push to main branch
   - Preview deployments for pull requests

2. **Branch Protection**:
   - Configure branch protection rules in GitHub
   - Require pull request reviews before merging

## Troubleshooting

### Common Issues

#### Build Failures

1. **Dependency Issues**:
   ```bash
   # Check package.json dependencies
   npm install --production=false
   ```

2. **Environment Variables**:
   - Ensure all `NEXT_PUBLIC_*` variables are set
   - Check variable names for typos

3. **Build Command Issues**:
   - Verify build command: `npm run build`
   - Check output directory: `dist`

#### Runtime Errors

1. **Wallet Connection Issues**:
   - Verify `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`
   - Check RPC URL configuration

2. **Contract Interaction Issues**:
   - Verify `NEXT_PUBLIC_CONTRACT_ADDRESS`
   - Ensure contract is deployed on Sepolia

### Performance Optimization

1. **Build Optimization**:
   - Enable Vercel's automatic optimizations
   - Use Vercel's Edge Functions if needed

2. **Caching**:
   - Configure appropriate cache headers
   - Use Vercel's CDN for static assets

## Monitoring and Analytics

1. **Vercel Analytics**:
   - Enable Vercel Analytics in project settings
   - Monitor performance metrics

2. **Error Tracking**:
   - Set up error monitoring (Sentry, LogRocket)
   - Monitor application logs in Vercel dashboard

## Security Considerations

1. **Environment Variables**:
   - Never commit sensitive data to repository
   - Use Vercel's secure environment variable storage

2. **Access Control**:
   - Limit Vercel team access
   - Use proper GitHub permissions

3. **HTTPS**:
   - Vercel provides automatic HTTPS
   - Ensure all external API calls use HTTPS

## Backup and Recovery

1. **Code Backup**:
   - Repository is backed up on GitHub
   - Regular local backups recommended

2. **Environment Variables Backup**:
   - Document all environment variables
   - Keep secure backup of sensitive values

## Cost Management

1. **Vercel Pricing**:
   - Free tier: 100GB bandwidth, 100 serverless function executions
   - Monitor usage in Vercel dashboard

2. **Optimization**:
   - Use static generation where possible
   - Optimize images and assets

---

## Quick Reference

### Essential Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Deploy to Vercel (if using CLI)
npx vercel --prod

# Check deployment status
npx vercel ls
```

### Important URLs

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Project Settings**: https://vercel.com/federicorossi144/student-voice-secure/settings
- **Environment Variables**: https://vercel.com/federicorossi144/student-voice-secure/settings/environment-variables

### Support Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Vite Deployment Guide**: https://vitejs.dev/guide/static-deploy.html
- **GitHub Issues**: Create issues in the repository for support

---

**Deployment completed successfully! 🚀**

Your Student Voice Secure application is now live and accessible to users worldwide.
