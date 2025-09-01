import { Box } from 'lucide-react'

const Loading = () => {
    return (
        <div className="w-full px-4 py-10 flex flex-col gap-6 items-center justify-center min-h-[400px]">
            <Box size={60} className="text-space-blue animate-pulse dark:text-indigo-400" />
        </div>
    )
}

export default Loading
