import { Chat, requireNextAuth, useChatTags } from "@roq/nextjs";
import { useRouter } from "next/router";
import AppLayout from "layout/app/app.layout";
import { routes } from "routes";
import { useEffect, useState } from "react";

function ChatPage() {
  const router = useRouter();
  const [hotel, setHotel] = useState('Hotel 1')
  const { setChatTags } = useChatTags();

  useEffect(() => {
    if (!!hotel) {
      return setChatTags([hotel])
    }

    setChatTags(null);
  }, [hotel])

  return (
    <AppLayout>
      <select className='input' value={hotel} onChange={e => setHotel(e.target.value)}>
        <option value='Hotel 1'>Hotel 1</option>
        <option value='Hotel 2'>Hotel 2</option>
        <option value='Hotel 3'>Hotel 3</option>
      </select>
      <Chat tags={[hotel]} />
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: routes.frontend.login,
})(ChatPage);
