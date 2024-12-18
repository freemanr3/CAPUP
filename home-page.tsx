'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { PieChart, LineChart, BarChart, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">CAPUP Financial Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Spending by Program</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <PieChart className="w-12 h-12 text-primary" />
              <Link href="/spending-by-program">
                <Button>View Chart</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projected Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <LineChart className="w-12 h-12 text-primary" />
              <Link href="/projected-spend">
                <Button>View Chart</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cash on Hand</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <BarChart className="w-12 h-12 text-primary" />
              <Link href="/cash-on-hand">
                <Button>View Chart</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payroll by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <Users className="w-12 h-12 text-primary" />
              <Link href="/payroll-by-month">
                <Button>View Chart</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
