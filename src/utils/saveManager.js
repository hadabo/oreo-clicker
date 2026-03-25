import { STORAGE_KEY } from '../constants'
import crepto from '../helpers/crypto'
import { sanitizeGameState } from './validation'

export function exportSave() {
  const saveData = localStorage.getItem(STORAGE_KEY)
  if (!saveData) {
    throw new Error('No save data found. Play the game first!')
  }
  
  try {
    // Decrypt to verify it's valid before exporting
    const decryptedData = crepto('decrypt', saveData)
    const prettyJson = JSON.stringify(decryptedData, null, 2)
    
    const blob = new Blob([prettyJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T').join('_')
    link.href = url
    link.download = `oreo-clicker-save_${timestamp}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    return true
  } catch (error) {
    console.error('Export failed:', error)
    throw new Error('Failed to export save data')
  }
}

export function importSave(file, initialState) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (event) => {
      try {
        const saveData = event.target.result
        const parsedData = JSON.parse(saveData)
        
        // Validate the data structure
        const validatedData = sanitizeGameState(parsedData, initialState)
        
        // Encrypt and store
        const dataToStore = JSON.stringify(validatedData)
        const encryptedData = crepto('encrypt', dataToStore)
        localStorage.setItem(STORAGE_KEY, encryptedData)
        
        resolve(validatedData)
      } catch (error) {
        console.error('Import failed:', error)
        reject(new Error('Invalid save file format. Please check the file and try again.'))
      }
    }
    
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}
