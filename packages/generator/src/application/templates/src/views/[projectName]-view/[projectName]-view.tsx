import { Heading, Layout } from '@mfe/common/lib/components'

export const <%= projectNamePascal %>View = () => {
    return (
        <Layout>
            <Heading as="h1"><%= name %></Heading>
        </Layout>
    )
}