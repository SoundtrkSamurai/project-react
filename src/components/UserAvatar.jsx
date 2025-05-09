import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';

const UserAvatar = ({ className, imageOnly, user }) => {
  const displayName = `${user.firstName} ${user.lastName}`;

  return (
    <div className='flex flex-row items-center gap-2'>
      <Avatar className={className}>
        <AvatarImage src={user.avatarUrl} alt={displayName} />
        <AvatarFallback className='w-10 h-10 bg-secondary'>
          {user.initials}
        </AvatarFallback>
      </Avatar>

      {!imageOnly && (
        <div className='flex flex-col'>
          <span className='text-sm font-semibold text-primary'>
            {displayName}
          </span>
        </div>
      )}
    </div>
  )
}

export default UserAvatar
