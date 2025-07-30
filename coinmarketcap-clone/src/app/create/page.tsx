'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Rocket, 
  Upload, 
  Wallet, 
  DollarSign, 
  Users, 
  Zap, 
  Shield, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Loader2,
  Copy,
  ExternalLink
} from 'lucide-react';
import WalletConnect from '@/components/wallet/wallet-connect';
import { createTokenDeploymentService, DEFAULT_MAINNET_CONFIG, DEFAULT_DEVNET_CONFIG, type TokenMetadata, type DeploymentStep } from '@/lib/token-deployment-service';
import { imageUploadService } from '@/lib/image-upload-service';

interface TokenFormData {
  name: string;
  symbol: string;
  description: string;
  image: File | null;
  imagePreview: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  totalSupply: string;
  initialLiquidity: string;
}

interface DeploymentStatus {
  status: 'idle' | 'deploying' | 'success' | 'error';
  message: string;
  txHash?: string;
  tokenAddress?: string;
  progress: number;
  steps: DeploymentStep[];
}

const DEPLOYMENT_STEPS = [
  { step: 1, title: 'Validating token data', description: 'Checking all requirements' },
  { step: 2, title: 'Creating token contract', description: 'Deploying smart contract' },
  { step: 3, title: 'Setting up initial liquidity', description: 'Adding to DEX pool' },
  { step: 4, title: 'Finalizing deployment', description: 'Completing setup' }
];

const PLATFORM_FEE = '0.5 SOL'; // Platform deployment fee

