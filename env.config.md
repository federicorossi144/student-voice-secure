# Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```bash
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration (Optional)
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia

# Contract Configuration
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
```

## Deployment Configuration

For Vercel deployment, add these environment variables in the Vercel dashboard:

1. Go to your project settings
2. Navigate to Environment Variables
3. Add each variable with the corresponding value
4. Make sure to set them for Production, Preview, and Development environments
