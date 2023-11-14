import { storage } from './index'
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage'

export function getImgUrl(listId: string, itemId: string): Promise<string> {
  const imgRef = ref(storage, listId + '/' + itemId)
  return getDownloadURL(imgRef)
}

export function uploadImage(listId: string, itemId: string, file: File) {
  const imgRef = ref(storage, listId + '/' + itemId)
  return uploadBytes(imgRef, file)
    .then(() => getImgUrl(listId, itemId))
}
