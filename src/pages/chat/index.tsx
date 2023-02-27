import { ChatSidebar, requireNextAuth } from "@roq/nextjs";
import AppLayout from "layout/app/app.layout";
import { routes } from "routes";
import { useState } from "react";

function ChatPage() {
  const [hotel, setHotel] = useState('Hotel 1')
  const [userGroup, setUserGroup] = useState<string | undefined>()
  return (
    <AppLayout>
      <select className='input' value={hotel} onChange={e => setHotel(e.target.value)}>
        <option value='Hotel 1'>Hotel 1</option>
        <option value='Hotel 2'>Hotel 2</option>
        <option value='Hotel 3'>Hotel 3</option>
      </select>
      <select className='input' value={userGroup} onChange={e => setUserGroup(e.target.value)}>
        <option value="">Select Group</option>
        <option value='3e9529fd-e435-47f7-83e0-c01788b8f8fe'>Group 1</option>
        <option value='b93f65ec-5072-4c53-a2db-d22b7398c007'>Group 2</option>
      </select>
      <ChatSidebar tags={[hotel]} userListGroupsFilter={[userGroup]} />
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: routes.frontend.login,
})(ChatPage);