export default function CreateTokenPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<TokenFormData>({
    name: '',
    symbol: '',
    description: '',
    image: null,
    imagePreview: '',
    website: '',
    twitter: '',
    telegram: '',
    totalSupply: '1000000000',
    initialLiquidity: '1'
  });

  const [deploymentStatus, setDeploymentStatus] = useState<DeploymentStatus>({
    status: 'idle',
    message: '',
    progress: 0,
    steps: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // Check wallet connection status
  useEffect(() => {
    // This would integrate with your wallet connection logic
    const checkWallet = () => {
      // Placeholder - integrate with actual wallet state
      setIsWalletConnected(false);
    };
    checkWallet();
  }, []);

  const handleInputChange = (field: keyof TokenFormData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // Create preview immediately
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData(prev => ({
            ...prev,
            image: file,
            imagePreview: e.target?.result as string
          }));
        };
        reader.readAsDataURL(file);

        // Validate file using the image service
        const result = await imageUploadService.uploadImage(file);
        if (!result.success) {
          setErrors(prev => ({ ...prev, image: result.error || 'Image upload failed' }));
          return;
        }

      } catch (error) {
        setErrors(prev => ({ ...prev, image: 'Failed to process image' }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Token name is required';
    if (!formData.symbol.trim()) newErrors.symbol = 'Token symbol is required';
    if (formData.symbol.length > 10) newErrors.symbol = 'Symbol must be 10 characters or less';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.image) newErrors.image = 'Token image is required';
    if (!formData.totalSupply || parseFloat(formData.totalSupply) <= 0) {
      newErrors.totalSupply = 'Total supply must be greater than 0';
    }
    if (!formData.initialLiquidity || parseFloat(formData.initialLiquidity) <= 0) {
      newErrors.initialLiquidity = 'Initial liquidity must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const deployToken = async () => {
    if (!formData.image) {
      setErrors(prev => ({ ...prev, image: 'Please upload an image first' }));
      return;
    }

    try {
      setDeploymentStatus({ 
        status: 'deploying', 
        message: 'Starting deployment...', 
        progress: 0,
        steps: []
      });

      // First upload the image to get the IPFS URL
      const imageResult = await imageUploadService.uploadImage(formData.image);
      if (!imageResult.success) {
        throw new Error('Failed to upload image: ' + imageResult.error);
      }

      // Create token metadata
      const metadata: TokenMetadata = {
        name: formData.name,
        symbol: formData.symbol,
        description: formData.description,
        image: imageResult.url || '',
        website: formData.website,
        twitter: formData.twitter,
        telegram: formData.telegram,
        totalSupply: formData.totalSupply,
        decimals: 9 // Standard for meme tokens
      };

      // Initialize deployment service
      const deploymentService = createTokenDeploymentService({
        ...DEFAULT_DEVNET_CONFIG, // Use devnet for testing, change to MAINNET_CONFIG for production
        initialLiquiditySOL: parseFloat(formData.initialLiquidity)
      });

      // Get wallet provider (this would be from your wallet context)
      const walletProvider = (window as any).solana;
      if (!walletProvider || !walletProvider.isConnected) {
        throw new Error('Wallet not connected');
      }

      // Deploy token with progress updates
      const result = await deploymentService.deployToken(
        metadata,
        walletProvider,
        (steps) => {
          const completedSteps = steps.filter(s => s.status === 'completed').length;
          const progress = (completedSteps / steps.length) * 100;
          
          setDeploymentStatus(prev => ({
            ...prev,
            steps,
            progress,
            message: steps.find(s => s.status === 'in-progress')?.title || 'Processing...'
          }));
        }
      );

      if (result.success) {
        setDeploymentStatus({
          status: 'success',
          message: 'Token deployed successfully!',
          progress: 100,
          txHash: result.txHash,
          tokenAddress: result.tokenAddress,
          steps: result.steps
        });
      } else {
        throw new Error(result.error || 'Deployment failed');
      }

    } catch (error) {
      console.error('Deployment error:', error);
      setDeploymentStatus(prev => ({
        ...prev,
        status: 'error',
        message: error instanceof Error ? error.message : 'Deployment failed'
      }));
    }
  };

  const handleDeploy = async () => {
    // Check wallet connection
    const walletProvider = (window as any).solana;
    if (!walletProvider || !walletProvider.isConnected) {
      alert('Please connect your Phantom wallet first');
      return;
    }

    if (!validateForm()) return;

    await deployToken();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0D11] via-[#0F1116] to-[#151821] text-white">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00D4AA]/20 via-transparent to-[#7C3AED]/20"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                ←
              </button>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-[#00D4AA] via-[#7C3AED] to-[#FF6B6B] bg-clip-text text-transparent">
                  Create Token
                </h1>
                <p className="text-sm text-white/60">Deploy your meme token in minutes</p>
              </div>
            </div>
            <WalletConnect />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Form */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 rounded-2xl p-6 backdrop-blur-xl"
            >
              <div className="space-y-6">
                {/* Token Basics */}
                <div>
                  <h2 className="text-lg font-bold text-white mb-4">
                    Token Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Token Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="e.g. DogeCoin"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#00D4AA]/50 transition-colors"
                      />
                      {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Token Symbol *
                      </label>
                      <input
                        type="text"
                        value={formData.symbol}
                        onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
                        placeholder="e.g. DOGE"
                        maxLength={10}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#00D4AA]/50 transition-colors"
                      />
                      {errors.symbol && <p className="text-red-400 text-sm mt-1">{errors.symbol}</p>}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Tell the world about your meme token..."
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#00D4AA]/50 transition-colors resize-none"
                    />
                    {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
                  </div>
                </div>

                {/* Token Image */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Upload className="w-4 h-4 mr-2 text-[#7C3AED]" />
                    Token Image *
                  </h3>
                  
                  <div className="flex items-start space-x-6">
                    <div className="flex-1">
                      <label className="block w-full">
                        <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-[#00D4AA]/50 transition-colors cursor-pointer">
                          <Upload className="w-12 h-12 mx-auto text-white/40 mb-4" />
                          <p className="text-white/60">Click to upload image</p>
                          <p className="text-white/40 text-sm mt-1">PNG, JPG up to 5MB</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      {errors.image && <p className="text-red-400 text-sm mt-2">{errors.image}</p>}
                    </div>
                    
                    {formData.imagePreview && (
                      <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-white/20">
                        <img
                          src={formData.imagePreview}
                          alt="Token preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Token Economics */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Token Economics
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Total Supply *
                      </label>
                      <input
                        type="number"
                        value={formData.totalSupply}
                        onChange={(e) => handleInputChange('totalSupply', e.target.value)}
                        min="1"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#00D4AA]/50 transition-colors"
                      />
                      {errors.totalSupply && <p className="text-red-400 text-sm mt-1">{errors.totalSupply}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Initial Liquidity (SOL) *
                      </label>
                      <input
                        type="number"
                        value={formData.initialLiquidity}
                        onChange={(e) => handleInputChange('initialLiquidity', e.target.value)}
                        min="0.1"
                        step="0.1"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#00D4AA]/50 transition-colors"
                      />
                      {errors.initialLiquidity && <p className="text-red-400 text-sm mt-1">{errors.initialLiquidity}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Deployment Status */}
            {deploymentStatus.status !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 rounded-2xl p-6 backdrop-blur-xl"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Deployment Status</h3>
                
                {deploymentStatus.status === 'deploying' && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Loader2 className="w-5 h-5 text-[#00D4AA] animate-spin" />
                      <span className="text-white/80">{deploymentStatus.message}</span>
                    </div>
                    
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#00D4AA] to-[#7C3AED] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${deploymentStatus.progress}%` }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      {deploymentStatus.steps.map((step, index) => (
                        <div
                          key={step.step}
                          className={`flex items-center space-x-2 text-sm ${
                            step.status === 'completed' ? 'text-[#00D4AA]' :
                            step.status === 'in-progress' ? 'text-[#FFB800]' :
                            step.status === 'failed' ? 'text-red-400' :
                            'text-white/40'
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full ${
                            step.status === 'completed' ? 'bg-[#00D4AA]' :
                            step.status === 'in-progress' ? 'bg-[#FFB800] animate-pulse' :
                            step.status === 'failed' ? 'bg-red-400' :
                            'bg-white/20'
                          }`} />
                          <span>{step.title}</span>
                          {step.status === 'in-progress' && (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {deploymentStatus.status === 'success' && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#00D4AA]" />
                      <span className="text-[#00D4AA] font-semibold">{deploymentStatus.message}</span>
                    </div>
                    
                    {deploymentStatus.tokenAddress && (
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-white/60 mb-1">Token Address</p>
                          <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-2">
                            <span className="text-xs font-mono text-white flex-1 truncate">
                              {deploymentStatus.tokenAddress}
                            </span>
                            <button
                              onClick={() => copyToClipboard(deploymentStatus.tokenAddress!)}
                              className="p-1 hover:bg-white/10 rounded"
                            >
                              <Copy className="w-3 h-3 text-white/60" />
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-white/60 mb-1">Transaction Hash</p>
                          <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-2">
                            <span className="text-xs font-mono text-white flex-1 truncate">
                              {deploymentStatus.txHash}
                            </span>
                            <button
                              onClick={() => copyToClipboard(deploymentStatus.txHash!)}
                              className="p-1 hover:bg-white/10 rounded"
                            >
                              <Copy className="w-3 h-3 text-white/60" />
                            </button>
                            <button className="p-1 hover:bg-white/10 rounded">
                              <ExternalLink className="w-3 h-3 text-white/60" />
                            </button>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => router.push(`/currencies/${formData.symbol.toLowerCase()}`)}
                          className="w-full px-4 py-2 bg-gradient-to-r from-[#00D4AA] to-[#7C3AED] text-white rounded-lg hover:shadow-lg transition-all"
                        >
                          View Token Page
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {deploymentStatus.status === 'error' && (
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-400">{deploymentStatus.message}</span>
                  </div>
                )}
              </motion.div>
            )}

            {/* Cost Breakdown */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 rounded-2xl p-6 backdrop-blur-xl"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-[#FFB800]" />
                Cost Breakdown
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Platform Fee</span>
                  <span className="text-white font-semibold">{PLATFORM_FEE}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Network Fee</span>
                  <span className="text-white font-semibold">~0.01 SOL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Initial Liquidity</span>
                  <span className="text-white font-semibold">{formData.initialLiquidity} SOL</span>
                </div>
                <div className="border-t border-white/20 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Total Cost</span>
                    <span className="text-[#00D4AA] font-bold">
                      {(parseFloat(formData.initialLiquidity || '0') + 0.51).toFixed(2)} SOL
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>


            {/* Deploy Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onClick={handleDeploy}
              disabled={deploymentStatus.status === 'deploying'}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#00D4AA] via-[#7C3AED] to-[#FF6B6B] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#00D4AA]/30 transition-all duration-300 hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {deploymentStatus.status === 'deploying' ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Deploying...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Rocket className="w-5 h-5" />
                  <span>Deploy Token</span>
                </div>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}