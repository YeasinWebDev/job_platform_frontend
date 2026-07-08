import { getMe } from "@/app/services/auth/auth"
import ProfileMainPage from "@/components/home/ProfileMainPage"

export const dynamic = 'force-dynamic';

async function Profile() {
  const user = await getMe()
  return (
    <div className="min-h-screen mt-20">
      <ProfileMainPage user={user}/>
    </div>
  )
}

export default Profile