export default function ValueProposition() {
  return (
    <div className="bg-white rounded-lg border border-[#F0F0F0] p-6">
      <h2 className="text-2xl font-bold text-[#1E1E1E] mb-6">Bitcoin Value Proposition</h2>
      
      <div className="space-y-8">
        {/* Peer-to-Peer Digital Currency */}
        <div>
          <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">Peer-to-Peer Digital Currency</h3>
          <p className="text-[#8C8C8C] leading-relaxed mb-4">
            Bitcoin is a decentralized digital currency, without a central bank or single administrator, 
            that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries. 
            Transactions are verified by network nodes through cryptography and recorded in a public distributed ledger called a blockchain.
          </p>
          <p className="text-[#8C8C8C] leading-relaxed">
            The cryptocurrency was invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto. 
            The currency began use in 2009 when its implementation was released as open-source software.
          </p>
        </div>

        {/* Store of Value */}
        <div className="pt-6 border-t border-[#F0F0F0]">
          <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">Digital Store of Value</h3>
          <p className="text-[#8C8C8C] leading-relaxed mb-4">
            Bitcoin is often referred to as "digital gold" due to its limited supply of 21 million coins and its 
            deflationary characteristics. Unlike traditional currencies that can be printed infinitely, Bitcoin's 
            scarcity is built into its protocol, making it an attractive hedge against inflation and currency debasement.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-[#FAFBFC] p-4 rounded-lg">
              <div className="text-2xl font-bold text-[#1652F0] mb-2">21M</div>
              <div className="text-sm text-[#8C8C8C]">Maximum Supply</div>
            </div>
            <div className="bg-[#FAFBFC] p-4 rounded-lg">
              <div className="text-2xl font-bold text-[#00D4AA] mb-2">50%+</div>
              <div className="text-sm text-[#8C8C8C]">Market Dominance</div>
            </div>
            <div className="bg-[#FAFBFC] p-4 rounded-lg">
              <div className="text-2xl font-bold text-[#FF5722] mb-2">15+</div>
              <div className="text-sm text-[#8C8C8C]">Years Operating</div>
            </div>
          </div>
        </div>

        {/* Network Security */}
        <div className="pt-6 border-t border-[#F0F0F0]">
          <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">Unparalleled Network Security</h3>
          <p className="text-[#8C8C8C] leading-relaxed mb-4">
            Bitcoin's network is secured by the largest computational network in the world. The proof-of-work consensus 
            mechanism ensures that the network remains decentralized and resistant to attacks. Miners around the globe 
            contribute their computing power to validate transactions and secure the network.
          </p>
          <div className="bg-[#FAFBFC] p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-[#8C8C8C] mb-1">Network Hash Rate</div>
                <div className="text-lg font-bold text-[#1E1E1E]">500+ EH/s</div>
              </div>
              <div>
                <div className="text-sm text-[#8C8C8C] mb-1">Security Status</div>
                <div className="text-lg font-bold text-[#00D4AA]">Maximum</div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Adoption */}
        <div className="pt-6 border-t border-[#F0F0F0]">
          <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">Global Adoption & Acceptance</h3>
          <p className="text-[#8C8C8C] leading-relaxed">
            Bitcoin has gained widespread acceptance among individuals, institutions, and governments worldwide. 
            Major companies now hold Bitcoin on their balance sheets, and several countries have adopted it as legal tender. 
            The growing institutional adoption demonstrates Bitcoin's maturation as a legitimate asset class.
          </p>
        </div>
      </div>
    </div>
  )
}