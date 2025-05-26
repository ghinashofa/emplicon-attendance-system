import { Clock } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto relative">
            <div className="absolute inset-0 rounded-full border-3 border-blue-200 border-t-blue-500 animate-spin"></div>
            <Clock className="h-6 w-6 text-blue-500" />
          </div>
          <p className="mt-3 text-blue-600">Memuat data...</p>
        </div>
      </div>
    </div>
  )
}
