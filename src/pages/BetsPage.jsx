import React, { useState } from "react";
import { toast } from 'react-toastify';
import ActionsMenu from "../components/ActionsMenu";

export default function BetsPage() {
  const [activeTab, setActiveTab] = useState("bets");
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedBet, setSelectedBet] = useState(null);
  const [showBetDetails, setShowBetDetails] = useState(false);

  // Mock data
  const bets = [
    { id: "BET001", userId: 1, username: "player001", game: "Lucky Slots", amount: 50.00, win: 0, result: "loss", date: "2024-01-18 10:30", roundId: "RND001" },
    { id: "BET002", userId: 2, username: "player002", game: "Mega Fortune", amount: 100.00, win: 250.00, result: "win", date: "2024-01-18 11:15", roundId: "RND002" },
    { id: "BET003", userId: 3, username: "player003", game: "Diamond Rush", amount: 25.00, win: 0, result: "loss", date: "2024-01-18 12:00", roundId: "RND003" },
    { id: "BET004", userId: 1, username: "player001", game: "Lucky Slots", amount: 75.00, win: 150.00, result: "win", date: "2024-01-18 13:45", roundId: "RND004" },
  ];

  const games = [
    { id: 1, name: "Lucky Slots", provider: "GameProvider A", status: "enabled", totalBets: 1250, rtp: 96.5 },
    { id: 2, name: "Mega Fortune", provider: "GameProvider B", status: "enabled", totalBets: 3200, rtp: 97.2 },
    { id: 3, name: "Diamond Rush", provider: "GameProvider A", status: "disabled", totalBets: 850, rtp: 95.8 },
    { id: 4, name: "Golden Wheel", provider: "GameProvider C", status: "enabled", totalBets: 2100, rtp: 96.9 },
  ];

  const roundDetails = {
    RND001: {
      roundId: "RND001",
      game: "Lucky Slots",
      userId: 1,
      username: "player001",
      betAmount: 50.00,
      winAmount: 0,
      symbols: ["🍒", "🍋", "🍊", "🍒", "🍋"],
      timestamp: "2024-01-18 10:30:15",
      status: "completed",
    },
    RND002: {
      roundId: "RND002",
      game: "Mega Fortune",
      userId: 2,
      username: "player002",
      betAmount: 100.00,
      winAmount: 250.00,
      symbols: ["💎", "💎", "💎", "7️⃣", "bar"],
      timestamp: "2024-01-18 11:15:22",
      status: "completed",
    },
    RND003: {
      roundId: "RND003",
      game: "Diamond Rush",
      userId: 3,
      username: "player003",
      betAmount: 25.00,
      winAmount: 0,
      symbols: ["♠️", "♥️", "♦️", "♣️", "♠️"],
      timestamp: "2024-01-18 12:00:05",
      status: "completed",
    },
    RND004: {
      roundId: "RND004",
      game: "Lucky Slots",
      userId: 1,
      username: "player001",
      betAmount: 75.00,
      winAmount: 150.00,
      symbols: ["7️⃣", "7️⃣", "7️⃣", "🍒", "🍒"],
      timestamp: "2024-01-18 13:45:10",
      status: "completed",
    },
  };

  const handleToggleGame = (gameId, currentStatus) => {
    // Update game status in state
    const updatedGames = games.map(game => 
      game.id === gameId 
        ? { ...game, status: currentStatus === "enabled" ? "disabled" : "enabled" }
        : game
    );
    setGames(updatedGames);
    
    // TODO: API call
    toast.success(`Game ${gameId} ${currentStatus === "enabled" ? "disabled" : "enabled"}`);
  };

  const handleViewBetDetails = (bet) => {
    setSelectedBet(bet);
    setShowBetDetails(true);
  };

  const getResultBadge = (result) => {
    return result === "win" 
      ? <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Win</span>
      : <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Loss</span>;
  };

  const getStatusBadge = (status) => {
    return status === "enabled"
      ? <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Enabled</span>
      : <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Disabled</span>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Bets & Games</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          View bet records, single-round details, and manage game status.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            {[
              { id: "bets", label: "Bet Records" },
              { id: "games", label: "Games Management" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder={activeTab === "bets" ? "Search by bet ID, user, or game..." : "Search by game name..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Bet Records Tab */}
          {activeTab === "bets" && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Bet ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Game</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Bet Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Win Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Result</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {bets.map((bet) => (
                    <tr key={bet.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{bet.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{bet.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{bet.game}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${bet.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">${bet.win.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{getResultBadge(bet.result)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{bet.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm relative">
                        <ActionsMenu
                          isOpen={openMenu === `bet-${bet.id}`}
                          onToggle={() => setOpenMenu(openMenu === `bet-${bet.id}` ? null : `bet-${bet.id}`)}
                          showIcons={false}
                          actions={[
                            { 
                              label: "View Details", 
                              onClick: () => handleViewBetDetails(bet)
                            },
                          ]}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Games Management Tab */}
          {activeTab === "games" && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Game ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Game Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Provider</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Total Bets</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">RTP</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {games.map((game) => (
                    <tr key={game.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{game.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{game.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{game.provider}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(game.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${game.totalBets.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{game.rtp}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm relative">
                        <ActionsMenu
                          isOpen={openMenu === `game-${game.id}`}
                          onToggle={() => setOpenMenu(openMenu === `game-${game.id}` ? null : `game-${game.id}`)}
                          showIcons={false}
                          actions={[
                            { 
                              label: game.status === "enabled" ? "Disable" : "Enable", 
                              onClick: () => handleToggleGame(game.id, game.status),
                              danger: game.status === "enabled"
                            },
                          ]}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Bet Details Modal */}
      {showBetDetails && selectedBet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Single-Round Bet Details</h2>
              <button
                onClick={() => {
                  setShowBetDetails(false);
                  setSelectedBet(null);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            {roundDetails[selectedBet.roundId] ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Round ID</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{roundDetails[selectedBet.roundId].roundId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Game</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{roundDetails[selectedBet.roundId].game}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">User</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{roundDetails[selectedBet.roundId].username}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{roundDetails[selectedBet.roundId].status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Bet Amount</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">${roundDetails[selectedBet.roundId].betAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Win Amount</p>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">${roundDetails[selectedBet.roundId].winAmount.toLocaleString()}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Symbols</p>
                    <div className="flex space-x-2">
                      {roundDetails[selectedBet.roundId].symbols.map((symbol, idx) => (
                        <div key={idx} className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded text-2xl">
                          {symbol}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Timestamp</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{roundDetails[selectedBet.roundId].timestamp}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Details not available</p>
            )}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setShowBetDetails(false);
                  setSelectedBet(null);
                }}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
