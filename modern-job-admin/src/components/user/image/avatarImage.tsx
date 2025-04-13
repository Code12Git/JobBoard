'use client'

import React, { useState } from 'react'
import Image from 'next/image'

type UserData = {
  profilePic?: string;  
  name?: string;
  status?: "online" | "idle" | "offline";
}

const AvatarImage = ({ userData }: { userData: UserData }) => {
  const [isImageClicked, setIsImageClicked] = useState(false);

  // const statusColors = {
  //   online: "bg-green-500",
  //   idle: "bg-yellow-500",
  //   offline: "bg-gray-500",
  // };
  console.log(userData)

  const avatarSrc = userData?.profilePic || "https://i.pravatar.cc/150?img=0";
  const userName = userData?.name || "User Avatar";

  return (
    <div className="relative inline-block">
      {/* Profile Image */}
      <div className="relative w-24 h-24">
        <Image
          src={avatarSrc}
          fill
          alt={userName}
          className="cursor-pointer rounded-full border-4 border-white object-cover transition-transform hover:scale-105"
          onClick={() => setIsImageClicked(true)}
        />
        
        {/* Status Indicator */}
        {/* {userData?.status && (
          <div
            className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white ${statusColors[userData.status]}`}
          ></div>
        )} */}
      </div>

      {/* Modal */}
      {isImageClicked && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setIsImageClicked(false)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={avatarSrc}
              width={600}
              height={600}
              alt={userName}
              className="rounded-lg object-contain max-w-full max-h-full"
              style={{
                width: 'auto',
                height: 'auto'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AvatarImage;
