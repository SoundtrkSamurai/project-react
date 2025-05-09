import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { displayName } from '@/lib/utils/displayName';

const UserAvatar = ({ className, imageOnly, user }) => {

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
            {displayName(user)}
          </span>
        </div>
      )}
    </div>
  )
}

export default UserAvatar
