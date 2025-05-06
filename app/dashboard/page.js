'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LoginCheck from '../components/LoginCheck';

export default function DashboardPage() {
  // This would normally come from an API or database
  const mockData = {
    stats: {
      totalShipments: 47,
      activeReferrals: 8,
      totalEarnings: 520,
      pendingPayouts: 120
    },
    recentShipments: [
      {
        id: 'SH001',
        date: '2024-03-15',
        tracking: '1Z999AA1234567890',
        status: 'Delivered',
        amount: 12.99
      },
      {
        id: 'SH002',
        date: '2024-03-14',
        tracking: '1Z999AA1234567891',
        status: 'In Transit',
        amount: 15.50
      },
      {
        id: 'SH003',
        date: '2024-03-13',
        tracking: '1Z999AA1234567892',
        status: 'Processing',
        amount: 9.99
      }
    ],
    recentReferrals: [
      {
        name: 'John D.',
        date: '2024-03-12',
        status: 'Active',
        earnings: 25
      },
      {
        name: 'Sarah M.',
        date: '2024-03-10',
        status: 'Pending',
        earnings: 0
      }
    ]
  };

  return (
    <LoginCheck>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-300">Welcome back! Here's your shipping and earnings overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
          >
            <h3 className="text-gray-400 text-sm font-medium">Total Shipments</h3>
            <p className="text-3xl font-bold text-white mt-2">{mockData.stats.totalShipments}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
          >
            <h3 className="text-gray-400 text-sm font-medium">Active Referrals</h3>
            <p className="text-3xl font-bold text-white mt-2">{mockData.stats.activeReferrals}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
          >
            <h3 className="text-gray-400 text-sm font-medium">Total Earnings</h3>
            <p className="text-3xl font-bold text-white mt-2">${mockData.stats.totalEarnings}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
          >
            <h3 className="text-gray-400 text-sm font-medium">Pending Payouts</h3>
            <p className="text-3xl font-bold text-white mt-2">${mockData.stats.pendingPayouts}</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Shipments */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Recent Shipments</h2>
              <Link
                href="/ship"
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                Create New
              </Link>
            </div>
            <div className="space-y-4">
              {mockData.recentShipments.map((shipment) => (
                <div
                  key={shipment.id}
                  className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"
                >
                  <div>
                    <p className="text-white font-medium">{shipment.tracking}</p>
                    <p className="text-sm text-gray-400">{shipment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">${shipment.amount}</p>
                    <p className={`text-sm ${
                      shipment.status === 'Delivered' ? 'text-green-400' :
                      shipment.status === 'In Transit' ? 'text-blue-400' :
                      'text-yellow-400'
                    }`}>{shipment.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Referrals */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Recent Referrals</h2>
              <Link
                href="/referral"
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                Invite More
              </Link>
            </div>
            <div className="space-y-4">
              {mockData.recentReferrals.map((referral, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"
                >
                  <div>
                    <p className="text-white font-medium">{referral.name}</p>
                    <p className="text-sm text-gray-400">{referral.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">${referral.earnings}</p>
                    <p className={`text-sm ${
                      referral.status === 'Active' ? 'text-green-400' : 'text-yellow-400'
                    }`}>{referral.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Link
            href="/ship"
            className="flex items-center justify-center p-4 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-medium transition-colors"
          >
            Create New Shipment
          </Link>
          <Link
            href="/referral"
            className="flex items-center justify-center p-4 bg-purple-500 hover:bg-purple-600 rounded-xl text-white font-medium transition-colors"
          >
            Share Referral Code
          </Link>
          <Link
            href="/partner"
            className="flex items-center justify-center p-4 bg-green-500 hover:bg-green-600 rounded-xl text-white font-medium transition-colors"
          >
            Upgrade to Partner
          </Link>
        </motion.div>
      </motion.div>
    </LoginCheck>
  );
}