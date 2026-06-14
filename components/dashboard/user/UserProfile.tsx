import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UserType } from '@/types/jobTypes'
import { ExternalLink } from 'lucide-react'

function UserProfile({ user }: { user: UserType }) {
  return (
        <div className="space-y-6">
          <Card className="bg-[#121211] border-white/5">
            <CardHeader className="border-b border-white/5 py-4">
              <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">Candidate Profile Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-xl text-white">
                  {user?.name?.split(" ")[0].charAt(0).toUpperCase() || "U"}
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">{user?.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-primary/10 text-primary border border-primary/20">
                      {user?.role}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${user?.isVerified ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}>
                      {user?.isVerified ? "VERIFIED" : "UNVERIFIED"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Bio & Contact</h4>
                  <div className="space-y-2.5 text-xs text-gray-300">
                    <p><span className="text-gray-500">About Me:</span> {user?.userInfo?.about || "Not set"}</p>
                    <p><span className="text-gray-500">Email:</span> {user?.email}</p>
                    <p><span className="text-gray-500">Phone:</span> {user?.userInfo?.phone || "Not set"}</p>
                    <p><span className="text-gray-500">Location:</span> {user?.userInfo?.location || "Not set"}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Professional Assets</h4>
                  <div className="space-y-3 text-xs text-gray-300">
                    {user?.userInfo?.resume ? (
                      <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                        <span className="truncate">Resume Link: {user.userInfo.resume.substring(0, 30)}...</span>
                        <a href={user.userInfo.resume} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1 shrink-0">
                          View <ExternalLink size={10} />
                        </a>
                      </div>
                    ) : (
                      <div className="p-2 rounded-lg bg-red-500/5 border border-red-500/10 text-red-400">No resume uploaded.</div>
                    )}
                    <p><span className="text-gray-500">Website:</span> {user?.userInfo?.website || "Not set"}</p>
                    <p><span className="text-gray-500">LinkedIn:</span> {user?.userInfo?.linkedin || "Not set"}</p>
                    <p><span className="text-gray-500">GitHub:</span> {user?.userInfo?.github || "Not set"}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end">
                <a href="/profile">
                  <Button className="bg-primary hover:bg-primary/95 text-white text-xs h-9 rounded-md cursor-pointer">
                    Edit Full Profile
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      );
}

export default UserProfile