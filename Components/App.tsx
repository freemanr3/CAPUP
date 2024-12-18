'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Upload, Link, DollarSign, TrendingUp, Users, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

// Mock data - replace with actual data in a real application
const originalDonationData = [
  { date: '2023-01-01', amount: 4000, month: 'Jan' },
  { date: '2023-02-01', amount: 3000, month: 'Feb' },
  { date: '2023-03-01', amount: 5000, month: 'Mar' },
  { date: '2023-04-01', amount: 4500, month: 'Apr' },
  { date: '2023-05-01', amount: 6000, month: 'May' },
  { date: '2023-06-01', amount: 5500, month: 'Jun' },
]

const expenseData = [
  { name: 'Program A', value: 30000 },
  { name: 'Program B', value: 25000 },
  { name: 'Program C', value: 20000 },
  { name: 'Admin', value: 15000 },
  { name: 'Fundraising', value: 10000 },
]

const programExpenses = [
  { name: 'Program A', budget: 35000, spent: 30000, remaining: 5000 },
  { name: 'Program B', budget: 28000, spent: 25000, remaining: 3000 },
  { name: 'Program C', budget: 22000, spent: 20000, remaining: 2000 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function NonProfitDashboard() {
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [startDate, setStartDate] = useState(new Date(2023, 0, 1))
  const [endDate, setEndDate] = useState(new Date(2023, 5, 30))

  const handleCsvImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setCsvFile(file)
      console.log(`Imported file: ${file.name}`)
    }
  }

  const handleQuickBooksConnect = () => {
    console.log('Connecting to QuickBooks...')
  }

  // Basic date filtering function
  const filteredDonationData = originalDonationData.filter((item) => {
    const itemDate = new Date(item.date)
    return itemDate >= startDate && itemDate <= endDate
  })

  // Calculate totals based on filtered data
  const totalDonations = filteredDonationData.reduce((sum, item) => sum + item.amount, 0)
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0)

  // Simple month navigation
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newStartDate = new Date(startDate)
    const newEndDate = new Date(endDate)
    
    if (direction === 'prev') {
      newStartDate.setMonth(newStartDate.getMonth() - 1)
      newEndDate.setMonth(newEndDate.getMonth() - 1)
    } else {
      newStartDate.setMonth(newStartDate.getMonth() + 1)
      newEndDate.setMonth(newEndDate.getMonth() + 1)
    }
    
    setStartDate(newStartDate)
    setEndDate(newEndDate)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Non-Profit Financial Dashboard</h1>
      
      {/* Date Range Selector */}
      <div className="flex items-center justify-center space-x-4 mb-6 bg-white p-4 rounded-lg shadow-md">
        <button 
          onClick={() => navigateMonth('prev')} 
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          <span className="text-lg font-semibold">
            {startDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            {' - '}
            {endDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
        </div>
        <button 
          onClick={() => navigateMonth('next')} 
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Donations</h3>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">${totalDonations.toLocaleString()}</div>
          <p className="text-xs text-green-500">+20.1% from last period</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
          <p className="text-xs text-green-500">+12.5% from last period</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-500">Programs Funded</h3>
            <Users className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-gray-500">Across multiple areas</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-500">Funding Efficiency</h3>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">87%</div>
          <p className="text-xs text-gray-500">Funds directly to programs</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donations Over Time */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Donations Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredDonationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Expense Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Program Expenses Table */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Program Expenses</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Program Name</th>
                <th className="py-2 text-right">Budget</th>
                <th className="py-2 text-right">Spent</th>
                <th className="py-2 text-right">Remaining</th>
              </tr>
            </thead>
            <tbody>
              {programExpenses.map((program) => (
                <tr key={program.name} className="border-b">
                  <td className="py-2">{program.name}</td>
                  <td className="py-2 text-right">${program.budget.toLocaleString()}</td>
                  <td className="py-2 text-right">${program.spent.toLocaleString()}</td>
                  <td className="py-2 text-right">${program.remaining.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Data Import Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <Upload className="w-4 h-4" />
          <label htmlFor="csv-upload">Import CSV</label>
          <input
            id="csv-upload"
            type="file"
            accept=".csv"
            onChange={handleCsvImport}
            className="hidden"
          />
        </button>
        <button 
          onClick={handleQuickBooksConnect}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          <Link className="w-4 h-4" />
          Connect to QuickBooks
        </button>
      </div>
    </div>
  )
}