import { render } from '@testing-library/react'
import { useRouter } from 'next/router'
import { useSession, getServerSession } from '@roq/nextjs'
import Public from '../pages/public'
import '@testing-library/jest-dom'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))
useRouter.mockReturnValue({ query: {}})

jest.mock('@roq/nextjs', () => ({
  t: jest.fn(),
  useSession: jest.fn(),
  getServerSession: jest.fn(),
}))
useSession.mockReturnValue({ })
getServerSession.mockReturnValue({
  id: '4cc93358-0b60-4a4e-b294-92123583eb5b',
  roqAccessToken: '',
  roqRefreshToken: '',
  roqIdToken: '',
  roqUserId: 'cc20ce3f-73e9-4c9d-9695-cdf152b63075',
  user: {
    firstName: 'Vinh 1',
    lastName: 'Nguyen',
    email: 'test01@gmail.com',
    timezone: 'Asia/Saigon',
    locale: 'en-US',
    roles: [ 'global_platform_admin' ],
    tenantId: 'a101896d-78de-48fe-afe0-e11e535b4138'
  },
  iat: 1681357825,
  exp: 1767757918
})

describe('Home', () => {
  it('renders a heading', () => {
    const { getByText } = render(<Public />)

    const heading = getByText(/public page/)

    expect(heading).toBeInTheDocument()
  })
})