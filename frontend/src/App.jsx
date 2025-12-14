import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

// Main App component with centralized state
function App() {
  // User data
  const [user, setUser] = useState({
    name: 'Echo085',
    address: '0x123456789abcdef',
    creditScore: 750,
    totalBalance: 1240.50,
    bdagBalance: 2481.5,
    usdBalance: 150.0
  });

  // Tokens data
  const [tokens, setTokens] = useState([
    { symbol: 'BDAG', name: 'BlockDAG', rate: 0.5, color: 'blue', icon: 'BD', balance: 2481.5 },
    { symbol: 'USDT', name: 'Tether', rate: 1.0, color: 'green', icon: 'US', balance: 150.0 },
    { symbol: 'BTC', name: 'Bitcoin', rate: 45000, color: 'orange', icon: 'BTC', balance: 0.05 },
    { symbol: 'ETH', name: 'Ethereum', rate: 3000, color: 'purple', icon: 'ETH', balance: 2.5 },
    { symbol: 'BNB', name: 'Binance Coin', rate: 350, color: 'yellow', icon: 'BNB', balance: 10.0 },
    { symbol: 'USDC', name: 'USD Coin', rate: 1.0, color: 'teal', icon: 'US', balance: 50.0 }
  ]);

  // Transactions data
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'send', to: 'Merchant ABC', time: '2 min ago', amount: '-50 USD', amountColor: 'text-red-400', status: 'completed' },
    { id: 2, type: 'receive', from: 'Alice Smith', time: '2 hrs ago', amount: '+100 BDAG', amountColor: 'text-green-400', status: 'completed' },
    { id: 3, type: 'send', to: 'Coffee Shop', time: 'Yesterday', amount: '-5 USD', amountColor: 'text-red-400', status: 'pending' },
    { id: 4, type: 'swap', action: 'BDAG → USD', time: '2 days ago', amount: '+20 USD', amountColor: 'text-green-400', status: 'completed' }
  ]);

  // Recent swaps
  const [recentSwaps, setRecentSwaps] = useState([
    { id: 1, from: '20 BDAG', to: '10 USD', status: 'Complete', time: '2 hrs ago' },
    { id: 2, from: '50 BDAG', to: '25 USD', status: 'Complete', time: '21 hrs ago' },
    { id: 3, from: '1 USD', to: '0.5 BDAG', status: 'Complete', time: '1 day ago' }
  ]);

  // Payment methods
  const paymentMethods = [
    { id: 'qr', icon: 'QrCode', label: 'Scan QR', description: 'Scan merchant QR code' },
    { id: 'otp', icon: 'Grid2x2', label: 'Enter OTP', description: 'Use one-time password' },
    { id: 'address', icon: 'Send', label: 'Send to Address', description: 'Enter wallet address' }
  ];

  // Recent contacts
  const [recentContacts, setRecentContacts] = useState([
    { id: 1, initial: 'H', name: 'H3ndr1x33', address: '0x13382...', amount: '$50', time: '2 days ago' },
    { id: 2, initial: 'A', name: 'Abraham John', address: '0x13327...', amount: '$100', time: '1 week ago' },
    { id: 3, initial: 'E', name: 'Echo085', address: '0x14567...', amount: '$50', time: '2 days ago' },
    { id: 4, initial: 'J', name: 'Justice Jatau', address: '0x18923...', amount: '$100', time: '1 week ago' }
  ]);

  // Lending data
  const [lendingData, setLendingData] = useState({
    assets: [
      { symbol: 'BDAG', name: 'BlockDAG', apy: 8.5, color: 'blue' },
      { symbol: 'USDC', name: 'USD Coin', apy: 5.2, color: 'green' }
    ],
    myLoans: [
      {
        id: 1,
        type: 'lent',
        borrower: '0x8a3f...c5d2',
        amount: 200,
        asset: 'BDAG',
        interestRate: 12.5,
        duration: 30,
        earned: 2.05,
        status: 'active'
      },
      {
        id: 2,
        type: 'borrowed',
        lender: '0x5f9a...8c3e',
        amount: 500,
        asset: 'BDAG',
        interestRate: 10.5,
        owed: 504.38,
        status: 'active'
      }
    ],
    walletBalance: 2481.5,
    availableToLend: 1500,
    totalLent: 750,
    totalEarned: 25.75,
    creditScore: 750
  });

  // Receive methods
  const receiveMethods = [
    { 
      id: 'qr', 
      icon: 'QrCode', 
      label: 'QR Code', 
      description: 'Customer scans your QR code to pay instantly',
      color: 'text-blue-400'
    },
    { 
      id: 'otp', 
      icon: 'Grid2x2', 
      label: 'Generate OTP', 
      description: 'Create a 6-digit OTP for customer to enter',
      color: 'text-green-400'
    },
    { 
      id: 'ussd', 
      icon: 'Smartphone', 
      label: 'USSD Code', 
      description: 'Share USSD code for underbanked users',
      color: 'text-purple-400'
    }
  ];

  // Navigation menu
  const menu = [
    { label: 'Dashboard', icon: '🏠', path: '/dashboard' },
    { label: 'Send', icon: '↑', path: '/send' },
    { label: 'Receive', icon: '↓', path: '/receive' },
    { label: 'Transactions', icon: '📊', path: '/transactions' },
    { label: 'Swap', icon: '⇄', path: '/swap' },
    { label: 'Lending', icon: '💰', path: '/lending' },
    { label: 'Profile', icon: '👤', path: '/profile' },
    { label: 'Settings', icon: '⚙️', path: '/settings' }
  ];

  // Quick actions
  const quickActions = [
    { icon: 'ArrowUp', label: 'Send', color: 'text-blue-400', path: '/send' },
    { icon: 'ArrowDown', label: 'Receive', color: 'text-green-400', path: '/receive' },
    { icon: 'RefreshCw', label: 'Swap', color: 'text-orange-400', path: '/swap' },
    { icon: 'PieChart', label: 'Stake', color: 'text-purple-400', path: '/stake' },
    { icon: 'DollarSign', label: 'Lend', color: 'text-yellow-400', path: '/lending' }
  ];

  // Loading state
  const [loading, setLoading] = useState(true);

  // Update token balance after swap
  const updateTokenBalance = (tokenSymbol, amountChange) => {
    setTokens(prevTokens => 
      prevTokens.map(token => 
        token.symbol === tokenSymbol 
          ? { ...token, balance: token.balance + amountChange }
          : token
      )
    );
  };

  // Update user balance
  const updateUserBalance = (amountChange, currency) => {
    if (currency === 'BDAG') {
      setUser(prev => ({ 
        ...prev, 
        bdagBalance: prev.bdagBalance + amountChange,
        totalBalance: prev.totalBalance + (amountChange * 0.5) // Convert to USD
      }));
    } else if (currency === 'USD') {
      setUser(prev => ({ 
        ...prev, 
        usdBalance: prev.usdBalance + amountChange,
        totalBalance: prev.totalBalance + amountChange
      }));
    }
  };

  // Add a new transaction
  const addTransaction = (transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  // Add a new swap
  const addSwap = (swap) => {
    setRecentSwaps(prev => [swap, ...prev.slice(0, 2)]); // Keep only 3 most recent
  };

  // Add a new contact
  const addContact = (contact) => {
    setRecentContacts(prev => [contact, ...prev]);
  };

  // Update loan data
  const updateLoan = (loanId, updates) => {
    setLendingData(prev => ({
      ...prev,
      myLoans: prev.myLoans.map(loan => 
        loan.id === loanId ? { ...loan, ...updates } : loan
      )
    }));
  };

  // Add a new loan
  const addLoan = (loan) => {
    setLendingData(prev => ({
      ...prev,
      myLoans: [loan, ...prev.myLoans],
      totalLent: loan.type === 'lent' ? prev.totalLent + loan.amount : prev.totalLent,
      availableToLend: loan.type === 'lent' ? prev.availableToLend - loan.amount : prev.availableToLend
    }));
  };

  // Simulate loading on initial mount
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Context value to be passed to all children via Outlet
  const outletContext = {
    // State
    user,
    setUser,
    tokens,
    setTokens,
    transactions,
    setTransactions,
    recentSwaps,
    setRecentSwaps,
    recentContacts,
    setRecentContacts,
    lendingData,
    setLendingData,
    
    // Static data
    paymentMethods,
    receiveMethods,
    menu,
    quickActions,
    
    // Loading state
    loading,
    setLoading,
    
    // Helper functions
    updateTokenBalance,
    updateUserBalance,
    addTransaction,
    addSwap,
    addContact,
    updateLoan,
    addLoan
  };

  return (
    <>
      {loading ? (
        <div className="min-h-screen bg-[#051837] flex items-center justify-center">
          <div className="text-white text-xl">Loading DAGPay...</div>
        </div>
      ) : (
        <Outlet context={outletContext} />
      )}
    </>
  );
}

export default App;