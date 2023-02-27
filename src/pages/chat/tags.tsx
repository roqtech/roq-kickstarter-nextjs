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
      User Group: <input type="text" onChange={(e) => setUserGroup(e.target.value)}/>
      <ChatSidebar tags={[hotel]} userListGroupsFilter={[userGroup]} />
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: routes.frontend.login,
})(ChatPage);
