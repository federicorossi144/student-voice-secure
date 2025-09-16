# Student Voice Secure

A revolutionary voting platform that combines **Fully Homomorphic Encryption (FHE)** with blockchain technology to ensure complete privacy and security in university elections.

## 🔐 Privacy-First Architecture

Student Voice Secure leverages cutting-edge cryptographic techniques to protect voter privacy while maintaining election integrity:

- **FHE Encryption**: Votes are encrypted before transmission and remain encrypted throughout the entire process
- **Blockchain Security**: All encrypted ballots are recorded on an immutable Sepolia testnet ledger
- **Zero-Knowledge Verification**: Students can verify their vote was counted without revealing their choice
- **Anonymous Authentication**: Student identity is verified without exposing personal information

## 🚀 Key Features

### Secure Student Registration
- Hash-based student ID verification
- University affiliation validation
- Reputation system for trusted participants

### Encrypted Voting Process
- End-to-end encrypted ballots using FHE
- Real-time vote tallying without decryption
- Anonymous vote submission and verification

### Transparent Results
- Public vote counts (encrypted values)
- Verifiable election outcomes
- Immutable audit trail on blockchain

## 🛠 Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: shadcn/ui + Tailwind CSS
- **Blockchain**: Ethereum Sepolia Testnet
- **Wallet Integration**: RainbowKit + Wagmi
- **Encryption**: FHEVM (Fully Homomorphic Encryption)
- **Smart Contracts**: Solidity ^0.8.24

## 📋 Prerequisites

- Node.js 18+ and npm
- Git
- MetaMask or compatible Web3 wallet
- Sepolia ETH for gas fees

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/federicorossi144/student-voice-secure.git
cd student-voice-secure
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Contract Configuration
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
```

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to access the application.

## 🏗 Smart Contract Deployment

### Prerequisites for Deployment

1. Install Hardhat dependencies:
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @fhevm/hardhat-plugin
```

2. Add your private key to environment variables:
```bash
PRIVATE_KEY=your_private_key_here
```

### Deploy to Sepolia

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

Update the `NEXT_PUBLIC_CONTRACT_ADDRESS` in your `.env.local` file with the deployed contract address.

## 🎯 Usage Guide

### For Students

1. **Connect Wallet**: Use MetaMask or any compatible Web3 wallet
2. **Register**: Provide university name and student ID (hashed for privacy)
3. **Wait for Verification**: Admin verification required for participation
4. **Vote**: Select candidates and submit encrypted ballots
5. **Verify**: Check that your vote was recorded (without revealing choice)

### For Administrators

1. **Verify Students**: Approve student registrations
2. **Create Elections**: Set up voting campaigns with candidates
3. **Monitor Results**: View encrypted vote tallies
4. **End Elections**: Close voting periods and finalize results

## 🔧 Development

### Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Navigation header
│   ├── VotingInterface.tsx
│   └── StudentRegistration.tsx
├── contracts/          # Smart contract ABI
├── hooks/              # Custom React hooks
│   └── useContract.ts  # Contract interaction hooks
├── pages/              # Application pages
└── providers/          # Context providers
    └── WalletProvider.tsx
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Vercel Deployment

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Environment Variables**: Add all required environment variables
3. **Deploy**: Automatic deployment on push to main branch

#### Environment Variables for Vercel

```bash
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
```

### Manual Deployment Steps

1. **Build the Project**:
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**:
   ```bash
   npx vercel --prod
   ```

3. **Configure Domain** (Optional):
   - Add custom domain in Vercel dashboard
   - Update DNS settings as instructed

## 🔒 Security Considerations

- **Private Keys**: Never commit private keys to version control
- **Environment Variables**: Use secure environment variable management
- **Smart Contract Audits**: Consider professional security audits before mainnet deployment
- **Access Control**: Implement proper admin role management
- **Rate Limiting**: Add rate limiting for public endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [FHEVM](https://github.com/fhenixprotocol/fhevm) for FHE implementation
- [RainbowKit](https://www.rainbowkit.com/) for wallet integration
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Zama](https://zama.ai/) for FHE research and development

## 📞 Support

For support and questions:
- Create an issue in this repository
- Contact: federicorossi144@github.com

---

**Built with ❤️ for secure, private, and transparent democracy**