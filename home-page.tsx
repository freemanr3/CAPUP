'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from 'next/link'
import { PieChart, LineChart, BarChart, Users, Plus, Upload, LinkIcon } from 'lucide-react'

export default function HomePage() {
  const [excelFile, setExcelFile] = useState<File | null>(null)

  const handleExcelImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setExcelFile(file)
      // Here you would typically process the Excel file
      console.log(`Imported Excel file: ${file.name}`)
    }
  }

  const handleQuickBooksConnect = () => {
    // Here you would typically initiate QuickBooks connection
    console.log('Connecting to QuickBooks...')
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">CAPUP Financial Dashboard</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add Data</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Data</DialogTitle>
              <DialogDescription>
                Import an Excel sheet or connect your QuickBooks account to update your data.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="excel-file" className="text-right">
                  Excel File
                </Label>
                <Input
                  id="excel-file"
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleExcelImport}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">QuickBooks</Label>
                <Button onClick={handleQuickBooksConnect} className="col-span-3">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Connect QuickBooks
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
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
