import { useEffect, useState } from "react"
import { useLoaderData, useFetcher } from "@remix-run/react"
import { json } from "@remix-run/node"

import supabase from "~/util/supabase"

import type { LoaderFunction, ActionFunction } from "@remix-run/node"

export const loader: LoaderFunction = async () => {
  const { data: allMessages, error } = await supabase.from('messages').select('*')
  if (error) console.error(error);

  return json({ allMessages })
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const content = formData.get('content')
  const { data, error } = await supabase.from('messages').insert({ content })

  if (error) console.error(error)
  if (data) console.log(data)

  return json({})
}

export default function MessagesPage() {
  const { allMessages } = useLoaderData()
  const fetcher = useFetcher()
  const [messages, setMessages] = useState([...allMessages])


  useEffect(() => {
    supabase.from('messages').on('*', (_payload) => {
      fetcher.load('/messages/')
    })
      .subscribe()

  }, [fetcher])

  useEffect(() => {
    if (fetcher.data) {
      setMessages([...fetcher.data?.allMessages])
    }
  }, [fetcher.data])

  return (
    <>
      <div>
        {messages.map((message: any) => (
          <p key={message.id}>{message.content}</p>
        ))}
      </div>
      <form method='post' className="flex">
        <input name='content' className="border border-gray-200 px-2 flex-1" />
        <button type="submit" className="px-4 py-2 ml-4 bg-blue-200">send!</button>
      </form>
    </>
  )
}
