import React from 'react'
import useAuth from '../../../../hooks/useAuth'

const Profile = () => {
  const { user } = useAuth()

  return (
    <div className="p-6 w-full">
      <div className="divider divider-accent mx-44">My Profile</div>

      <div className="rounded-lg bg-gray-600 shadow-md p-6 max-w-md mx-auto">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={user?.photoURL || 'https://i.ibb.co/2kR8z2Q/user.png'}
            alt="User"
            className="w-24 h-24 rounded-full border"
          />
        </div>

        {/* User Info */}
        <div className="space-y-3 text-center">
          <h3 className="text-xl font-medium">
            {user?.displayName || 'User Name'}
          </h3>

          <p className="text-gray-600">{user?.email}</p>

          <span className="inline-block px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
            Active User
          </span>
        </div>

        {/* Action Button (Future Ready) */}
        <div className="mt-6 text-center">
          <button className="btn btn-outline btn-sm">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile;
