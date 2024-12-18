'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Upload, Link, DollarSign, TrendingUp, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data - replace with actual data in a real application
const donationData = [
  { month: 'Jan', amount: 4000 },
  { month: 'Feb', amount: 3000 },
  { month: 'Mar', amount: 5000 },
  { month: 'Apr', amount: 4500 },
  { month: 'May', amount: 6000 },
  { month: 'Jun', amount: 5500 },
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

  const handleCsvImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setCsvFile(file)
      // Here you would typically process the CSV file
      console.log(`Imported file: ${file.name}`)
    }
  }

  const handleQuickBooksConnect = () => {
    // Here you would typically initiate QuickBooks connection
    console.log('Connecting to QuickBooks...')
  }

  const totalDonations = donationData.reduce((sum, item) => sum + item.amount, 0)
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Non-Profit Financial Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDonations.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programs Funded</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Across multiple areas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Funding Efficiency</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Funds directly to programs</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Donations Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={donationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Program Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program Name</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Remaining</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programExpenses.map((program) => (
                <TableRow key={program.name}>
                  <TableCell>{program.name}</TableCell>
                  <TableCell>${program.budget.toLocaleString()}</TableCell>
                  <TableCell>${program.spent.toLocaleString()}</TableCell>
                  <TableCell>${program.remaining.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="flex items-center gap-2">
          <Upload className="w-4 h-4" />
          <label htmlFor="csv-upload">Import CSV</label>
          <input
            id="csv-upload"
            type="file"
            accept=".csv"
            onChange={handleCsvImport}
            className="hidden"
          />
        </Button>
        <Button onClick={handleQuickBooksConnect} className="flex items-center gap-2">
          <Link className="w-4 h-4" />
          Connect to QuickBooks
        </Button>
      </div>
    </div>
  )
}