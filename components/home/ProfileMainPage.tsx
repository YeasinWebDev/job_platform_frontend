"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { CheckCircle2, UserRound, XCircle } from "lucide-react";
import { updateProfile } from "@/app/services/profile/profile.service";
import toast from "react-hot-toast";
import VerifyModal from "./VerifyModal";
import { sendVerificationRequest } from "@/app/services/auth/auth";

type Role = "USER" | "RECRUITER" | "ADMIN";

type UserType = {
  id: string;
  name: string;
  email: string;
  role: Role;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;

  userInfo?: {
    about?: string | null;
    image?: string | null;
    website?: string | null;
    location?: string | null;
    phone?: string | null;
    linkedin?: string | null;
    github?: string | null;
    resume?: string | null;
  } | null;

  recruiter?: {
    about?: string | null;
    companyName?: string | null;
    companyImage?: string | null;
    website?: string | null;
    location?: string | null;
    phone?: string | null;
  } | null;
};

function ProfileMainPage({ user }: { user: UserType }) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",

    // userInfo
    about: user?.userInfo?.about || "",
    image: user?.userInfo?.image || "",
    website: user?.userInfo?.website || "",
    location: user?.userInfo?.location || "",
    phone: user?.userInfo?.phone || "",
    linkedin: user?.userInfo?.linkedin || "",
    github: user?.userInfo?.github || "",
    resume: user?.userInfo?.resume || "",

    // recruiter
    recruiterAbout: user?.recruiter?.about || "",
    companyName: user?.recruiter?.companyName || "",
    companyImage: user?.recruiter?.companyImage || "",
    recruiterWebsite: user?.recruiter?.website || "",
    recruiterLocation: user?.recruiter?.location || "",
    recruiterPhone: user?.recruiter?.phone || "",
  });
  const [verifyOpen, setVerifyOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || "",
      email: user?.email || "",

      about: user?.userInfo?.about || "",
      image: user?.userInfo?.image || "",
      website: user?.userInfo?.website || "",
      location: user?.userInfo?.location || "",
      phone: user?.userInfo?.phone || "",
      linkedin: user?.userInfo?.linkedin || "",
      github: user?.userInfo?.github || "",
      resume: user?.userInfo?.resume || "",

      recruiterAbout: user?.recruiter?.about || "",
      companyName: user?.recruiter?.companyName || "",
      companyImage: user?.recruiter?.companyImage || "",
      recruiterWebsite: user?.recruiter?.website || "",
      recruiterLocation: user?.recruiter?.location || "",
      recruiterPhone: user?.recruiter?.phone || "",
    });
  };

  const handleSave = async () => {
    try {
      // TODO: Call your API here
      // Example:
      // await fetch("/api/profile/update", { method: "PATCH", body: JSON.stringify(formData) })
      let ans = await updateProfile(formData);
      console.log(ans, "ans");
      if (ans.success) {
        toast.success("Profile Updated Successfully");
      }else{
        toast.error(ans.message);
      }

      console.log("Saving Profile Data:", formData);

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerify = async () => {
    try {
      // TODO: Call your API here
      // Example:
      // await fetch("/api/profile/verify", { method: "PATCH" })
      let ans = await sendVerificationRequest();
      setVerifyOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user,"user")

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Profile</h1>
          <p className="text-sm text-muted-foreground">Manage your personal information and profile settings.</p>
        </div>

        <div className="flex gap-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="rounded-sm cursor-pointer">
              Edit Profile
            </Button>
          ) : (
            <>
              <Button className="rounded-sm cursor-pointer bg-primary-foreground text-black" onClick={handleCancel}>
                Cancel
              </Button>
              <Button className="rounded-sm cursor-pointer bg-red-500/10 text-red-400 border-red-500/30" onClick={handleVerify}>
                Verify
              </Button>
              <Button className="rounded-sm cursor-pointer" onClick={handleSave}>
                Save Changes
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center text-center gap-3">
        {/* Avatar */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-700 shadow-md flex items-center justify-center bg-gray-300">
            {user?.userInfo?.image || user?.recruiter?.companyImage ? (
              <Image src={user.userInfo?.image || user.recruiter?.companyImage || ""} alt="Profile" width={96} height={96} className="w-full h-full object-cover" />
            ) : (
              <UserRound size={40} className="text-black" />
            )}
          </div>

          {/* Verified Icon */}
          <div className="absolute bottom-1 right-1 bg-black rounded-full p-1 shadow-md">
            {user.isVerified ? <CheckCircle2 size={22} className="text-green-500" /> : <XCircle size={22} className="text-red-500" />}
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-white">{user.name}</h2>
          <p className="text-sm text-gray-400">{user.email}</p>

          {/* Role Badge */}
          <div className="flex justify-center gap-2 mt-2">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-800 text-gray-200 border border-gray-700">{user.role}</span>

            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                user.isVerified ? "bg-green-500/10 text-green-400 border-green-500/30" : "bg-red-500/10 text-red-400 border-red-500/30"
              }`}
            >
              {user.isVerified ? "Verified" : "Not Verified"}
            </span>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <Card className="rounded-md shadow-sm bg-[#161614] text-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">Basic Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="disabled:placeholder:text-white rounded-sm"
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={true} // usually email should not be editable
                className="disabled:placeholder:text-white rounded-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* USER Role Fields */}
      {user.role === "USER" && (
        <Card className="rounded-md shadow-sm bg-[#161614] text-white">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>About</Label>
              <Textarea
                name="about"
                value={formData.about}
                className="disabled:placeholder:text-white rounded-sm"
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Write something about yourself..."
              />
            </div>

            <Separator />

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Profile Image</Label>
                <Input
                  name="image"
                  value={formData.image}
                  className="disabled:placeholder:text-white rounded-sm"
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Image URL"
                />
              </div>

              <div className="space-y-2">
                <Label>Website</Label>
                <Input
                  name="website"
                  value={formData.website}
                  className="disabled:placeholder:text-white rounded-sm"
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  name="location"
                  value={formData.location}
                  className="disabled:placeholder:text-white rounded-sm"
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Dhaka, Bangladesh"
                />
              </div>

              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  name="phone"
                  value={formData.phone}
                  className="disabled:placeholder:text-white rounded-sm"
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="+880..."
                />
              </div>

              <div className="space-y-2">
                <Label>LinkedIn</Label>
                <Input
                  name="linkedin"
                  value={formData.linkedin}
                  className="disabled:placeholder:text-white rounded-sm"
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div className="space-y-2">
                <Label>GitHub</Label>
                <Input
                  name="github"
                  value={formData.github}
                  className="disabled:placeholder:text-white rounded-sm"
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Resume</Label>
                <Input
                  name="resume"
                  value={formData.resume}
                  className="disabled:placeholder:text-white rounded-sm"
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Resume URL"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* RECRUITER Role Fields */}
      {user.role === "RECRUITER" && (
        <Card className="rounded-md shadow-sm bg-[#161614] text-white">
          <CardHeader>
            <CardTitle>Recruiter Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>About</Label>
              <Textarea
                name="recruiterAbout"
                value={formData.recruiterAbout}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Tell about your company..."
                className="disabled:placeholder:text-white rounded-sm"
              />
            </div>

            <Separator className="bg-gray-300" />

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Company Name"
                  className="disabled:placeholder:text-white rounded-sm"
                />
              </div>

              <div className="space-y-2">
                <Label>Company Image</Label>
                <Input
                  name="companyImage"
                  value={formData.companyImage}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Company logo URL"
                  className="disabled:placeholder:text-white rounded-sm"
                />
              </div>

              <div className="space-y-2">
                <Label>Website</Label>
                <Input
                  name="recruiterWebsite"
                  value={formData.recruiterWebsite}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="https://company.com"
                  className="disabled:placeholder:text-white rounded-sm"
                />
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  name="recruiterLocation"
                  value={formData.recruiterLocation}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Dhaka, Bangladesh"
                  className="disabled:placeholder:text-white rounded-sm"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Phone</Label>
                <Input
                  name="recruiterPhone"
                  value={formData.recruiterPhone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="+880..."
                  className="disabled:placeholder:text-white rounded-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <VerifyModal open={verifyOpen} setOpen={setVerifyOpen} />
    </div>
  );
}

export default ProfileMainPage;
