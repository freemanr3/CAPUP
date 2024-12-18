'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const data = [
  { month: 'Jan', amount: 30000 },
  { month: 'Feb', amount: 28000 },
  { month: 'Mar', amount: 32000 },
  { month: 'Apr', amount: 30000 },
  { month: 'May', amount: 34000 },
  { month: 'Jun', amount: 32000 },
  { month: 'Jul', amount: 36000 },
  { month: 'Aug', amount: 34000 },
  { month: 'Sep', amount: 38000 },
  { month: 'Oct', amount: 36000 },
  { month: 'Nov', amount: 40000 },
  { month: 'Dec', amount: 38000 },
]

export default function PayrollByMonth() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Payroll by Month</h1>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Monthly Payroll</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
