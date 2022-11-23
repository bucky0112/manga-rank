import { useState, useEffect } from "react"
import { useRouter } from "next/router"

const Page = () => {
  const router = useRouter()
  const [id, setId] = useState<string>("")

  useEffect(() => {
    setId(router.query.id as string)
  }, [router.query.id])

  return (
    <div>
      <h1>id: {id}</h1>
    </div>
  )
}

export default Page
