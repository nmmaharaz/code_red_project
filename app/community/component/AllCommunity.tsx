"use client"
import { useGroupData } from '../[user_name]/Member/component/index';
export function AllCommunity() {
    const { data: groups, isLoading, isError } = useGroupData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/community`);
  return {groups, isLoading, isError}
}

