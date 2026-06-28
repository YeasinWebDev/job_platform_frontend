import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { UserType } from '@/types/jobTypes'
import {
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  FileText,
  ShieldCheck,
  UserCircle,
  PencilLine,
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

function UserProfile({ user }: { user: UserType }) {
  const initials = user?.name
    ?.split(" ")
    .map(n => n.charAt(0).toUpperCase())
    .join("") || "U"

  const profileStrength = [
    user?.name ? 15 : 0,
    user?.email ? 10 : 0,
    user?.userInfo?.about ? 15 : 0,
    user?.userInfo?.phone ? 10 : 0,
    user?.userInfo?.location ? 10 : 0,
    user?.userInfo?.resume ? 15 : 0,
    user?.userInfo?.linkedin ? 10 : 0,
    user?.userInfo?.github ? 10 : 0,
    user?.userInfo?.website ? 5 : 0,
  ].reduce((a, b) => a + b, 0)

  
  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <Card className="relative overflow-hidden border border-white/5 bg-linear-to-br from-[#1a1a1a] to-[#121211]">
        {/* Decorative gradient blobs */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              {user?.userInfo?.image ? <Image
                src={user?.userInfo?.image || "/assets/avatar.png"}
                alt={user?.name || "User"}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover border-2 border-primary/30 shadow-lg shadow-primary/10"
              /> : <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/30 flex items-center justify-center font-bold text-2xl text-white shadow-lg shadow-primary/10">
                {initials}
              </div>
              }
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#121211] border-2 border-primary/20 flex items-center justify-center">
                <ShieldCheck size={12} className="text-primary" />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <h3 className="text-xl font-bold text-white truncate">{user?.name}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 text-[10px] font-bold uppercase tracking-wider">
                    <Sparkles size={10} className="mr-1" />
                    {user?.role}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-bold uppercase tracking-wider ${user?.isVerified
                      ? "border-green-500/30 text-green-400 bg-green-500/5"
                      : "border-red-500/30 text-red-400 bg-red-500/5"
                      }`}
                  >
                    {user?.isVerified ? (
                      <CheckCircle2 size={10} className="mr-1" />
                    ) : (
                      <XCircle size={10} className="mr-1" />
                    )}
                    {user?.isVerified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
              </div>

              <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                {user?.userInfo?.about || (
                  <span className="italic text-gray-500">No bio added yet. Tell employers about yourself!</span>
                )}
              </p>

              {/* Quick Contact Chips */}
              <div className="flex flex-wrap items-center gap-3 mt-4">
                {user?.email && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-gray-400 bg-white/3 px-2.5 py-1 rounded-full border border-white/5">
                    <Mail size={11} className="text-primary" />
                    {user.email}
                  </span>
                )}
                {user?.userInfo?.phone && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-gray-400 bg-white/3 px-2.5 py-1 rounded-full border border-white/5">
                    <Phone size={11} className="text-primary" />
                    {user.userInfo.phone}
                  </span>
                )}
                {user?.userInfo?.location && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-gray-400 bg-white/3 px-2.5 py-1 rounded-full border border-white/5">
                    <MapPin size={11} className="text-primary" />
                    {user.userInfo.location}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Bio & Contact Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio & Contact Card */}
          <Card className="border border-white/5 bg-[#121211]">
            <CardHeader className="border-b border-white/5 py-4">
              <CardTitle className="text-sm font-bold tracking-wide text-white uppercase flex items-center gap-2">
                <UserCircle size={14} className="text-primary" />
                Bio & Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Personal Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 group">
                      <div className="w-8 h-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                        <Mail size={14} className="text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Email</p>
                        <p className="text-sm text-gray-300 truncate">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 group">
                      <div className="w-8 h-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                        <Phone size={14} className="text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Phone</p>
                        <p className="text-sm text-gray-300">{user?.userInfo?.phone || <span className="text-gray-600 italic">Not set</span>}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 group">
                      <div className="w-8 h-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                        <MapPin size={14} className="text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Location</p>
                        <p className="text-sm text-gray-300">{user?.userInfo?.location || <span className="text-gray-600 italic">Not set</span>}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">About Me</h4>
                  <div className="p-4 rounded-xl bg-white/2 border border-white/5 min-h-[100px]">
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {user?.userInfo?.about || (
                        <span className="text-gray-600 italic">No bio added yet.</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Assets Card */}
          <Card className="border border-white/5 bg-[#121211]">
            <CardHeader className="border-b border-white/5 py-4">
              <CardTitle className="text-sm font-bold tracking-wide text-white uppercase flex items-center gap-2">
                <Award size={14} className="text-primary" />
                Professional Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Resume */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Resume / CV</h4>
                  {user?.userInfo?.resume ? (
                    <Link
                      href={user.userInfo.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between p-4 rounded-xl bg-white/2 border border-white/5 hover:bg-primary/5 hover:border-primary/20 transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                          <FileText size={18} className="text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white truncate">Resume Document</p>
                          <p className="text-[10px] text-gray-500 truncate">{user.userInfo.resume.substring(0, 35)}...</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-primary text-[11px] font-semibold shrink-0 ml-3">
                        View
                        <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                      <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                        <FileText size={18} className="text-red-400" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-red-400">No Resume Uploaded</p>
                        <p className="text-[10px] text-red-400/60">Add your resume to increase visibility</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Social & Web Links */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Online Presence</h4>
                  <div className="space-y-2">
                    <Link
                      href={user?.userInfo?.website || "#"}
                      target={user?.userInfo?.website ? "_blank" : undefined}
                      rel="noreferrer"
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${user?.userInfo?.website
                        ? "bg-white/2 border-white/5 hover:bg-primary/5 hover:border-primary/20 cursor-pointer"
                        : "bg-white/1 border-white/5 opacity-40 cursor-not-allowed"
                        }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0">
                        <Globe size={14} className="text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-white">Website</p>
                        <p className="text-[10px] text-gray-500 truncate">{user?.userInfo?.website || "Not set"}</p>
                      </div>
                      {user?.userInfo?.website && <ExternalLink size={12} className="text-gray-500 shrink-0" />}
                    </Link>

                    <Link
                      href={user?.userInfo?.linkedin || "#"}
                      target={user?.userInfo?.linkedin ? "_blank" : undefined}
                      rel="noreferrer"
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${user?.userInfo?.linkedin
                        ? "bg-white/2 border-white/5 hover:bg-primary/5 hover:border-primary/20 cursor-pointer"
                        : "bg-white/1 border-white/5 opacity-40 cursor-not-allowed"
                        }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0">
                        <Linkedin size={14} className="text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-white">LinkedIn</p>
                        <p className="text-[10px] text-gray-500 truncate">{user?.userInfo?.linkedin || "Not set"}</p>
                      </div>
                      {user?.userInfo?.linkedin && <ExternalLink size={12} className="text-gray-500 shrink-0" />}
                    </Link>

                    <Link
                      href={user?.userInfo?.github || "#"}
                      target={user?.userInfo?.github ? "_blank" : undefined}
                      rel="noreferrer"
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${user?.userInfo?.github
                        ? "bg-white/2 border-white/5 hover:bg-primary/5 hover:border-primary/20 cursor-pointer"
                        : "bg-white/1 border-white/5 opacity-40 cursor-not-allowed"
                        }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0">
                        <Github size={14} className="text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-white">GitHub</p>
                        <p className="text-[10px] text-gray-500 truncate">{user?.userInfo?.github || "Not set"}</p>
                      </div>
                      {user?.userInfo?.github && <ExternalLink size={12} className="text-gray-500 shrink-0" />}
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Profile Strength & Actions */}
        <div className="space-y-6">
          {/* Profile Strength Card */}
          <Card className="border border-white/5 bg-[#121211]">
            <CardHeader className="border-b border-white/5 py-4">
              <CardTitle className="text-sm font-bold tracking-wide text-white uppercase flex items-center gap-2">
                <Sparkles size={14} className="text-primary" />
                Profile Strength
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                {/* Circular Progress */}
                <div className="relative w-28 h-28 mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(profileStrength / 100) * 326.73} 326.73`}
                      className="text-primary transition-all duration-700"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-black text-white">{profileStrength}%</span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 mb-4">
                  {profileStrength < 40
                    ? "Your profile needs more details to stand out."
                    : profileStrength < 70
                      ? "Good progress! Add more details to complete your profile."
                      : "Excellent! Your profile is well-optimized."}
                </p>

                {/* Checklist */}
                <div className="w-full space-y-2 text-left">
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${user?.name ? "bg-green-500/20 text-green-400" : "bg-white/5 text-gray-500"}`}>
                      {user?.name ? <CheckCircle2 size={10} /> : <span className="text-[8px]">○</span>}
                    </div>
                    <span className={user?.name ? "text-gray-300" : "text-gray-600"}>Full Name</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${user?.userInfo?.about ? "bg-green-500/20 text-green-400" : "bg-white/5 text-gray-500"}`}>
                      {user?.userInfo?.about ? <CheckCircle2 size={10} /> : <span className="text-[8px]">○</span>}
                    </div>
                    <span className={user?.userInfo?.about ? "text-gray-300" : "text-gray-600"}>Bio / About</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${user?.userInfo?.phone ? "bg-green-500/20 text-green-400" : "bg-white/5 text-gray-500"}`}>
                      {user?.userInfo?.phone ? <CheckCircle2 size={10} /> : <span className="text-[8px]">○</span>}
                    </div>
                    <span className={user?.userInfo?.phone ? "text-gray-300" : "text-gray-600"}>Phone Number</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${user?.userInfo?.location ? "bg-green-500/20 text-green-400" : "bg-white/5 text-gray-500"}`}>
                      {user?.userInfo?.location ? <CheckCircle2 size={10} /> : <span className="text-[8px]">○</span>}
                    </div>
                    <span className={user?.userInfo?.location ? "text-gray-300" : "text-gray-600"}>Location</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${user?.userInfo?.resume ? "bg-green-500/20 text-green-400" : "bg-white/5 text-gray-500"}`}>
                      {user?.userInfo?.resume ? <CheckCircle2 size={10} /> : <span className="text-[8px]">○</span>}
                    </div>
                    <span className={user?.userInfo?.resume ? "text-gray-300" : "text-gray-600"}>Resume Uploaded</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${user?.userInfo?.linkedin ? "bg-green-500/20 text-green-400" : "bg-white/5 text-gray-500"}`}>
                      {user?.userInfo?.linkedin ? <CheckCircle2 size={10} /> : <span className="text-[8px]">○</span>}
                    </div>
                    <span className={user?.userInfo?.linkedin ? "text-gray-300" : "text-gray-600"}>LinkedIn Profile</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="border border-white/5 bg-[#121211]">
            <CardHeader className="border-b border-white/5 py-4">
              <CardTitle className="text-sm font-bold tracking-wide text-white uppercase flex items-center gap-2">
                <PencilLine size={14} className="text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Link href="/profile">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white text-xs h-10 rounded-lg cursor-pointer transition-all shadow-lg shadow-primary/10 mb-3">
                  <PencilLine size={14} className="mr-1.5" />
                  Edit Full Profile
                </Button>
              </Link>
              {user?.userInfo?.resume && (
                <Link href={user.userInfo.resume} target="_blank" rel="noreferrer">
                  <Button className="w-full border-white/10 hover:bg-white/5 text-gray-300 text-xs h-10 rounded-lg cursor-pointer bg-transparent">
                    <FileText size={14} className="mr-1.5" />
                    View Resume
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div >
  )
}

export default UserProfile