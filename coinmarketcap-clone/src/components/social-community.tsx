export default function SocialCommunity() {
  const socialStats = [
    { platform: 'Twitter', followers: '5.2M', engagement: 'High', url: '#' },
    { platform: 'Reddit', members: '4.8M', engagement: 'Very High', url: '#' },
    { platform: 'Telegram', members: '45K', engagement: 'Medium', url: '#' },
    { platform: 'Discord', members: '23K', engagement: 'High', url: '#' }
  ]

  const recentPosts = [
    {
      platform: 'Twitter',
      content: 'Bitcoin network hash rate reaches new all-time high, demonstrating unprecedented security.',
      time: '2h ago',
      likes: 1245
    },
    {
      platform: 'Reddit',
      content: 'Discussion: What are your thoughts on the recent institutional adoption trends?',
      time: '4h ago',
      likes: 892
    },
    {
      platform: 'Twitter',
      content: 'Lightning Network capacity continues to grow, now supporting instant micro-payments.',
      time: '6h ago',
      likes: 756
    }
  ]

  return (
    <div className="bg-white rounded-lg border border-[#F0F0F0] p-6">
      <h2 className="text-2xl font-bold text-[#1E1E1E] mb-6">Social & Community</h2>
      
      {/* Social Stats */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#1E1E1E] mb-4">Community Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {socialStats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-[#FAFBFC] rounded-lg">
              <div className="text-sm text-[#8C8C8C] mb-1">{stat.platform}</div>
              <div className="text-lg font-bold text-[#1E1E1E] mb-1">{stat.followers}</div>
              <div className={`text-xs font-medium ${
                stat.engagement === 'Very High' ? 'text-[#00D4AA]' :
                stat.engagement === 'High' ? 'text-[#1652F0]' : 'text-[#8C8C8C]'
              }`}>
                {stat.engagement}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Community Posts */}
      <div>
        <h3 className="text-lg font-semibold text-[#1E1E1E] mb-4">Recent Community Activity</h3>
        <div className="space-y-4">
          {recentPosts.map((post, index) => (
            <div key={index} className="p-4 border border-[#F0F0F0] rounded-lg hover:bg-[#FAFBFC] transition-colors">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-[#1652F0] rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {post.platform[0]}
                </div>
                <div className="flex-1">
                  <p className="text-[#1E1E1E] text-sm leading-relaxed mb-2">{post.content}</p>
                  <div className="flex items-center space-x-4 text-xs text-[#8C8C8C]">
                    <span>{post.platform}</span>
                    <span>•</span>
                    <span>{post.time}</span>
                    <span>•</span>
                    <span>{post.likes} likes</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Join Community */}
      <div className="mt-6 pt-6 border-t border-[#F0F0F0]">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-[#1E1E1E] mb-2">Join the Community</h3>
          <p className="text-[#8C8C8C] text-sm mb-4">
            Connect with other Bitcoin enthusiasts and stay updated with the latest developments
          </p>
          <div className="flex justify-center space-x-3">
            <button className="px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1DA1F2]/90 transition-colors">
              Follow on Twitter
            </button>
            <button className="px-4 py-2 bg-[#FF4500] text-white rounded-lg hover:bg-[#FF4500]/90 transition-colors">
              Join Reddit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}