import { Card, CardContent, CardHeader } from '@/components/ui/card'

function AdminLoadingSkeleton() {
    return (
        <Card className="bg-[#121211] border-white/5">
            <CardHeader className="border-b border-white/5 py-4 flex flex-row items-center justify-between">
                <div className="h-4 w-40 bg-white/10 rounded animate-pulse" />
                <div className="h-3 w-28 bg-white/10 rounded animate-pulse" />
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-gray-400 bg-white/1">
                                <th className="p-4 font-semibold">User details</th>
                                <th className="p-4 font-semibold">Role</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td className="p-4">
                                        <div className="h-4 w-32 bg-white/10 rounded mb-2" />
                                        <div className="h-3 w-48 bg-white/10 rounded" />
                                    </td>
                                    <td className="p-4">
                                        <div className="h-7 w-20 bg-white/10 rounded-md" />
                                    </td>
                                    <td className="p-4">
                                        <div className="h-5 w-16 bg-white/10 rounded-full" />
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="h-8 w-28 bg-white/10 rounded-md ml-auto" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}

export function AdminOverviewLoader () {
    return (
            <div className="space-y-6">
                <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-linear-to-r from-red-500/10 via-black to-black p-6 md:p-8">
                    <div className="h-7 w-72 bg-white/10 rounded animate-pulse mb-2" />
                    <div className="h-4 w-96 bg-white/10 rounded animate-pulse" />
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Card key={i} className="bg-[#121211] border-white/5">
                            <CardContent className="pt-6">
                                <div className="h-3 w-24 bg-white/10 rounded animate-pulse mb-3" />
                                <div className="h-8 w-12 bg-white/10 rounded animate-pulse" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="bg-[#121211] border-white/5 lg:col-span-2">
                        <CardHeader className="border-b border-white/5 py-4">
                            <div className="h-4 w-40 bg-white/10 rounded animate-pulse" />
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-white/10 animate-pulse" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-3 w-32 bg-white/10 rounded animate-pulse" />
                                        <div className="h-3 w-24 bg-white/10 rounded animate-pulse" />
                                    </div>
                                    <div className="h-3 w-12 bg-white/10 rounded animate-pulse" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Card className="bg-[#121211] border-white/5">
                        <CardHeader className="border-b border-white/5 py-4">
                            <div className="h-4 w-28 bg-white/10 rounded animate-pulse" />
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="h-4 bg-white/10 rounded animate-pulse" />
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
}

export default AdminLoadingSkeleton