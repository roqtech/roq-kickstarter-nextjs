import { Chat, requireNextAuth } from "@roq/nextjs";
import { useRouter } from "next/router";
import AppLayout from "layout/app/app.layout";
import { routes } from "routes";
import { useCallback, useState, FormEvent } from "react";

function ChatWithTagsPage() {
  const router = useRouter();
  const [hotel, setHotel] = useState('hotel-1')

  const handleSelectChange = useCallback((e: FormEvent<HTMLSelectElement>) => {
    console.dir('handleSelectChange')
    setHotel(e.currentTarget.value)
  }, [])

  return (
    <AppLayout>
      <select onChange={handleSelectChange}>
        <option value="hotel-1" defaultChecked>hotel 1</option>
        <option value="hotel-2">hotel 2</option>
        <option value="hotel-3">hotel 3</option>
      </select>
      <Chat tags={[hotel]} />
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: routes.frontend.login,
})(ChatWithTagsPage);
