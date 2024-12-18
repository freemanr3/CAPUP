'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import HomePage from '../home-page'
import HomePage from '../home-page'

export default function Home() {
  return <HomePage />
}
const data = [
  { month: 'Jan', amount: 40000 },
  { month: 'Feb', amount: 35000 },
  { month: 'Mar', amount: 50000 },
  { month: 'Apr', amount: 45000 },
  { month: 'May', amount: 60000 },
  { month: 'Jun', amount: 55000 },
  { month: 'Jul', amount: 70000 },
  { month: 'Aug', amount: 65000 },
  { month: 'Sep', amount: 80000 },
  { month: 'Oct', amount: 75000 },
  { month: 'Nov', amount: 90000 },
  { month: 'Dec', amount: 85000 },
]

export default function CashOnHand() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Cash on Hand</h1>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Monthly Cash on Hand</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
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
    </div>
  )
}
