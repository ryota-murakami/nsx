import React, { useEffect, useState } from 'react'
import type { RouteComponentProps } from '@reach/router'
import { navigate } from '@reach/router'
import Layout from '../components/Layout'
import { useAppDispatch } from '../redux/hooks'
import { useFetchPostQuery, useUpdatePostMutation } from '../redux/api'
import type { Post } from '../../types'
import { enque } from '../redux/snackbarSlice'
import Button from '../elements/Button'

interface RouterParam {
  postId: Post['id']
}

const Edit: React.FC<RouteComponentProps<RouterParam>> = ({ postId }) => {
  const { data, error, refetch } = useFetchPostQuery(postId as Post['id'])
  const [updatePost] = useUpdatePostMutation()
  const [title, setTitle] = useState<string | undefined>('')
  const [body, setBody] = useState<string | undefined>('')
  const dispatch = useAppDispatch()

  useEffect(() => {
    setTitle(data?.title)
    setBody(data?.body)
    if (error) {
      dispatch(enque({ message: JSON.stringify(error), color: 'red' }))
    }
  }, [data, error, dispatch])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    cb: React.Dispatch<React.SetStateAction<string | undefined>>
  ): void {
    e.preventDefault()
    cb(e.target.value)
  }

  async function execEdit() {
    try {
      // @ts-ignore
      await updatePost({
        title,
        body,
        postId,
      })
      dispatch(enque({ message: 'Post Updated!', color: 'green' }))
      refetch()
      navigate(`/post/${postId}`)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      dispatch(enque({ message: JSON.stringify(error), color: 'red' }))
    }
  }

  return (
    <Layout className="flex flex-col justify-start">
      <input
        type="text"
        className="mt-3"
        value={title}
        onChange={(e) => handleChange(e, setTitle)}
      />
      <textarea
        className="w-full h-60 mt-3"
        value={body}
        onChange={(e) => handleChange(e, setBody)}
      />
      <div className="flex justify-end pt-8">
        <Button onClick={execEdit} variant="primary">
          Update
        </Button>
      </div>
    </Layout>
  )
}

export default React.memo(Edit)
