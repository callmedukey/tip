"use client"
import { updateUserLevel } from '@/actions/update-user-level'
import type { UserLevel } from '@prisma/client'
import React from 'react'

const UpdateUserLevelButton = ({value, userLevelKey, userId}:{value:string, userLevelKey: UserLevel, userId:string}) => {
    const updateLevel = async () => {
        await updateUserLevel ({userId, newLevel:userLevelKey})
    }
  return (
<button type='button' onClick={updateLevel}>
{value}
</button>

  )
}

export default UpdateUserLevelButton
