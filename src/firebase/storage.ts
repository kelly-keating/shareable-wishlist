import { storage } from './index'
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage'

export function getImgUrl(itemId: string): Promise<string> {
  const imgRef = ref(storage, 'images/' + itemId)
  return getDownloadURL(imgRef)
    .catch(() => 'https://thealmanian.com/wp-content/uploads/2019/01/product_image_thumbnail_placeholder.png')
}

export function uploadImage(itemId: string, file: File) {
  const imgRef = ref(storage, 'images/' + itemId)
  return uploadBytes(imgRef, file)
    .then(() => getImgUrl(itemId))
    .catch((err) => {
      console.log(err.message)
    })
}
