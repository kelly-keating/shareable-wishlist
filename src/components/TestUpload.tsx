import { FormEvent } from "react"
import { uploadImage } from "../firebase/storage"

function TestUpload() {

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const file = (e.target as HTMLFormElement).img.files[0]
    if (!file || !file.type.includes('image')) return alert("please select an image")
    if (file.size >= 5 * 1024 * 1024) return alert("please select an image under 5mb")
    console.log(file)
    uploadImage('test', file)
  }

  return (
    <div>
      <h2>TestUpload</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" id="img" />
        <input type="submit" value="Save img"/>
      </form>
    </div>
  )
}

export default TestUpload
