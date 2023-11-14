import { FormEvent, useState } from "react"
import { uploadImage } from "../firebase/storage"

function TestUpload() {
  const [img, setImg] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const file = (e.target as HTMLFormElement).img.files[0]
    if (!file || !file.type.includes('image')) return alert("please select an image")
    if (file.size >= 5 * 1024 * 1024) return alert("please select an image under 5mb")
    console.log(file)
    uploadImage('list', 'test', file)
      .then(url => setImg(url))
      .catch(err => console.log(err.message))
  }

  return (
    <div>
      <h2>TestUpload</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" id="img" />
        <input type="submit" value="Save img"/>
      </form>
      {img && <img src={img} />}
    </div>
  )
}

export default TestUpload
