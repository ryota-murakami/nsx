import React, { useEffect, lazy, Suspense } from 'react'
import type { RouteComponentProps } from '@reach/router'
import { Link } from '@reach/router'
import breaks from 'remark-breaks'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from 'react-markdown'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import Layout from '../components/Layout'
import Button from '../elements/Button'
import { useFetchPostQuery } from '../redux/api'
import { selectLogin } from '../redux/adminSlice'
import { enque } from '../redux/snackbarSlice'
import type { Post as PostType } from '../../types'
import Loading from '../elements/Loading'
import { Helmet } from 'react-helmet'
import { truncateString } from '../utils'

interface RouterParam {
  postId: PostType['id']
}

// This is cumtom <a/> tag component for pass <ReactMarkdown compoment={{a}} /> props
const a: React.FC = (props) => (
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  <a {...props} target="_blank" className="text-blue-700"></a>
)

// This is cumtom <code/> tag component for pass <ReactMarkdown compoment={{code}} /> props
const code = lazy(
  // <code/> depends on heavy hintaxhilight library so we lazyload for purpose of reduce bundle chunk size
  () =>
    // @ts-ignore @TODO react-syntax-highlighter typedef issue
    import(/* webpackChunkName: "code" */ '../elements/code')
)

// we only load <code/> if blog post containing Markdown for purpose of reduce bundle chunk size
const getCustomComponents = (data: { body: string | string[] }) => {
  return data.body.includes('```') ? { a, code } : { a }
}

const Post: React.FC<RouteComponentProps<RouterParam>> = ({ postId }) => {
  const dispatch = useAppDispatch()
  const login = useAppSelector(selectLogin)

  const {
    data,
    isLoading,
    error = null,
  } = useFetchPostQuery(postId as PostType['id'])

  useEffect(() => {
    if (error) dispatch(enque({ message: error.toString(), color: 'red' }))
  }, [dispatch, error])

  if (isLoading || data === undefined) {
    return (
      <Layout data-cy="postPage">
        <Loading />
      </Layout>
    )
  }

  return (
    <Layout data-cy="postPage">
      <Suspense fallback={<Loading />}>
        {/* Suspence for lazyload expesive <code /> component */}
        <>
          <Helmet>
            <meta name="description" content={truncateString(data.body, 40)} />
            <meta property="og:title" content={data.title} />
            <meta
              property="og:description"
              content={truncateString(data.body, 40)}
            />
            <meta property="og:type" content="article" />
            <meta property="og:url" content="https://digitalstrength.dev" />
            <meta
              name="og:image"
              content="https://digitalstrength.dev/ogp.png"
            />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@malloc007" />
            <meta
              name="twitter:image"
              content="https://digitalstrength.dev/ogp.png"
            />
            <title>{data.title}</title>
          </Helmet>
          <h1 className="text-2xl pt-4 pb-6 font-semibold">{data.title}</h1>
          <ReactMarkdown
            components={getCustomComponents(data)}
            /* @ts-ignore lib index.d.ts missmatch between "@types/node@16.4.12" and "rehype-raw@6.0.0" */
            rehypePlugins={[rehypeRaw]}
            /* @ts-ignore lib index.d.ts missmatch @types/mdast/index.d.ts */
            remarkPlugins={[breaks, gfm]}
            className="prose prose-lg"
          >
            {data.body}
          </ReactMarkdown>
        </>
        {login && (
          <div className="pt-8 flex justify-end">
            <Link to={`/dashboard/edit/${postId}`}>
              <Button variant="primary" data-cy="edit-btn">
                Edit
              </Button>
            </Link>
          </div>
        )}
      </Suspense>
    </Layout>
  )
}

export default React.memo(Post, () => true)
