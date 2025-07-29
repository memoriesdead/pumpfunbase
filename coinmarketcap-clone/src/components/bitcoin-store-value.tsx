export default function BitcoinStoreValue() {
  return (
    <div className="bg-white rounded-lg border border-[#F0F0F0] p-8">
      <h2 className="text-3xl font-bold text-[#1E1E1E] mb-8">How Is Bitcoin Used as a Store of Value?</h2>
      
      <div className="space-y-8">
        {/* Introduction */}
        <div>
          <p className="text-[#8C8C8C] text-lg leading-relaxed mb-6">
            Bitcoin has increasingly been viewed as a "digital gold" - a store of value that can preserve wealth over time. Its limited supply, decentralized nature, and growing institutional adoption have contributed to this narrative.
          </p>
        </div>

        {/* Key Characteristics */}
        <div>
          <h3 className="text-2xl font-bold text-[#1E1E1E] mb-6">Store of Value Characteristics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#1652F0] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">📈</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#1E1E1E] mb-2">Scarcity</h4>
                  <p className="text-[#8C8C8C] text-sm">With only 21 million Bitcoin that will ever exist, scarcity is built into the protocol, making it deflationary by design.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#00D4AA] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🛡️</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#1E1E1E] mb-2">Durability</h4>
                  <p className="text-[#8C8C8C] text-sm">Bitcoin exists digitally and cannot be physically destroyed, making it more durable than traditional stores of value.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#FF5722] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🌍</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#1E1E1E] mb-2">Portability</h4>
                  <p className="text-[#8C8C8C] text-sm">Bitcoin can be transferred globally in minutes, making it more portable than gold or real estate.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#8C8C8C] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🔍</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#1E1E1E] mb-2">Verifiability</h4>
                  <p className="text-[#8C8C8C] text-sm">All Bitcoin transactions are publicly verifiable on the blockchain, ensuring authenticity and preventing counterfeiting.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#1652F0] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">⚡</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#1E1E1E] mb-2">Divisibility</h4>
                  <p className="text-[#8C8C8C] text-sm">Bitcoin can be divided into 100 million smaller units (satoshis), allowing for precise value transfer.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#00D4AA] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🏛️</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#1E1E1E] mb-2">Decentralization</h4>
                  <p className="text-[#8C8C8C] text-sm">No single entity controls Bitcoin, protecting it from government interference and monetary policy changes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Adoption */}
        <div className="pt-6 border-t border-[#F0F0F0]">
          <h3 className="text-2xl font-bold text-[#1E1E1E] mb-6">Institutional Adoption</h3>
          <p className="text-[#8C8C8C] leading-relaxed mb-6">
            The narrative of Bitcoin as a store of value has been strengthened by increasing institutional adoption. Major corporations, investment funds, and even governments have begun adding Bitcoin to their treasury reserves.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8F9FA] p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-[#1652F0] mb-2">$28B+</div>
              <div className="text-sm text-[#8C8C8C] mb-2">Corporate Holdings</div>
              <div className="text-xs text-[#8C8C8C]">Total value held by public companies</div>
            </div>
            <div className="bg-[#F8F9FA] p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-[#00D4AA] mb-2">15+</div>
              <div className="text-sm text-[#8C8C8C] mb-2">Years of Operation</div>
              <div className="text-xs text-[#8C8C8C]">Proven track record of security</div>
            </div>
            <div className="bg-[#F8F9FA] p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-[#FF5722] mb-2">99.98%</div>
              <div className="text-sm text-[#8C8C8C] mb-2">Uptime</div>
              <div className="text-xs text-[#8C8C8C]">Network reliability since inception</div>
            </div>
          </div>
        </div>

        {/* Comparison with Traditional Assets */}
        <div className="pt-6 border-t border-[#F0F0F0]">
          <h3 className="text-2xl font-bold text-[#1E1E1E] mb-6">Bitcoin vs Traditional Stores of Value</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FAFBFC] border-b border-[#F0F0F0]">
                  <th className="text-left px-4 py-3 text-sm font-semibold text-[#8C8C8C]">Characteristic</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold text-[#8C8C8C]">Bitcoin</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold text-[#8C8C8C]">Gold</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold text-[#8C8C8C]">Real Estate</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold text-[#8C8C8C]">Stocks</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#F0F0F0]">
                  <td className="px-4 py-3 text-sm font-medium text-[#1E1E1E]">Scarcity</td>
                  <td className="px-4 py-3 text-center text-[#00D4AA]">✓</td>
                  <td className="px-4 py-3 text-center text-[#00D4AA]">✓</td>
                  <td className="px-4 py-3 text-center text-[#FF5722]">✗</td>
                  <td className="px-4 py-3 text-center text-[#FF5722]">✗</td>
                </tr>
                <tr className="border-b border-[#F0F0F0]">
                  <td className="px-4 py-3 text-sm font-medium text-[#1E1E1E]">Portability</td>
                  <td className="px-4 py-3 text-center text-[#00D4AA]">✓</td>
                  <td className="px-4 py-3 text-center text-[#FF5722]">✗</td>
                  <td className="px-4 py-3 text-center text-[#FF5722]">✗</td>
                  <td className="px-4 py-3 text-center text-[#00D4AA]">✓</td>
                </tr>
                <tr className="border-b border-[#F0F0F0]">
                  <td className="px-4 py-3 text-sm font-medium text-[#1E1E1E]">Divisibility</td>
                  <td className="px-4 py-3 text-center text-[#00D4AA]">✓</td>
                  <td className="px-4 py-3 text-center text-[#8C8C8C]">~</td>
                  <td className="px-4 py-3 text-center text-[#FF5722]">✗</td>
                  <td className="px-4 py-3 text-center text-[#00D4AA]">✓</td>
                </tr>
                <tr className="border-b border-[#F0F0F0]">
                  <td className="px-4 py-3 text-sm font-medium text-[#1E1E1E]">Durability</td>
                  <td className="px-4 py-3 text-center text-[#00D4AA]">✓</td>
                  <td className="px-4 py-3 text-center text-[#00D4AA]">✓</td>
                  <td className="px-4 py-3 text-center text-[#8C8C8C]">~</td>
                  <td className="px-4 py-3 text-center text-[#00D4AA]">✓</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-[#1E1E1E]">Censorship Resistance</td>
                  <td className="px-4 py-3 text-center text-[#00D4AA]">✓</td>
                  <td className="px-4 py-3 text-center text-[#8C8C8C]">~</td>
                  <td className="px-4 py-3 text-center text-[#FF5722]">✗</td>
                  <td className="px-4 py-3 text-center text-[#FF5722]">✗</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Risks and Considerations */}
        <div className="pt-6 border-t border-[#F0F0F0]">
          <h3 className="text-2xl font-bold text-[#1E1E1E] mb-6">Risks and Considerations</h3>
          <div className="bg-[#FFF3E0] border border-[#FFB74D] p-6 rounded-lg">
            <p className="text-[#E65100] text-sm leading-relaxed mb-4">
              <strong>Important:</strong> While Bitcoin has store of value characteristics, it remains a volatile asset. Past performance does not guarantee future results.
            </p>
            <ul className="text-[#E65100] text-sm space-y-1">
              <li>• High price volatility compared to traditional stores of value</li>
              <li>• Regulatory uncertainty in various jurisdictions</li>
              <li>• Technology risks and potential protocol changes</li>
              <li>• Market manipulation and liquidity concerns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}