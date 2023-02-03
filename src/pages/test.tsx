import { withNextAuth } from '@roq/nextjs'
import AppLayout from 'layout/app/app.layout'
import { withAuthH } from 'with-auth-h'

export function TestPage(props) {
    return <AppLayout>
        <code>{JSON.stringify(props)}</code>
    </AppLayout>
}

export default withNextAuth()(TestPage)